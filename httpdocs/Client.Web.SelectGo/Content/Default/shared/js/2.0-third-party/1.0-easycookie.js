jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options=$.extend({},options);options.expires=-1;}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}expires='; expires='+date.toUTCString();}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}return cookieValue;}};
/*
 * EasyCookie
 * https://www.21tools.it
 *
 */

"use strict";

(function($) {
	var acceptedCookie = function() {
		var now = new Date();
		var expires = parseInt($('#easyCookie').data('expiresdays'));
		if(!$.isNumeric(expires)) {
			expires = 180;
		}
		$.cookie('ec-accepted', now.toString(), { expires: expires, path: '/' });
		$('#easyCookie').fadeOut(500);
		loadBlockedScript();
	};

    $('#easyCookie .ec-accept').unbind('click');
	$('#easyCookie .ec-accept').on('click', function(e){
		e.preventDefault();
		acceptedCookie();
	});

	$(function(){
		if(!$.cookie('ec-accepted')) {
			$('#easyCookie').fadeIn(500);
			if($('#easyCookie').hasClass('ec-accept-on-scroll')) {
				$(window).on('scroll', function(){
					acceptedCookie();
					$(window).unbind('scroll');
				});
			}
	    } else {
	    	loadBlockedScript();
	    }
	});
}(jQuery));

function loadBlockedScript() {
	var scriptObjs = [];
	jQuery('script[data-blockscript]').each(function() {
		scriptObjs.push(jQuery(this));
	});
	for(var i = 0, script; script = scriptObjs[i]; i++) {
		var self = script;
		if(self.attr('src')) {
			jQuery.getScript(self.attr('src'), function(){});
		} else {
			self.attr('type', 'text/javascript');
			jQuery(self.data('blockscript')).append("<script type='text/javascript'>" + self.html().trim() + "</script>");
		}
	}
}
