(function ($) {
    $(document).ready(function () {

        //Activate focus points
        $('.focuspoint').focusPoint();

    });
}(jQuery));

(function ($) {
	$(document).ready(function() {
		"use strict";

		//$(".project-box").hover(function () {
  //      // change hovered div background to yellow:
  //       $(".works").css("background-color", $(this).data('bg'));
  //      // loop through the rest of the divs with the same class:
  //      $(".works").not(this).each(function(){
  //          // change their background color according to their 'data-color' attribute:
  //          $(this).css("background-color", $(this).data('bg'));
  //      });
  //     // set hover out method:
  //  }, function(){
  //      // change each 'box' background color to default:
  //      $(".works").css("background-color", '');
  //  });	
		

        /* BOOTSTRAP TABS CHANGING FROM URL */

        (function () {
            var url = document.location.toString();

            if (url.match("#") && !url.match("#&")) {
                var window_hash = window.location.hash;
                if (jQuery("'"+window_hash+"'", '.tabs').length) {
                    jQuery('.tabs .nav-tabs a[href="' + window_hash + '"]').tab('show');
                }
            }

            jQuery('a[href^="#"]').not('.nav-tabs a').on('click', function (e) {
                e.preventDefault();
                var $this = jQuery(this);
                if (!($this.attr("href") != "#")) {
                    var link_hash = '#' + jQuery(this).attr('href').split('#')[1];

                    if (jQuery(link_hash, '.tabs').length) {
                        jQuery('.tabs .nav-tabs a[href="' + link_hash + '"]').tab('show');
                        jQuery('html, body').animate({
                            scrollTop: jQuery('.tabs').offset().top
                        }, 300);
                    }
                }
            });

            jQuery('.tabs .nav-tabs a').on('click', function (e) {
                window.location.hash = e.target.hash;
            });
        })();
    /* !BOOTSTRAP TABS CHANGING FROM URL */

        //jQuery('a[href^="#"]').on('click', function (e) {
        //    e.preventDefault();
        //    var $this = jQuery(this);
        //    var hash = $this.attr('href').split('#')[1];
        //    if (jQuery("#" + hash).length > 0) {
        //        HvHelpers.scrollTo("#" + hash, 72);
        //        window.location.hash = hash;
        //    }
        //    return false;
        //});
       
        new funtabify($(document).attr('title') + "[I Miss You]");

		// TYPEWRITER
			$("#typewriter").typewriter({
				prefix : "",
				text : ["Please wait", "Still loading", "Almost done"],
				typeDelay : 100,
				waitingTime : 1500,
				blinkSpeed : 800
			});
		
        // HAMBURGER AUDIO
        if ($(("hamburger-menu")).length > 0)
		document.getElementById("hamburger-menu").addEventListener('click', function(e) {
			document.getElementById("hamburger-hover").play();
	  	});
		
		
	
		// DATA BACKGROUND IMAGE
			var pageSection = $(".bg-image");
			pageSection.each(function(indx){
				if ($(this).attr("data-background")){
					$(this).css("background-image", "url(" + $(this).data("background") + ")");
				}
			});
	
	
        function Click_menu_hover() {
            if ($('.mega_menu').length) {
                $.fn.tab = function (options) {
                    var opts = $.extend({}, $.fn.tab.defaults, options);
                    return this.each(function () {
                        var obj = $(this);

                        $(obj).find('.tabHeader li').on(opts.trigger_event_type, function () {
                            $(obj).find('.tabHeader li').removeClass('active');
                            $(this).addClass('active');

                            $(obj).find('.tabContent .tab-pane').removeClass('active show');
                            $(obj).find('.tabContent .tab-pane').eq($(this).index()).addClass('active show');

                        })
                    });
                }
                $.fn.tab.defaults = {
                    trigger_event_type: 'click', //mouseover | click é»˜è®¤æ˜¯click
                };
            }
        }
        Click_menu_hover();

        function Tab_menu_activator() {
            if ($('.mega_menu').length) {
                $('.mega_menu').tab({
                    trigger_event_type: 'mouseover'
                });
            }
        }
        Tab_menu_activator();

		// HAMBURGER MENU
		$('.hamburger').on('click', function(e) {
			if ($(".navigation-menu").hasClass("active")) {
				$(".hamburger").toggleClass("open");
				$("body").toggleClass("overflow");
				$(".navigation-menu").removeClass("active");
				$(".navigation-menu .inner .menu").css("transition-delay", "0s");
				$(".navigation-menu .inner blockquote").css("transition-delay", "0s");
                $(".navigation-menu .bg-layers span").css("transition-delay", "0.3s");
                $(".cd-main-header").removeClass("menu-is-visible");
			} else
			{
				$(".navigation-menu").addClass('active');
				$(".hamburger").toggleClass("open");
				$("body").toggleClass("overflow");
				$(".navigation-menu.active .inner .menu").css("transition-delay", "0.45s");
				$(".navigation-menu.active .inner blockquote").css("transition-delay", "0.50s");
                $(".navigation-menu .bg-layers span").css("transition-delay", "0s");
                
                $(".cd-main-header").addClass("menu-is-visible");
			}
			$(this).toggleClass("active");
		});
		

        var soundEffects = false;
      
        // ------------------------------
        // SOUND EFFECTS
        soundEffects = $("html").hasClass("sound-effects");

        if (soundEffects) {
            window.tick = document.createElement("audio");
            window.tick.setAttribute("src", $("html").data("audio-tick"));
        }
		
		// PAGE TRANSITION
        $('body .navbar a:not(.no-follow)').on('click', function(e) {

            // Play Sound Effect
            if (soundEffects) {
                window.tick.play();
            }

			if (typeof $( this ).data('fancybox') == 'undefined') {
			e.preventDefault(); 
			var url = this.getAttribute("href"); 
			if( url.indexOf('#') != -1 ) {
			var hash = url.substring(url.indexOf('#'));

            if (hash!= "#" && $('body ' + hash ).length != 0 ){
			$('.transition-overlay').removeClass("active");
			$(".hamburger").toggleClass("open");
			$("body").toggleClass("overflow");
			$(".navigation-menu").removeClass("active");
			$(".navigation-menu .inner ul").css("transition-delay", "0s");
			$(".navigation-menu .inner blockquote").css("transition-delay", "0s");
			$(".navigation-menu .bg-layers span").css("transition-delay", "0.3s");

			$('html, body').animate({
			        scrollTop: $(hash).offset().top
			}, 1000);

			}
			}
			else {
			    $('.transition-overlay').toggleClass("active");
			    setTimeout(function(){
		     	    window.location = url;
			    },1200); 

			}
			}
			});
		
		
		// PAGE HEADER FADE
        var divs = $('header.header-desktop-fluid');
			$(window).on('scroll', function() {
				var st = $(this).scrollTop();
				divs.css({ 'opacity' : (1 - st/700) });
				divs.css({ 'transition-delay' : ("0s") });
				divs.css({ 'transition' : ("0.05s ease-in-out") });
			});

        $('.full-screen-wrap').on('click', function () {
            $(this).toggleClass('active');
            toggleFullScreen();
        });


        // TOGGLE FULSCREEN
        function toggleFullScreen() {
            if (!document.fullscreenElement &&    // alternative standard method
                !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }

    // ------------------------------

        // ------------------------------
        // MOUSE CLCIK RIPPLE EFFECT
        if ($('html').data("click-ripple-animation") === "yes") {
            $("html").append('<i class="ripple"></i>');
            $("html").on("mousedown", function (e) {
                $("i.ripple").addClass("active").css("left", e.pageX).css("top", e.pageY);
            });

            $("i.ripple").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                return $("i.ripple").removeClass("active");
            });
        }
		
		
		});
	// END JQUERY	
	
		// WOW ANIMATION 
			wow = new WOW(
				{
					animateClass: 'animated',
					offset:       0
				}
				);
			wow.init();


	
		// PRELOADER
			$(window).load(function(){
                $("body").addClass("page-loaded");	
                $("body").find(".preloader").remove();
			});
	
		// COUNTER
			// $(document).scroll(function(){
			//	$('.odometer').each( function () {
			//		var parent_section_postion = $(this).closest('section').position();
			//		var parent_section_top = parent_section_postion.top;
			//		if ($(document).scrollTop() > parent_section_top - 300) {
			//			if ($(this).data('status') == 'yes') {
			//				$(this).html( $(this).data('count') );
			//				$(this).data('status', 'no')
			//			}
			//		}
			//	});
			//});

    if ($(".browse-letters").length > 0) {
        $.each($(".browse-letters a"), function (k, v) {
            $(v).attr("href", "/en/search/?key=" + $(v).text().toString().toLowerCase() + "&scope=*&select-category=all-categories").attr("target","_blank");
        });
    }
   

	
})(jQuery);	

(function ($) {
    
    //$("body").niceScroll({
    //    scrollspeed: 1, // scrolling speed
    //    mousescrollstep: 100, // scrolling speed with mouse wheel (pixel)
    //});  // The document page (body)

    //new slimScroll(document.querySelectorAll('body')[0], {
    //    'wrapperClass': 'scroll-wrapper unselectable mac',
    //    'scrollBarContainerClass': 'scrollBarContainer',
    //    'scrollBarContainerSpecialClass': 'animate',
    //    'scrollBarClass': 'scroll',
    //    'keepFocus': false
    //});

    //$('#modal-recent-work .modal-content').overlayScrollbars({
    //    className: "os-theme-round-light"});

    //returns a array with all instances which are not undefined and applied to a div-tag-element
    var instances = $("main div.overlay-scrollbars").overlayScrollbars({ className: "os-theme-round-light"});
    $.each(instances, function (index, instance) {
        //check for validity
        if (instance !== undefined) {
            //do domething with the instance
        }
    });

    if ($("body").hasClass("smooth-scroll")) {
        var elem = document.querySelector("#content-scroll");
        var scrollbar = Scrollbar.init(elem,
            {
                renderByPixels: true,
                damping: 0.05
            });
    }

    //var Scrollbar = window.Scrollbar;

    //Scrollbar.init(document.querySelector('#my-scrollbar'));

    //Scrollbar.init(document.querySelector("#main-scrollbar"), {});

    // <iframe id="boxscroll3" src="iframe/lgpl-3.0-standalone.html" height="100%" width="100%" frameborder="0" onload="$(this).height($(this).contents().height());"></iframe>

    //$("#modal-recent-work").niceScroll(".modal-content", { cursorcolor: "#F00", cursoropacitymax: 0.7, boxzoom: true, touchbehavior: true });  // Second scrollable DIV
})(jQuery);

(function ($) {
    //Author: Brady Sammons
    //URL: www.bradysammons.com
    /* -------------------------------------------------------- */
	/*	//set Global variables
	/* -------------------------------------------------------- */
    var cards = $(".card-drop"),
        toggler = cards.find(".toggle"),
        links = cards.find("ul>li>a"),
        li = links.parent('li'),
        count = links.length,
        width = 100;

    //set z-Index of drop Items
    li.each(function (i) {
        $(this).css("z-index", count - i); //invert the index values
    });

    //set top margins & widths of li elements
    function setClosed() {
        li.each(function (index) {
            $(this).css("top", index * 4)
                .css("width", (width - index * .5) + "%")
                .css("margin-left", (index * .25) + "%")
        });
        li.addClass('closed');
        toggler.removeClass("active");
    }
    setClosed();

    /* -------------------------------------------------------- */
	/*	Toggler Click handler
	/* -------------------------------------------------------- */
    toggler.on("mousedown", function () {
        var $this = $(this); //cache $(this)
        //if the menu is active:
        if ($this.is(".active")) {
            setClosed();
        } else {
            //if the menu is un-active:
            $this.addClass("active");
            li.removeClass('closed');
            //set top margins
            li.each(function (index) {
                $(this).css("top", 30 * (index + 1))
                    .css("width", "100%")
                    .css("margin-left", "0px");
            });
        }
    });

    /* -------------------------------------------------------- */
	/*	Links Click handler
	/* -------------------------------------------------------- */
    links.on("click", function (e) {
        var $this = $(this),
            label = $this.data("label");
        icon = $this.children("i").attr("class");

        li.removeClass('active');
        if ($this.parent("li").is("active")) {
            $this.parent('li').removeClass("active");
        } else {
            $this.parent("li").addClass("active");
        }
        toggler.children("span").text(label);
        toggler.children("i").removeClass().addClass(icon);
        setClosed();
        e.preventDefault;
    });

})(jQuery);


jQuery(document).ready(function () {
    var screen_width = $(window).width();

    //if (screen_width <= 768) {
        $('.js_pull').click(function () {
            $('.js_pull .__pull, header.header-mobile-fluid, ._coating_mobile, ._hotline').toggleClass('change');
            $('.js_pull .open_close').toggleClass('not_active');
        });
        $('._coating_mobile').click(function () {
            $('.js_pull .__pull, header.header-mobile-fluid, ._coating_mobile, ._hotline').toggleClass('change');
            $('.js_pull .open_close').toggleClass('not_active');
        });

        $('#js_menu>li>a').click(function () {
            var a = $(this).parent().find('ul').first().slideToggle(300);
            $(this).parent().siblings().find('ul').slideUp(300);
        });

        $('#js_select').click(function () {
            $('#_mutliSelect').toggleClass('active_lang');
        });

        $(document).bind('click', function (e) {
            var $clicked = $(e.target);
            if (!$clicked.parents().hasClass("_language")) $("#_mutliSelect").removeClass(
                'active_lang');
        });

        $('[data-lang]').click(function () {
            var data_lang = $(this).attr('data-lang');
            var data_selected = $('[data-lang= "' + data_lang + '"]');
            $(data_selected).siblings().removeClass('_selected');
            $(data_selected).addClass('_selected');
            var text = $(data_selected).text();
            $('#multiSel span').text(text);
            $('#_mutliSelect').removeClass('active_lang');
        });
   //}
    
});


jQuery(document).ready(function ($) {

    if ($('.cd-search-trigger').length == 0) return;

    var resizing = false,
        navigationWrapper = $('.cd-main-nav-wrapper'),
        navigation = navigationWrapper.children('.cd-main-nav'),
        searchForm = $('.cd-main-search'),
        pageContent = $('.cd-main-content'),
        searchTrigger = $('.cd-search-trigger'),
        coverLayer = $('.cd-cover-layer'),
        navigationTrigger = $('.cd-nav-trigger'),
        mainHeader = $('.cd-main-header');

    function checkWindowWidth() {
        var mq = window.getComputedStyle(mainHeader.get(0), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
        return mq;
    }

    function checkResize() {
        if (!resizing) {
            resizing = true;
            (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
        }
    }

    function moveNavigation() {
        var screenSize = checkWindowWidth();
        if (screenSize == 'desktop' && (navigationTrigger.siblings('.cd-main-search').length == 0)) {
            //desktop screen - insert navigation and search form inside <header>
            //searchForm.detach().insertBefore(navigationTrigger);
           // navigationWrapper.detach().insertBefore(searchForm).find('.cd-serch-wrapper').remove();
        } else if (screenSize == 'mobile' && !(mainHeader.children('.cd-main-nav-wrapper').length == 0)) {
            //mobile screen - move navigation and search form after .cd-main-content element
            navigationWrapper.detach().insertAfter('.cd-main-content');
            var newListItem = $('<li class="cd-serch-wrapper"></li>');
            searchForm.detach().appendTo(newListItem);
            newListItem.appendTo(navigation);
        }

        resizing = false;
    }

    function closeSearchForm() {
        searchTrigger.removeClass('search-form-visible');
        searchForm.removeClass('is-visible');
        coverLayer.removeClass('search-form-visible');
    }

   
    //move navigation and search form elements according to window width
    moveNavigation();
    $(window).on('resize', checkResize);

    //mobile version - open/close navigation
    navigationTrigger.on('click', function (event) {
        event.preventDefault();
        mainHeader.add(navigation).add(pageContent).toggleClass('nav-is-visible');
    });

    searchTrigger.on('click', function (event) {
        event.preventDefault();
        if (searchTrigger.hasClass('search-form-visible')) {
            searchForm.find('form').submit();
        } else {
            searchTrigger.addClass('search-form-visible');
            coverLayer.addClass('search-form-visible');
            searchForm.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                searchForm.find('input[type="search"]').focus().end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            });
        }
    });

    //close search form
    searchForm.on('click', '.close', function () {
        closeSearchForm();
    });

    coverLayer.on('click', function () {
        closeSearchForm();
    });

    $(document).keyup(function (event) {
        if (event.which == '27') closeSearchForm();
    });

    //upadate span.selected-value text when user selects a new option
    searchForm.on('change', 'select', function () {
        searchForm.find('.selected-value').text($(this).children('option:selected').text());
    });
});

(function ($) {
    $.fn.footerMenu = function () {
        //var h = $(".footer-height").offset().top - 500;
        //$(window).scroll(function () {
        //    if ($(document).scrollTop() > ($(".footer-height").offset().top - 500)) {
        //        $('.footer').addClass("show");
        //    } else {
        //        $('.footer').removeClass("show");
        //    }
        //});
    };
    $.fn.footerMenu();
})(jQuery);

Pace.options = {
    document: false
}