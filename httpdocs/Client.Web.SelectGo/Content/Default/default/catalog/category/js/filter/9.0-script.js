// On document ready
$('.accordion-sidebar').on('shown.bs.collapse', '.panel-collapse', function () {

    shownOnRefresh = JSON.parse(localStorage.getItem('shownOnRefresh'));
    if (shownOnRefresh == null) {
        shownOnRefresh = []; // default
    }
    if ($.inArray($(this).attr('id'), shownOnRefresh) == -1) {
        shownOnRefresh.push($(this).attr('id'));
    };
    localStorage.setItem('shownOnRefresh', JSON.stringify(shownOnRefresh));
});

$('.accordion-sidebar').on('hidden.bs.collapse', '.panel-collapse', function () {

    shownOnRefresh = JSON.parse(localStorage.getItem('shownOnRefresh'));
    if (shownOnRefresh == null) {
        shownOnRefresh = []; // default
    }
    shownOnRefresh.splice($.inArray($(this).attr('id'), shownOnRefresh), 1);//remove item from array
    localStorage.setItem('shownOnRefresh', JSON.stringify(shownOnRefresh));
});

// On page refresh
var shownOnRefresh = JSON.parse(localStorage.getItem('shownOnRefresh'));

if (shownOnRefresh == null) {
    shownOnRefresh = ['filter-categories', 'filter-price', 'filter-confirmed-by', 'filter-tagspopular']; // default
}
for (var i in shownOnRefresh) {

    $('#' + shownOnRefresh[i]).addClass('show');
}



$(function () {
    // Disable dropdown dynamic positioning, so that it's easy to add animation
    $('.dropdown-toggle').dropdown({
        display: 'static'
    })

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip()

  

})


// love
var love = function () {
    $(".love").each(function () {
        $(this).find("div").html($.number($(this).find("div").html()));
        $(this).click(function () {
            var countNow = $(this).find("div").html().replace(',', '');
            if (!$(this).hasClass("active")) {
                $(this).find(".animated").remove();
                $(this).addClass("active");
                $(this).find("i").removeClass("ion-android-favorite-outline");
                $(this).find("i").addClass("ion-android-favorite");
                $(this).find("div").html(parseInt(countNow) + 1);
                $(this).find("div").html($.number($(this).find("div").html()));
                $(this).append($(this).find("i").clone().addClass("animated"));
                $(this).find("i.animated").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (e) {
                    $(this).remove();
                    $(this).off(e);
                });
                // add some code ("love")
            } else {
                $(this).find(".animated").remove();
                $(this).removeClass("active");
                $(this).find("i").addClass("ion-android-favorite-outline");
                $(this).find("i").removeClass("ion-android-favorite");
                $(this).find("div").html(parseInt(countNow) - 1);
                $(this).find("div").html($.number($(this).find("div").html()));

                // add some code ("unlove")
            }
            return false;
        });
    });
}
love();

var loadFile = function () {
    $("[data-load]").each(function () {
        var $this = $(this);

        $.ajax({
            url: $this.attr('data-load'),
            beforeSend: function () {
                $this.html('Loading data ...');
            },
            error: function (xhr) {
                $this.html("[ERROR] Status: " + xhr.status + "\nResponse Text:\n " + xhr.responseText);
            },
            success: function (data) {
                $this.html(data);
            }
        })
    });
}

loadFile();

$(function () {

    var filter = {
        categories: function () {
            $('.list-tree').metisMenu()
        },
        price: function () {
            var priceSlider = document.getElementById("price-slider")

            var priceSliderValues = [
                $('#price-slider-min'),
                $('#price-slider-max')
            ]
            var start = [priceSliderValues[0].val(), priceSliderValues[1].val()]
            var range = {
                'min': parseInt(priceSliderValues[0].attr("data-min")),
                'max': parseInt(priceSliderValues[1].attr("data-max"))
            }

            var prefix = 'US$ '
            var step = 1
            var lastfix = ' ₫'
            if (AppConfigs.UniqueSeoCode == "vi") {
                prefix = "";
                step = 1000;
                //start = [0,1000000]
            }
            else if (AppConfigs.UniqueSeoCode == "en") {
                lastfix = "";
                //range = {
                //    'min': 0,
                //    'max': 100
                //}
            }
            if (priceSlider != null) {
                noUiSlider.create(priceSlider, {
                    start: start,
                    margin: step * 1,

                    animationDuration: 300,
                    step: step,
                    connect: true,
                    range: range
                })


                priceSlider.noUiSlider.on('update', function (values, handle) {
                    priceSliderValues[handle].val(HvHelpers.formatNumber(Math.round(values[handle])));

                })

                priceSlider.noUiSlider.on('end', function (values, handle) {
                    priceSliderValues[0].attr("data-val", Math.round(values[0]));
                    priceSliderValues[1].attr("data-val", Math.round(values[1])).trigger("change");
                })
                priceSliderValues[0].bind('change', function () {

                    //priceSlider.noUiSlider.set([$(this).val().replace(prefix, '').replace(lastfix,''), null])
                })
                priceSliderValues[1].bind('change', function () {
                    //priceSlider.noUiSlider.set([null, $(this).val().replace(prefix, '').replace(lastfix, '')])
                })
            //priceSlider.trigger("update");

            }
           

        },
        confirmedBy: function () {
            if ($('.confirmed-by-list').length > 0) {
                var psConfirmedBy = new PerfectScrollbar('.confirmed-by-list', { wheelPropagation: false })
                $('#search-confirmed-by').on('keyup', function () {
                    var value = $(this).val().toLowerCase()
                    $('.confirmed-by-list .custom-control').filter(function () {
                        $(this).toggle($(this).find('label').contents().not($(this).find('label').children()).text().toLowerCase().indexOf(value) > -1)
                    })
                    psConfirmedBy.update()
                })
            }

        },

        inputHistory: function () {
            var input = $("#keyword").inputhistory()
            input.focus();

            var step = 0;
            var h1 = $(".help-1");
            var h2 = $(".help-2");
            input.on("input", function () {
                if (input.val() == "") {
                    h1.css({ "margin-top": "0px", "z-index":-1 });
                    if (step == 1) {
                        step = 0;
                    }
                } else if (step == 0) {
                    h1.css({ "margin-top": "45px", "z-index": 1 });
                    step = 1;
                }
            }).on("keydown", function (e) {
                // 13 = Enter
                // 38 = Up
                if (e.which == 13) {
                    if (step == 1) {
                        h1.css({ "opacity": 0, "z-index": -1 });
                        h2.css({ "margin-top": "45px", "z-index": 1 });
                        step = 2;
                    }
                } else if (e.which == 38) {
                    if (step == 2) {
                        h2.css({ "opacity": 0, "z-index": -1 });
                        step = 3;
                    }
                }
            });
        }
    }

    setTimeout(function () {
        filter.price()
        filter.confirmedBy()
        filter.categories()
        filter.inputHistory()

    }, 100)

    var sidebarContent = $('.accordion-sidebar.filter-action').html()
    $('#filterModal').on('show.bs.modal', function () {
        // move filter contents to modal body
        $(this).find('.modal-body').html('<div class="filter-action accordion accordion-caret accordion-sidebar accordion-modal">' + sidebarContent + '</div>')
        // empty the sidebar filter contents
        $('.accordion-sidebar:not(.accordion-modal)').html('')
        // run filters
        filter.categories()
        filter.price()
        filter.confirmedBy()

        if (window.filterAction != undefined) window.filterAction(function () {

            new Noty({
                type: 'success',
                layout: 'topCenter',

                text: '<div class="media">\
                                <i class="fa fa-bell" style="font-size: 26px;color: #fff;"></i>\
                                <div class="media-body ml-3">\
                                  <strong>' + $(".result-count").html() + '</strong>\
                                </div>\
                              </div>',
                timeout: 700
            }).show()
        });
    })
 
    $('#filterModal').on('hidden.bs.modal', function () {
        $('.accordion-modal').remove() // remove modal filter contents
        $('.accordion-sidebar').html(sidebarContent) // move filter contents back to the sidebar
        // run filters
        filter.categories()
        filter.price()
        filter.confirmedBy()
        if (window.filterAction != undefined) window.filterAction(function () {

        });
    })

})


//
/* ISOTOPE */
function adjustIsotopePrices(min, max) {

    setTimeout(function () {

    }, 1200)

}
function isotopeInit() {

    var filters = {};
    var isotopeOptions = {}; // defaults, used if not explicitly set in hash
    var defaultOptions = {
        filterBy: '',

    };
    // set up Isotope
    var isOptionLinkClicked = false;

    $('body').on('filters.reset', function () {

        adjustIsotopePrices(0, 100);
    });

    function updateActiveElements($elem) {
        var $optionSet = $elem.parents('.myFilters');
        // remove current active
        $optionSet.find('.selected').siblings("input").attr("checked", false);
        $optionSet.find('.selected').removeClass('selected');
        // set active element
        $elem.addClass('selected');
        $elem.siblings("input").attr("checked", true);
    }

    $(".filters-clear").click(function () {
        jQuery(this).blur();
        jQuery(".filters-active .filters-list li").each(function () {
            jQuery(this).trigger("click");

        });
        jQuery(".filters-active .element-header").hide();
        // reset prioe range slider
        jQuery('body').trigger('filters.reset');

    });

    // filter buttons
    $('.myFilters .isotopeFilter').click(function () {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            //return false;
        }

        updateActiveElements($this);

        var $optionSet = $this.parents('.myFilters');

        // store filter value in object
        // i.e. filters.color = 'red'

        var group = $optionSet.attr('data-option-group');
        var type = $optionSet.attr('data-option-type');

        if (type == "filterby") {
            filters[group] = $this.attr('data-option-value');
            // convert object into array
            var isoFilters = [];
            for (var prop in filters) {
                isoFilters.push(filters[prop])
            }
            var selector = isoFilters.join(',');
        }

        var option = $.deparam(type + "=" + selector, true);
        // apply new option to previous
        $.extend(isotopeOptions, option);

        // set hash, triggers hashchange on window



        return true;
    });
    var hashChanged = false;

    $(window).bind('hashchange', function (event) {
        // get options object from hash
        var hashOptions = window.location.search ? $.deparam.fragment(window.location.search.replace("?", ""), true) : {}, // do not animate first call
            aniEngine = hashChanged ? 'best-available' : 'none', // apply defaults where no option was specified
            options = $.extend({}, defaultOptions, hashOptions, { animationEngine: aniEngine });
        // apply options from hash
        // + add filter by price
        if (options["filterby"] == undefined || options["filterby"] == "all") options["filterby"] = "";
        var youselected = options["filterby"].split(',');

        jQuery(".filters-active .filters-list").html(" ");
        jQuery(".shop-list-filters .filters-active").hide();
        jQuery(".filters-active .element-header").hide();
        for (var key in youselected) {
            if (youselected[key].indexOf("sa") != -1 || youselected[key].indexOf("pa") != -1 || youselected[key].indexOf("ma") != -1) {
                var textLink = $(".myFilters").find("[data-option-value='" + youselected[key] + "']").attr("data-title");
                jQuery(".filters-active .filters-list").append("<li><div class='form-group'><label><span class='filter-value' data-filter-temp='" + youselected[key] + "'>" + textLink + "</span><button type='button' class='close' aria-hidden='true'><span aria-hidden='true' class='fa fa-times-circle' style='float:left;margin-top: -10px;color: dimgray;'></span></button></label></div></li>");
            }

        }
        // if active filters show title
        if ((jQuery(".filters-active .filters-list li").length > 0)) {
            jQuery(".filters-active .element-header").show();
            jQuery(".shop-list-filters .filters-active").show();
        }
        // remove you've selected on click and remove filter
        jQuery(".filters-active .filters-list").on('click', 'li', function () {
            var $this = jQuery(this).find(".filter-value");
            setTimeout(function () {
                //$(".myFilters").find("[data-option-value='" + $this.data("filter-temp") + "']").closest(".myFilters").find(".isotopeFilter:first").trigger("click");
                var val = $this.data("filter-temp");
                var checkBoxes = $(".myFilters").find("[data-option-value='" + val + "']").find("input");
                checkBoxes.prop("checked", false);
                checkBoxes.parent().trigger("click");

            }, 100)
            jQuery(this).css("opacity", "0.2");
        });

    }).trigger('hashchange');
}
isotopeInit();
	// isotope init end
