$(function () {
    $.support.cors = true;

    // bindingHandlers

    // to convert distance 
    ko.bindingHandlers.conversion = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var underlyingObservable = valueAccessor();
            var interceptor = ko.computed(function () {
                var conversion = master.conversion();
                var distance = underlyingObservable();
                return (distance * conversion.value).toFixed(1) + ' ' + conversion.unit;
            })
            ko.applyBindingsToNode(element, {
                text: interceptor
            });
        }
    }

    // to show rating to stars
    ko.bindingHandlers.rating = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var underlyingObservable = valueAccessor();
            var rating = underlyingObservable();
            for (var i = 0; i < rating; i++) {
                $(element).append('<li></li>');
            }
        }
    }

    // CONSTS
    var CLICKEVENT = "click";
    var MARKER_COLOR_DEFAULT = "117ec2";
    var MARKER_COLOR_SELECTED = "f58220";

    var sort = {
        ascent: function (key) {
            return function (a, b) {
                var ax = ko.toJS(a),
                    bx = ko.toJS(b);
                if (ax[key] < bx[key]) return -1;
                if (ax[key] > bx[key]) return 1;
                return 0;
            }
        },
        descent: function (key) {
            return function (a, b) {
                var ax = ko.toJS(a),
                    bx = ko.toJS(b);
                if (ax[key] < bx[key]) return 1;
                if (ax[key] > bx[key]) return -1;
                return 0;
            }
        }
    };

    // Model (Coffee Shop)
    function Store(s) {
        var self = this;
        self.index = ko.observable(0);
        self.name = ko.observable(s.name || ''),
        self.latlong = ko.observable(s.latlong || null);
        self.address = ko.observable(s.address || '');
        self.phone = ko.observable(s.phone || '');
        self.fax = ko.observable(s.fax || '');
        self.email = ko.observable(s.email || '');
        self.email2nd = ko.observable(s.email2nd || '');

        self.rating = ko.observable(s.rating || 0);
        self.latlng = ko.computed(function () {
            var latlong = self.latlong() ? self.latlong().split(",") : null;
            return latlong ? new google.maps.LatLng(latlong[0].trim(), latlong[1].trim()) : null;
        });
        // calculate distance from Headquarter (default meter)
        self.distance = ko.computed(function () {
            var latlng = self.latlong() ? self.latlong().split(",") : null;
            return latlng ?  google.maps.geometry.spherical.computeDistanceBetween(master.center, self.latlng()) : null;
        });
    }

    // View
    function Master() {
        var self = this;
        // google map element

        if (window.data["default"])
             self.center = new google.maps.LatLng((window.data["default"].lat ), (window.data["default"].lng));
        else self.center = new google.maps.LatLng(21.0286669, 105.85214840000003);
        self.map = new google.maps.Map(document.getElementById('gmap'), {
            zoom: 13,
            center: self.center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
        });

        // infowindow
        self.infowindow = new InfoBox({
            content: $("#infowindow").clone()[0],
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-90, -200),
            zIndex: 9999,
            boxStyle: {
                opacity: 1,
                width: "180px"
            },
            closeBoxMargin: "12px 4px 0px 0px",
            closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: true
        });

        // center marker
        self.marker_center = new google.maps.Marker({
            map: self.map,
            position: self.center,
            icon: 'https://chart.apis.google.com/chart?chst=d_map_spin&chld=0.1|1|f61|10|_|1',
            title: 'First Location',
            zIndex: -1
        });
        // direction
        self.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        self.directionsService = new google.maps.DirectionsService();

        // distance conversion list(including meter, mile) & value
        self.conversions = ko.observableArray([{
            mode: 'Km',
            unit: 'km',
            value: 0.001
        }, {
            mode: 'Mile',
            unit: 'mi',
            value: 0.000621371192
        }]);

        // selected conversion
        self.conversion = ko.observable(self.conversions()[0]);

        // selected store
        self.selected_store = ko.observable(null);

        // all store lists
        self._stores = ko.observableArray([]);

        // closest 5 store lists
        self.stores = ko.computed(function () {
            var _stores = self._stores();
            _stores.sort(sort.ascent('distance'));
            return _stores.slice(0, 125);
        });

        // create each marker & binding marker's click event
        self.store_markers = ko.computed(function () {
            var stores = self.stores();
            $.each(stores, function (index, data) {
                data.index(index + 1);
                var icon = 'https://chart.apis.google.com/chart?chst=d_map_spin&chld=0.9|1|' + MARKER_COLOR_DEFAULT + '|9|_|' + data.index();
                data.marker = new google.maps.Marker({
                    map: self.map,
                    position: data.latlng(),
                    icon: icon,
                    title: data.name(),
                    zIndex: 5 - index
                });
                google.maps.event.addListener(data.marker, 'click', function (event) {
                    self.click_conversion(data, event);
                });
            });
            if (stores.length) {
                google.maps.event.addListener(self.infowindow, 'closeclick', function () {
                    self.click_conversion(self.selected_store(), null);
                });
            }
        });

        // show direction
        self.show_direction = function () {
            var request = {
                origin: self.center,
                destination: self.selected_store().latlng(),
                travelMode: google.maps.TravelMode.DRIVING,
            };
            self.directionsDisplay.setMap(self.map);
            self.directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    self.directionsDisplay.setDirections(response);
                }
            });
        };

        // hide direction
        self.hide_direction = function () {
            self.directionsDisplay.setMap(null);
        };

        // event

        // change distance conversion
        self.click_conversion = function (data, event) {
            self.click_list(data);
            //self.conversion(data);
            self.infowindow.open(self.map, data.marker);
            self.infowindow.setContent($("#infowindow").clone()[0]); 
        };

        // select store
        self.click_list = function (data, event) {
            
            var pre_selected = self.selected_store();
            if (pre_selected) {
                pre_selected.marker.setIcon('https://chart.apis.google.com/chart?chst=d_map_spin&chld=0.9|1|' + MARKER_COLOR_DEFAULT + '|9|_|' + pre_selected.index());
            }
            if (pre_selected != data) {
                data.marker.setIcon('https://chart.apis.google.com/chart?chst=d_map_spin&chld=0.9|1|' + MARKER_COLOR_SELECTED + '|18|_|' + data.index());
                
                self.selected_store(data);
                //self.infowindow.open(self.map, data.marker);
                //self.infowindow.setContent($("#infowindow").clone()[0]);
                self.show_direction();
            } else {
                self.infowindow.close();
                self.selected_store(null);
                self.hide_direction();
            }
        };

        // initialize
        self.init = function (center) {
            if (center != undefined) {
                self.center = center;
                self.marker_center = new google.maps.Marker({
                    map: self.map,
                    position: center,
                    icon: 'https://chart.apis.google.com/chart?chst=d_map_spin&chld=0.8|1|f61|10|_|me',
                    title: 'My Location',
                    zIndex: 1
                });
                self.map.setCenter(center);
            }
            // load json
            var json = window.data;
            console.log(json);
            self._stores($.map(json.results, function (data) {
                var key = Object.keys(data);
                var rating = $.grep(key, function (val) {
                    return val.match(/rating/);
                })
                data.rating = data[rating];
                return new Store(data);
            }));

            google.maps.event.addDomListener(window, 'resize', function () {
                self.map.setCenter(self.center);
            });

            
        };
        return self;
    }
    var master = new Master();
    master.init();
    $(".map-bind-able").each(function () { ko.applyBindings(master, this);
        
    });
    window.masterMap = master;
    //$(".distributor-item .dis-text:first").trigger("click");
});