(function ($) {
	var methods = {
		init : function (options) {
			var self = this;
			methods.setupEvents(self);
			return this;
		},		
		getResponses : function(){
			var responses = {};
			$(this).find(".dd-layer.active").each(function( key, value ) {
				var key = value.id;
				var response = $(value).find(".chosen").data("value");
				if (response)
				responses[key] = response;
			});
			return responses;
			
		},
		open: function(){
			elem = $(this)
		    elem.find('.drilldown-toggle').addClass("open");
			elem.find('.drilldown-menu').addClass("open");
			elem.find('.dd-layer').first().addClass("active");
		},
		close: function(){
			elem = $(this)
		    elem.find('.drilldown-toggle').removeClass("open");
			elem.find('.drilldown-menu').removeClass("open");
		},
		toggle: function(){
			elem = $(this)
		    elem.find('.drilldown-toggle').toggleClass("open");
			elem.find('.drilldown-menu').toggleClass("open");
		},
		removeChoice : function(dd, choice){
			choice.removeClass("chosen").siblings('.dd-choice').removeClass("notChosen");
			choice.parent(".dd-layer").nextAll('.dd-layer').removeClass("active").children('.dd-choice').removeClass("chosen notChosen");
			dd.trigger("dd-undo", {"layer":choice.parent(".dd-layer").attr("id")});
		},
		submitChoice : function(dd, choice){
			choice.addClass("chosen").siblings('.dd-choice').addClass("notChosen");
			dd.trigger("dd-chosen", {"layer":choice.parent(".dd-layer").attr("id"), "choice":choice.data("value")});
			if (choice.data("target")){
				dd.find("#"+choice.data("target")).addClass("active")
			}
			else{
				dd.trigger("dd-complete");
			}
		},
		setupEvents : function(elem){
			elem.find(".dd-choice").on("click touch",function(){
				if($(this).hasClass("chosen"))
					methods.removeChoice(elem, $(this));
				else
					methods.submitChoice(elem, $(this));
			});
			elem.find(".drilldown-toggle").on("click touch",function(){
					$(this).toggleClass("open");
					elem.find('.drilldown-menu').toggleClass("open");
					elem.find('.dd-layer').first().addClass("active");
			});

		}
	};

	$.fn.drilldown = function (method) {
		// Method calling logic
		if (methods[method] && method.charAt(0) != '_') {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.pagination');
		}
	};
})(jQuery);