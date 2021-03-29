
function headerColor() {
    var pageName = $(".barba-container").attr("data-namespace");
    $(window).on("scroll", function () {
        "top" !== pageName && $(window).scrollTop() > $(window).height() ? ($("header").addClass("js-color"), $(".back-arrow").addClass("js-color")) : ($("header").removeClass("js-color"), $(".back-arrow").removeClass("js-color"))
    })
}

jQuery(function($){
	var data = {
				"timeline": [
					{
						"startDate":"2019-06-27",
						"endDate":"2020-01-01",
						"headline":"Only text",
						"text":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
						"asset": {
							"asset":"",
							"thumbnail":"",
							"type": "",
							"caption":"",
						}
					},
					{
						"startDate":"2019-06-29",
						"endDate":"",
						"headline":"Text and image",
						"text":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
						"asset": {
							"asset":"/as-images/shared/placeholder.png",
							"thumbnail":"/as-images/shared/placeholder.png",
							"type": "image",
							"caption":"",
						}
					},
					{
						"startDate":"2019-06-30",
						"endDate":"",
						"headline":"",
						"text":"",
						"asset": {
							"asset":"/as-images/shared/placeholder.png",
							"thumbnail":"/as-images/shared/placeholder.png",
							"type": "image",
							"caption":"Only image",
						}
					},
					{
						"startDate":"2019-07-25",
						"endDate":"",
						"headline":"Text and Google maps",
						"text":"To add a Google map, only add the embed link in the media field.",
						"asset": {
							"asset":"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d38604053.539696164!2d12.480607714614377!3d53.803645794129494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sat!4v1415620468057",
							"thumbnail":"",
							"type": "google-embed",
							"caption":"Worldmap",
						}
					},
					{
						"startDate":"2019-07-27",
						"endDate":"",
						"headline":"",
						"text":"",
						"asset": {
							"asset":"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d38604053.539696164!2d12.480607714614377!3d53.803645794129494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sat!4v1415620468057",
							"thumbnail":"",
							"type": "google-embed",
							"caption":"Only Google maps",
						}
					},
					{
						"startDate":"2019-07-28",
						"endDate":"",
						"headline":"Text and Youtube video",
						"text":"For a Youtube video, only add the id of the video in the media field.",
						"asset": {
							"asset":"gRfPZpbE0Hc",
							"thumbnail":"",
							"type": "youtube-embed",
							"caption":"berlin wall fall 25 years",
						}
					},
					{
						"startDate":"2018-11-09",
						"endDate":"",
						"headline":"",
						"text":"",
						"asset": {
							"asset":"gRfPZpbE0Hc",
							"thumbnail":"",
							"type": "youtube-embed",
							"caption":"Only Youtube video, berlin wall fall 25 years",
						}
					}
				],
				"config": {
					"zoom": 1,
					"keyboardCommands": true,
					"date": {
						"language": "en",
						"format": "d M Y",
						"buttonFormat": "d.m.y"
					}
				}
			};

    $("#timeline-revision").jqueryTimeline(data);
			// TODO: display 2 timelines at the same time
	});
   

jQuery(document).ready(function ($) {
    $('.product-picture-mappings').lightGallery({
        thumbnail: false,
        thumbWidth: 80,
        thumbContHeight: 70,
        animateThumb: true,
        showThumbByDefault: true,
        getCaptionFromTitleOrAlt: true,
        fullScreen: true,
        download: true
    });
    headerColor();
    var height = $(".process-result-by-images ._album_img_detail").height() + 50;
    $('.process-result-by-images').moreContent({
        useCss: true,
        shadow:true,
        //easing:'easeOutBounce',
        speed: 250,
        height: height,
        textClose: 'Show full images',
        textOpen: 'x',
        tpl: {
         
            btn: '<button class="btn btn-light-primary" type="button"></button>',
            shadow: '<div class="mrc-shadow"></div>',
        }
    });

    $(document).ready(function () {
        $("#live-demo").vibrate({
            duration: 3000,
           // trigger: "touchstart"
        });
        $("#live-demo").trigger("click");
        $("#wordCloud").jQWCloud({
            words: [
                { word: 'Prashant', weight: 40 },
                { word: 'Sandeep', weight: 39 },
                { word: 'Ajinkya', weight: 11, color: 'green' },
                { word: 'Rishi', weight: 27 },
                { word: 'Kuldeep', weight: 36 },
                { word: 'Vivek', weight: 39 },
                { word: 'Saheer', weight: 12, color: 'green' },
                { word: 'Lohit', weight: 27 },
                { word: 'Anirudh', weight: 36 },
                { word: 'Raj', weight: 22 },
                { word: 'Mohan', weight: 40 },
                { word: 'Yadav', weight: 39 },
                { word: 'India', weight: 11, color: 'green' },
                { word: 'USA', weight: 27 },
                { word: 'Sreekar', weight: 36 },
                { word: 'Ram', weight: 39 },
                { word: 'Deepali', weight: 12, color: 'green' },
                { word: 'Kunal', weight: 27 },
                { word: 'Rishi', weight: 80 },
                { word: 'Chintan', weight: 22 }

            ],
            //cloud_color: 'yellow',		
            minFont: 10,
            maxFont: 50,
            //fontOffset: 5,
            //cloud_font_family: 'Owned',
            //verticalEnabled: false,
            padding_left: 1,
            //showSpaceDIV: true,
            //spaceDIVColor: 'white',
            word_common_classes: 'WordClass',
            word_mouseEnter: function () {
                $(this).css("text-decoration", "underline");
            },
            word_mouseOut: function () {
                $(this).css("text-decoration", "none");
            },
            word_click: function () {
                alert("You have selected:" + $(this).text());
            },
            beforeCloudRender: function () {
                date1 = new Date();
            },
            afterCloudRender: function () {
                var date2 = new Date();
                console.log("Cloud Completed in " + (date2.getTime() - date1.getTime()) + " milliseconds");
            }
        });

    });
    setTimeout(function () { window.resizeTimeline(); }, 1200);
});


var nthTabs;

$(function () {
    var titleDefault = function (title) {
        return '..:: ' + title + " ::..";
    }
    nthTabs = $("#main-tabs").nthTabs();
    nthTabs.addTab({
        id: 'home-page',
        title: titleDefault('HOME'),
        url: "https://lemeridiendanangresortspa.com/",
       
    });

    nthTabs.addTab({
        id: 'about-page',
        title: titleDefault('ABOUT US'),
        active: false,
        url: "https://lemeridiendanangresortspa.com/information.html"

    }).addTab({
        id: 'contact-page',
        title: titleDefault('CONTACT US'),
        active: false,
        url: "https://lemeridiendanangresortspa.com/contact-us.html"

    })
    .addTab({
            id: 'sitemap-page',
            title: titleDefault('SITE MAP'),
            active: false,
            allowClose: false,
            url: "https://lemeridiendanangresortspa.com/sitemap.xml"
    });
    nthTabs.setActTab('home-page');

    $("#add-all-tabs").on("click", function () {
        nthTabs.addTabs([{
            id: 'location-page',
            title: titleDefault('location'),
            url: "https://lemeridiendanangresortspa.com/location.html",
        }, {
                id: 'villas-page',
                title: titleDefault('villas'),
                active: false,
                url: "https://lemeridiendanangresortspa.com/villas"
            },
            {
                id: 'amenities-page-',
                title: titleDefault('Amenities'),
                active: false,
                url: "https://lemeridiendanangresortspa.com/amenities.html"

            }
        ]);
        $('.roll-nav-right').click();
        $('.roll-nav-fullscreen').click();
    });
    var p = $(".popup").prompt21();
    $("#add-tab-url").on("click", function () {
        p.getData(function (err, data) {
            var id = Math.ceil(Math.random() * 1000);
            nthTabs.addTab({
                id: "nth-tab-" + id,
                title: '..:: ' + data["page"].name + " ::..",
                url: data["page"].url,
                active: true,
                allowClose: true,
                location: false,
                fadeIn: true
            });
            
        });
    });

});

