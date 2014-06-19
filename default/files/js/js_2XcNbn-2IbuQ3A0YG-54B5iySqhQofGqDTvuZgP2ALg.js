
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
(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + Drupal.settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;

/**
 * Plugin written by the great jqueryfordesigners.com
 * http://jqueryfordesigners.com/jquery-infinite-carousel/
 *
 * Slightly addapted for our use case
 */
(function ($) {
  $.fn.infiniteCarousel = function () {

      function repeat(str, num) {
          return new Array( num + 1 ).join( str );
      }

      return this.each(function () {

          var $wrapper = $('> div', this).css('overflow', 'hidden'),
              $slider = $wrapper.find('> ul'),
              $items = $slider.find('> li'),
              $single = $items.filter(':first'),

              singleWidth = $single.outerWidth(),
              visible = Math.ceil($wrapper.innerWidth() / singleWidth), // note: doesn't include padding or border
              currentPage = 1,
              pages = Math.ceil($items.length / visible);


          // 1. Pad so that 'visible' number will always be seen, otherwise create empty items
          if (($items.length % visible) != 0) {
              $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
              $items = $slider.find('> li');
          }

          // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
          $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
          $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
          $items = $slider.find('> li'); // reselect

          // 3. Set the left position to the first 'real' item
          $wrapper.scrollLeft(singleWidth * visible);

          // 4. paging function
          function gotoPage(page) {
              var dir = page < currentPage ? -1 : 1,
                  n = Math.abs(currentPage - page),
                  left = singleWidth * dir * visible * n;

              $wrapper.filter(':not(:animated)').animate({
                  scrollLeft : '+=' + left
              }, 500, function () {
                  if (page == 0) {
                      $wrapper.scrollLeft(singleWidth * visible * pages);
                      page = pages;
                  } else if (page > pages) {
                      $wrapper.scrollLeft(singleWidth * visible);
                      // reset back to start position
                      page = 1;
                  }

                  currentPage = page;
              });

              return false;
          }

          $wrapper.after('<a class="arrow back" title="'+ Drupal.t('Previous page') +'">&lt;</a><a class="arrow forward" title="'+ Drupal.t('Next page') +'">&gt;</a>');

          // 5. Bind to the forward and back buttons
          $('a.back', this).click(function () {
              return gotoPage(currentPage - 1);
          });

          $('a.forward', this).click(function () {
              return gotoPage(currentPage + 1);
          });

          // create a public interface to move to a specific page
          $(this).bind('goto', function (event, page) {
              gotoPage(page);
          });

          // custom events to trigger next and prev pages
          $(this).bind('next', function () {
            gotoPage(currentPage + 1);
          });
          $(this).bind('prev', function () {
            gotoPage(currentPage - 1);
          })
      });
  };
})(jQuery);
;

Drupal.behaviors.galleryformatter = {
  attach: function (context) {
    // We must wait for everything to load in order to get images' dimensions.
    (jQuery)(window).bind('load', function() {
      (jQuery)('.galleryformatter:not(.gallery-processed)', context).each(function(){
        Drupal.galleryformatter.prepare(this);
      }).addClass('gallery-processed');
    });
  }
};

Drupal.galleryformatter = Drupal.galleryformatter || {};

// setting up the main behaviour
Drupal.galleryformatter.prepare = function(el) {
  (function ($) {
    // var $settings = Drupal.settings.galleryformatter;
    $el = $(el);
    var $slides = $('li.gallery-slide', $el);
    var $slideContainer = $('div.gallery-slides', $el);

    var $thumbs = $('.gallery-thumbs', $el);
    var $thumbsLi = $('li', $thumbs);
    var thumbWidth = $thumbsLi.filter(':first').width() + 'px';
    var liWidth = $thumbsLi.outerWidth(); // includes padding
    var $wrapper = $('.wrapper', $el);
    var visibleWidth = $wrapper.outerWidth();

    /*
     * Only start the thumbs carrousel if needed
     */
    if (($thumbsLi.size() * liWidth) > $thumbs.width()) {
      $('ul', $thumbs).width('99999px');
      $thumbs.infiniteCarousel();
      $thumbsLi = $('li', $thumbs); // we need to reselect because infiniteCarousel inserts new empty li elements if necessary
      // we need to reselect because infiniteCarousel inserts new empty li elements if necessary
      $el = $(el);
      $thumbsLi = $('.gallery-thumbs ul li', $el);
    }

    $thumbsLi = $('li', $thumbs); // we need to reselect because infiniteCarousel inserts new empty li elements if necessary

    $thumbsLi.each(function(){
      $(this).css({
          width: thumbWidth
        });
    });
    var $thumbslinks = $('a', $thumbsLi);

    /*
     * @TODO:
     * figure out how to get this into proper functions reusing selections
     */
    $thumbslinks.click(function(e){
      $hash = $(this.hash);
      if(!$hash.is(':visible')){
        $thumbsLi.removeClass('active');
        $(this).parent().addClass('active');
        $slides.filter(':visible').fadeOut('slow');
        $hash.fadeIn('slow');
        // set the slide container's height to allow use of portrait images
        $slideContainer.css("height",$hash.find('img').height());
        /*
         * @FIXME
         * Need to figure out a way to update the location bar of the browser, for bookmarking etc, without making the scroll jump
         * window.location.hash = this.hash; solution below does update the location, but makes the scroll jump.
         */
        // window.location.hash = this.hash;  // not sure if this is the best way to do it.
      }
      e.preventDefault();
    });

    /*
     *  Startup behaviour (when the page first loads)
     */
    if ($slides.length > 1) {
      $slides.hide(); // hide all slides
    }
    var $locationHash = window.location.hash; // if we are being deeplinked to a specific slide, capture that

    function showFirstSlide(){
      // Activate the first slide
      $('a', $thumbsLi.filter('.slide-0:not(".cloned")')).trigger('click');
     }

    // if we have a hash in the url
    if ($locationHash) {
      var $slideToShow = $slides.filter($locationHash);
      // if the hash corresponds to one of our slides
      if ($slideToShow.length > 0) {
        $slideToShow.show(); //  show that slide
        $thumbsLi.not($(".cloned")).find("a[href="+$locationHash+"]").parent().addClass('active'); // activate that thumbnail
        // set the slide container's height to allow use of portrait images
        $slideContainer.css("height", $slideToShow.find('img').height());
      }
      // otherwise the default
      else {
        showFirstSlide();
      }
    }
    // otherwise the default
    else {
      showFirstSlide();
    }

    /*
     * Create a public interface to move to the next and previous images
     */
    // Shows the previous slide and scrolls to the previous page if necessary
    $thumbs.bind('showPrev', function (event) {
      var currentScroll = $wrapper.get(0).scrollLeft;
      var $prevThumbLi = $thumbsLi.filter('.active').prev(':not(".cloned, .empty, .active")');
      // if no results we are on the first element
      if(!$prevThumbLi.size()) {
        // select the last one
        $prevThumbLi = $thumbsLi.not('.empty, .cloned').filter(':last');
      }
      var $slideToClick = $('a', $prevThumbLi);
      var $prevIsVisible = (($prevThumbLi.get(0).offsetLeft >= currentScroll) && ($prevThumbLi.get(0).offsetLeft <= (visibleWidth + currentScroll)));
      if($prevIsVisible) {
        $slideToClick.trigger('click');
      }
      else {
        $thumbs.trigger('prev');
        $slideToClick.trigger('click');
      }
    });
    // Shows the next slide and scrolls to the next page if necessary
    $thumbs.bind('showNext', function (event) {
      var currentScroll = $wrapper.get(0).scrollLeft;
      // this selector could be optimized perhaps, but
      var $nextThumbLi = $thumbsLi.filter('.active').next(':not(".cloned, .empty, .active")');
      // if no results we are on the last element
      if(!$nextThumbLi.size()) {
        // select the first one
        $nextThumbLi = $thumbsLi.not('.empty, .cloned').filter(':first');
      }

      var $slideToClick = $('a', $nextThumbLi);
      var $nextIsVisible = (($nextThumbLi.get(0).offsetLeft >= currentScroll) && ($nextThumbLi.get(0).offsetLeft <= (visibleWidth + currentScroll)));
      if($nextIsVisible) {
        var $slideToClick = $('a', $nextThumbLi);
        $('a', $nextThumbLi).trigger('click');
      }
      else {
        $thumbs.trigger('next');
        $slideToClick.trigger('click');
      }
    });

    $('.shownext + img', $slideContainer).click(function(){
      $thumbs.trigger('showNext');
    });

    if ($slides.length > 1) {
      // Setup buttons for next/prev slide
      $slideButtons = ('<a class="prev-slide slide-button" title="'+ Drupal.t('Previous image') +'">&lt;</a><a class="next-slide slide-button" title="'+ Drupal.t('Next image') +'">&gt;</a>');
      $('.gallery-slides', $el).append($slideButtons);
      // Trigger the appropiate events on click
      $('a.prev-slide', $el).click(function(){
        $thumbs.trigger('showPrev');
      });
      $('a.next-slide', $el).click(function(){
        $thumbs.trigger('showNext');
      });
    }
  })(jQuery);
}
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
