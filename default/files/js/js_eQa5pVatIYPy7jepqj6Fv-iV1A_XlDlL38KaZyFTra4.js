/*!
 * jQuery UI 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.11",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,
"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");
if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,
"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,
d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}});
c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&
b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;
/*!
 * jQuery UI Widget 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;
/*
 * jQuery UI Progressbar 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(b,d){b.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();b.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===d)return this._value();this._setOption("value",a);return this},_setOption:function(a,c){if(a==="value"){this.options.value=c;this._refreshValue();this._value()===this.options.max&&this._trigger("complete")}b.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;if(typeof a!=="number")a=0;return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*
this._value()/this.options.max},_refreshValue:function(){var a=this.value(),c=this._percentage();if(this.oldValue!==a){this.oldValue=a;this._trigger("change")}this.valueDiv.toggleClass("ui-corner-right",a===this.options.max).width(c.toFixed(0)+"%");this.element.attr("aria-valuenow",a)}});b.extend(b.ui.progressbar,{version:"1.8.11"})})(jQuery);
;
/*!
 * jQuery UI Mouse 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b){b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=
a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,e=a.which==1,f=typeof this.options.cancel=="string"?b(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=
this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(d){return c._mouseMove(d)};this._mouseUpDelegate=function(d){return c._mouseUp(d)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return a.originalEvent.mouseHandled=
true}},_mouseMove:function(a){if(b.browser.msie&&!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;
/*
 * jQuery UI Sortable 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){this.containerCache={};this.element.addClass("ui-sortable");
this.refresh();this.floating=this.items.length?/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(a,b){if(a==="disabled"){this.options[a]=
b;this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")}else d.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(a,b){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(a);var c=null,e=this;d(a.target).parents().each(function(){if(d.data(this,"sortable-item")==e){c=d(this);return false}});if(d.data(a.target,"sortable-item")==e)c=d(a.target);if(!c)return false;if(this.options.handle&&!b){var f=false;
d(this.options.handle,c).find("*").andSelf().each(function(){if(this==a.target)f=true});if(!f)return false}this.currentItem=c;this._removeCurrentsFromItems();return true},_mouseStart:function(a,b,c){b=this.options;var e=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-
this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();b.containment&&this._setContainment();if(b.cursor){if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");d("body").css("cursor",b.cursor)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(this.scrollParent[0]!=
document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("activate",a,e._uiHash(this));if(d.ui.ddmanager)d.ui.ddmanager.current=this;d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);
return true},_mouseDrag:function(a){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var b=this.options,c=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<
b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else{if(a.pageY-d(document).scrollTop()<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()-
b.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()+b.scrollSpeed);if(a.pageX-d(document).scrollLeft()<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed)}c!==false&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,
a)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(b=this.items.length-1;b>=0;b--){c=this.items[b];var e=c.item[0],f=this._intersectsWithPointer(c);if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],
e):true)){this.direction=f==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(c))this._rearrange(a,c);else break;this._trigger("change",a,this._uiHash());break}}this._contactContainers(a);d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(a,b){if(a){d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this;b=c.placeholder.offset();
c.reverting=true;d(this.helper).animate({left:b.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:b.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return false}},cancel:function(){var a=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):
this.currentItem.show();for(var b=this.containers.length-1;b>=0;b--){this.containers[b]._trigger("deactivate",null,a._uiHash(this));if(this.containers[b].containerCache.over){this.containers[b]._trigger("out",null,a._uiHash(this));this.containers[b].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();d.extend(this,{helper:null,
dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):d(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};d(b).each(function(){var e=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);if(e)c.push((a.key||e[1]+"[]")+"="+(a.key&&a.expression?e[1]:e[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},
toArray:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};b.each(function(){c.push(d(a.item||this).attr(a.attribute||"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,e=this.positionAbs.top,f=e+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,k=i+a.height,j=this.offset.click.top,l=this.offset.click.left;j=e+j>i&&e+j<k&&b+l>g&&b+l<h;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||
this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:g<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<h&&i<e+this.helperProportions.height/2&&f-this.helperProportions.height/2<k},_intersectsWithPointer:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);b=b&&a;a=this._getDragVerticalDirection();
var c=this._getDragHorizontalDirection();if(!b)return false;return this.floating?c&&c=="right"||a=="down"?2:1:a&&(a=="down"?2:1)},_intersectsWithSides:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width);var c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?e=="right"&&a||e=="left"&&!a:c&&(c=="down"&&b||c=="up"&&!b)},
_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){var b=[],c=[],e=this._connectWith();
if(e&&a)for(a=e.length-1;a>=0;a--)for(var f=d(e[a]),g=f.length-1;g>=0;g--){var h=d.data(f[g],"sortable");if(h&&h!=this&&!h.options.disabled)c.push([d.isFunction(h.options.items)?h.options.items.call(h.element):d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
this]);for(a=c.length-1;a>=0;a--)c[a][0].each(function(){b.push(this)});return d(b)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(a){this.items=[];this.containers=[this];var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):d(this.options.items,this.element),
this]],e=this._connectWith();if(e)for(var f=e.length-1;f>=0;f--)for(var g=d(e[f]),h=g.length-1;h>=0;h--){var i=d.data(g[h],"sortable");if(i&&i!=this&&!i.options.disabled){c.push([d.isFunction(i.options.items)?i.options.items.call(i.element[0],a,{item:this.currentItem}):d(i.options.items,i.element),i]);this.containers.push(i)}}for(f=c.length-1;f>=0;f--){a=c[f][1];e=c[f][0];h=0;for(g=e.length;h<g;h++){i=d(e[h]);i.data("sortable-item",a);b.push({item:i,instance:a,width:0,height:0,left:0,top:0})}}},refreshPositions:function(a){if(this.offsetParent&&
this.helper)this.offset.parent=this._getParentOffset();for(var b=this.items.length-1;b>=0;b--){var c=this.items[b],e=this.options.toleranceElement?d(this.options.toleranceElement,c.item):c.item;if(!a){c.width=e.outerWidth();c.height=e.outerHeight()}e=e.offset();c.left=e.left;c.top=e.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=this.containers.length-1;b>=0;b--){e=this.containers[b].element.offset();this.containers[b].containerCache.left=
e.left;this.containers[b].containerCache.top=e.top;this.containers[b].containerCache.width=this.containers[b].element.outerWidth();this.containers[b].containerCache.height=this.containers[b].element.outerHeight()}return this},_createPlaceholder:function(a){var b=a||this,c=b.options;if(!c.placeholder||c.placeholder.constructor==String){var e=c.placeholder;c.placeholder={element:function(){var f=d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!e)f.style.visibility="hidden";return f},update:function(f,g){if(!(e&&!c.forcePlaceholderSize)){g.height()||g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10));g.width()||g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);
c.placeholder.update(b,b.placeholder)},_contactContainers:function(a){for(var b=null,c=null,e=this.containers.length-1;e>=0;e--)if(!d.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!(b&&d.ui.contains(this.containers[e].element[0],b.element[0]))){b=this.containers[e];c=e}}else if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",a,this._uiHash(this));this.containers[e].containerCache.over=0}if(b)if(this.containers.length===
1){this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}else if(this.currentContainer!=this.containers[c]){b=1E4;e=null;for(var f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[c].floating?"left":"top"];if(Math.abs(h-f)<b){b=Math.abs(h-f);e=this.items[g]}}if(e||this.options.dropOnEmpty){this.currentContainer=
this.containers[c];e?this._rearrange(a,e,null,true):this._rearrange(a,null,this.containers[c].element,true);this._trigger("change",a,this._uiHash());this.containers[c]._trigger("change",a,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}}},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):
b.helper=="clone"?this.currentItem.clone():this.currentItem;a.parents("body").length||d(b.appendTo!="parent"?b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);if(a[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(a[0].style.width==""||b.forceHelperSize)a.width(this.currentItem.width());if(a[0].style.height==
""||b.forceHelperSize)a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=
this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),
10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions=
{width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||
document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)){var b=d(a.containment)[0];a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,
b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=
document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():
e?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();var f=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-
this.offset.click.left<this.containment[0])f=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<
this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/b.grid[0])*b.grid[0];f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&
this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())}},_rearrange:function(a,b,c,e){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling);this.counter=
this.counter?++this.counter:1;var f=this,g=this.counter;window.setTimeout(function(){g==f.counter&&f.refreshPositions(!e)},0)},_clear:function(a,b){this.reverting=false;var c=[];!this._noFinalSort&&this.currentItem[0].parentNode&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();
this.fromOutside&&!b&&c.push(function(f){this._trigger("receive",f,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!b)c.push(function(f){this._trigger("update",f,this._uiHash())});if(!d.ui.contains(this.element[0],this.currentItem[0])){b||c.push(function(f){this._trigger("remove",f,this._uiHash())});for(e=this.containers.length-1;e>=0;e--)if(d.ui.contains(this.containers[e].element[0],
this.currentItem[0])&&!b){c.push(function(f){return function(g){f._trigger("receive",g,this._uiHash(this))}}.call(this,this.containers[e]));c.push(function(f){return function(g){f._trigger("update",g,this._uiHash(this))}}.call(this,this.containers[e]))}}for(e=this.containers.length-1;e>=0;e--){b||c.push(function(f){return function(g){f._trigger("deactivate",g,this._uiHash(this))}}.call(this,this.containers[e]));if(this.containers[e].containerCache.over){c.push(function(f){return function(g){f._trigger("out",
g,this._uiHash(this))}}.call(this,this.containers[e]));this.containers[e].containerCache.over=0}}this._storedCursor&&d("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!b){this._trigger("beforeStop",a,this._uiHash());for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}return false}b||
this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!b){for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){d.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},_uiHash:function(a){var b=a||this;return{helper:b.helper,placeholder:b.placeholder||d([]),position:b.position,
originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}});d.extend(d.ui.sortable,{version:"1.8.11"})})(jQuery);
;
/*1.5.6*/
(function(){var f=0,l=[],n={},j={},a={"<":"lt",">":"gt","&":"amp",'"':"quot","'":"#39"},m=/[<>&\"\']/g,b,c=window.setTimeout,d={},e;function h(){this.returnValue=false}function k(){this.cancelBubble=true}(function(o){var p=o.split(/,/),q,s,r;for(q=0;q<p.length;q+=2){r=p[q+1].split(/ /);for(s=0;s<r.length;s++){j[r[s]]=p[q]}}})("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe");var g={VERSION:"1.5.6",STOPPED:1,STARTED:2,QUEUED:1,UPLOADING:2,FAILED:4,DONE:5,GENERIC_ERROR:-100,HTTP_ERROR:-200,IO_ERROR:-300,SECURITY_ERROR:-400,INIT_ERROR:-500,FILE_SIZE_ERROR:-600,FILE_EXTENSION_ERROR:-601,IMAGE_FORMAT_ERROR:-700,IMAGE_MEMORY_ERROR:-701,IMAGE_DIMENSIONS_ERROR:-702,mimeTypes:j,ua:(function(){var s=navigator,r=s.userAgent,t=s.vendor,p,o,q;p=/WebKit/.test(r);q=p&&t.indexOf("Apple")!==-1;o=window.opera&&window.opera.buildNumber;return{windows:navigator.platform.indexOf("Win")!==-1,android:/Android/.test(r),ie:!p&&!o&&(/MSIE/gi).test(r)&&(/Explorer/gi).test(s.appName),webkit:p,gecko:!p&&/Gecko/.test(r),safari:q,opera:!!o}}()),typeOf:function(p){return({}).toString.call(p).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},extend:function(o){g.each(arguments,function(p,q){if(q>0){g.each(p,function(s,r){o[r]=s})}});return o},cleanName:function(o){var p,q;q=[/[\300-\306]/g,"A",/[\340-\346]/g,"a",/\307/g,"C",/\347/g,"c",/[\310-\313]/g,"E",/[\350-\353]/g,"e",/[\314-\317]/g,"I",/[\354-\357]/g,"i",/\321/g,"N",/\361/g,"n",/[\322-\330]/g,"O",/[\362-\370]/g,"o",/[\331-\334]/g,"U",/[\371-\374]/g,"u"];for(p=0;p<q.length;p+=2){o=o.replace(q[p],q[p+1])}o=o.replace(/\s+/g,"_");o=o.replace(/[^a-z0-9_\-\.]+/gi,"");return o},addRuntime:function(o,p){p.name=o;l[o]=p;l.push(p);return p},guid:function(){var o=new Date().getTime().toString(32),p;for(p=0;p<5;p++){o+=Math.floor(Math.random()*65535).toString(32)}return(g.guidPrefix||"p")+o+(f++).toString(32)},buildUrl:function(p,o){var q="";g.each(o,function(s,r){q+=(q?"&":"")+encodeURIComponent(r)+"="+encodeURIComponent(s)});if(q){p+=(p.indexOf("?")>0?"&":"?")+q}return p},each:function(r,s){var q,p,o;if(r){q=r.length;if(q===b){for(p in r){if(r.hasOwnProperty(p)){if(s(r[p],p)===false){return}}}}else{for(o=0;o<q;o++){if(s(r[o],o)===false){return}}}}},formatSize:function(o){if(o===b||/\D/.test(o)){return g.translate("N/A")}if(o>1073741824){return Math.round(o/1073741824,1)+" GB"}if(o>1048576){return Math.round(o/1048576,1)+" MB"}if(o>1024){return Math.round(o/1024,1)+" KB"}return o+" b"},getPos:function(p,t){var u=0,s=0,w,v=document,q,r;p=p;t=t||v.body;function o(C){var A,B,z=0,D=0;if(C){B=C.getBoundingClientRect();A=v.compatMode==="CSS1Compat"?v.documentElement:v.body;z=B.left+A.scrollLeft;D=B.top+A.scrollTop}return{x:z,y:D}}if(p&&p.getBoundingClientRect&&g.ua.ie&&(!v.documentMode||v.documentMode<8)){q=o(p);r=o(t);return{x:q.x-r.x,y:q.y-r.y}}w=p;while(w&&w!=t&&w.nodeType){u+=w.offsetLeft||0;s+=w.offsetTop||0;w=w.offsetParent}w=p.parentNode;while(w&&w!=t&&w.nodeType){u-=w.scrollLeft||0;s-=w.scrollTop||0;w=w.parentNode}return{x:u,y:s}},getSize:function(o){return{w:o.offsetWidth||o.clientWidth,h:o.offsetHeight||o.clientHeight}},parseSize:function(o){var p;if(typeof(o)=="string"){o=/^([0-9]+)([mgk]?)$/.exec(o.toLowerCase().replace(/[^0-9mkg]/g,""));p=o[2];o=+o[1];if(p=="g"){o*=1073741824}if(p=="m"){o*=1048576}if(p=="k"){o*=1024}}return o},xmlEncode:function(o){return o?(""+o).replace(m,function(p){return a[p]?"&"+a[p]+";":p}):o},toArray:function(q){var p,o=[];for(p=0;p<q.length;p++){o[p]=q[p]}return o},inArray:function(q,r){if(r){if(Array.prototype.indexOf){return Array.prototype.indexOf.call(r,q)}for(var o=0,p=r.length;o<p;o++){if(r[o]===q){return o}}}return -1},addI18n:function(o){return g.extend(n,o)},translate:function(o){return n[o]||o},isEmptyObj:function(o){if(o===b){return true}for(var p in o){return false}return true},hasClass:function(q,p){var o;if(q.className==""){return false}o=new RegExp("(^|\\s+)"+p+"(\\s+|$)");return o.test(q.className)},addClass:function(p,o){if(!g.hasClass(p,o)){p.className=p.className==""?o:p.className.replace(/\s+$/,"")+" "+o}},removeClass:function(q,p){var o=new RegExp("(^|\\s+)"+p+"(\\s+|$)");q.className=q.className.replace(o,function(s,r,t){return r===" "&&t===" "?" ":""})},getStyle:function(p,o){if(p.currentStyle){return p.currentStyle[o]}else{if(window.getComputedStyle){return window.getComputedStyle(p,null)[o]}}},addEvent:function(t,o,u){var s,r,q,p;p=arguments[3];o=o.toLowerCase();if(e===b){e="Plupload_"+g.guid()}if(t.addEventListener){s=u;t.addEventListener(o,s,false)}else{if(t.attachEvent){s=function(){var v=window.event;if(!v.target){v.target=v.srcElement}v.preventDefault=h;v.stopPropagation=k;u(v)};t.attachEvent("on"+o,s)}}if(t[e]===b){t[e]=g.guid()}if(!d.hasOwnProperty(t[e])){d[t[e]]={}}r=d[t[e]];if(!r.hasOwnProperty(o)){r[o]=[]}r[o].push({func:s,orig:u,key:p})},removeEvent:function(t,o){var r,u,q;if(typeof(arguments[2])=="function"){u=arguments[2]}else{q=arguments[2]}o=o.toLowerCase();if(t[e]&&d[t[e]]&&d[t[e]][o]){r=d[t[e]][o]}else{return}for(var p=r.length-1;p>=0;p--){if(r[p].key===q||r[p].orig===u){if(t.removeEventListener){t.removeEventListener(o,r[p].func,false)}else{if(t.detachEvent){t.detachEvent("on"+o,r[p].func)}}r[p].orig=null;r[p].func=null;r.splice(p,1);if(u!==b){break}}}if(!r.length){delete d[t[e]][o]}if(g.isEmptyObj(d[t[e]])){delete d[t[e]];try{delete t[e]}catch(s){t[e]=b}}},removeAllEvents:function(p){var o=arguments[1];if(p[e]===b||!p[e]){return}g.each(d[p[e]],function(r,q){g.removeEvent(p,q,o)})}};g.Uploader=function(s){var p={},v,u=[],r,q=false;v=new g.QueueProgress();s=g.extend({chunk_size:0,multipart:true,multi_selection:true,file_data_name:"file",filters:[]},s);function t(){var x,y=0,w;if(this.state==g.STARTED){for(w=0;w<u.length;w++){if(!x&&u[w].status==g.QUEUED){x=u[w];x.status=g.UPLOADING;if(this.trigger("BeforeUpload",x)){this.trigger("UploadFile",x)}}else{y++}}if(y==u.length){this.stop();this.trigger("UploadComplete",u)}}}function o(){var x,w;v.reset();for(x=0;x<u.length;x++){w=u[x];if(w.size!==b){v.size+=w.size;v.loaded+=w.loaded}else{v.size=b}if(w.status==g.DONE){v.uploaded++}else{if(w.status==g.FAILED){v.failed++}else{v.queued++}}}if(v.size===b){v.percent=u.length>0?Math.ceil(v.uploaded/u.length*100):0}else{v.bytesPerSec=Math.ceil(v.loaded/((+new Date()-r||1)/1000));v.percent=v.size>0?Math.ceil(v.loaded/v.size*100):0}}g.extend(this,{state:g.STOPPED,runtime:"",features:{},files:u,settings:s,total:v,id:g.guid(),init:function(){var B=this,C,y,x,A=0,z;if(typeof(s.preinit)=="function"){s.preinit(B)}else{g.each(s.preinit,function(E,D){B.bind(D,E)})}s.page_url=s.page_url||document.location.pathname.replace(/\/[^\/]+$/g,"/");if(!/^(\w+:\/\/|\/)/.test(s.url)){s.url=s.page_url+s.url}s.chunk_size=g.parseSize(s.chunk_size);s.max_file_size=g.parseSize(s.max_file_size);B.bind("FilesAdded",function(D,G){var F,E,I=0,J,H=s.filters;if(H&&H.length){J=[];g.each(H,function(K){g.each(K.extensions.split(/,/),function(L){if(/^\s*\*\s*$/.test(L)){J.push("\\.*")}else{J.push("\\."+L.replace(new RegExp("["+("/^$.*+?|()[]{}\\".replace(/./g,"\\$&"))+"]","g"),"\\$&"))}})});J=new RegExp(J.join("|")+"$","i")}for(F=0;F<G.length;F++){E=G[F];E.loaded=0;E.percent=0;E.status=g.QUEUED;if(J&&!J.test(E.name)){D.trigger("Error",{code:g.FILE_EXTENSION_ERROR,message:g.translate("File extension error."),file:E});continue}if(E.size!==b&&E.size>s.max_file_size){D.trigger("Error",{code:g.FILE_SIZE_ERROR,message:g.translate("File size error."),file:E});continue}u.push(E);I++}if(I){c(function(){B.trigger("QueueChanged");B.refresh()},1)}else{return false}});if(s.unique_names){B.bind("UploadFile",function(D,E){var G=E.name.match(/\.([^.]+)$/),F="tmp";if(G){F=G[1]}E.target_name=E.id+"."+F})}B.bind("UploadProgress",function(D,E){E.percent=E.size>0?Math.ceil(E.loaded/E.size*100):100;o()});B.bind("StateChanged",function(D){if(D.state==g.STARTED){r=(+new Date())}else{if(D.state==g.STOPPED){for(C=D.files.length-1;C>=0;C--){if(D.files[C].status==g.UPLOADING){D.files[C].status=g.QUEUED;o()}}}}});B.bind("QueueChanged",o);B.bind("Error",function(D,E){if(E.file){E.file.status=g.FAILED;o();if(D.state==g.STARTED){c(function(){t.call(B)},1)}}});B.bind("FileUploaded",function(D,E){E.status=g.DONE;E.loaded=E.size;D.trigger("UploadProgress",E);c(function(){t.call(B)},1)});if(s.runtimes){y=[];z=s.runtimes.split(/\s?,\s?/);for(C=0;C<z.length;C++){if(l[z[C]]){y.push(l[z[C]])}}}else{y=l}function w(){var G=y[A++],F,D,E;if(G){F=G.getFeatures();D=B.settings.required_features;if(D){D=D.split(",");for(E=0;E<D.length;E++){if(!F[D[E]]){w();return}}}G.init(B,function(H){if(H&&H.success){B.features=F;B.runtime=G.name;B.trigger("Init",{runtime:G.name});B.trigger("PostInit");B.refresh()}else{w()}})}else{B.trigger("Error",{code:g.INIT_ERROR,message:g.translate("Init error.")})}}w();if(typeof(s.init)=="function"){s.init(B)}else{g.each(s.init,function(E,D){B.bind(D,E)})}},refresh:function(){this.trigger("Refresh")},start:function(){if(u.length&&this.state!=g.STARTED){this.state=g.STARTED;this.trigger("StateChanged");t.call(this)}},stop:function(){if(this.state!=g.STOPPED){this.state=g.STOPPED;this.trigger("CancelUpload");this.trigger("StateChanged")}},disableBrowse:function(){q=arguments[0]!==b?arguments[0]:true;this.trigger("DisableBrowse",q)},getFile:function(x){var w;for(w=u.length-1;w>=0;w--){if(u[w].id===x){return u[w]}}},removeFile:function(x){var w;for(w=u.length-1;w>=0;w--){if(u[w].id===x.id){return this.splice(w,1)[0]}}},splice:function(y,w){var x;x=u.splice(y===b?0:y,w===b?u.length:w);this.trigger("FilesRemoved",x);this.trigger("QueueChanged");return x},trigger:function(x){var z=p[x.toLowerCase()],y,w;if(z){w=Array.prototype.slice.call(arguments);w[0]=this;for(y=0;y<z.length;y++){if(z[y].func.apply(z[y].scope,w)===false){return false}}}return true},hasEventListener:function(w){return !!p[w.toLowerCase()]},bind:function(w,y,x){var z;w=w.toLowerCase();z=p[w]||[];z.push({func:y,scope:x||this});p[w]=z},unbind:function(w){w=w.toLowerCase();var z=p[w],x,y=arguments[1];if(z){if(y!==b){for(x=z.length-1;x>=0;x--){if(z[x].func===y){z.splice(x,1);break}}}else{z=[]}if(!z.length){delete p[w]}}},unbindAll:function(){var w=this;g.each(p,function(y,x){w.unbind(x)})},destroy:function(){this.stop();this.trigger("Destroy");this.unbindAll()}})};g.File=function(r,p,q){var o=this;o.id=r;o.name=p;o.size=q;o.loaded=0;o.percent=0;o.status=0};g.Runtime=function(){this.getFeatures=function(){};this.init=function(o,p){}};g.QueueProgress=function(){var o=this;o.size=0;o.loaded=0;o.uploaded=0;o.failed=0;o.queued=0;o.percent=0;o.bytesPerSec=0;o.reset=function(){o.size=o.loaded=o.uploaded=o.failed=o.queued=o.percent=o.bytesPerSec=0}};g.runtimes={};window.plupload=g})();(function(){if(window.google&&google.gears){return}var a=null;if(typeof GearsFactory!="undefined"){a=new GearsFactory()}else{try{a=new ActiveXObject("Gears.Factory");if(a.getBuildInfo().indexOf("ie_mobile")!=-1){a.privateSetGlobalObject(this)}}catch(b){if((typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes["application/x-googlegears"]){a=document.createElement("object");a.style.display="none";a.width=0;a.height=0;a.type="application/x-googlegears";document.documentElement.appendChild(a)}}}if(!a){return}if(!window.google){window.google={}}if(!google.gears){google.gears={factory:a}}})();(function(e,b,c,d){var f={};function a(h,k,m){var g,j,l,o;j=google.gears.factory.create("beta.canvas");try{j.decode(h);if(!k.width){k.width=j.width}if(!k.height){k.height=j.height}o=Math.min(k.width/j.width,k.height/j.height);if(o<1){j.resize(Math.round(j.width*o),Math.round(j.height*o))}else{if(!k.quality||m!=="image/jpeg"){return h}}if(k.quality){return j.encode(m,{quality:k.quality/100})}return j.encode(m)}catch(n){}return h}c.runtimes.Gears=c.addRuntime("gears",{getFeatures:function(){return{dragdrop:true,jpgresize:true,pngresize:true,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(l,n){var m,h,g=false;if(!e.google||!google.gears){return n({success:false})}try{m=google.gears.factory.create("beta.desktop")}catch(k){return n({success:false})}function j(q){var p,o,r=[],s;for(o=0;o<q.length;o++){p=q[o];s=c.guid();f[s]=p.blob;r.push(new c.File(s,p.name,p.blob.length))}l.trigger("FilesAdded",r)}l.bind("PostInit",function(){var p=l.settings,o=b.getElementById(p.drop_element);if(o){c.addEvent(o,"dragover",function(q){m.setDropEffect(q,"copy");q.preventDefault()},l.id);c.addEvent(o,"drop",function(r){var q=m.getDragData(r,"application/x-gears-files");if(q){j(q.files)}r.preventDefault()},l.id);o=0}c.addEvent(b.getElementById(p.browse_button),"click",function(u){var t=[],r,q,s;u.preventDefault();if(g){return}no_type_restriction:for(r=0;r<p.filters.length;r++){s=p.filters[r].extensions.split(",");for(q=0;q<s.length;q++){if(s[q]==="*"){t=[];break no_type_restriction}t.push("."+s[q])}}m.openFiles(j,{singleFile:!p.multi_selection,filter:t})},l.id)});l.bind("CancelUpload",function(){if(h.abort){h.abort()}});l.bind("UploadFile",function(u,r){var w=0,v,s,t=0,q=u.settings.resize,o;if(q&&/\.(png|jpg|jpeg)$/i.test(r.name)){f[r.id]=a(f[r.id],q,/\.png$/i.test(r.name)?"image/png":"image/jpeg")}r.size=f[r.id].length;s=u.settings.chunk_size;o=s>0;v=Math.ceil(r.size/s);if(!o){s=r.size;v=1}function p(){var C,y=u.settings.multipart,x=0,B={name:r.target_name||r.name},z=u.settings.url;function A(E){var D,J="----pluploadboundary"+c.guid(),G="--",I="\r\n",F,H;if(y){h.setRequestHeader("Content-Type","multipart/form-data; boundary="+J);D=google.gears.factory.create("beta.blobbuilder");c.each(c.extend(B,u.settings.multipart_params),function(L,K){D.append(G+J+I+'Content-Disposition: form-data; name="'+K+'"'+I+I);D.append(L+I)});H=c.mimeTypes[r.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream";D.append(G+J+I+'Content-Disposition: form-data; name="'+u.settings.file_data_name+'"; filename="'+r.name+'"'+I+"Content-Type: "+H+I+I);D.append(E);D.append(I+G+J+G+I);F=D.getAsBlob();x=F.length-E.length;E=F}h.send(E)}if(r.status==c.DONE||r.status==c.FAILED||u.state==c.STOPPED){return}if(o){B.chunk=w;B.chunks=v}C=Math.min(s,r.size-(w*s));if(!y){z=c.buildUrl(u.settings.url,B)}h=google.gears.factory.create("beta.httprequest");h.open("POST",z);if(!y){h.setRequestHeader("Content-Disposition",'attachment; filename="'+r.name+'"');h.setRequestHeader("Content-Type","application/octet-stream")}c.each(u.settings.headers,function(E,D){h.setRequestHeader(D,E)});h.upload.onprogress=function(D){r.loaded=t+D.loaded-x;u.trigger("UploadProgress",r)};h.onreadystatechange=function(){var D;if(h.readyState==4&&u.state!==c.STOPPED){if(h.status==200){D={chunk:w,chunks:v,response:h.responseText,status:h.status};u.trigger("ChunkUploaded",r,D);if(D.cancelled){r.status=c.FAILED;return}t+=C;if(++w>=v){r.status=c.DONE;u.trigger("FileUploaded",r,{response:h.responseText,status:h.status})}else{p()}}else{u.trigger("Error",{code:c.HTTP_ERROR,message:c.translate("HTTP Error."),file:r,chunk:w,chunks:v,status:h.status})}}};if(w<v){A(f[r.id].slice(w*s,C))}}p()});l.bind("DisableBrowse",function(o,p){g=p});l.bind("Destroy",function(o){var p,q,r={browseButton:o.settings.browse_button,dropElm:o.settings.drop_element};for(p in r){q=b.getElementById(r[p]);if(q){c.removeAllEvents(q,o.id)}}});n({success:true})}})})(window,document,plupload);(function(g,b,d,e){var a={},h={};function c(o){var n,m=typeof o,j,l,k;if(o===e||o===null){return"null"}if(m==="string"){n="\bb\tt\nn\ff\rr\"\"''\\\\";return'"'+o.replace(/([\u0080-\uFFFF\x00-\x1f\"])/g,function(r,q){var p=n.indexOf(q);if(p+1){return"\\"+n.charAt(p+1)}r=q.charCodeAt().toString(16);return"\\u"+"0000".substring(r.length)+r})+'"'}if(m=="object"){j=o.length!==e;n="";if(j){for(l=0;l<o.length;l++){if(n){n+=","}n+=c(o[l])}n="["+n+"]"}else{for(k in o){if(o.hasOwnProperty(k)){if(n){n+=","}n+=c(k)+":"+c(o[k])}}n="{"+n+"}"}return n}return""+o}function f(s){var v=false,j=null,o=null,k,l,m,u,n,q=0;try{try{o=new ActiveXObject("AgControl.AgControl");if(o.IsVersionSupported(s)){v=true}o=null}catch(r){var p=navigator.plugins["Silverlight Plug-In"];if(p){k=p.description;if(k==="1.0.30226.2"){k="2.0.30226.2"}l=k.split(".");while(l.length>3){l.pop()}while(l.length<4){l.push(0)}m=s.split(".");while(m.length>4){m.pop()}do{u=parseInt(m[q],10);n=parseInt(l[q],10);q++}while(q<m.length&&u===n);if(u<=n&&!isNaN(u)){v=true}}}}catch(t){v=false}return v}d.silverlight={trigger:function(n,k){var m=a[n],l,j;if(m){j=d.toArray(arguments).slice(1);j[0]="Silverlight:"+k;setTimeout(function(){m.trigger.apply(m,j)},0)}}};d.runtimes.Silverlight=d.addRuntime("silverlight",{getFeatures:function(){return{jpgresize:true,pngresize:true,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(p,q){var o,m="",n=p.settings.filters,l,k=b.body;if(!f("2.0.31005.0")||(g.opera&&g.opera.buildNumber)){q({success:false});return}h[p.id]=false;a[p.id]=p;o=b.createElement("div");o.id=p.id+"_silverlight_container";d.extend(o.style,{position:"absolute",top:"0px",background:p.settings.shim_bgcolor||"transparent",zIndex:99999,width:"100px",height:"100px",overflow:"hidden",opacity:p.settings.shim_bgcolor||b.documentMode>8?"":0.01});o.className="plupload silverlight";if(p.settings.container){k=b.getElementById(p.settings.container);if(d.getStyle(k,"position")==="static"){k.style.position="relative"}}k.appendChild(o);for(l=0;l<n.length;l++){m+=(m!=""?"|":"")+n[l].title+" | *."+n[l].extensions.replace(/,/g,";*.")}o.innerHTML='<object id="'+p.id+'_silverlight" data="data:application/x-silverlight," type="application/x-silverlight-2" style="outline:none;" width="1024" height="1024"><param name="source" value="'+p.settings.silverlight_xap_url+'"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="id='+p.id+",filter="+m+",multiselect="+p.settings.multi_selection+'"/></object>';function j(){return b.getElementById(p.id+"_silverlight").content.Upload}p.bind("Silverlight:Init",function(){var r,s={};if(h[p.id]){return}h[p.id]=true;p.bind("Silverlight:StartSelectFiles",function(t){r=[]});p.bind("Silverlight:SelectFile",function(t,w,u,v){var x;x=d.guid();s[x]=w;s[w]=x;r.push(new d.File(x,u,v))});p.bind("Silverlight:SelectSuccessful",function(){if(r.length){p.trigger("FilesAdded",r)}});p.bind("Silverlight:UploadChunkError",function(t,w,u,x,v){p.trigger("Error",{code:d.IO_ERROR,message:"IO Error.",details:v,file:t.getFile(s[w])})});p.bind("Silverlight:UploadFileProgress",function(t,x,u,w){var v=t.getFile(s[x]);if(v.status!=d.FAILED){v.size=w;v.loaded=u;t.trigger("UploadProgress",v)}});p.bind("Refresh",function(t){var u,v,w;u=b.getElementById(t.settings.browse_button);if(u){v=d.getPos(u,b.getElementById(t.settings.container));w=d.getSize(u);d.extend(b.getElementById(t.id+"_silverlight_container").style,{top:v.y+"px",left:v.x+"px",width:w.w+"px",height:w.h+"px"})}});p.bind("Silverlight:UploadChunkSuccessful",function(t,w,u,z,y){var x,v=t.getFile(s[w]);x={chunk:u,chunks:z,response:y};t.trigger("ChunkUploaded",v,x);if(v.status!=d.FAILED&&t.state!==d.STOPPED){j().UploadNextChunk()}if(u==z-1){v.status=d.DONE;t.trigger("FileUploaded",v,{response:y})}});p.bind("Silverlight:UploadSuccessful",function(t,w,u){var v=t.getFile(s[w]);v.status=d.DONE;t.trigger("FileUploaded",v,{response:u})});p.bind("FilesRemoved",function(t,v){var u;for(u=0;u<v.length;u++){j().RemoveFile(s[v[u].id])}});p.bind("UploadFile",function(t,v){var w=t.settings,u=w.resize||{};j().UploadFile(s[v.id],t.settings.url,c({name:v.target_name||v.name,mime:d.mimeTypes[v.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream",chunk_size:w.chunk_size,image_width:u.width,image_height:u.height,image_quality:u.quality,multipart:!!w.multipart,multipart_params:w.multipart_params||{},file_data_name:w.file_data_name,headers:w.headers}))});p.bind("CancelUpload",function(){j().CancelUpload()});p.bind("Silverlight:MouseEnter",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_hover;if(u&&v){d.addClass(u,v)}});p.bind("Silverlight:MouseLeave",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_hover;if(u&&v){d.removeClass(u,v)}});p.bind("Silverlight:MouseLeftButtonDown",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_active;if(u&&v){d.addClass(u,v);d.addEvent(b.body,"mouseup",function(){d.removeClass(u,v)})}});p.bind("Sliverlight:StartSelectFiles",function(t){var u,v;u=b.getElementById(p.settings.browse_button);v=t.settings.browse_button_active;if(u&&v){d.removeClass(u,v)}});p.bind("DisableBrowse",function(t,u){j().DisableBrowse(u)});p.bind("Destroy",function(t){var u;d.removeAllEvents(b.body,t.id);delete h[t.id];delete a[t.id];u=b.getElementById(t.id+"_silverlight_container");if(u){u.parentNode.removeChild(u)}});q({success:true})})}})})(window,document,plupload);(function(f,b,d,e){var a={},g={};function c(){var h;try{h=navigator.plugins["Shockwave Flash"];h=h.description}catch(k){try{h=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(j){h="0.0"}}h=h.match(/\d+/g);return parseFloat(h[0]+"."+h[1])}d.flash={trigger:function(k,h,j){setTimeout(function(){var n=a[k],m,l;if(n){n.trigger("Flash:"+h,j)}},0)}};d.runtimes.Flash=d.addRuntime("flash",{getFeatures:function(){return{jpgresize:true,pngresize:true,maxWidth:8091,maxHeight:8091,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(n,p){var l,m,h=0,j=b.body;if(c()<10){p({success:false});return}g[n.id]=false;a[n.id]=n;l=b.getElementById(n.settings.browse_button);m=b.createElement("div");m.id=n.id+"_flash_container";d.extend(m.style,{position:"absolute",top:"0px",background:n.settings.shim_bgcolor||"transparent",zIndex:99999,width:"100%",height:"100%"});m.className="plupload flash";if(n.settings.container){j=b.getElementById(n.settings.container);if(d.getStyle(j,"position")==="static"){j.style.position="relative"}}j.appendChild(m);(function(){var q,r;q='<object id="'+n.id+'_flash" type="application/x-shockwave-flash" data="'+n.settings.flash_swf_url+'" ';if(d.ua.ie){q+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '}q+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+n.settings.flash_swf_url+'" /><param name="flashvars" value="id='+escape(n.id)+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>';if(d.ua.ie){r=b.createElement("div");m.appendChild(r);r.outerHTML=q;r=null}else{m.innerHTML=q}}());function o(){return b.getElementById(n.id+"_flash")}function k(){if(h++>5000){p({success:false});return}if(g[n.id]===false){setTimeout(k,1)}}k();l=m=null;n.bind("Destroy",function(q){var r;d.removeAllEvents(b.body,q.id);delete g[q.id];delete a[q.id];r=b.getElementById(q.id+"_flash_container");if(r){r.parentNode.removeChild(r)}});n.bind("Flash:Init",function(){var s={},r;try{o().setFileFilters(n.settings.filters,n.settings.multi_selection)}catch(q){p({success:false});return}if(g[n.id]){return}g[n.id]=true;n.bind("UploadFile",function(t,v){var w=t.settings,u=n.settings.resize||{};o().uploadFile(s[v.id],w.url,{name:v.target_name||v.name,mime:d.mimeTypes[v.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream",chunk_size:w.chunk_size,width:u.width,height:u.height,quality:u.quality,multipart:w.multipart,multipart_params:w.multipart_params||{},file_data_name:w.file_data_name,format:/\.(jpg|jpeg)$/i.test(v.name)?"jpg":"png",headers:w.headers,urlstream_upload:w.urlstream_upload})});n.bind("CancelUpload",function(){o().cancelUpload()});n.bind("Flash:UploadProcess",function(u,t){var v=u.getFile(s[t.id]);if(v.status!=d.FAILED){v.loaded=t.loaded;v.size=t.size;u.trigger("UploadProgress",v)}});n.bind("Flash:UploadChunkComplete",function(t,v){var w,u=t.getFile(s[v.id]);w={chunk:v.chunk,chunks:v.chunks,response:v.text};t.trigger("ChunkUploaded",u,w);if(u.status!==d.FAILED&&t.state!==d.STOPPED){o().uploadNextChunk()}if(v.chunk==v.chunks-1){u.status=d.DONE;t.trigger("FileUploaded",u,{response:v.text})}});n.bind("Flash:SelectFiles",function(t,w){var v,u,x=[],y;for(u=0;u<w.length;u++){v=w[u];y=d.guid();s[y]=v.id;s[v.id]=y;x.push(new d.File(y,v.name,v.size))}if(x.length){n.trigger("FilesAdded",x)}});n.bind("Flash:SecurityError",function(t,u){n.trigger("Error",{code:d.SECURITY_ERROR,message:d.translate("Security error."),details:u.message,file:n.getFile(s[u.id])})});n.bind("Flash:GenericError",function(t,u){n.trigger("Error",{code:d.GENERIC_ERROR,message:d.translate("Generic error."),details:u.message,file:n.getFile(s[u.id])})});n.bind("Flash:IOError",function(t,u){n.trigger("Error",{code:d.IO_ERROR,message:d.translate("IO error."),details:u.message,file:n.getFile(s[u.id])})});n.bind("Flash:ImageError",function(t,u){n.trigger("Error",{code:parseInt(u.code,10),message:d.translate("Image error."),file:n.getFile(s[u.id])})});n.bind("Flash:StageEvent:rollOver",function(t){var u,v;u=b.getElementById(n.settings.browse_button);v=t.settings.browse_button_hover;if(u&&v){d.addClass(u,v)}});n.bind("Flash:StageEvent:rollOut",function(t){var u,v;u=b.getElementById(n.settings.browse_button);v=t.settings.browse_button_hover;if(u&&v){d.removeClass(u,v)}});n.bind("Flash:StageEvent:mouseDown",function(t){var u,v;u=b.getElementById(n.settings.browse_button);v=t.settings.browse_button_active;if(u&&v){d.addClass(u,v);d.addEvent(b.body,"mouseup",function(){d.removeClass(u,v)},t.id)}});n.bind("Flash:StageEvent:mouseUp",function(t){var u,v;u=b.getElementById(n.settings.browse_button);v=t.settings.browse_button_active;if(u&&v){d.removeClass(u,v)}});n.bind("Flash:ExifData",function(t,u){n.trigger("ExifData",n.getFile(s[u.id]),u.data)});n.bind("Flash:GpsData",function(t,u){n.trigger("GpsData",n.getFile(s[u.id]),u.data)});n.bind("QueueChanged",function(t){n.refresh()});n.bind("FilesRemoved",function(t,v){var u;for(u=0;u<v.length;u++){o().removeFile(s[v[u].id])}});n.bind("StateChanged",function(t){n.refresh()});n.bind("Refresh",function(t){var u,v,w;o().setFileFilters(n.settings.filters,n.settings.multi_selection);u=b.getElementById(t.settings.browse_button);if(u){v=d.getPos(u,b.getElementById(t.settings.container));w=d.getSize(u);d.extend(b.getElementById(t.id+"_flash_container").style,{top:v.y+"px",left:v.x+"px",width:w.w+"px",height:w.h+"px"})}});n.bind("DisableBrowse",function(t,u){o().disableBrowse(u)});p({success:true})})}})})(window,document,plupload);(function(a){a.runtimes.BrowserPlus=a.addRuntime("browserplus",{getFeatures:function(){return{dragdrop:true,jpgresize:true,pngresize:true,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(g,j){var e=window.BrowserPlus,h={},d=g.settings,c=d.resize;function f(o){var n,m,k=[],l,p;for(m=0;m<o.length;m++){l=o[m];p=a.guid();h[p]=l;k.push(new a.File(p,l.name,l.size))}if(m){g.trigger("FilesAdded",k)}}function b(){var k=false;g.bind("PostInit",function(){var o,m=d.drop_element,q=g.id+"_droptarget",l=document.getElementById(m),n;function r(t,s){e.DragAndDrop.AddDropTarget({id:t},function(u){e.DragAndDrop.AttachCallbacks({id:t,hover:function(v){if(!v&&s){s()}},drop:function(v){if(s){s()}f(v)}},function(){})})}function p(){document.getElementById(q).style.top="-1000px"}if(l){if(document.attachEvent&&(/MSIE/gi).test(navigator.userAgent)){o=document.createElement("div");o.setAttribute("id",q);a.extend(o.style,{position:"absolute",top:"-1000px",background:"red",filter:"alpha(opacity=0)",opacity:0});document.body.appendChild(o);a.addEvent(l,"dragenter",function(t){var s,u;s=document.getElementById(m);u=a.getPos(s);a.extend(document.getElementById(q).style,{top:u.y+"px",left:u.x+"px",width:s.offsetWidth+"px",height:s.offsetHeight+"px"})});r(q,p)}else{r(m)}}a.addEvent(document.getElementById(d.browse_button),"click",function(y){var s=[],u,t,x=d.filters,w,v;y.preventDefault();if(k){return}no_type_restriction:for(u=0;u<x.length;u++){w=x[u].extensions.split(",");for(t=0;t<w.length;t++){if(w[t]==="*"){s=[];break no_type_restriction}v=a.mimeTypes[w[t]];if(v&&a.inArray(v,s)===-1){s.push(a.mimeTypes[w[t]])}}}e.FileBrowse.OpenBrowseDialog({mimeTypes:s},function(z){if(z.success){f(z.value)}})});l=o=null});g.bind("CancelUpload",function(){e.Uploader.cancel({},function(){})});g.bind("DisableBrowse",function(l,m){k=m});g.bind("UploadFile",function(o,l){var n=h[l.id],t={},m=o.settings.chunk_size,p,q=[];function s(u,w){var v;if(l.status==a.FAILED){return}t.name=l.target_name||l.name;if(m){t.chunk=""+u;t.chunks=""+w}v=q.shift();e.Uploader.upload({url:o.settings.url,files:{file:v},cookies:document.cookies,postvars:a.extend(t,o.settings.multipart_params),progressCallback:function(z){var y,x=0;p[u]=parseInt(z.filePercent*v.size/100,10);for(y=0;y<p.length;y++){x+=p[y]}l.loaded=x;o.trigger("UploadProgress",l)}},function(y){var x,z;if(y.success){x=y.value.statusCode;if(m){o.trigger("ChunkUploaded",l,{chunk:u,chunks:w,response:y.value.body,status:x})}if(q.length>0){s(++u,w)}else{l.status=a.DONE;o.trigger("FileUploaded",l,{response:y.value.body,status:x});if(x>=400){o.trigger("Error",{code:a.HTTP_ERROR,message:a.translate("HTTP Error."),file:l,status:x})}}}else{o.trigger("Error",{code:a.GENERIC_ERROR,message:a.translate("Generic Error."),file:l,details:y.error})}})}function r(u){l.size=u.size;if(m){e.FileAccess.chunk({file:u,chunkSize:m},function(x){if(x.success){var y=x.value,v=y.length;p=Array(v);for(var w=0;w<v;w++){p[w]=0;q.push(y[w])}s(0,v)}})}else{p=Array(1);q.push(u);s(0,1)}}if(c&&/\.(png|jpg|jpeg)$/i.test(l.name)){BrowserPlus.ImageAlter.transform({file:n,quality:c.quality||90,actions:[{scale:{maxwidth:c.width,maxheight:c.height}}]},function(u){if(u.success){r(u.value.file)}})}else{r(n)}});j({success:true})}if(e){e.init(function(l){var k=[{service:"Uploader",version:"3"},{service:"DragAndDrop",version:"1"},{service:"FileBrowse",version:"1"},{service:"FileAccess",version:"2"}];if(c){k.push({service:"ImageAlter",version:"4"})}if(l.success){e.require({services:k},function(m){if(m.success){b()}else{j()}})}else{j()}})}else{j()}}})})(plupload);(function(h,k,j,e){var c={},g;function m(o,p){var n;if("FileReader" in h){n=new FileReader();n.readAsDataURL(o);n.onload=function(){p(n.result)}}else{return p(o.getAsDataURL())}}function l(o,p){var n;if("FileReader" in h){n=new FileReader();n.readAsBinaryString(o);n.onload=function(){p(n.result)}}else{return p(o.getAsBinary())}}function d(r,p,n,v){var q,o,u,s,t=this;m(c[r.id],function(w){q=k.createElement("canvas");q.style.display="none";k.body.appendChild(q);o=q.getContext("2d");u=new Image();u.onerror=u.onabort=function(){v({success:false})};u.onload=function(){var C,x,z,y,B;if(!p.width){p.width=u.width}if(!p.height){p.height=u.height}s=Math.min(p.width/u.width,p.height/u.height);if(s<1){C=Math.round(u.width*s);x=Math.round(u.height*s)}else{if(p.quality&&n==="image/jpeg"){C=u.width;x=u.height}else{v({success:false});return}}q.width=C;q.height=x;o.drawImage(u,0,0,C,x);if(n==="image/jpeg"){y=new f(atob(w.substring(w.indexOf("base64,")+7)));if(y.headers&&y.headers.length){B=new a();if(B.init(y.get("exif")[0])){B.setExif("PixelXDimension",C);B.setExif("PixelYDimension",x);y.set("exif",B.getBinary());if(t.hasEventListener("ExifData")){t.trigger("ExifData",r,B.EXIF())}if(t.hasEventListener("GpsData")){t.trigger("GpsData",r,B.GPS())}}}}if(p.quality&&n==="image/jpeg"){try{w=q.toDataURL(n,p.quality/100)}catch(A){w=q.toDataURL(n)}}else{w=q.toDataURL(n)}w=w.substring(w.indexOf("base64,")+7);w=atob(w);if(y&&y.headers&&y.headers.length){w=y.restore(w);y.purge()}q.parentNode.removeChild(q);v({success:true,data:w})};u.src=w})}j.runtimes.Html5=j.addRuntime("html5",{getFeatures:function(){var s,o,r,q,p,n;o=r=p=n=false;if(h.XMLHttpRequest){s=new XMLHttpRequest();r=!!s.upload;o=!!(s.sendAsBinary||s.upload)}if(o){q=!!(s.sendAsBinary||(h.Uint8Array&&h.ArrayBuffer));p=!!(File&&(File.prototype.getAsDataURL||h.FileReader)&&q);n=!!(File&&(File.prototype.mozSlice||File.prototype.webkitSlice||File.prototype.slice))}g=j.ua.safari&&j.ua.windows;return{html5:o,dragdrop:(function(){var t=k.createElement("div");return("draggable" in t)||("ondragstart" in t&&"ondrop" in t)}()),jpgresize:p,pngresize:p,multipart:p||!!h.FileReader||!!h.FormData,canSendBinary:q,cantSendBlobInFormData:!!(j.ua.gecko&&h.FormData&&h.FileReader&&!FileReader.prototype.readAsArrayBuffer)||j.ua.android,progress:r,chunks:n,multi_selection:!(j.ua.safari&&j.ua.windows),triggerDialog:(j.ua.gecko&&h.FormData||j.ua.webkit)}},init:function(p,r){var n,q;function o(w){var u,t,v=[],x,s={};for(t=0;t<w.length;t++){u=w[t];if(s[u.name]){continue}s[u.name]=true;x=j.guid();c[x]=u;v.push(new j.File(x,u.fileName||u.name,u.fileSize||u.size))}if(v.length){p.trigger("FilesAdded",v)}}n=this.getFeatures();if(!n.html5){r({success:false});return}p.bind("Init",function(w){var G,F,C=[],v,D,t=w.settings.filters,u,B,s=k.body,E;G=k.createElement("div");G.id=w.id+"_html5_container";j.extend(G.style,{position:"absolute",background:p.settings.shim_bgcolor||"transparent",width:"100px",height:"100px",overflow:"hidden",zIndex:99999,opacity:p.settings.shim_bgcolor?"":0});G.className="plupload html5";if(p.settings.container){s=k.getElementById(p.settings.container);if(j.getStyle(s,"position")==="static"){s.style.position="relative"}}s.appendChild(G);no_type_restriction:for(v=0;v<t.length;v++){u=t[v].extensions.split(/,/);for(D=0;D<u.length;D++){if(u[D]==="*"){C=[];break no_type_restriction}B=j.mimeTypes[u[D]];if(B&&j.inArray(B,C)===-1){C.push(B)}}}G.innerHTML='<input id="'+p.id+'_html5"  style="font-size:999px" type="file" accept="'+C.join(",")+'" '+(p.settings.multi_selection&&p.features.multi_selection?'multiple="multiple"':"")+" />";G.scrollTop=100;E=k.getElementById(p.id+"_html5");if(w.features.triggerDialog){j.extend(E.style,{position:"absolute",width:"100%",height:"100%"})}else{j.extend(E.style,{cssFloat:"right",styleFloat:"right"})}E.onchange=function(){o(this.files);this.value=""};F=k.getElementById(w.settings.browse_button);if(F){var z=w.settings.browse_button_hover,A=w.settings.browse_button_active,x=w.features.triggerDialog?F:G;if(z){j.addEvent(x,"mouseover",function(){j.addClass(F,z)},w.id);j.addEvent(x,"mouseout",function(){j.removeClass(F,z)},w.id)}if(A){j.addEvent(x,"mousedown",function(){j.addClass(F,A)},w.id);j.addEvent(k.body,"mouseup",function(){j.removeClass(F,A)},w.id)}if(w.features.triggerDialog){j.addEvent(F,"click",function(H){var y=k.getElementById(w.id+"_html5");if(y&&!y.disabled){y.click()}H.preventDefault()},w.id)}}});p.bind("PostInit",function(){var s=k.getElementById(p.settings.drop_element);if(s){if(g){j.addEvent(s,"dragenter",function(w){var v,t,u;v=k.getElementById(p.id+"_drop");if(!v){v=k.createElement("input");v.setAttribute("type","file");v.setAttribute("id",p.id+"_drop");v.setAttribute("multiple","multiple");j.addEvent(v,"change",function(){o(this.files);j.removeEvent(v,"change",p.id);v.parentNode.removeChild(v)},p.id);j.addEvent(v,"dragover",function(x){x.stopPropagation()},p.id);s.appendChild(v)}t=j.getPos(s,k.getElementById(p.settings.container));u=j.getSize(s);if(j.getStyle(s,"position")==="static"){j.extend(s.style,{position:"relative"})}j.extend(v.style,{position:"absolute",display:"block",top:0,left:0,width:u.w+"px",height:u.h+"px",opacity:0})},p.id);return}j.addEvent(s,"dragover",function(t){t.preventDefault()},p.id);j.addEvent(s,"drop",function(u){var t=u.dataTransfer;if(t&&t.files){o(t.files)}u.preventDefault()},p.id)}});p.bind("Refresh",function(s){var t,u,v,x,w;t=k.getElementById(p.settings.browse_button);if(t){u=j.getPos(t,k.getElementById(s.settings.container));v=j.getSize(t);x=k.getElementById(p.id+"_html5_container");j.extend(x.style,{top:u.y+"px",left:u.x+"px",width:v.w+"px",height:v.h+"px"});if(p.features.triggerDialog){if(j.getStyle(t,"position")==="static"){j.extend(t.style,{position:"relative"})}w=parseInt(j.getStyle(t,"zIndex"),10);if(isNaN(w)){w=0}j.extend(t.style,{zIndex:w});j.extend(x.style,{zIndex:w-1})}}});p.bind("DisableBrowse",function(s,u){var t=k.getElementById(s.id+"_html5");if(t){t.disabled=u}});p.bind("CancelUpload",function(){if(q&&q.abort){q.abort()}});p.bind("UploadFile",function(s,u){var v=s.settings,y,t;function x(A,D,z){var B;if(File.prototype.slice){try{A.slice();return A.slice(D,z)}catch(C){return A.slice(D,z-D)}}else{if(B=File.prototype.webkitSlice||File.prototype.mozSlice){return B.call(A,D,z)}else{return null}}}function w(A){var D=0,C=0,z=("FileReader" in h)?new FileReader:null;function B(){var J,N,L,M,I,K,F,E=s.settings.url;function H(Q){if(q.sendAsBinary){q.sendAsBinary(Q)}else{if(s.features.canSendBinary){var O=new Uint8Array(Q.length);for(var P=0;P<Q.length;P++){O[P]=(Q.charCodeAt(P)&255)}q.send(O.buffer)}}}function G(P){var T=0,U="----pluploadboundary"+j.guid(),R,Q="--",S="\r\n",O="";q=new XMLHttpRequest;if(q.upload){q.upload.onprogress=function(V){u.loaded=Math.min(u.size,C+V.loaded-T);s.trigger("UploadProgress",u)}}q.onreadystatechange=function(){var V,X;if(q.readyState==4&&s.state!==j.STOPPED){try{V=q.status}catch(W){V=0}if(V>=400){s.trigger("Error",{code:j.HTTP_ERROR,message:j.translate("HTTP Error."),file:u,status:V})}else{if(L){X={chunk:D,chunks:L,response:q.responseText,status:V};s.trigger("ChunkUploaded",u,X);C+=K;if(X.cancelled){u.status=j.FAILED;return}u.loaded=Math.min(u.size,(D+1)*I)}else{u.loaded=u.size}s.trigger("UploadProgress",u);P=J=R=O=null;if(!L||++D>=L){u.status=j.DONE;s.trigger("FileUploaded",u,{response:q.responseText,status:V})}else{B()}}}};if(s.settings.multipart&&n.multipart){M.name=u.target_name||u.name;q.open("post",E,true);j.each(s.settings.headers,function(W,V){q.setRequestHeader(V,W)});if(typeof(P)!=="string"&&!!h.FormData){R=new FormData();j.each(j.extend(M,s.settings.multipart_params),function(W,V){R.append(V,W)});R.append(s.settings.file_data_name,P);q.send(R);return}if(typeof(P)==="string"){q.setRequestHeader("Content-Type","multipart/form-data; boundary="+U);j.each(j.extend(M,s.settings.multipart_params),function(W,V){O+=Q+U+S+'Content-Disposition: form-data; name="'+V+'"'+S+S;O+=unescape(encodeURIComponent(W))+S});F=j.mimeTypes[u.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream";O+=Q+U+S+'Content-Disposition: form-data; name="'+s.settings.file_data_name+'"; filename="'+unescape(encodeURIComponent(u.name))+'"'+S+"Content-Type: "+F+S+S+P+S+Q+U+Q+S;T=O.length-P.length;P=O;H(P);return}}E=j.buildUrl(s.settings.url,j.extend(M,s.settings.multipart_params));q.open("post",E,true);q.setRequestHeader("Content-Type","application/octet-stream");j.each(s.settings.headers,function(W,V){q.setRequestHeader(V,W)});if(typeof(P)==="string"){H(P)}else{q.send(P)}}if(u.status==j.DONE||u.status==j.FAILED||s.state==j.STOPPED){return}M={name:u.target_name||u.name};if(v.chunk_size&&u.size>v.chunk_size&&(n.chunks||typeof(A)=="string")){I=v.chunk_size;L=Math.ceil(u.size/I);K=Math.min(I,u.size-(D*I));if(typeof(A)=="string"){J=A.substring(D*I,D*I+K)}else{J=x(A,D*I,D*I+K)}M.chunk=D;M.chunks=L}else{K=u.size;J=A}if(s.settings.multipart&&n.multipart&&typeof(J)!=="string"&&z&&n.cantSendBlobInFormData&&n.chunks&&s.settings.chunk_size){z.onload=function(){G(z.result)};z.readAsBinaryString(J)}else{G(J)}}B()}y=c[u.id];if(n.jpgresize&&s.settings.resize&&/\.(png|jpg|jpeg)$/i.test(u.name)){d.call(s,u,s.settings.resize,/\.png$/i.test(u.name)?"image/png":"image/jpeg",function(z){if(z.success){u.size=z.data.length;w(z.data)}else{if(n.chunks){w(y)}else{l(y,w)}}})}else{if(!n.chunks&&n.jpgresize){l(y,w)}else{w(y)}}});p.bind("Destroy",function(s){var u,v,t=k.body,w={inputContainer:s.id+"_html5_container",inputFile:s.id+"_html5",browseButton:s.settings.browse_button,dropElm:s.settings.drop_element};for(u in w){v=k.getElementById(w[u]);if(v){j.removeAllEvents(v,s.id)}}j.removeAllEvents(k.body,s.id);if(s.settings.container){t=k.getElementById(s.settings.container)}t.removeChild(k.getElementById(w.inputContainer))});r({success:true})}});function b(){var q=false,o;function r(t,v){var s=q?0:-8*(v-1),w=0,u;for(u=0;u<v;u++){w|=(o.charCodeAt(t+u)<<Math.abs(s+u*8))}return w}function n(u,s,t){var t=arguments.length===3?t:o.length-s-1;o=o.substr(0,s)+u+o.substr(t+s)}function p(t,u,w){var x="",s=q?0:-8*(w-1),v;for(v=0;v<w;v++){x+=String.fromCharCode((u>>Math.abs(s+v*8))&255)}n(x,t,w)}return{II:function(s){if(s===e){return q}else{q=s}},init:function(s){q=false;o=s},SEGMENT:function(s,u,t){switch(arguments.length){case 1:return o.substr(s,o.length-s-1);case 2:return o.substr(s,u);case 3:n(t,s,u);break;default:return o}},BYTE:function(s){return r(s,1)},SHORT:function(s){return r(s,2)},LONG:function(s,t){if(t===e){return r(s,4)}else{p(s,t,4)}},SLONG:function(s){var t=r(s,4);return(t>2147483647?t-4294967296:t)},STRING:function(s,t){var u="";for(t+=s;s<t;s++){u+=String.fromCharCode(r(s,1))}return u}}}function f(s){var u={65505:{app:"EXIF",name:"APP1",signature:"Exif\0"},65506:{app:"ICC",name:"APP2",signature:"ICC_PROFILE\0"},65517:{app:"IPTC",name:"APP13",signature:"Photoshop 3.0\0"}},t=[],r,n,p=e,q=0,o;r=new b();r.init(s);if(r.SHORT(0)!==65496){return}n=2;o=Math.min(1048576,s.length);while(n<=o){p=r.SHORT(n);if(p>=65488&&p<=65495){n+=2;continue}if(p===65498||p===65497){break}q=r.SHORT(n+2)+2;if(u[p]&&r.STRING(n+4,u[p].signature.length)===u[p].signature){t.push({hex:p,app:u[p].app.toUpperCase(),name:u[p].name.toUpperCase(),start:n,length:q,segment:r.SEGMENT(n,q)})}n+=q}r.init(null);return{headers:t,restore:function(y){r.init(y);var w=new f(y);if(!w.headers){return false}for(var x=w.headers.length;x>0;x--){var z=w.headers[x-1];r.SEGMENT(z.start,z.length,"")}w.purge();n=r.SHORT(2)==65504?4+r.SHORT(4):2;for(var x=0,v=t.length;x<v;x++){r.SEGMENT(n,0,t[x].segment);n+=t[x].length}return r.SEGMENT()},get:function(x){var y=[];for(var w=0,v=t.length;w<v;w++){if(t[w].app===x.toUpperCase()){y.push(t[w].segment)}}return y},set:function(y,x){var z=[];if(typeof(x)==="string"){z.push(x)}else{z=x}for(var w=ii=0,v=t.length;w<v;w++){if(t[w].app===y.toUpperCase()){t[w].segment=z[ii];t[w].length=z[ii].length;ii++}if(ii>=z.length){break}}},purge:function(){t=[];r.init(null)}}}function a(){var q,n,o={},t;q=new b();n={tiff:{274:"Orientation",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer"},exif:{36864:"ExifVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",36867:"DateTimeOriginal",33434:"ExposureTime",33437:"FNumber",34855:"ISOSpeedRatings",37377:"ShutterSpeedValue",37378:"ApertureValue",37383:"MeteringMode",37384:"LightSource",37385:"Flash",41986:"ExposureMode",41987:"WhiteBalance",41990:"SceneCaptureType",41988:"DigitalZoomRatio",41992:"Contrast",41993:"Saturation",41994:"Sharpness"},gps:{0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude"}};t={ColorSpace:{1:"sRGB",0:"Uncalibrated"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{1:"Daylight",2:"Fliorescent",3:"Tungsten",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 -5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire.",1:"Flash fired.",5:"Strobe return light not detected.",7:"Strobe return light detected.",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},ExposureMode:{0:"Auto exposure",1:"Manual exposure",2:"Auto bracket"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},GPSLatitudeRef:{N:"North latitude",S:"South latitude"},GPSLongitudeRef:{E:"East longitude",W:"West longitude"}};function p(u,C){var w=q.SHORT(u),z,F,G,B,A,v,x,D,E=[],y={};for(z=0;z<w;z++){x=v=u+12*z+2;G=C[q.SHORT(x)];if(G===e){continue}B=q.SHORT(x+=2);A=q.LONG(x+=2);x+=4;E=[];switch(B){case 1:case 7:if(A>4){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.BYTE(x+F)}break;case 2:if(A>4){x=q.LONG(x)+o.tiffHeader}y[G]=q.STRING(x,A-1);continue;case 3:if(A>2){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.SHORT(x+F*2)}break;case 4:if(A>1){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.LONG(x+F*4)}break;case 5:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.LONG(x+F*4)/q.LONG(x+F*4+4)}break;case 9:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.SLONG(x+F*4)}break;case 10:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.SLONG(x+F*4)/q.SLONG(x+F*4+4)}break;default:continue}D=(A==1?E[0]:E);if(t.hasOwnProperty(G)&&typeof D!="object"){y[G]=t[G][D]}else{y[G]=D}}return y}function s(){var v=e,u=o.tiffHeader;q.II(q.SHORT(u)==18761);if(q.SHORT(u+=2)!==42){return false}o.IFD0=o.tiffHeader+q.LONG(u+=2);v=p(o.IFD0,n.tiff);o.exifIFD=("ExifIFDPointer" in v?o.tiffHeader+v.ExifIFDPointer:e);o.gpsIFD=("GPSInfoIFDPointer" in v?o.tiffHeader+v.GPSInfoIFDPointer:e);return true}function r(w,u,z){var B,y,x,A=0;if(typeof(u)==="string"){var v=n[w.toLowerCase()];for(hex in v){if(v[hex]===u){u=hex;break}}}B=o[w.toLowerCase()+"IFD"];y=q.SHORT(B);for(i=0;i<y;i++){x=B+12*i+2;if(q.SHORT(x)==u){A=x+8;break}}if(!A){return false}q.LONG(A,z);return true}return{init:function(u){o={tiffHeader:10};if(u===e||!u.length){return false}q.init(u);if(q.SHORT(0)===65505&&q.STRING(4,5).toUpperCase()==="EXIF\0"){return s()}return false},EXIF:function(){var v;v=p(o.exifIFD,n.exif);if(v.ExifVersion&&j.typeOf(v.ExifVersion)==="array"){for(var w=0,u="";w<v.ExifVersion.length;w++){u+=String.fromCharCode(v.ExifVersion[w])}v.ExifVersion=u}return v},GPS:function(){var u;u=p(o.gpsIFD,n.gps);if(u.GPSVersionID){u.GPSVersionID=u.GPSVersionID.join(".")}return u},setExif:function(u,v){if(u!=="PixelXDimension"&&u!=="PixelYDimension"){return false}return r("exif",u,v)},getBinary:function(){return q.SEGMENT()}}}})(window,document,plupload);(function(d,a,b,c){function e(f){return a.getElementById(f)}b.runtimes.Html4=b.addRuntime("html4",{getFeatures:function(){return{multipart:true,triggerDialog:(b.ua.gecko&&d.FormData||b.ua.webkit)}},init:function(f,g){f.bind("Init",function(p){var j=a.body,n,h="javascript",k,x,q,z=[],r=/MSIE/.test(navigator.userAgent),t=[],m=p.settings.filters,o,l,s,w;no_type_restriction:for(o=0;o<m.length;o++){l=m[o].extensions.split(/,/);for(w=0;w<l.length;w++){if(l[w]==="*"){t=[];break no_type_restriction}s=b.mimeTypes[l[w]];if(s&&b.inArray(s,t)===-1){t.push(s)}}}t=t.join(",");function v(){var C,A,y,B;q=b.guid();z.push(q);C=a.createElement("form");C.setAttribute("id","form_"+q);C.setAttribute("method","post");C.setAttribute("enctype","multipart/form-data");C.setAttribute("encoding","multipart/form-data");C.setAttribute("target",p.id+"_iframe");C.style.position="absolute";A=a.createElement("input");A.setAttribute("id","input_"+q);A.setAttribute("type","file");A.setAttribute("accept",t);A.setAttribute("size",1);B=e(p.settings.browse_button);if(p.features.triggerDialog&&B){b.addEvent(e(p.settings.browse_button),"click",function(D){if(!A.disabled){A.click()}D.preventDefault()},p.id)}b.extend(A.style,{width:"100%",height:"100%",opacity:0,fontSize:"99px",cursor:"pointer"});b.extend(C.style,{overflow:"hidden"});y=p.settings.shim_bgcolor;if(y){C.style.background=y}if(r){b.extend(A.style,{filter:"alpha(opacity=0)"})}b.addEvent(A,"change",function(G){var E=G.target,D,F=[],H;if(E.value){e("form_"+q).style.top=-1048575+"px";D=E.value.replace(/\\/g,"/");D=D.substring(D.length,D.lastIndexOf("/")+1);F.push(new b.File(q,D));if(!p.features.triggerDialog){b.removeAllEvents(C,p.id)}else{b.removeEvent(B,"click",p.id)}b.removeEvent(A,"change",p.id);v();if(F.length){f.trigger("FilesAdded",F)}}},p.id);C.appendChild(A);j.appendChild(C);p.refresh()}function u(){var y=a.createElement("div");y.innerHTML='<iframe id="'+p.id+'_iframe" name="'+p.id+'_iframe" src="'+h+':&quot;&quot;" style="display:none"></iframe>';n=y.firstChild;j.appendChild(n);b.addEvent(n,"load",function(D){var E=D.target,C,A;if(!k){return}try{C=E.contentWindow.document||E.contentDocument||d.frames[E.id].document}catch(B){p.trigger("Error",{code:b.SECURITY_ERROR,message:b.translate("Security error."),file:k});return}A=C.documentElement.innerText||C.documentElement.textContent;if(A){k.status=b.DONE;k.loaded=1025;k.percent=100;p.trigger("UploadProgress",k);p.trigger("FileUploaded",k,{response:A})}},p.id)}if(p.settings.container){j=e(p.settings.container);if(b.getStyle(j,"position")==="static"){j.style.position="relative"}}p.bind("UploadFile",function(y,B){var C,A;if(B.status==b.DONE||B.status==b.FAILED||y.state==b.STOPPED){return}C=e("form_"+B.id);A=e("input_"+B.id);A.setAttribute("name",y.settings.file_data_name);C.setAttribute("action",y.settings.url);b.each(b.extend({name:B.target_name||B.name},y.settings.multipart_params),function(F,D){var E=a.createElement("input");b.extend(E,{type:"hidden",name:D,value:F});C.insertBefore(E,C.firstChild)});k=B;e("form_"+q).style.top=-1048575+"px";C.submit()});p.bind("FileUploaded",function(y){y.refresh()});p.bind("StateChanged",function(y){if(y.state==b.STARTED){u()}else{if(y.state==b.STOPPED){d.setTimeout(function(){b.removeEvent(n,"load",y.id);if(n.parentNode){n.parentNode.removeChild(n)}},0)}}b.each(y.files,function(B,A){if(B.status===b.DONE||B.status===b.FAILED){var C=e("form_"+B.id);if(C){C.parentNode.removeChild(C)}}})});p.bind("Refresh",function(A){var G,B,C,D,y,H,I,F,E;G=e(A.settings.browse_button);if(G){y=b.getPos(G,e(A.settings.container));H=b.getSize(G);I=e("form_"+q);F=e("input_"+q);b.extend(I.style,{top:y.y+"px",left:y.x+"px",width:H.w+"px",height:H.h+"px"});if(A.features.triggerDialog){if(b.getStyle(G,"position")==="static"){b.extend(G.style,{position:"relative"})}E=parseInt(G.style.zIndex,10);if(isNaN(E)){E=0}b.extend(G.style,{zIndex:E});b.extend(I.style,{zIndex:E-1})}C=A.settings.browse_button_hover;D=A.settings.browse_button_active;B=A.features.triggerDialog?G:I;if(C){b.addEvent(B,"mouseover",function(){b.addClass(G,C)},A.id);b.addEvent(B,"mouseout",function(){b.removeClass(G,C)},A.id)}if(D){b.addEvent(B,"mousedown",function(){b.addClass(G,D)},A.id);b.addEvent(a.body,"mouseup",function(){b.removeClass(G,D)},A.id)}}});f.bind("FilesRemoved",function(y,B){var A,C;for(A=0;A<B.length;A++){C=e("form_"+B[A].id);if(C){C.parentNode.removeChild(C)}}});f.bind("DisableBrowse",function(y,B){var A=a.getElementById("input_"+q);if(A){A.disabled=B}});f.bind("Destroy",function(y){var A,B,C,D={inputContainer:"form_"+q,inputFile:"input_"+q,browseButton:y.settings.browse_button};for(A in D){B=e(D[A]);if(B){b.removeAllEvents(B,y.id)}}b.removeAllEvents(a.body,y.id);b.each(z,function(F,E){C=e("form_"+F);if(C){C.parentNode.removeChild(C)}})});v()});g({success:true})}})})(window,document,plupload);;
(function ($) {

  // Bind removing of file to selector elements
  function plup_remove_item(selector) {
    $(selector).bind('click', function(event) {
      var parent = $(this).parent();
      var parentsParent = parent.parent();
      parent.remove();
      parentsParent.trigger('formUpdated');
    });
  }

  // Bind resize effect on title and alt fields on focus
  function plup_resize_input(selector) {
    $(selector).bind('focus', function(event) {
      $(this).css('z-index', '10').animate({'width': '300px', 'height': '15px'}, 300);
    });
    $(selector).bind('blur', function(event) {
      $(this).removeAttr('style');
    });
  }

  Drupal.behaviors.plup = {
    attach: function(context, settings) {
      // Will run code only once. Using this instead of .once()
      if (!Drupal.settings.plup.once) {
        /**
         * Initial tasks
         */
        $('#plup-list').sortable(); // Activate sortable
        $('#plup-upload').hide(); // Hide upload button
        var uploader = new plupload.Uploader(Drupal.settings.plup); // Create Plupload instance
        plup_remove_item('.plup-remove-item'); // Bind remove functionality on existing images
        plup_resize_input('#plup-list > li > input.form-text'); // Bind resizing effect on existing inputs

        /**
         * Events
         */
        // Initialization
        uploader.bind('Init', function(up, params) {
          // Nothing to do, just reminder of the presence for this event
        });

        // Starting upload
        uploader.bind('Start', function(up, files) {
          // Nothing to do, just reminder of the presence for this event
        });

        // Upload process state
        uploader.bind('StateChanged', function(up) {
          if (up.state == 2) {
            $('#plup-progress').progressbar(); // Activate progressbar
          }
          if (up.state == 1) {
            $('#plup-progress').progressbar('destroy'); // Destroy progressbar
            $('#plup-upload').hide(); // Hide upload button
            $('.plup-drag-info').show(); // Show info
          }
        });

        // Files were added into queue
        // Only CURRENTLY added files
        uploader.bind('FilesAdded', function(up, files) {
          $('.plup-drag-info').hide(); // Hide info
          $('#plup-upload').show(); // Show upload button

          // Put files visually into queue
          $.each(files, function(i, file) {
            $('#plup-filelist table').append('<tr id="' + file.id + '">' +
              '<td class="plup-filelist-file">' +  file.name + '</td>' +
              '<td class="plup-filelist-size">' + plupload.formatSize(file.size) + '</td>' +
              '<td class="plup-filelist-message"></td>' +
              '<td class="plup-filelist-remove"><a class="plup-remove-file"></a></td>' +
              '</tr>');
            // Bind remove functionality to files added int oqueue
            $('#' + file.id + ' .plup-filelist-remove > a').bind('click', function(event) {
              $('#' + file.id).remove();
              up.removeFile(file);
            });
          });

          up.refresh(); // Refresh for flash or silverlight
        });

        // File was removed from queue
        // Doc states this ARE files but actually it IS a file
        uploader.bind('FilesRemoved', function(up, file) {
          // If there are not files in queue
          if (up.files.length == 0) {
            $('#plup-upload').hide(); // Hide upload button
            $('.plup-drag-info').show(); // Show info
          }
        });

        // File is being uploaded
        uploader.bind('UploadProgress', function(up, file) {
          // Refresh progressbar
          $('#plup-progress').progressbar({value: uploader.total.percent});
        });

        // Error event
        uploader.bind('Error', function(up, err) {
          $('#' + err.file.id + ' > .plup-filelist-message').append('<b>Error: ' + err.message + '</b>');
          up.refresh(); // Refresh for flash or silverlight
        });

        // Event after a file has been uploaded from queue
        uploader.bind('FileUploaded', function(up, file, response) {
          // Respone is object with response parameter so 2x repsone
          var fileSaved = jQuery.parseJSON(response.response);
          var delta = $('#plup-list li').length;
          var name = Drupal.settings.plup.name +'[' + delta + ']';

          // Plupload has weird error handling behavior so we have to check for errors here
          if (fileSaved.error_message) {
            $('#' + file.id + ' > .plup-filelist-message').append('<b>Error: ' + fileSaved.error_message + '</b>');
            up.refresh(); // Refresh for flash or silverlight
            return;
          }

          $('#plup-filelist #' + file.id).remove(); // Remove uploaded file from queue
          var title_field = Drupal.settings.plup.title_field ? '<input title="'+ Drupal.t('Title') +'" type="text" class="form-text" name="'+ name + '[title]" value="" />' : '';
          var alt_field = Drupal.settings.plup.alt_field ? '<input title="'+ Drupal.t('Alternative text') +'" type="text" class="form-text" name="'+ name + '[alt]" value="" />' : '';
          // Add image thumbnail into list of uploaded items
          $('#plup-list').append(
            '<li class="ui-state-default">' +
            '<div class="plup-thumb-wrapper"><img src="'+ Drupal.settings.plup.image_style_path + file.target_name + '" /></div>' +
            '<a class="plup-remove-item"></a>' +
            title_field +
            alt_field +
            '<input type="hidden" name="' + name + '[fid]" value="' + fileSaved.fid + '" />' +
            '<input type="hidden" name="' + name + '[weight]" value="' + delta + '" />' +
            '<input type="hidden" name="' + name + '[rename]" value="' + file.name +'" />' +
            '</li>');
          // Bind remove functionality to uploaded file
          var new_element = $('input[name="'+ name +'[fid]"]');
          var remove_element = $(new_element).siblings('.plup-remove-item');
          plup_remove_item(remove_element);
          // Bind resize effect to inputs of uploaded file
          var text_element = $(new_element).siblings('input.form-text');
          plup_resize_input(text_element);
          // Tell Drupal that form has been updated
          new_element.trigger('formUpdated');
        });

        // All fiels from queue has been uploaded
        uploader.bind('UploadComplete', function(up, files) {
          $('#plup-list').sortable('refresh'); // Refresh sortable
          $('.plup-drag-info').show(); // Show info
        });


        /**
         * Additional tasks
         */
        // Upload button functionality
        $('#' + Drupal.settings.plup.upload).click(function(e) {
          // Forbid upload more than allowed number of files if set
          if (Drupal.settings.plup.max_files > 0) {
            var uploaded = $('#plup-list li').length;
            var selected = $('#plup-filelist td.plup-filelist-file').length;
            var allowed = Drupal.settings.plup.max_files - uploaded;
            if ((selected + uploaded) > Drupal.settings.plup.max_files) {
              alert(Drupal.formatPlural(allowed, 'You can upload only 1 file.', 'You can upload only @count files.'));
              return;
            }
          }
          uploader.start();
          e.preventDefault();
        });

        // Initialize Plupload
        uploader.init();

        // Change weight values for images when reordering using sortable
        $('#plup-list').bind('sortupdate', function(event, ui) {
          $(this).find('li').each(function(index) {
            $(this).find('input[name$="[weight]"]').val(index);
          });
        });


        // Save information that code has run so we don't run it more than once
        Drupal.settings.plup.once = 1;
      }
    }
  }

})(jQuery);;
/*
 * jQuery UI Button 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(a){var g,i=function(b){a(":ui-button",b.target.form).each(function(){var c=a(this).data("button");setTimeout(function(){c.refresh()},1)})},h=function(b){var c=b.name,d=b.form,f=a([]);if(c)f=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return f};a.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",
i);if(typeof this.options.disabled!=="boolean")this.options.disabled=this.element.attr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var b=this,c=this.options,d=this.type==="checkbox"||this.type==="radio",f="ui-state-hover"+(!d?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",
function(){if(!c.disabled){a(this).addClass("ui-state-hover");this===g&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){c.disabled||a(this).removeClass(f)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")});d&&this.element.bind("change.button",function(){b.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).toggleClass("ui-state-active");
b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed",true);var e=b.element[0];h(e).not(e).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");
g=this;a(document).one("mouseup",function(){g=null})}).bind("mouseup.button",function(){if(c.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(e){if(c.disabled)return false;if(e.keyCode==a.ui.keyCode.SPACE||e.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",
c.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){var b=this.element.parents().filter(":last"),c="label[for="+this.element.attr("id")+"]";this.buttonElement=b.find(c);if(!this.buttonElement.length){b=b.length?b.siblings():this.element.siblings();this.buttonElement=b.filter(c);if(!this.buttonElement.length)this.buttonElement=b.find(c)}this.element.addClass("ui-helper-hidden-accessible");
(b=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
this.hasTitle||this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")h(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,f=d.primary&&d.secondary,e=[];if(d.primary||d.secondary){if(this.options.text)e.push("ui-button-text-icon"+(f?"s":d.primary?"-primary":"-secondary"));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){e.push(f?"ui-button-icons-only":
"ui-button-icon-only");this.hasTitle||b.attr("title",c)}}else e.push("ui-button-text-only");b.addClass(e.join(" "))}}});a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},
destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);
;
/*
 * jQuery UI Draggable 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=
this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;return true},_mouseStart:function(a){var b=this.options;this.helper=this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-
this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();
d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||
this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&
this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==
a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone():this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||
0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-
(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),
height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[(a.containment=="document"?0:d(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(a.containment=="document"?0:d(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?
document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){var b=d(a.containment)[0];if(b){a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),
10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0),a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0),a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),
10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom]}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&
d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])e=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])e=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=
this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;e=this.originalPageX+Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0];e=this.containment?!(e-this.offset.click.left<this.containment[0]||e-this.offset.click.left>this.containment[2])?
e:!(e-this.offset.click.left<this.containment[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():
f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,
offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.11"});d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var g=d.data(this,"sortable");if(g&&!g.options.disabled){c.sortables.push({instance:g,shouldRevert:g.options.revert});g.refreshPositions();g._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},
b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=
d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};
a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&
this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",
{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","iframeFix",{start:function(){var a=d(this).data("draggable").options;d(a.iframeFix===true?"iframe":a.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+
"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")})},stop:function(){d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",
a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+
c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<
c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+
c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),
f=c.options,e=f.snapTolerance,g=b.offset.left,n=g+c.helperProportions.width,m=b.offset.top,o=m+c.helperProportions.height,h=c.snapElements.length-1;h>=0;h--){var i=c.snapElements[h].left,k=i+c.snapElements[h].width,j=c.snapElements[h].top,l=j+c.snapElements[h].height;if(i-e<g&&g<k+e&&j-e<m&&m<l+e||i-e<g&&g<k+e&&j-e<o&&o<l+e||i-e<n&&n<k+e&&j-e<m&&m<l+e||i-e<n&&n<k+e&&j-e<o&&o<l+e){if(f.snapMode!="inner"){var p=Math.abs(j-o)<=e,q=Math.abs(l-m)<=e,r=Math.abs(i-n)<=e,s=Math.abs(k-g)<=e;if(p)b.position.top=
c._convertPositionTo("relative",{top:j-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k}).left-c.margins.left}var t=p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(j-m)<=e;q=Math.abs(l-o)<=e;r=Math.abs(i-g)<=e;s=Math.abs(k-n)<=e;if(p)b.position.top=
c._convertPositionTo("relative",{top:j,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[h].snapping&&(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),
{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=p||q||r||s||t}else{c.snapElements[h].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=
parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);
;
/*
 * jQuery UI Position 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,
left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=
k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=
m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=
d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=
a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),
g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);
;
/*
 * jQuery UI Resizable 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==
String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),k=0;k=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,k);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){e(this).removeClass("ui-resizable-autohide");b._handles.show()},function(){if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};
if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),
d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=
this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:
this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",
b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;
f=f?0:c.sizeDiff.width;f={width:c.helper.width()-f,height:c.helper.height()-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",b);this._helper&&this.helper.remove();return false},_updateCache:function(b){this.offset=this.helper.offset();if(l(b.left))this.position.left=b.left;if(l(b.top))this.position.top=b.top;if(l(b.height))this.size.height=b.height;if(l(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,d=this.axis;if(b.height)b.width=c.height*this.aspectRatio;else if(b.width)b.height=c.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=
null}if(d=="nw"){b.top=a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this.options,c=this.axis,d=l(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=l(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=l(b.width)&&a.minWidth&&a.minWidth>b.width,h=l(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+
this.size.height,k=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&k)b.left=i-a.minWidth;if(d&&k)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=
[c.css("borderTopWidth"),c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=
this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,
a){return{width:this.originalSize.width+a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,
c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,
originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,{version:"1.8.11"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=
b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var k=e(this),q=e(this).data("resizable-alsoresize"),p={},r=j&&j.length?j:k.parents(a.originalElement[0]).length?["width","height"]:["width",
"height","top","left"];e.each(r,function(n,o){if((n=(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(k.css("position"))){c._revertToRelativePosition=true;k.css({position:"absolute",top:"auto",left:"auto"})}k.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};
if(b._revertToRelativePosition){b._revertToRelativePosition=false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-
g};g=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,
height:i.height});a._updateCache(i);a._propagate("resize",b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=
e(a),f=[];e(["Top","Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,
d=a.containerOffset,f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?
d.top:0}a.offset.left=a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=
a.size.width/a.aspectRatio}if(d+a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&
/static/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");
b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/
(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,10)||0},l=function(b){return!isNaN(parseInt(b,10))}})(jQuery);
;
/*
 * jQuery UI Dialog 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(c,j){var k={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},l={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true};c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&
c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var a=this,b=a.options,d=b.title||"&#160;",e=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",
-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(i){a.moveToTop(false,i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var f=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role",
"button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);return false}).appendTo(f);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(f);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=
b.beforeclose;f.find("*").add(f).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&
a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d,e;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==b.uiDialog[0]){e=c(this).css("z-index");
isNaN(e)||(d=Math.max(d,e))}});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,e=d.options;if(e.modal&&!a||!e.stack&&!e.modal)return d._trigger("focus",b);if(e.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=e.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};c.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);
d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;a._size();a._position(b.position);d.show(b.show);a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(e){if(e.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),f=g.filter(":first");g=g.filter(":last");if(e.target===g[0]&&!e.shiftKey){f.focus(1);return false}else if(e.target===f[0]&&e.shiftKey){g.focus(1);return false}}});
c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._isOpen=true;a._trigger("open");return a}},_createButtons:function(a){var b=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,function(){return!(d=true)});if(d){c.each(a,function(f,
h){h=c.isFunction(h)?{click:h,text:f}:h;f=c('<button type="button"></button>').attr(h,true).unbind("click").click(function(){h.click.apply(b.element[0],arguments)}).appendTo(g);c.fn.button&&f.button()});e.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(f){return{position:f.position,offset:f.offset}}var b=this,d=b.options,e=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(f,h){g=
d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height()).addClass("ui-dialog-dragging");b._trigger("dragStart",f,a(h))},drag:function(f,h){b._trigger("drag",f,a(h))},stop:function(f,h){d.position=[h.position.left-e.scrollLeft(),h.position.top-e.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);b._trigger("dragStop",f,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(f){return{originalPosition:f.originalPosition,originalSize:f.originalSize,
position:f.position,size:f.size}}a=a===j?this.options.resizable:a;var d=this,e=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:a,start:function(f,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",f,b(h))},resize:function(f,h){d._trigger("resize",f,b(h))},stop:function(f,
h){c(this).removeClass("ui-dialog-resizing");e.height=c(this).height();e.width=c(this).width();d._trigger("resizeStop",f,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(a){var b=[],d=[0,0],e;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):[a[0],a[1]];if(b.length===
1)b[1]=b[0];c.each(["left","top"],function(g,f){if(+b[g]===b[g]){d[g]=b[g];b[g]=f}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(c.extend({of:window},a));e||this.uiDialog.hide()},_setOptions:function(a){var b=this,d={},e=false;c.each(a,function(g,f){b._setOption(g,f);if(g in k)e=true;if(g in
l)d[g]=f});e&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",d)},_setOption:function(a,b){var d=this,e=d.uiDialog;switch(a){case "beforeclose":a="beforeClose";break;case "buttons":d._createButtons(b);break;case "closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case "dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case "disabled":b?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");
break;case "draggable":var g=e.is(":data(draggable)");g&&!b&&e.draggable("destroy");!g&&b&&d._makeDraggable();break;case "position":d._position(b);break;case "resizable":(g=e.is(":data(resizable)"))&&!b&&e.resizable("destroy");g&&typeof b==="string"&&e.resizable("option","handles",b);!g&&b!==false&&d._makeResizable(b);break;case "title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||"&#160;"));break}c.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var a=this.options,b,d,e=
this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();d=Math.max(0,a.minHeight-b);if(a.height==="auto")if(c.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();a=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(a,d))}else this.element.height(Math.max(a.height-b,0));this.uiDialog.is(":data(resizable)")&&
this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.11",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(a){if(this.instances.length===
0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){if(c(d.target).zIndex()<c.ui.dialog.overlay.maxZ)return false})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),
height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){var b=c.inArray(a,this.instances);b!=-1&&this.oldInstances.push(this.instances.splice(b,1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var d=0;c.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,
function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
;
/**
 * This is part of a patch to address a jQueryUI bug.  The bug is responsible
 * for the inability to scroll a page when a modal dialog is active. If the content
 * of the dialog extends beyond the bottom of the viewport, the user is only able
 * to scroll with a mousewheel or up/down keyboard keys.
 *
 * @see http://bugs.jqueryui.com/ticket/4671
 * @see https://bugs.webkit.org/show_bug.cgi?id=19033
 * @see views_ui.module
 * @see js/jquery.ui.dialog.min.js
 *
 * This javascript patch overwrites the $.ui.dialog.overlay.events object to remove
 * the mousedown, mouseup and click events from the list of events that are bound
 * in $.ui.dialog.overlay.create
 *
 * The original code for this object:
 * $.ui.dialog.overlay.events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
 *  function(event) { return event + '.dialog-overlay'; }).join(' '),
 *
 */

(function ($, undefined) {
  if ($.ui && $.ui.dialog) {
    $.ui.dialog.overlay.events = $.map('focus,keydown,keypress'.split(','),
                                 function(event) { return event + '.dialog-overlay'; }).join(' ');
  }
}(jQuery));
;

(function ($) {

Drupal.behaviors.tokenTree = {
  attach: function (context, settings) {
    $('table.token-tree', context).once('token-tree', function () {
      $(this).treeTable();
    });
  }
};

Drupal.behaviors.tokenDialog = {
  attach: function (context, settings) {
    $('a.token-dialog', context).once('token-dialog').click(function() {
      var url = $(this).attr('href');
      var dialog = $('<div style="display: none" class="loading">' + Drupal.t('Loading token browser...') + '</div>').appendTo('body');

      // Emulate the AJAX data sent normally so that we get the same theme.
      var data = {};
      data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
      data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;

      dialog.dialog({
        title: $(this).attr('title') || Drupal.t('Available tokens'),
        width: 700,
        close: function(event, ui) {
          dialog.remove();
        }
      });
      // Load the token tree using AJAX.
      dialog.load(
        url,
        data,
        function (responseText, textStatus, XMLHttpRequest) {
          dialog.removeClass('loading');
        }
      );
      // Prevent browser from following the link.
      return false;
    });
  }
}

Drupal.behaviors.tokenInsert = {
  attach: function (context, settings) {
    // Keep track of which textfield was last selected/focused.
    $('textarea, input[type="text"]', context).focus(function() {
      Drupal.settings.tokenFocusedField = this;
    });

    $('.token-click-insert .token-key', context).once('token-click-insert', function() {
      var newThis = $('<a href="javascript:void(0);" title="' + Drupal.t('Insert this token into your form') + '">' + $(this).html() + '</a>').click(function(){
        if (typeof Drupal.settings.tokenFocusedField == 'undefined') {
          alert(Drupal.t('First click a text field to insert your tokens into.'));
        }
        else {
          var myField = Drupal.settings.tokenFocusedField;
          var myValue = $(this).text();

          //IE support
          if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
          }

          //MOZILLA/NETSCAPE support
          else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                          + myValue
                          + myField.value.substring(endPos, myField.value.length);
          } else {
            myField.value += myValue;
          }

          $('html,body').animate({scrollTop: $(myField).offset().top}, 500);
        }
        return false;
      });
      $(this).html(newThis);
    });
  }
};

})(jQuery);
;

(function ($) {

/**
 * This script transforms a set of fieldsets into a stack of vertical
 * tabs. Another tab pane can be selected by clicking on the respective
 * tab.
 *
 * Each tab may have a summary which can be updated by another
 * script. For that to work, each fieldset has an associated
 * 'verticalTabCallback' (with jQuery.data() attached to the fieldset),
 * which is called every time the user performs an update to a form
 * element inside the tab pane.
 */
Drupal.behaviors.verticalTabs = {
  attach: function (context) {
    $('.vertical-tabs-panes', context).once('vertical-tabs', function () {
      var focusID = $(':hidden.vertical-tabs-active-tab', this).val();
      var tab_focus;

      // Check if there are some fieldsets that can be converted to vertical-tabs
      var $fieldsets = $('> fieldset', this);
      if ($fieldsets.length == 0) {
        return;
      }

      // Create the tab column.
      var tab_list = $('<ul class="vertical-tabs-list"></ul>');
      $(this).wrap('<div class="vertical-tabs clearfix"></div>').before(tab_list);

      // Transform each fieldset into a tab.
      $fieldsets.each(function () {
        var vertical_tab = new Drupal.verticalTab({
          title: $('> legend', this).text(),
          fieldset: $(this)
        });
        tab_list.append(vertical_tab.item);
        $(this)
          .removeClass('collapsible collapsed')
          .addClass('vertical-tabs-pane')
          .data('verticalTab', vertical_tab);
        if (this.id == focusID) {
          tab_focus = $(this);
        }
      });

      $('> li:first', tab_list).addClass('first');
      $('> li:last', tab_list).addClass('last');

      if (!tab_focus) {
        // If the current URL has a fragment and one of the tabs contains an
        // element that matches the URL fragment, activate that tab.
        if (window.location.hash && $(this).find(window.location.hash).length) {
          tab_focus = $(this).find(window.location.hash).closest('.vertical-tabs-pane');
        }
        else {
          tab_focus = $('> .vertical-tabs-pane:first', this);
        }
      }
      if (tab_focus.length) {
        tab_focus.data('verticalTab').focus();
      }
    });
  }
};

/**
 * The vertical tab object represents a single tab within a tab group.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 *   - fieldset: The jQuery object of the fieldset that is the tab pane.
 */
Drupal.verticalTab = function (settings) {
  var self = this;
  $.extend(this, settings, Drupal.theme('verticalTab', settings));

  this.link.click(function () {
    self.focus();
    return false;
  });

  // Keyboard events added:
  // Pressing the Enter key will open the tab pane.
  this.link.keydown(function(event) {
    if (event.keyCode == 13) {
      self.focus();
      // Set focus on the first input field of the visible fieldset/tab pane.
      $("fieldset.vertical-tabs-pane :input:visible:enabled:first").focus();
      return false;
    }
  });

  this.fieldset
    .bind('summaryUpdated', function () {
      self.updateSummary();
    })
    .trigger('summaryUpdated');
};

Drupal.verticalTab.prototype = {
  /**
   * Displays the tab's content pane.
   */
  focus: function () {
    this.fieldset
      .siblings('fieldset.vertical-tabs-pane')
        .each(function () {
          var tab = $(this).data('verticalTab');
          tab.fieldset.hide();
          tab.item.removeClass('selected');
        })
        .end()
      .show()
      .siblings(':hidden.vertical-tabs-active-tab')
        .val(this.fieldset.attr('id'));
    this.item.addClass('selected');
    // Mark the active tab for screen readers.
    $('#active-vertical-tab').remove();
    this.link.append('<span id="active-vertical-tab" class="element-invisible">' + Drupal.t('(active tab)') + '</span>');
  },

  /**
   * Updates the tab's summary.
   */
  updateSummary: function () {
    this.summary.html(this.fieldset.drupalGetSummary());
  },

  /**
   * Shows a vertical tab pane.
   */
  tabShow: function () {
    // Display the tab.
    this.item.show();
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.vertical-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Display the fieldset.
    this.fieldset.removeClass('vertical-tab-hidden').show();
    // Focus this tab.
    this.focus();
    return this;
  },

  /**
   * Hides a vertical tab pane.
   */
  tabHide: function () {
    // Hide this tab.
    this.item.hide();
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.vertical-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Hide the fieldset.
    this.fieldset.addClass('vertical-tab-hidden').hide();
    // Focus the first visible tab (if there is one).
    var $firstTab = this.fieldset.siblings('.vertical-tabs-pane:not(.vertical-tab-hidden):first');
    if ($firstTab.length) {
      $firstTab.data('verticalTab').focus();
    }
    return this;
  }
};

/**
 * Theme function for a vertical tab.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 * @return
 *   This function has to return an object with at least these keys:
 *   - item: The root tab jQuery element
 *   - link: The anchor tag that acts as the clickable area of the tab
 *       (jQuery version)
 *   - summary: The jQuery element that contains the tab summary
 */
Drupal.theme.prototype.verticalTab = function (settings) {
  var tab = {};
  tab.item = $('<li class="vertical-tab-button" tabindex="-1"></li>')
    .append(tab.link = $('<a href="#"></a>')
      .append(tab.title = $('<strong></strong>').text(settings.title))
      .append(tab.summary = $('<span class="summary"></span>')
    )
  );
  return tab;
};

})(jQuery);
;
/**
 * @file
 * Attaches behaviors for the Contextual module.
 */

(function ($) {

Drupal.contextualLinks = Drupal.contextualLinks || {};

/**
 * Attaches outline behavior for regions associated with contextual links.
 */
Drupal.behaviors.contextualLinks = {
  attach: function (context) {
    $('div.contextual-links-wrapper', context).once('contextual-links', function () {
      var $wrapper = $(this);
      var $region = $wrapper.closest('.contextual-links-region');
      var $links = $wrapper.find('ul.contextual-links');
      var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Drupal.t('Configure')).click(
        function () {
          $links.stop(true, true).slideToggle(100);
          $wrapper.toggleClass('contextual-links-active');
          return false;
        }
      );
      // Attach hover behavior to trigger and ul.contextual-links.
      $trigger.add($links).hover(
        function () { $region.addClass('contextual-links-region-active'); },
        function () { $region.removeClass('contextual-links-region-active'); }
      );
      // Hide the contextual links when user clicks a link or rolls out of the .contextual-links-region.
      $region.bind('mouseleave click', Drupal.contextualLinks.mouseleave);
      // Prepend the trigger.
      $wrapper.prepend($trigger);
    });
  }
};

/**
 * Disables outline for the region contextual links are associated with.
 */
Drupal.contextualLinks.mouseleave = function () {
  $(this)
    .find('.contextual-links-active').removeClass('contextual-links-active')
    .find('ul.contextual-links').hide();
};

})(jQuery);
;
(function ($) {

/**
 * Retrieves the summary for the first element.
 */
$.fn.drupalGetSummary = function () {
  var callback = this.data('summaryCallback');
  return (this[0] && callback) ? $.trim(callback(this[0])) : '';
};

/**
 * Sets the summary for all matched elements.
 *
 * @param callback
 *   Either a function that will be called each time the summary is
 *   retrieved or a string (which is returned each time).
 */
$.fn.drupalSetSummary = function (callback) {
  var self = this;

  // To facilitate things, the callback should always be a function. If it's
  // not, we wrap it into an anonymous function which just returns the value.
  if (typeof callback != 'function') {
    var val = callback;
    callback = function () { return val; };
  }

  return this
    .data('summaryCallback', callback)
    // To prevent duplicate events, the handlers are first removed and then
    // (re-)added.
    .unbind('formUpdated.summary')
    .bind('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // The actual summaryUpdated handler doesn't fire when the callback is
    // changed, so we have to do this manually.
    .trigger('summaryUpdated');
};

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Drupal.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').andSelf().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .unbind(events).bind(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Drupal.behaviors.fillUserInfoFromCookie = {
  attach: function (context, settings) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['name', 'mail', 'homepage'], function () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Drupal.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * The base States namespace.
 *
 * Having the local states variable allows us to use the States namespace
 * without having to always declare "Drupal.states".
 */
var states = Drupal.states = {
  // An array of functions that should be postponed.
  postponed: []
};

/**
 * Attaches the states.
 */
Drupal.behaviors.states = {
  attach: function (context, settings) {
    for (var selector in settings.states) {
      for (var state in settings.states[selector]) {
        new states.Dependent({
          element: $(selector),
          state: states.State.sanitize(state),
          dependees: settings.states[selector][state]
        });
      }
    }

    // Execute all postponed functions now.
    while (states.postponed.length) {
      (states.postponed.shift())();
    }
  }
};

/**
 * Object representing an element that depends on other elements.
 *
 * @param args
 *   Object with the following keys (all of which are required):
 *   - element: A jQuery object of the dependent element
 *   - state: A State object describing the state that is dependent
 *   - dependees: An object with dependency specifications. Lists all elements
 *     that this element depends on.
 */
states.Dependent = function (args) {
  $.extend(this, { values: {}, oldValue: undefined }, args);

  for (var selector in this.dependees) {
    this.initializeDependee(selector, this.dependees[selector]);
  }
};

/**
 * Comparison functions for comparing the value of an element with the
 * specification from the dependency settings. If the object type can't be
 * found in this list, the === operator is used by default.
 */
states.Dependent.comparisons = {
  'RegExp': function (reference, value) {
    return reference.test(value);
  },
  'Function': function (reference, value) {
    // The "reference" variable is a comparison function.
    return reference(value);
  },
  'Number': function (reference, value) {
    // If "reference" is a number and "value" is a string, then cast reference
    // as a string before applying the strict comparison in compare(). Otherwise
    // numeric keys in the form's #states array fail to match string values
    // returned from jQuery's val().
    return (value.constructor.name === 'String') ? compare(String(reference), value) : compare(reference, value);
  }
};

states.Dependent.prototype = {
  /**
   * Initializes one of the elements this dependent depends on.
   *
   * @param selector
   *   The CSS selector describing the dependee.
   * @param dependeeStates
   *   The list of states that have to be monitored for tracking the
   *   dependee's compliance status.
   */
  initializeDependee: function (selector, dependeeStates) {
    var self = this;

    // Cache for the states of this dependee.
    self.values[selector] = {};

    $.each(dependeeStates, function (state, value) {
      state = states.State.sanitize(state);

      // Initialize the value of this state.
      self.values[selector][state.pristine] = undefined;

      // Monitor state changes of the specified state for this dependee.
      $(selector).bind('state:' + state, function (e) {
        var complies = self.compare(value, e.value);
        self.update(selector, state, complies);
      });

      // Make sure the event we just bound ourselves to is actually fired.
      new states.Trigger({ selector: selector, state: state });
    });
  },

  /**
   * Compares a value with a reference value.
   *
   * @param reference
   *   The value used for reference.
   * @param value
   *   The value to compare with the reference value.
   * @return
   *   true, undefined or false.
   */
  compare: function (reference, value) {
    if (reference.constructor.name in states.Dependent.comparisons) {
      // Use a custom compare function for certain reference value types.
      return states.Dependent.comparisons[reference.constructor.name](reference, value);
    }
    else {
      // Do a plain comparison otherwise.
      return compare(reference, value);
    }
  },

  /**
   * Update the value of a dependee's state.
   *
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   * @param value
   *   The new value for the dependee's updated state.
   */
  update: function (selector, state, value) {
    // Only act when the 'new' value is actually new.
    if (value !== this.values[selector][state.pristine]) {
      this.values[selector][state.pristine] = value;
      this.reevaluate();
    }
  },

  /**
   * Triggers change events in case a state changed.
   */
  reevaluate: function () {
    var value = undefined;

    // Merge all individual values to find out whether this dependee complies.
    for (var selector in this.values) {
      for (var state in this.values[selector]) {
        state = states.State.sanitize(state);
        var complies = this.values[selector][state.pristine];
        value = ternary(value, invert(complies, state.invert));
      }
    }

    // Only invoke a state change event when the value actually changed.
    if (value !== this.oldValue) {
      // Store the new value so that we can compare later whether the value
      // actually changed.
      this.oldValue = value;

      // Normalize the value to match the normalized state name.
      value = invert(value, this.state.invert);

      // By adding "trigger: true", we ensure that state changes don't go into
      // infinite loops.
      this.element.trigger({ type: 'state:' + this.state, value: value, trigger: true });
    }
  }
};

states.Trigger = function (args) {
  $.extend(this, args);

  if (this.state in states.Trigger.states) {
    this.element = $(this.selector);

    // Only call the trigger initializer when it wasn't yet attached to this
    // element. Otherwise we'd end up with duplicate events.
    if (!this.element.data('trigger:' + this.state)) {
      this.initialize();
    }
  }
};

states.Trigger.prototype = {
  initialize: function () {
    var self = this;
    var trigger = states.Trigger.states[this.state];

    if (typeof trigger == 'function') {
      // We have a custom trigger initialization function.
      trigger.call(window, this.element);
    }
    else {
      $.each(trigger, function (event, valueFn) {
        self.defaultTrigger(event, valueFn);
      });
    }

    // Mark this trigger as initialized for this element.
    this.element.data('trigger:' + this.state, true);
  },

  defaultTrigger: function (event, valueFn) {
    var self = this;
    var oldValue = valueFn.call(this.element);

    // Attach the event callback.
    this.element.bind(event, function (e) {
      var value = valueFn.call(self.element, e);
      // Only trigger the event if the value has actually changed.
      if (oldValue !== value) {
        self.element.trigger({ type: 'state:' + self.state, value: value, oldValue: oldValue });
        oldValue = value;
      }
    });

    states.postponed.push(function () {
      // Trigger the event once for initialization purposes.
      self.element.trigger({ type: 'state:' + self.state, value: oldValue, oldValue: undefined });
    });
  }
};

/**
 * This list of states contains functions that are used to monitor the state
 * of an element. Whenever an element depends on the state of another element,
 * one of these trigger functions is added to the dependee so that the
 * dependent element can be updated.
 */
states.Trigger.states = {
  // 'empty' describes the state to be monitored
  empty: {
    // 'keyup' is the (native DOM) event that we watch for.
    'keyup': function () {
      // The function associated to that trigger returns the new value for the
      // state.
      return this.val() == '';
    }
  },

  checked: {
    'change': function () {
      return this.prop('checked');
    }
  },

  // For radio buttons, only return the value if the radio button is selected.
  value: {
    'keyup': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    },
    'change': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    }
  },

  collapsed: {
    'collapsed': function(e) {
      return (e !== undefined && 'value' in e) ? e.value : this.is('.collapsed');
    }
  }
};


/**
 * A state object is used for describing the state and performing aliasing.
 */
states.State = function(state) {
  // We may need the original unresolved name later.
  this.pristine = this.name = state;

  // Normalize the state name.
  while (true) {
    // Iteratively remove exclamation marks and invert the value.
    while (this.name.charAt(0) == '!') {
      this.name = this.name.substring(1);
      this.invert = !this.invert;
    }

    // Replace the state with its normalized name.
    if (this.name in states.State.aliases) {
      this.name = states.State.aliases[this.name];
    }
    else {
      break;
    }
  }
};

/**
 * Create a new State object by sanitizing the passed value.
 */
states.State.sanitize = function (state) {
  if (state instanceof states.State) {
    return state;
  }
  else {
    return new states.State(state);
  }
};

/**
 * This list of aliases is used to normalize states and associates negated names
 * with their respective inverse state.
 */
states.State.aliases = {
  'enabled': '!disabled',
  'invisible': '!visible',
  'invalid': '!valid',
  'untouched': '!touched',
  'optional': '!required',
  'filled': '!empty',
  'unchecked': '!checked',
  'irrelevant': '!relevant',
  'expanded': '!collapsed',
  'readwrite': '!readonly'
};

states.State.prototype = {
  invert: false,

  /**
   * Ensures that just using the state object returns the name.
   */
  toString: function() {
    return this.name;
  }
};

/**
 * Global state change handlers. These are bound to "document" to cover all
 * elements whose state changes. Events sent to elements within the page
 * bubble up to these handlers. We use this system so that themes and modules
 * can override these state change handlers for particular parts of a page.
 */
{
  $(document).bind('state:disabled', function(e) {
    // Only act when this change was triggered by a dependency and not by the
    // element monitoring itself.
    if (e.trigger) {
      $(e.target)
        .attr('disabled', e.value)
        .filter('.form-element')
          .closest('.form-item, .form-submit, .form-wrapper')[e.value ? 'addClass' : 'removeClass']('form-disabled');

      // Note: WebKit nightlies don't reflect that change correctly.
      // See https://bugs.webkit.org/show_bug.cgi?id=23789
    }
  });

  $(document).bind('state:required', function(e) {
    if (e.trigger) {
      if (e.value) {
        $(e.target).closest('.form-item, .form-wrapper').find('label').append('<span class="form-required">*</span>');
      }
      else {
        $(e.target).closest('.form-item, .form-wrapper').find('label .form-required').remove();
      }
    }
  });

  $(document).bind('state:visible', function(e) {
    if (e.trigger) {
      $(e.target).closest('.form-item, .form-submit, .form-wrapper')[e.value ? 'show' : 'hide']();
    }
  });

  $(document).bind('state:checked', function(e) {
    if (e.trigger) {
      $(e.target).prop('checked', e.value);
    }
  });

  $(document).bind('state:collapsed', function(e) {
    if (e.trigger) {
      if ($(e.target).is('.collapsed') !== e.value) {
        $('> legend a', e.target).click();
      }
    }
  });
}

/**
 * These are helper functions implementing addition "operators" and don't
 * implement any logic that is particular to states.
 */
{
  // Bitwise AND with a third undefined state.
  function ternary (a, b) {
    return a === undefined ? b : (b === undefined ? a : a && b);
  };

  // Inverts a (if it's not undefined) when invert is true.
  function invert (a, invert) {
    return (invert && a !== undefined) ? !a : a;
  };

  // Compares two values while ignoring undefined values.
  function compare (a, b) {
    return (a === b) ? (a === undefined ? a : true) : (a === undefined || b === undefined);
  }
}

})(jQuery);
;
