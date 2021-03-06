//     Vibrate API
//     Copyright (C) 2014 Ilias Ismanalijev

//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU Affero General Public License as
//     published by the Free Software Foundation, either version 3 of the
//     License, or (at your option) any later version.

//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU Affero General Public License for more details.

//     You should have received a copy of the GNU Affero General Public License
//     along with this program.  If not, see http://www.gnu.org/licenses/

(function(){"use strict";var $;$=jQuery,$.fn.vibrate=function(options){var canVibrate,debug;if(debug=function(){},null!=options)if(null!=options.debug&&options.debug===!0&&(debug=function(msg){return console.log("Vibration : "+msg)}),"string"==typeof options)switch(options){case"short":options={duration:20},debug("Duration = 20");break;case"medium":case"default":options={duration:50},debug("Duration = 50");break;case"long":options={duration:100},debug("Duration = 100")}else"number"==typeof options&&(isNaN(options)||(options={duration:options}),debug("Duration = "+options));else options={};return canVibrate="vibrate"in navigator||"mozVibrate"in navigator,debug("Can Vibrate = "+canVibrate),canVibrate===!0?$(this).each(function(){var $this,triggerStop;return $this=$(this),$this.defaults={trigger:"click",duration:50,vibrateClass:"vibrate",debug:!1},"object"==typeof options&&($this.defaults=$.extend($this.defaults,options)),triggerStop=null,"mousedown"===$this.defaults.trigger&&(triggerStop="mouseup",debug("StopEvent = mouseup")),"touchstart"===$this.defaults.trigger&&(triggerStop="touchend",debug("StopEvent = touchend")),$this.hasClass("vibrate")||$this.addClass($this.defaults.vibrateClass),debug("Class = "+$this.defaults.vibrateClass),$this.bind($this.defaults.trigger,function(){return debug("Vibrate "+$this.defaults.duration+"ms"),"vibrate"in navigator?navigator.vibrate($this.defaults.pattern||$this.defaults.duration):"mozVibrate"in navigator?navigator.mozVibrate($this.defaults.pattern||$this.defaults.duration):void 0}),null!=triggerStop?$this.bind(triggerStop,function(){return debug("Vibrate Stop"),"vibrate"in navigator?navigator.vibrate(0):"mozVibrate"in navigator?navigator.mozVibrate(0):void 0}):void 0}):void 0}}).call(this);
//# sourceMappingURL=jquery.vibrate.min.map