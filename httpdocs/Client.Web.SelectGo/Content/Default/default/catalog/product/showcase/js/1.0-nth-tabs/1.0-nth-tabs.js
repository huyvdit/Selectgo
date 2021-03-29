/**
 * nth-tabs
 * author:nethuige
 * version:2.0
 */
(function ($) {

    $.fn.nthTabs = function (options) {

        var nthTabs = this;

        var defaults = {
            allowClose: true, 
            active: true,
            location: true,
            fadeIn: true, 
            rollWidth: nthTabs.width() - 120 
        };

        var settings = $.extend({}, defaults, options);

        var handler = [];

        var frameName = 0;

        var template =
            '<div class="page-tabs">' +
            '<a href="#" class="roll-nav roll-nav-left"><span class="fa fa-angle-double-left"></span></a>' +
            '<div class="content-tabs">' +
            '<div class="content-tabs-container">' +
            '<ul class="nav nav-tabs"></ul>' +
            '</div>' +
            '</div>' +
            '<a href="#" class="roll-nav roll-nav-fullscreen" style="right: 79px;"><span class="fas fa-compress"></span></a>' +
            '<a href="#" class="roll-nav roll-nav-right"><span class="fa fa-angle-double-right"></span></a>' +
            '<div class="dropdown roll-nav right-nav-list">' +
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
            '</a>' +
            '<ul class="dropdown-menu">' +
            //'<li><a href="#" class="tab-location">Locate current tab</a></li>' +
            //'<li><a href="#" class="tab-close-current">Close the current tab</a></li>' +
            //'<li role="separator" class="divider"></li>' +
            '<li><a href="#" class="tab-close-other"> Close other tabs</a></li>' +
            '<li><a href="#" class="tab-close-all">Close all tabs</a></li>' +
            '<li class="divider"></li>' +
            '<li class="scrollbar-outer tab-list-scrollbar">' +
            '<div class="tab-list-container"><ul class="tab-list"></ul></div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="tab-content"></div>';

 
        var run = function(){
            nthTabs.html(template);
            event.onWindowsResize().onTabClose().onTabRollLeft().onTabRollRight().onTabFullscreen().onTabList()
                .onTabCloseOpt().onTabCloseAll().onTabCloseOther().onLocationTab().onTabToggle();
            return methods;
        };

   
        var methods = {

           
            getAllTabWidth: function () {
                var sum_width = 0;
                nthTabs.find('.nav-tabs li').each(function () {
                    sum_width += parseFloat($(this).width());
                });
                return sum_width;
            },

        
            getMarginStep: function () {
                return settings.rollWidth / 2;
            },

           
            getActiveId: function () {
                return nthTabs.find('li[class="active"]').find("a").attr("href").replace('#', '');
            },

       
            getTabList: function () {
                var tabList = [];
                nthTabs.find('.nav-tabs li a').each(function () {
                    tabList.push({id: $(this).attr('href'), title: $(this).children('span').html()});
                });
                return tabList;
            },

 
            addTab: function (options) {
                // nav-tab
                var tab = [];
                var active = options.active == undefined ? settings.active : options.active;
                var allowClose = options.allowClose == undefined ? settings.allowClose : options.allowClose;
                var location = options.location == undefined ? settings.location : options.location;
                var fadeIn = options.fadeIn == undefined ? settings.fadeIn : options.fadeIn;
                var url = options.url == undefined ? "" : options.url;
                tab.push('<li title="' + options.title + '" '+(allowClose ? '' : 'not-allow-close')+'>');
                tab.push('<a href="#' + options.id + '" data-toggle="tab">');
                tab.push('<span>' + options.title + '</span>');
                tab.push('</a>');
                allowClose ? tab.push('<i class="far fa-times tab-close"></i>') : '';
                tab.push('</li>');
                nthTabs.find(".nav-tabs").append(tab.join(''));
              
                var tabContent = [];
                tabContent.push('<div class="tab-pane '+(fadeIn ? 'animation-fade' : '')+'" id="' + options.id  +'" '+(allowClose ? '' : 'not-allow-close')+'>');
                if(url.length>0){
                    tabContent.push('<iframe src="'+options.url+'" frameborder="0" name="iframe-'+frameName+'" class="nth-tabs-frame"></iframe>');
                    frameName++;
                }else{
                    tabContent.push('<div class="nth-tabs-content">'+options.content+"</div>");
                }
                tabContent.push('</div>');
                nthTabs.find(".tab-content").append(tabContent.join(''));
                active && this.setActTab(options.id);
                location && this.locationTab(options.id);
               
                return this;
            },

          
            addTabs: function (tabsOptions) {
                for(var index in tabsOptions){
                    this.addTab(tabsOptions[index]);
                }
                return this;
            },

        
            locationTab: function (tabId) {
                tabId = tabId == undefined ? methods.getActiveId() : tabId;
                tabId = tabId.indexOf('#') > -1 ? tabId : '#' + tabId;
                var navTabOpt = nthTabs.find("[href='" + tabId + "']"); 
                
                var beforeTabsWidth = 0;
                navTabOpt.parent().prevAll().each(function () {
                    beforeTabsWidth += $(this).width();
                });
              
                var contentTab = navTabOpt.parent().parent().parent();
               
                if (beforeTabsWidth <= settings.rollWidth) {
                    margin_left_total = 40;
                }
              
                else{
                    margin_left_total = 40 - Math.floor(beforeTabsWidth / settings.rollWidth) * settings.rollWidth;
                }
                contentTab.css("margin-left", margin_left_total);
                return this;
            },

       
            delTab: function (tabId) {
                tabId = tabId == undefined ? methods.getActiveId() : tabId;
                tabId = tabId.indexOf('#') > -1 ? tabId : '#' + tabId;
                var navTabA = nthTabs.find("[href='" + tabId + "']");
                if(navTabA.parent().attr('not-allow-close')!=undefined) return false;
              
                if (navTabA.parent().attr('class') == 'active') {
                   
                    var activeNavTab = navTabA.parent().next();
                    var activeTabContent = $(tabId).next();
                    if (activeNavTab.length < 1) {
                        activeNavTab = navTabA.parent().prev();
                        activeTabContent = $(tabId).prev();
                    }
                    activeNavTab.addClass('active');
                    activeTabContent.addClass('active');
                }
            
                navTabA.parent().remove();
                $(tabId).remove();
                return this;
            },

            delOtherTab: function () {
                nthTabs.find(".nav-tabs li").not('[class="active"]').not('[not-allow-close]').remove();
                nthTabs.find(".tab-content div.tab-pane").not('[not-allow-close]').not('[class$="active"]').remove();
                nthTabs.find('.content-tabs-container').css("margin-left", 40); 
                return this;
            },

     
            delAllTab: function () {
                this.delOtherTab();
                this.delTab();
                return this;
            },

        
            setActTab: function (tabId) {
                tabId = tabId == undefined ? methods.getActiveId() : tabId;
                tabId = tabId.indexOf('#') > -1 ? tabId : '#' + tabId;
                nthTabs.find('.active').removeClass('active');
                nthTabs.find("[href='" + tabId + "']").parent().addClass('active');
                nthTabs.find(tabId).addClass('active');
                return this;
            },

    
            toggleTab: function (tabId) {
                this.setActTab(tabId).locationTab(tabId);
                return this;
            },

         
            isExistsTab: function (tabId) {
                tabId = tabId.indexOf('#') > -1 ? tabId : '#' + tabId;
                return nthTabs.find(tabId).length>0;
            },

          
            tabToggleHandler: function(func){
                handler["tabToggleHandler"] = func;
            }
        };

      
        var event = {

         
            onWindowsResize: function () {
                $(window).resize(function () {
                    settings.rollWidth = nthTabs.width() - 120;
                });
                return this;
            },
            
     
            onLocationTab: function () {
                nthTabs.on("click", '.tab-location', function () {
                    methods.locationTab();
                });
                return this;
            },

      
            onTabClose: function () {
                nthTabs.on("click", '.tab-close', function () {
                    var tabId = $(this).parent().find("a").attr('href');
                    
                    var navTabOpt = nthTabs.find("[href='" + tabId + "']"); 
                  
                    if(navTabOpt.parent().next().length == 0){
                        
                        var beforeTabsWidth = 0;
                        navTabOpt.parent().prevAll().each(function () {
                            beforeTabsWidth += $(this).width();
                        });
                        
                        var optTabWidth = navTabOpt.parent().width();
                        var margin_left_total = 40; 
                       
                        var contentTab = navTabOpt.parent().parent().parent();
                       
                        if (beforeTabsWidth > settings.rollWidth) {
                            var margin_left_origin = contentTab.css('marginLeft').replace('px', '');
                            margin_left_total = parseFloat(margin_left_origin) + optTabWidth + 40;
                        }
                        contentTab.css("margin-left", margin_left_total);
                    }
                    methods.delTab(tabId);
                });
                return this;
            },

           
            onTabCloseOpt: function () {
                nthTabs.on("click", '.tab-close-current', function (e) {
                    e.preventDefault();
                    methods.delTab();
                });
                return this;
            },

            onTabCloseOther: function () {
                nthTabs.on("click", '.tab-close-other', function (e) {
                    e.preventDefault();
                    methods.delOtherTab();
                });
                return this;
            },

          
            onTabCloseAll: function () {
                nthTabs.on("click", '.tab-close-all', function (e) {
                    e.preventDefault();
                    methods.delAllTab();
                });
                return this;
            },

            onTabRollLeft: function () {
                nthTabs.on("click", '.roll-nav-left', function (e) {
                    e.preventDefault();
                    var contentTab = $(this).parent().find('.content-tabs-container');
                    var margin_left_total;
                    if (methods.getAllTabWidth() <= settings.rollWidth) {
                        margin_left_total = 40;
                    }else{
                        var margin_left_origin = contentTab.css('marginLeft').replace('px', '');
                        margin_left_total = parseFloat(margin_left_origin) + methods.getMarginStep() + 40;
                    }
                    contentTab.css("margin-left", margin_left_total > 40 ? 40 : margin_left_total);
                });
                return this;
            },

            onTabRollRight: function () {
                nthTabs.on("click", '.roll-nav-right', function (e) {
                    e.preventDefault();

                    if (methods.getAllTabWidth() <= settings.rollWidth) return false; 
                    var contentTab = $(this).parent().find('.content-tabs-container');
                    var margin_left_origin = contentTab.css('marginLeft').replace('px', '');
                    var margin_left_total = parseFloat(margin_left_origin) - methods.getMarginStep();
                    if (methods.getAllTabWidth() - Math.abs(margin_left_origin) <= settings.rollWidth) return false; 
                    contentTab.css("margin-left", margin_left_total);
                });
                return this;
            },


            onTabFullscreen: function () {
                function getreqfullscreen() {
                    var root = document.documentElement
                    return root.requestFullscreen || root.webkitRequestFullscreen || root.mozRequestFullScreen || root.msRequestFullscreen
                }
                var globalreqfullscreen = getreqfullscreen() // get supported version of requestFullscreen()
                function getexitfullscreen() {
                    return document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen
                }
                var globalexitfullscreen = getexitfullscreen() // get supported version of document.exitFullscreen()

             
                function getfullscreenelement() {
                    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
                }

                nthTabs.on("click", '.roll-nav-fullscreen', function (e) {
                    e.preventDefault();
                    var target = document.getElementById("main-tabs");
    
                    if (getfullscreenelement() == null) { // if browser is currently not in full screen
                        globalreqfullscreen.call(target);
                        $(".roll-nav-fullscreen span").removeClass("fa-compress").addClass("fa-compress-arrows-alt");
                    }
                    else {
                        globalexitfullscreen.call(document);
                        $(".roll-nav-fullscreen span").removeClass("fa-compress-arrows-alt").addClass("fa-compress");
                    }
                });
                return this;
            },
    
            onTabList: function () {
                nthTabs.on("click", '.right-nav-list', function (e) {
                    e.preventDefault();
                    var tabList = methods.getTabList();
                    var html = [];
                    $.each(tabList, function (key, val) {
                        html.push('<li class="toggle-tab" data-id="' + val.id + '">' + val.title + '</li>');
                    });
                    nthTabs.find(".tab-list").html(html.join(''));
                });
                nthTabs.find(".tab-list-scrollbar").scrollbar();
                this.onTabListToggle();
                return this;
            },

            onTabListToggle: function (e) {
                nthTabs.on("click", '.toggle-tab', function (e) {
                    e.preventDefault();
                    var tabId = $(this).data("id");
                    methods.setActTab(tabId).locationTab(tabId);
                });
               
                nthTabs.on('click','.scroll-element',function (e) {
                    e.stopPropagation();
                });
                return this;
            },

            onTabToggle: function(){
                nthTabs.on("click", '.nav-tabs li', function (e) {
                    e.preventDefault();
                    var lastTabText = nthTabs.find(".nav-tabs li a[href='#" + methods.getActiveId() + "'] span").text();
                    if (handler["tabToggleHandler"] != undefined)
                    handler["tabToggleHandler"]({
                        last:{
                            tabId:methods.getActiveId(),
                            tabText:lastTabText
                        },
                        active:{
                            tabId:$(this).find("a").attr("href").replace('#',''),
                            tabText:$(this).find("a span").text()
                        }
                    });
                });
            }
        };
        return run();
    }
})(jQuery);