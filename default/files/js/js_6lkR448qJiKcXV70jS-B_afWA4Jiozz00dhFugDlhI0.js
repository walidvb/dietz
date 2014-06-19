
(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = $('form#views-exposed-form-'+ settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Add the ajax to pagers.
  this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
    .filter(jQuery.proxy(this.filterNestedViews, this))
    .once(jQuery.proxy(this.attachPagerAjax, this));
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

})(jQuery);
;
/*!
* jQuery Cycle2; ver: 20121204
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2012 M. Alsup; Dual licensed: MIT/GPL
*/
(function(a){function c(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))}function d(a){return(a||"").toLowerCase()}"use strict";var b="20121125.2";a.fn.cycle=function(b){var e;return this.length===0&&!a.isReady?(e={s:this.selector,c:this.context},c("requeuing slideshow (dom not ready)"),a(function(){a(e.s,e.c).cycle(b)}),this):this.each(function(){var e,f,g,h,i=a(this);if(i.data("cycle.opts"))return;if(i.data("cycle-log")===!1||b&&b.log===!1||f&&f.log===!1)c=a.noop;c("--c2 init--"),e=i.data();for(var j in e)e.hasOwnProperty(j)&&/^cycle[A-Z]+/.test(j)&&(h=e[j],g=j.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,d),c(g+":",h,"("+typeof h+")"),e[g]=h);f=a.extend({},a.fn.cycle.defaults,e,b||{}),f.timeoutId=0,f.paused=0,f.container=i,f._maxZ=f.maxZ,f.API=a.extend({_container:i},a.fn.cycle.API),f.API.log=c,f.API.trigger=function(a,b){return f.container.trigger(a,b),f.API},i.data("cycle.opts",f),i.data("cycle.API",f.API),f.API.trigger("cycle-bootstrap",[f,f.API]),f.API.addInitialSlides(),f.API.preInitSlideshow(),f.slides.length&&f.API.initSlideshow()})},a.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var b=this.opts(),c=b.slides;b.slideCount=0,b.slides=a(),c=c.jquery?c:b.container.find(c),b.random&&c.sort(function(){return Math.random()-.5}),b.API.add(c)},preInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-pre-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.preInit)&&c.preInit(b),b._preInitialized=!0},postInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-post-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.postInit)&&c.postInit(b)},initSlideshow:function(){var b=this.opts(),c=b.container;b.API.calcFirstSlide(),b.container.css("position")=="static"&&b.container.css("position","relative"),a(b.slides[b.currSlide]).css("opacity",1).show(),b.API.stackSlides(b.slides[b.currSlide],b.slides[b.nextSlide],!b.reverse),b.pauseOnHover&&(b.pauseOnHover!==!0&&(c=a(b.pauseOnHover)),c.hover(function(){b.paused=1,b.API.trigger("cycle-paused",[b])},function(){b.paused=0,b.API.trigger("cycle-resumed",[b])})),b.timeout&&(b.timeoutId=setTimeout(function(){b.API.prepareTx(!1,!b.reverse)},b.timeout+b.delay)),b._initialized=!0,b.API.updateView(!0),b.container.on("cycle-paused cycle-resumed",function(a){b.container[a.type==="cycle-paused"?"addClass":"removeClass"]("cycle-paused")}),b.API.trigger("cycle-initialized",[b]),b.API.postInitSlideshow()},add:function(b,c){var d=this.opts(),e=d.slideCount,f=!1,g;a(b).each(function(b){var e,f=a(this);c?d.container.prepend(f):d.container.append(f),d.slideCount++,e=d.API.buildSlideOpts(f),c?d.slides=a(f).add(d.slides):d.slides=d.slides.add(f),d.API.initSlide(e,f,--d._maxZ),f.data("cycle.opts",e),d.API.trigger("cycle-slide-added",[d,e,f])}),d.API.updateView(!0),f=d._preInitialized&&e<2&&d.slideCount>=1,f&&(d._initialized?d.timeout&&(g=d.slides.length,d.nextSlide=d.reverse?g-1:1):d.API.initSlideshow())},calcFirstSlide:function(){var a=this.opts(),b;b=parseInt(a.startingSlide||0,10);if(b>=a.slides.length||b<0)b=0;a.currSlide=b,a.reverse?(a.nextSlide=b-1,a.nextSlide<0&&(a.nextSlide=a.slides.length-1)):(a.nextSlide=b+1,a.nextSlide==a.slides.length&&(a.nextSlide=0))},calcNextSlide:function(){var a=this.opts(),b;a.reverse?(b=a.nextSlide-1<0,a.nextSlide=b?a.slideCount-1:a.nextSlide-1,a.currSlide=b?0:a.nextSlide+1):(b=a.nextSlide+1==a.slides.length,a.nextSlide=b?0:a.nextSlide+1,a.currSlide=b?a.slides.length-1:a.nextSlide-1)},calcTx:function(b,d){var e=b,f;return d&&e.manualFx&&(f=a.fn.cycle.transitions[e.manualFx]),f||(f=a.fn.cycle.transitions[e.fx]),f||(f=a.fn.cycle.transitions.fade,c('Transition "'+e.fx+'" not found.  Using fade.')),f},prepareTx:function(a,b){var c=this.opts(),d,e,f,g,h;if(c.slideCount<2){c.timeoutId=0;return}a&&(c.API.stopTransition(),c.busy=!1,clearTimeout(c.timeoutId),c.timeoutId=0);if(c.busy)return;if(c.timeoutId===0&&!a)return;e=c.slides[c.currSlide],f=c.slides[c.nextSlide],g=c.API.getSlideOpts(c.nextSlide),h=c.API.calcTx(g,a),c._tx=h,a&&g.manualSpeed!==undefined&&(g.speed=g.manualSpeed),c.nextSlide!=c.currSlide&&(a||!c.paused&&c.timeout)?(c.API.trigger("cycle-before",[g,e,f,b]),h.before&&h.before(g,e,f,b),d=function(){c.busy=!1,h.after&&h.after(g,e,f,b),c.API.trigger("cycle-after",[g,e,f,b]),c.API.queueTransition(g),c.API.updateView(!0)},c.busy=!0,h.transition?h.transition(g,e,f,b,d):c.API.doTransition(g,e,f,b,d),c.API.calcNextSlide(),c.updateView<0&&c.API.updateView()):c.API.queueTransition(g)},doTransition:function(b,c,d,e,f){var g=b,h=a(c),i=a(d),j=function(){i.animate(g.animIn||{opacity:1},g.speed,g.easeIn||g.easing,f)};i.css(g.cssBefore||{}),h.animate(g.animOut||{},g.speed,g.easeOut||g.easing,function(){h.css(g.cssAfter||{}),g.sync||j()}),g.sync&&j()},queueTransition:function(a){var b=this.opts();if(b.nextSlide===0&&--b.loop===0){b.API.log("terminating; loop=0"),b.timeout=0,b.API.trigger("cycle-finished",[b]),b.nextSlide=b.currSlide;return}a.timeout&&(b.timeoutId=setTimeout(function(){b.API.prepareTx(!1,!b.reverse)},a.timeout))},stopTransition:function(){var a=this.opts();a.slides.filter(":animated").length&&(a.slides.stop(!1,!0),a.API.trigger("cycle-transition-stopped",[a])),a._tx&&a._tx.stopTransition&&a._tx.stopTransition(a)},advanceSlide:function(a){var b=this.opts();return clearTimeout(b.timeoutId),b.timeoutId=0,b.nextSlide=b.currSlide+a,b.nextSlide<0?b.nextSlide=b.slides.length-1:b.nextSlide>=b.slides.length&&(b.nextSlide=0),b.API.prepareTx(!0,a>=0),!1},buildSlideOpts:function(b){var e=this.opts(),f,g,h=b.data()||{};for(var i in h)h.hasOwnProperty(i)&&/^cycle[A-Z]+/.test(i)&&(f=h[i],g=i.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,d),c("["+(e.slideCount-1)+"]",g+":",f,"("+typeof f+")"),h[g]=f);h=a.extend({},a.fn.cycle.defaults,e,h),h.slideNum=e.slideCount;try{delete h.API,delete h.slideCount,delete h.currSlide,delete h.nextSlide,delete h.slides}catch(j){}return h},getSlideOpts:function(b){var c=this.opts();b===undefined&&(b=c.currSlide);var d=c.slides[b],e=a(d).data("cycle.opts");return a.extend({},c,e)},initSlide:function(b,c,d){var e=this.opts();c.css(b.slideCss||{}),d>0&&c.css("zIndex",d),isNaN(b.speed)&&(b.speed=a.fx.speeds[b.speed]||a.fx.speeds._default),b.sync||(b.speed=b.speed/2),c.addClass(e.slideClass)},updateView:function(a){var b=this.opts();if(!b._initialized)return;var c=b.API.getSlideOpts(),d=b.slides[b.currSlide];b.slideActiveClass&&b.slides.removeClass(b.slideActiveClass).eq(b.currSlide).addClass(b.slideActiveClass),a&&b.hideNonActive&&b.slides.filter(":not(."+b.slideActiveClass+")").hide(),b.API.trigger("cycle-update-view",[b,c,d])},getComponent:function(b){var c=this.opts(),d=c[b];return typeof d=="string"?/^\s*\>/.test(d)?c.container.find(d):a(d):d.jquery?d:a(d)},stackSlides:function(b,c,d){var e=this.opts();b||(b=e.slides[e.currSlide],c=e.slides[e.nextSlide],d=!e.reverse),a(b).css("zIndex",e.maxZ);var f,g=e.maxZ-2,h=e.slideCount;if(d){for(f=e.currSlide+1;f<h;f++)a(e.slides[f]).css("zIndex",g--);for(f=0;f<e.currSlide;f++)a(e.slides[f]).css("zIndex",g--)}else{for(f=e.currSlide-1;f>=0;f--)a(e.slides[f]).css("zIndex",g--);for(f=h-1;f>e.currSlide;f--)a(e.slides[f]).css("zIndex",g--)}a(c).css("zIndex",e.maxZ-1)},getSlideIndex:function(a){return this.opts().slides.index(a)}},a.fn.cycle.log=c,a.fn.cycle.version=function(){return"Cycle2: "+b},a.fn.cycle.transitions={custom:{},none:{before:function(a,b,c,d){a.API.stackSlides(c,b,d),a.cssBefore={opacity:1,display:"block"}}},fade:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:0,display:"block"}),b.animIn={opacity:1},b.animOut={opacity:0}}},fadeout:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:1,display:"block"}),b.animOut={opacity:0}}},scrollHorz:{before:function(a,b,c,d){a.API.stackSlides(b,c,d);var e=a.container.css("overflow","hidden").width();a.cssBefore={left:d?e:-e,top:0,opacity:1,display:"block"},a.cssAfter={zIndex:a._maxZ-2},a.animIn={left:0},a.animOut={left:d?-e:e}}}},a.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:undefined,manualSpeed:undefined,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:-1},a(document).ready(function(){a(a.fn.cycle.defaults.autoSelector).cycle()})})(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{autoHeight:0}),a(document).on("cycle-initialized",function(b,c){function h(){c.container.height(c.container.width()/g)}var d=c.autoHeight,e=-1,f,g;d==="calc"||a.type(d)=="number"&&d>=0?(d==="calc"?c.slides.each(function(b){var c=a(this).height();c>e&&(e=c,d=b)}):d>=c.slides.length&&(d=0),f=a(c.slides[d]).clone(),f.removeAttr("id").find("[id]").removeAttr("id"),f.removeAttr("name").find("[name]").removeAttr("name"),f.css({position:"static",visibility:"hidden",display:"block"}).prependTo(c.container).removeClass().addClass("cycle-sentinel cycle-slide"),c._sentinel=f):a.type(d)=="string"&&/\d+\:\d+/.test(d)&&(g=d.match(/(\d+)\:(\d+)/),g=g[1]/g[2],a(window).on("resize",h),c._autoHeightOnResize=h,setTimeout(function(){a(window).triggerHandler("resize")},15))}),a(document).on("cycle-destroyed",function(b,c){c._sentinel&&c._sentinel.remove(),c._autoHeightOnResize&&a(window).off("resize",c._autoHeightOnResize)})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>"}),a(document).on("cycle-update-view",function(b,c,d,e){var f;a.each(["caption","overlay"],function(){var a=this,b=d[a+"Template"],f=c.API.getComponent(a);f.length&&b?(f.html(c.API.tmpl(b,d,c,e)),f.show()):f.hide()})}),a(document).on("cycle-destroyed",function(b,c){var d;a.each(["caption","overlay"],function(){var a=this,b=c[a+"Template"];c[a]&&b&&(d=c.API.getComponent("caption"),d.empty())})})}(jQuery),function(a){"use strict";var b=a.fn.cycle;a.fn.cycle=function(c){var d,e,f,g=a.makeArray(arguments);return a.type(c)=="number"?this.cycle("goto",c):a.type(c)=="string"?this.each(function(){var h;d=c,f=a(this).data("cycle.opts");if(f===undefined){b.log('slideshow must be initialized before sending commands; "'+d+'" ignored');return}d=d=="goto"?"jump":d,e=f.API[d];if(a.isFunction(e))return h=a.makeArray(g),h.shift(),e.apply(f.API,h);b.log("unknown command: ",d)}):b.apply(this,arguments)},a.extend(a.fn.cycle,b),a.extend(b.API,{next:function(){var a=this.opts(),b=a.reverse?-1:1;if(a.allowWrap===!1&&a.currSlide+b>=a.slideCount)return;a.API.advanceSlide(b),a.API.trigger("cycle-next",[a]).log("cycle-next")},prev:function(){var a=this.opts(),b=a.reverse?1:-1;if(a.allowWrap===!1&&a.currSlide+b<0)return;a.API.advanceSlide(b),a.API.trigger("cycle-prev",[a]).log("cycle-prev")},destroy:function(){var a=this.opts();clearTimeout(a.timeoutId),a.timeoutId=0,a.API.stop(),a.API.trigger("cycle-destroyed",[a]).log("cycle-destroyed"),a.container.removeData("cycle.opts")},jump:function(a){var b,c=this.opts(),d=parseInt(a,10);if(isNaN(d)||d<0||d>=c.slides.length){c.API.log("goto: invalid slide index: "+d);return}if(d==c.currSlide){c.API.log("goto: skipping, already on slide",d);return}c.nextSlide=d,clearTimeout(c.timeoutId),c.timeoutId=0,c.API.log("goto: ",d," (zero-index)"),b=c.currSlide<c.nextSlide,c.API.prepareTx(!0,b)},stop:function(){var b=this.opts(),c=b.container;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stopTransition(),b.pauseOnHover&&(b.pauseOnHover!==!0&&(c=a(b.pauseOnHover)),c.off("mouseenter mouseleave")),b.API.trigger("cycle-stopped",[b]).log("cycle-stopped")},pause:function(){var a=this.opts();a.paused=!0,a.API.trigger("cycle-paused",[a]).log("cycle-paused")},resume:function(){var a=this.opts();a.paused=!1,a.API.trigger("cycle-resumed",[a]).log("cycle-resumed")},reinit:function(){var a=this.opts();a.API.destroy(),a.container.cycle()},remove:function(b){var c=this.opts(),d,e,f=[],g=1;for(var h=0;h<c.slides.length;h++)d=c.slides[h],h==b?e=d:(f.push(d),a(d).data("cycle.opts").slideNum=g,g++);e&&(c.slides=a(f),c.slideCount--,a(e).remove(),b==c.currSlide&&c.API.advanceSlide(1),c.API.trigger("cycle-slide-removed",[c,b,e]).log("cycle-slide-removed"),c.API.updateView())}}),a(document).on("click.cycle","[data-cycle-cmd]",function(b){b.preventDefault();var c=a(this),d=c.data("cycle-cmd"),e=c.data("cycle-context")||".cycle-slideshow";a(e).cycle(d,c.data("cycle-arg"))})}(jQuery),function(a){function b(b,c){var d;if(b._hashFence){b._hashFence=!1;return}d=window.location.hash.substring(1),b.slides.each(function(e){if(a(this).data("cycle-hash")==d)return c===!0?b.startingSlide=e:(b.nextSlide=e,b.API.prepareTx(!0,!1)),!1})}"use strict",a(document).on("cycle-pre-initialize",function(c,d){b(d,!0),d._onHashChange=function(){b(d,!1)},a(window).on("hashchange",d._onHashChange)}),a(document).on("cycle-update-view",function(a,b,c){c.hash&&(b._hashFence=!0,window.location.hash=c.hash)}),a(document).on("cycle-destroyed",function(b,c){c._onHashChange&&a(window).off("hashchange",c._onHashChange)})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{loader:!1}),a(document).on("cycle-bootstrap",function(b,c){function e(b,e){function h(b){var h;c.loader=="wait"?(f.push(b),g===0&&(d.apply(c.API,[f,e]),c.container.removeClass("cycle-loading"))):(h=a(c.slides[c.currSlide]),d.apply(c.API,[b,e]),h.show(),c.container.removeClass("cycle-loading"))}var f=[];b=a(b);var g=b.length;b.hide().each(function(){function k(){--b===0&&(--g,h(i))}var b=0,i=a(this),j=i.is("img")?i:i.find("img");j=j.filter(":not(.cycle-loader-ignore)");if(!j.length){--g,f.push(i);return}b=j.length,j.each(function(){this.complete?k():a(this).load(function(){k()}).error(function(){--b===0&&(c.API.log("slide skipped; img not loaded:",this.src),--g===0&&c.loader=="wait"&&d.apply(c.API,[f,e]))})})}),g&&c.container.addClass("cycle-loading")}var d;if(!c.loader)return;d=c.API.add,c.API.add=e})}(jQuery),function(a){function b(b,c,d){var e,f=b.API.getComponent("pager");f.each(function(){var f=a(this);if(c.pagerTemplate){var g=b.API.tmpl(c.pagerTemplate,c,b,d[0]);e=a(g).appendTo(f)}else e=f.children().eq(b.slideCount-1);e.on(b.pagerEvent,function(a){a.preventDefault(),b.API.page(f,a.currentTarget)})})}function c(a,b){var c=this.opts(),d=a.children().index(b),e=d,f=c.currSlide<e;if(c.currSlide==e)return;c.nextSlide=e,c.API.prepareTx(!0,f),c.API.trigger("cycle-pager-activated",[c,a,b])}"use strict",a.extend(a.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerTemplate:"<span>&bull;</span>"}),a(document).on("cycle-bootstrap",function(a,c,d){d.buildPagerLink=b}),a(document).on("cycle-slide-added",function(a,b,d,e){b.pager&&(b.API.buildPagerLink(b,d,e),b.API.page=c)}),a(document).on("cycle-slide-removed",function(b,c,d,e){if(c.pager){var f=c.API.getComponent("pager");f.each(function(){var b=a(this);a(b.children()[d]).remove()})}}),a(document).on("cycle-update-view",function(b,c,d){var e;c.pager&&(e=c.API.getComponent("pager"),e.each(function(){a(this).children().removeClass(c.pagerActiveClass).eq(c.currSlide).addClass(c.pagerActiveClass)}))}),a(document).on("cycle-destroyed",function(a,b){var c;b.pager&&b.pagerTemplate&&(c=b.API.getComponent("pager"),c.empty())})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),a(document).on("cycle-initialized",function(a,b){b.API.getComponent("next").off(b.nextEvent).on(b.nextEvent,function(a){a.preventDefault(),b.API.next()}),b.API.getComponent("prev").off(b.prevEvent).on(b.prevEvent,function(a){a.preventDefault(),b.API.prev()});if(b.swipe){var c=b.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",d=b.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";b.container.on(c,function(a){b.API.next()}),b.container.on(d,function(){b.API.prev()})}}),a(document).on("cycle-update-view",function(a,b,c,d){if(b.allowWrap)return;var e=b.disabledClass,f=b.API.getComponent("next"),g=b.API.getComponent("prev"),h=b._prevBoundry||0,i=b._nextBoundry||b.slideCount-1;b.currSlide==i?f.addClass(e).prop("disabled",!0):f.removeClass(e).prop("disabled",!1),b.currSlide===h?g.addClass(e).prop("disabled",!0):g.removeClass(e).prop("disabled",!1)}),a(document).on("cycle-destroyed",function(b,c){a(c.next).off(c.nextEvent),a(c.prev).off(c.prevEvent),c.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{progressive:!1}),a(document).on("cycle-pre-initialize",function(b,c){if(!c.progressive)return;var d=c.API,e=d.next,f=d.prev,g=d.prepareTx,h,i=a.type(c.progressive);if(i=="array")h=c.progressive;else if(a.isFunction(c.progressive))h=c.progressive(c);else if(i=="string"){h=a(c.progressive).html();if(!a.trim(h))return;try{h=a.parseJSON(h)}catch(j){d.log("error parsing progressive slides",j);return}}g&&(d.prepareTx=function(a,b){var d,e;if(a||h.length===0){g.apply(c.API,[a,b]);return}b&&c.currSlide==c.slideCount-1?(e=h[0],h=h.slice(1),c.container.one("cycle-slide-added",function(a,b){b.API.advanceSlide(1)}),c.API.add(e)):!b&&c.currSlide===0?(d=h.length-1,e=h[d],h=h.slice(0,d),c.container.one("cycle-slide-added",function(a,b){b.currSlide=1,b.API.advanceSlide(-1)}),c.API.add(e,!0)):g.apply(c.API,[a,b])}),e&&(d.next=function(){var a=this.opts();if(h.length&&a.currSlide==a.slideCount-1){var b=h[0];h=h.slice(1),a.container.one("cycle-slide-added",function(a,b){e.apply(b.API),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(b)}else e.apply(a.API)}),f&&(d.prev=function(){var a=this.opts();if(h.length&&a.currSlide===0){var b=h.length-1,c=h[b];h=h.slice(0,b),a.container.one("cycle-slide-added",function(a,b){b.currSlide=1,b.API.advanceSlide(-1),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(c,!0)}else f.apply(a.API)})})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),a.extend(a.fn.cycle.API,{tmpl:function(b,c){var d=new RegExp(c.tmplRegex||a.fn.cycle.defaults.tmplRegex,"g"),e=a.makeArray(arguments);return e.shift(),b.replace(d,function(b,c){var d,f,g,h,i=c.split(".");for(d=0;d<e.length;d++){g=e[d];if(i.length>1){h=g;for(f=0;f<i.length;f++)g=h,h=h[i[f]]||c}else h=g[c];if(a.isFunction(h))return h.apply(g,e);if(h!==undefined&&h!==null&&h!=c)return h}return c})}})}(jQuery);;
/*! Plugin for Cycle2 - Copyright (c) 2012 M. Alsup - version: BETA-1 */
(function(a){"use strict",a.fn.cycle.transitions.scrollVert={before:function(a,b,c,d){a.API.stackSlides(a,b,c,d);var e=a.container.css("overflow","hidden").height();a.cssBefore={top:!d?-e:e,left:0,opacity:1,display:"block"},a.animIn={top:0},a.animOut={top:!d?e:-e}}}})(jQuery);;
/*! swipe plugin for Cycle2;  version: 20121120 */
(function($) {
"use strict";

// this script adds support for touch events.  the logic is lifted from jQuery Mobile.
// if you have jQuery Mobile installed, you do NOT need this script

var supportTouch = 'ontouchend' in document;

$.event.special.swipe = $.event.special.swipe || {
    scrollSupressionThreshold: 10,   // More than this horizontal displacement, and we will suppress scrolling.
    durationThreshold: 1000,         // More time than this, and it isn't a swipe.
    distanceThresholdMin: 30, // Swipe horizontal displacement must be more than this.
    distanceThresholdMax: 75,   // Swipe vertical displacement must be less than this.

    setup: function() {
        var $this = $( this );

        $this.bind( 'touchstart', function( event ) {
            var data = event.originalEvent.touches ? event.originalEvent.touches[ 0 ] : event;
            var stop, start = {
                time: ( new Date() ).getTime(),
                coords: [ data.pageX, data.pageY ],
                origin: $( event.target )
            };

            function moveHandler( event ) {
                if ( !start )
                    return;

                var data = event.originalEvent.touches ? event.originalEvent.touches[ 0 ] : event;

                stop = {
                    time: ( new Date() ).getTime(),
                    coords: [ data.pageX, data.pageY ]
                };

                // prevent scrolling
                if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold || Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) > $.event.special.swipe.scrollSupressionThreshold) {
                    event.preventDefault();
                }
            }

            $this.bind( 'touchmove', moveHandler )
                .one( 'touchend', function( event ) {
                    $this.unbind( 'touchmove', moveHandler );

                    if ( start && stop ) 
                    {
                        if ( stop.time - start.time < $.event.special.swipe.durationThreshold) 
                        {
                            var event_;
                            if( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.distanceThresholdMin &&
                                Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.distanceThresholdMax ) 
                            {
                                    event_ = start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight";
                            } 
                            else if (Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) > $.event.special.swipe.distanceThresholdMin &&
                                Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) < $.event.special.swipe.distanceThresholdMax) 
                            {
                                    event_ = start.coords[1] > stop.coords[ 1 ] ? "swipeup" : "swipedown";
                            }
                        }
                        start.origin.trigger( "swipe" )
                                .trigger( event_ );
                    }

                start = stop = undefined;
                });
        });
    }
};


$.event.special.swipeleft = $.event.special.swipeleft || {
    setup: function() {
        $( this ).bind( 'swipe', $.noop );
    }
};
$.event.special.swiperight = $.event.special.swiperight || $.event.special.swipeleft;
$.event.special.swipeup = $.event.special.swipeup || $.event.special.swipeleft;
$.event.special.swipedown = $.event.special.swipedown || $.event.special.swipeleft;

})(jQuery);;
var miniframes = new Array();
var superframe;
var currFrame;
var currMiniframe = 0;
var firstInit = true;
var mobile = "";
var superTimeOut;
var timeOut;
var initialPageLoad = true;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		    mobile = "-mobile";
}

//Tools
jQuery.fn.replace = function()
{
		//Replace links by images
		var $this = this;
		
		$this.find(' a.link-to-img').replaceWith(function() {
			var src = (mobile == "") ? this.href : jQuery(this).attr('data-src-mobile');
			var div = jQuery('<div class="img-final" style="background-image:url(\'' + src + '\')" title="' + this.title + '"/>');
			
			//used for aesthetics, Safari renders linearily whereas FF renders when ready. iOS Safari yet different?!
			if (jQuery.browser.mozilla || mobile != ""){div.hide();}
		    var img = jQuery('<img />', {
		        src: src,
		        alt: this.alt,
		        title: this.title,
		    })
		    .bind('load', function(){
    			div.fadeIn('slow', function(){
    				setTimeout(function(){$this.removeClass('img-loading')}, 1000);
    			});		        		
        	});
        	return div;
		});
    return this;
};

jQuery.fn.replaceFirst = function()
{	
		var title = this.parents('.views-row').attr('data-title');
		//Replace links by images
		this.find('.img-loading:not(:nth-child(2), .bcked)').addClass("bcked").each(function() 
		{
			var src = jQuery(this).attr('data-small-src');
			var load = jQuery(this).css("background-image");
			var img = load+',url("' + src +'")';
			jQuery(this).css({"background-image": img});
		});			
    return this;
};


(function ($) {

  Drupal.behaviors.superframe = {
    attach: function (context, settings) {
    	//disable cycle logging
    	$.fn.cycle.log = $.noop;
	       	//move superframe to top level
    	$('.superframe').appendTo('body');
    	//init currFrame
    	currFrame = $('.miniframe:first .proj-wrapper');

    	// Controls
		//previous project
		up_ = function(e) {
			e.preventDefault();
			$('body').addClass('in-transit');
			superframe.cycle('next');
		}
		//next project
		 down_ = function(e) {
			e.preventDefault();
			$('body').addClass('in-transit');
			superframe.cycle('prev');
		}
		//previous frame
		 left_ = function(e) {
			//console.log(currMiniframe);
			if(currMiniframe == 0 && currFrame.parents('.miniframe').hasClass('closed'))
		 	{
		 		toggleInfo();
		 	}
		 	else
		 	{
				currFrame.cycle('prev');		
			}
		}
		//next frame
		 right_ = function(e) {
		 	if(currMiniframe == 0 && !currFrame.parents('.miniframe').hasClass('closed'))
		 	{
		 		toggleInfo();
		 	}
		 	else
		 	{
				currFrame.cycle('next');
			}
		}
		toggleInfo = function(){
			currFrame.parents('.miniframe').toggleClass('closed');
			$('#info-trigger').toggleClass('closed');
		}
		
    	//bind all events before they fire! :D
    	//load further images
		$(document).bind('cycle-before', function(event, optionHash, outgoingSlideEl, incoming, ff){
		    //cancel whatever had been scheduled
		    
		    //if this is superframe
		    if(event.target.className == "view-content")
		    {
			    //activate project in list
			    currMiniframe = 0;
				$('.active-proj').removeClass('active-proj');
		    	var nid = $(incoming).data('nid');
		    	$('.work-list-item[data-nid=' + nid + ']').addClass('active-proj');
		    	var c = currFrame;
	    		setTimeout(function(){c.cycle(0); c.parents('.miniframe').add('#info-trigger').removeClass('closed');}, 500);
				//update current project
		    	currFrame = $('.proj-wrapper', incoming);
	    		$('#info-trigger').removeClass('closed')

		    	//replace the image
		    	clearTimeout(superTimeOut);
		    	clearTimeout(timeOut);
		    	timeOut = setTimeout(function(){
		    		currFrame.replaceFirst();
		    	}, 1500);
				superTimeOut = setTimeout(function(){
				    $('.img-loading:first, .img-loading:eq(1)', incoming).replace();
				    //according to direction, load next() or prev() slide (or first or last)
				    if(optionHash.direction)	    
		    		if( $(incoming).next().find('.img-loading:first').replace().length == 0)
		    		{
			    		$('.miniframe:first .img-loading:first').replace();
		    		}
		    		if( $(incoming).prev().find('.img-loading:first').replace().length == 0 )
		    		{
			    		$('.miniframe:last .img-loading:first').replace();
		    		}
		    		
		    	}, 900);
	    	}
	    	else //if miniframe
	    	{
 			    currMiniframe = optionHash.nextSlide;
		    	if(optionHash.currSlide == 0 && optionHash.nextSlide == 1)
		    	{
				    $(incoming).parents('.proj-wrapper').replaceFirst();
		    	}
				else
				{
			    	clearTimeout(timeOut);
			    	timeOut = setTimeout(function(){
					    $(incoming).replace();
					    $(incoming).next().replace();
					    $(incoming).prev().replace();
				    }, 500);
				}
		    }
		    //Clean up always
		    $('body').removeClass('clean');
		    $('.zoomImg').fadeOut(function(){$(this).remove()});
		});
		
		$(document).bind('cycle-after', function(event, optionHash, outgoingSlideEl, incoming, forwardFlag)		{
			//if this is superframe
			if(event.target.className == "view-content")
			{	
		    	$('body').removeClass('in-transit');
		    	left.addClass('hidden');
		    	right.removeClass('hidden');
			}
			else
			{
				//hide arrows when on edge
				if(optionHash.slideNum == optionHash.slideCount)
			    {
			    	right.addClass('hidden');
			    }
			    else if(optionHash.slideNum == 1)
			    {
			    	left.addClass('hidden');
			    }
			    else
			    {
			    	right.add(left).removeClass('hidden');
	
			    };
			}
		});
		
		//initialize cycle
		$(document).bind('cycle-post-initialize', function(event, optionHash){	
			//if this is superframe

			if(event.target.className == "view-content")
			{
				 //if hash was present remove list
				setTimeout(function(){
					if(optionHash._hashFence && initialPageLoad)
					{
						$('body').addClass('list-closed');
					}
				}, 800);
				initialPageLoad = false;

				var initialSlide = optionHash.currSlide;
				$('.work-list-item').eq(initialSlide).addClass('active-proj');

				currFrame = $('.proj-wrapper', optionHash.slides[optionHash.currSlide]);
				currFrame.replaceFirst().find('.img-loading:first, .img-loading:eq(1)').each(function(){$(this).replace()});

				/*//if there is no next, load first
				if( currFrame.next('.miniframe').find('.img-loading:first').replace().length == 0 )
				{
					$('.miniframe:first .img-loading:first').replace();
				}
				//same
				if( currFrame.prev('.miniframe').find('.img-loading:first').replace().length == 0 )
				{
					$('.miniframe:last .img-loading:first').replace();
				}
				*/
				//if a project is already selected, remove the list
				if(optionHash.slideCount - optionHash.nextSlide == 1 && firstInit)
				{
					firstInit = !firstInit;
				}
				
				//bind keys
				Mousetrap.bind('up', up_);
				Mousetrap.bind('down', down_);
				up.once('sfed', function(){$(this).on('click.nav', up_) });
				down.once('sfed',function(){ $(this).on('click.nav', down_) });
			}
		});

		//Create listeners and attach them to DOM
	    var up = $('<div id="up" class="nav arrow nav-vert">up</div>');
	    var down = $('<div id="down" class="nav arrow nav-vert">down</div>');
		var left = $('<div id="left" class="nav arrow nav-horz hidden">left</div>');
		var right = $('<div id="right" class="nav arrow nav-horz">right</div>');
		var info = $('<div id="info-trigger" class="nav">+</div>');
		
		var nav = up.add(down).add(left).add(right);
		if(mobile == "")
		{
			nav.tipsy({
				title: function(){
					var tip = 'Tip: try using the keyboard arrows!';
					return tip;
				},
				gravity: $.fn.tipsy.autoNS,
				trigger: 'manual',	
				offset: 5, 			 
			})
			.on('mouseenter.tip', function(){
				$(this).tipsy("show")
					.on('mouseleave', function(){
						var $this = $(this);
						setTimeout(function(){
							$this.tipsy("hide")
							}, 1000);
						nav.off('mouseenter.tip');

					});
			})		
		}		
		nav.add(info).appendTo($('body'));

		        		
		//miniframes
		var opts = {
		    timeout: 0,
		    fx: 'scrollHorz',
		    slides: '> .slide',
		    autoHeight: false,
		    allowWrap: false,
		}

		$('.proj-wrapper').each(function() {
		    var c = $(this).cycle(opts);
		});
        superopts = {
		    timeout: 0,
		    fx: 'scrollVert',
		    slides: '.miniframe',
		    autoHeight: false,
		    reverse: true,
		    swipe: false,

		}
		
		superframe = $('.superframe .view-content').cycle(superopts);
		
				
		//List
		$('.work-list-item').bind('click', function(){
			console.log('work-list-item clicked');
			$('body').addClass('list-closed');
			var nid = $(this).attr('data-nid');
			var index = $('.miniframe[data-nid="'+nid+'"]').index();
			superframe.cycle(index);
		});

		//resort projects on sort table
		
		//sort projects in views as well
		var sortOrder = 'desc';
        var lastSortOrder = 'desc';
		var lastSort = 'year';

	    $('.sort').on('click', function(){
	    	$('.sort.active').removeClass('active');
	    	$(this).addClass('active');
	    	superframe.cycle('destroy');
	    	newSort = $(this).text().toLowerCase().trim();
	    	sortOrder = (lastSortOrder == 'asc') ? 'desc' : 'asc';
		    $('.miniframe, .view-work-html-list tbody>tr').tinysort({
		    	//sort by selected attribute
		    	attr: 'data-' + newSort,
		    	order: sortOrder,
		    	},
                //then by date                                                
                {
		    	attr: 'data-year',
		    	order: 'desc',
		    	},
                //then by name                                                
                {
		    	attr: 'data-title',
		    	order: 'asc',
		    	});		 
		    superframe = $('.superframe .view-content').cycle(superopts);
    	    lastSortOrder = sortOrder;
		});
		//bind swipe
		$('body').bind('swipedown', up_);
		$('body').bind('swipeup', down_);
		$('body').bind('swipeleft', right_);
		$('body').bind('swiperight', left_);
		//prevent swipeVert on info
		$('.proj-info').bind('touchstart', function(e)
		{
			e.stopPropagation();
		});

		//bind key events (rest is bound on init)
		Mousetrap.bind('left', left_);
		Mousetrap.bind('right', right_);
				
	    //bind arrows
	    left.once('sfed', function(){$(this).on('click.nav', left_)});
	    right.once('sfed', function(){$(this).on('click.nav', right_)});
	    info.once('sfed', function(){$(this).on('click.nav', toggleInfo)});
		Mousetrap.bind('i', toggleInfo);



		
				
	//EOBEHAVIOR	
    }
  };

})(jQuery);;
(function ($) {

  Drupal.behaviors.ui = {
    attach: function (context, settings) {

	    var menu = $('#header .menu .active-trail');
	    var list = $('.view-id-work_html_list');
	    
	    $('#main-menu a.active:not(.ui-proc)', context).once('ui-proc', function(){

	    	$(this).bind('click', function(e){
	    			e.preventDefault();
	    			$('body').toggleClass('list-closed');
	    		});
	    	});		
			    
	    Mousetrap.bind('enter', function(){
	    	$('body').toggleClass('list-closed');
	    });
	    
	    Mousetrap.bind('space', function(){
	    	$('body').toggleClass('list-closed');
	    });
	    
	    Mousetrap.bind('esc', function(){
	    	$('body').removeClass('list-closed');
	    });
		
		$('.proj-team-img img').data('open', false).bind('click', function(){
			var open = $(this).data('open')
			$(this).parents('.proj-info').toggleClass('team-open');
			var teamDesc = $(this).parents('.proj-info').find('.proj-team-desc');
			var projDesc = $(this).parents('.proj-info').find('.proj-desc');
			var height = open?0:teamDesc.outerHeight(true);
			projDesc.css('top', !open?125+height:110);
			$(this).parents('.proj-info').find('.proj-team-desc').slideToggle();
			$(this).data('open', !open);
		});
		//if mobile
		var mobile;
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
		{
			mobile = "mobile";
			$('body').bind('dblclick', function(){
				$(this).toggleClass('list-closed');
			});
			$('body').addClass(mobile).bind('dblclick', function(){
				$(this).toggleClass('list-closed');
			});
			if(/iPad/i.test(navigator.userAgent))
			{
	
				function setHeight(){
				$('html, body, .view-main, .view-main .view-content, .view-main .views-row, .proj-wrapper').css({'minHeight':$(window).height()+60});
				}
				setHeight();
				window.addEventListener("orientationchange", function() {
					setHeight();			
				});
				
				//in portrait mode
				if(window.innerHeight > window.innerWidth)
				{
						alert('Please turn your device to fully experience dieterdietz.org')
				}
			}
		}
		else
		{	    	
		    //Zoom
		    var ready_ = function(img){
		    	//add loading
		    	var original = $(this).siblings('a, img, div');
		    	original.removeClass('zoom-loading');
		    	$('.zoomImg').trigger('mouseenter');
			    $('body').addClass('clean');
			    //bind click to remove zoom
			    $(this).bind('click', function(e){
					    e.stopPropagation();
				    	$(this).fadeOut(function(){
				    		$(this).remove();
					    	$('body').removeClass('clean');
			    	})
			    });
				$(this).bind('contextmenu', function(){return false;});
		    };
	    	
		    $('.proj-wrapper .zoom-placeholder')
		       .bind('click.zoom', function(e){
		       	e.preventDefault();
		       	$('body').addClass('list-closed');
		       	var attr = (mobile !== "") ? 'data-src-zoom' : 'data-src-zoom-mobile';
		       	var url_ = $(this).attr(attr);
		    	$('a, img, div',$(this)).addClass('zoom-loading');
		    	$(this).zoom({
		        	url: url_,
		        	grab: false,
		        	icon: false,
		        	callback: ready_
		        });
		     });
		}
	    //EOattach	
	   	}
  };

})(jQuery);;
// Zoom 1.3 - jQuery image zooming plugin
// (c) 2011 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php

(function ($) {
    var defaults = {
        url: false,
        icon: true,
        grab: false,
        callback: false,
        duration: 120
    };

    $.fn.zoom = function (options) {
        return this.each(function () {
            var 
            root = this,
            $root = $(root),
            img = new Image(),
            $img = $(img),
            $icon,
            position = $root.css('position'),
            settings = $.extend({}, defaults, options || {}),
            mousemove = 'mousemove';

            $root.css({
                position: /(absolute|fixed)/.test(position) ? position : 'relative',
                overflow: 'hidden'
            });

            if (!settings.url) {
                settings.url = $root.find('img:first')[0].src;
                if (!settings.url) {
                    return;
                }
            }

            if (settings.icon) {
                $icon = $('<div class="zoomIcon">').appendTo($root);
            }

            img.onload = function () {
                var
                outerWidth,
                outerHeight,
                xRatio,
                yRatio,
                left,
                top,
                offset = $root.offset();

                function ratio() {
                    outerWidth = $root.outerWidth();
                    outerHeight = $root.outerHeight();
                    xRatio = (img.width - outerWidth) / outerWidth;
                    yRatio = (img.height - outerHeight) / outerHeight;
                }

                function move(e) {
                    left = (e.pageX - offset.left);
                    top = (e.pageY - offset.top);

                    if (left > outerWidth) {
                        left = outerWidth;
                    } else if (left < 0) {
                        left = 0;
                    }

                    if (top > outerHeight) {
                        top = outerHeight;
                    } else if (top < 0) {
                        top = 0;
                    }

                    img.style.left = (left * -xRatio) + 'px';
                    img.style.top = (top * -yRatio) + 'px';

                    e.preventDefault();
                }

                ratio();

                $img
                .addClass('zoomImg')
                .css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: img.width,
                    height: img.height,
                    border: 'none'
                })
                .appendTo($root);

                if (settings.grab) {
                    $img.mousedown(
                        function (e) {
                            offset = $root.offset();

                            $(document).one('mouseup',
                                function () {
                                    $img
                                    .stop()
                                    .fadeTo(settings.duration, 0);

                                    $(document).unbind(mousemove, move);
                                }
                            );

                            ratio();

                            move(e);

                            $img
                            .stop()
                            .fadeTo($.support.opacity ? settings.duration : 0, 1);

                            $(document)[mousemove](move);
                            
                            e.preventDefault();
                        }
                    );
                } else {
                    $img.hover(
                        function () {
                            offset = $root.offset();

                            ratio();

                            // Skip the fade-in for IE8 and lower since it chokes on fading-in
                            // and changing position based on mousemovement at the same time.
                            $img
                            .stop()
                            .fadeTo($.support.opacity ? settings.duration : 0, 1);
                        },
                        function () {
                            $img
                            .stop()
                            .fadeTo(settings.duration, 0);
                        }
                    )[mousemove](function (e) {
                        img.style.left = (e.pageX - offset.left) * -xRatio + 'px';
                        img.style.top = (e.pageY - offset.top) * -yRatio + 'px';
                    });                
                }
        
                if ($.isFunction(settings.callback)) {
                    settings.callback.call(img);
                }    

            };

            img.src = settings.url;
        });
    };

    $.fn.zoom.defaults = defaults;
}(jQuery));;
// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($) {
    
    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    };
    
    function isElementInDOM(ele) {
      while (ele = ele.parentNode) {
        if (ele == document) return true;
      }
      return false;
    };
    
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    };
    
    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        fixTitle: function() {
            var $e = this.$element;
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
        },
        
        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            this.fixTitle();
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
                this.$tip.data('tipsy-pointee', this.$element[0]);
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.tipsy = function(options) {
        
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }
        
        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }
        
        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        };
        
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
            }
        };
        
        if (!options.live) this.each(function() { get(this); });
        
        if (options.trigger != 'manual') {
            var binder   = options.live ? 'live' : 'bind',
                eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover'
    };
    
    $.fn.tipsy.revalidate = function() {
      $('.tipsy').each(function() {
        var pointee = $.data(this, 'tipsy-pointee');
        if (!pointee || !isElementInDOM(pointee)) {
          $(this).remove();
        }
      });
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable 
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
			    boundTop = $(document).scrollTop() + margin,
			    boundLeft = $(document).scrollLeft() + margin,
			    $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		}
	};
    
})(jQuery);
;
/*! TinySort 1.5.6
* Copyright (c) 2008-2013 Ron Valstar http://tinysort.sjeiti.com/
* License:
*     MIT: http://www.opensource.org/licenses/mit-license.php
*     GPL: http://www.gnu.org/licenses/gpl.html
*/
!function(a,b){"use strict";function c(a){return a&&a.toLowerCase?a.toLowerCase():a}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]==b)return!e;return e}var e=!1,f=null,g=parseFloat,h=Math.min,i=/(-?\d+\.?\d*)$/g,j=/(\d+\.?\d*)$/g,k=[],l=[],m=function(a){return"string"==typeof a},n=function(a,b){for(var c,d=a.length,e=d;e--;)c=d-e-1,b(a[c],c)},o=Array.prototype.indexOf||function(a){var b=this.length,c=Number(arguments[1])||0;for(c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=b);b>c;c++)if(c in this&&this[c]===a)return c;return-1};a.tinysort={id:"TinySort",version:"1.5.6",copyright:"Copyright (c) 2008-2013 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licensed:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},plugin:function(){var a=function(a,b){k.push(a),l.push(b)};return a.indexOf=o,a}(),defaults:{order:"asc",attr:f,data:f,useVal:e,place:"start",returns:e,cases:e,forceStrings:e,ignoreDashes:e,sortFunction:f}},a.fn.extend({tinysort:function(){var p,q,r,s,t=this,u=[],v=[],w=[],x=[],y=0,z=[],A=[],B=function(a){n(k,function(b){b.call(b,a)})},C=function(a,b){return"string"==typeof b&&(a.cases||(b=c(b)),b=b.replace(/^\s*(.*?)\s*$/i,"$1")),b},D=function(a,b){var c=0;for(0!==y&&(y=0);0===c&&s>y;){var d=x[y],f=d.oSettings,h=f.ignoreDashes?j:i;if(B(f),f.sortFunction)c=f.sortFunction(a,b);else if("rand"==f.order)c=Math.random()<.5?1:-1;else{var k=e,o=C(f,a.s[y]),p=C(f,b.s[y]);if(!f.forceStrings){var q=m(o)?o&&o.match(h):e,r=m(p)?p&&p.match(h):e;if(q&&r){var t=o.substr(0,o.length-q[0].length),u=p.substr(0,p.length-r[0].length);t==u&&(k=!e,o=g(q[0]),p=g(r[0]))}}c=d.iAsc*(p>o?-1:o>p?1:0)}n(l,function(a){c=a.call(a,k,o,p,c)}),0===c&&y++}return c};for(p=0,r=arguments.length;r>p;p++){var E=arguments[p];m(E)?z.push(E)-1>A.length&&(A.length=z.length-1):A.push(E)>z.length&&(z.length=A.length)}for(z.length>A.length&&(A.length=z.length),s=z.length,0===s&&(s=z.length=1,A.push({})),p=0,r=s;r>p;p++){var F=z[p],G=a.extend({},a.tinysort.defaults,A[p]),H=!(!F||""===F),I=H&&":"===F[0];x.push({sFind:F,oSettings:G,bFind:H,bAttr:!(G.attr===f||""===G.attr),bData:G.data!==f,bFilter:I,$Filter:I?t.filter(F):t,fnSort:G.sortFunction,iAsc:"asc"==G.order?1:-1})}return t.each(function(c,d){var e,f=a(d),g=f.parent().get(0),h=[];for(q=0;s>q;q++){var i=x[q],j=i.bFind?i.bFilter?i.$Filter.filter(d):f.find(i.sFind):f;h.push(i.bData?j.data(i.oSettings.data):i.bAttr?j.attr(i.oSettings.attr):i.oSettings.useVal?j.val():j.text()),e===b&&(e=j)}var k=o.call(w,g);0>k&&(k=w.push(g)-1,v[k]={s:[],n:[]}),e.length>0?v[k].s.push({s:h,e:f,n:c}):v[k].n.push({e:f,n:c})}),n(v,function(a){a.s.sort(D)}),n(v,function(a){var b=a.s,c=a.n,f=b.length,g=c.length,i=f+g,j=[],k=i,l=[0,0];switch(G.place){case"first":n(b,function(a){k=h(k,a.n)});break;case"org":n(b,function(a){j.push(a.n)});break;case"end":k=g;break;default:k=0}for(p=0;i>p;p++){var m=d(j,p)?!e:p>=k&&k+f>p,o=m?0:1,q=(m?b:c)[l[o]].e;q.parent().append(q),(m||!G.returns)&&u.push(q.get(0)),l[o]++}}),t.length=0,Array.prototype.push.apply(t,u),t}}),a.fn.TinySort=a.fn.Tinysort=a.fn.tsort=a.fn.tinysort}(jQuery);;
