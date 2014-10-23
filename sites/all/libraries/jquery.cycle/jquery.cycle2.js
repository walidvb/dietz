/*!
 * jQuery Cycle2 - Version: BETA-1 (27-AUG-2012)
 * http://malsup.com/jquery/cycle2/
 * Copyright (c) 2012 M. Alsup
 * Dual licensed: MIT or GPL
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.7 or later
 */
;(function($) {
"use strict";

var version = 'BETA-1';

$.fn.cycle = function( options ) {
    // fix mistakes with the ready state
    var o;
    if ( this.length === 0 && !$.isReady ) {
        o = { s: this.selector, c: this.context };
        log('requeuing slideshow (dom not ready)');
        $(function() {
            $( o.s, o.c ).cycle(options);
        });
        return this;
    }

    return this.each(function() {
        var data, opts, shortName, val;
        var container = $(this);

        if ( container.data('cycle.opts') )
            return; // already initialized

        if ( container.data('cycle-log') === false || 
            ( options && options.log === false ) ||
            ( opts && opts.log === false) ) {
            log = $.noop;
        }

        log('--c2 init--');
        data = container.data();
        for (var p in data) {
            // allow props to be accessed sans 'cycle' prefix and log the overrides
            if (data.hasOwnProperty(p) && /^cycle[A-Z]+/.test(p) ) {
                val = data[p];
                shortName = p.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, lowerCase);
                log(shortName+':', val, '('+typeof val +')');
                data[shortName] = val;
            }
        }

        opts = $.extend( {}, $.fn.cycle.defaults, data, options || {});
        container.data('cycle.opts', opts);

        opts.timeoutId = 0;
        opts.paused = 0;
        opts.container = container;
        opts._maxZ = opts.maxZ;

        opts.API = $.extend ( {}, $.fn.cycle.API );
        opts.API.log = log;
        opts.API.trigger = function( eventName, args ) {
            opts.container.trigger( eventName, args );
            return opts.API;
        };

        // opportunity for plugins to modify opts and API
        opts.API.trigger('cycle-bootstrap', [ opts, opts.API ]);

        opts.API.addInitialSlides( opts );
        opts.API.preInitSlideshow( opts );

        if ( opts.slides.length )
            opts.API.initSlideshow( opts );
    });
};

$.fn.cycle.API = {
    addInitialSlides: function( opts ) {
        var slides = opts.slides;
        opts.slideCount = 0;
        opts.slides = $(); // empty set
        
        // add slides that already exist
        slides = slides.jquery ? slides : opts.container.find( slides );
        opts.API.add( opts, slides );
    },

    preInitSlideshow: function( opts ) {
        opts.API.trigger('cycle-pre-initialize', [ opts ]);
        var tx = $.fn.cycle.transitions[opts.fx];
        if (tx && $.isFunction(tx.preInit))
            tx.preInit( opts );
        opts._preInitialized = true;
    },

    postInitSlideshow: function( opts ) {
        opts.API.trigger('cycle-post-initialize', [ opts ]);
        var tx = $.fn.cycle.transitions[opts.fx];
        if (tx && $.isFunction(tx.postInit))
            tx.postInit( opts );
    },

    initSlideshow: function( opts ) {
        opts.API.calcFirstSlide( opts );

        if (opts.container.css('position') == 'static')
            opts.container.css('position', 'relative');

        $(opts.slides[opts.currSlide]).css('opacity',1).show();
        opts.API.stackSlides( opts, opts.slides[opts.currSlide], opts.slides[opts.nextSlide], !opts.reverse );

        if (opts.pauseOnHover) {
            opts.container.hover(
                function(){ 
                    opts.paused = 1; 
                    opts.API.trigger('cycle-paused', [ opts ] );
                }, 
                function(){ 
                    opts.paused = 0; 
                    opts.API.trigger('cycle-resumed', [ opts ] );
                }
            );
        }

        // stage initial transition
        if ( opts.timeout ) {
            opts.timeoutId = setTimeout(function() {
                opts.API.prepareTx( opts, false, !opts.reverse );
            }, opts.timeout + opts.delay);
        }

        opts._initialized = true;
        opts.API.updateView( opts );
        opts.container.on('cycle-paused cycle-resumed', function(e) {
            opts.container[ e.type === 'cycle-paused' ? 'addClass' : 'removeClass' ]('cycle-paused');
        });
        opts.API.trigger('cycle-initialized', [ opts ]);
        opts.API.postInitSlideshow( opts );
    },


    add: function( opts, slides, prepend ) {
        var oldSlideCount = opts.slideCount;
        var startSlideshow = false;

        $( slides ).each(function(i) {
            var slideOpts;
            var slide = $(this);

            if ( prepend )
                opts.container.prepend( slide );
            else
                opts.container.append( slide );

            opts.slideCount++;
            slideOpts = opts.API.buildSlideOpts( opts, slide );

            if ( prepend )
                opts.slides = $( slide ).add( opts.slides );
            else
                opts.slides = opts.slides.add( slide );

            opts.API.initSlide(opts, slideOpts, slide, --opts._maxZ );

            slide.data('cycle.opts', slideOpts);
            opts.API.trigger('cycle-slide-added', [ opts, slideOpts, slide ]);
        });

        opts.API.updateView( opts );

        startSlideshow = opts._preInitialized && (oldSlideCount < 2 && opts.slideCount >= 1);
        if ( startSlideshow ) {
            if ( !opts._initialized )
                opts.API.initSlideshow( opts );
            else if ( opts.timeout ) {
                opts.timeoutId = setTimeout(function() {
                    var len = opts.slides.length;
                    opts.nextSlide = opts.reverse ? len - 1 : 1;
                    opts.API.prepareTx( opts, false, !opts.reverse );
                }, opts.timeout + opts.delay);
            }
        }
    },

    calcFirstSlide: function( opts ) {
        var firstSlideIndex;
        firstSlideIndex = parseInt( opts.startingSlide || 0, 10 );
        if (firstSlideIndex >= opts.slides.length || firstSlideIndex < 0)
            firstSlideIndex = 0;

        opts.currSlide = firstSlideIndex;
        if ( opts.reverse ) {
            opts.nextSlide = firstSlideIndex - 1;
            if (opts.nextSlide < 0)
                opts.nextSlide = opts.slides.length - 1;
        }
        else {
            opts.nextSlide = firstSlideIndex + 1;
            if (opts.nextSlide == opts.slides.length)
                opts.nextSlide = 0;
        }
    },

    calcNextSlide: function( opts ) {
        var roll;
        if ( opts.reverse ) {
            roll = (opts.nextSlide - 1) < 0;
            opts.nextSlide = roll ? opts.slideCount - 1 : opts.nextSlide-1;
            opts.currSlide = roll ? 0 : opts.nextSlide+1;
        }
        else {
            roll = (opts.nextSlide + 1) == opts.slides.length;
            opts.nextSlide = roll ? 0 : opts.nextSlide+1;
            opts.currSlide = roll ? opts.slides.length-1 : opts.nextSlide-1;
        }
    },

    calcTx: function( opts, manual ) {
        var tx;
        if ( manual && opts.manualFx )
            tx = $.fn.cycle.transitions[opts.manualFx];
        if ( !tx )
            tx = $.fn.cycle.transitions[opts.fx];

        if (!tx) {
            tx = $.fn.cycle.transitions.fade;
            log('Transition "' + opts.fx + '" not found.  Using fade.');
        }
        return tx;
    },

    prepareTx: function( opts, manual, fwd ) {
        var after, curr, next, slideOpts, tx;

        if ( opts.slideCount < 2 ) {
            opts.timeoutId = 0;
            return;
        }
        if ( manual ) {
            opts.API.stopTransition( opts );
            opts.busy = false;
            clearTimeout(opts.timeoutId);
            opts.timeoutId = 0;
        }
        if ( opts.busy )
            return;
        if ( opts.timeoutId === 0 && !manual )
            return;

        curr = opts.slides[opts.currSlide];
        next = opts.slides[opts.nextSlide];
        slideOpts = opts.API.getSlideOpts( opts, opts.nextSlide );
        tx = opts.API.calcTx( slideOpts, manual );

        opts._tx = tx;

        if ( manual && slideOpts.manualSpeed !== undefined )
            slideOpts.speed = slideOpts.manualSpeed;

        if ( opts.nextSlide != opts.currSlide && (manual || (!opts.paused && opts.timeout) )) {
            opts.API.trigger('cycle-before', [ slideOpts, curr, next, fwd ]);
            if ( tx.before )
                tx.before( slideOpts, curr, next, fwd );

            after = function() {
                opts.busy = false;
                if (tx.after)
                    tx.after( slideOpts, curr, next, fwd );
                opts.API.trigger('cycle-after', [ slideOpts, curr, next, fwd ]);
                opts.API.queueTransition(opts, slideOpts);
                opts.API.updateView( opts );
            };

            opts.busy = true;
            if (tx.transition)
                tx.transition(slideOpts, curr, next, fwd, after);
            else
                opts.API.doTransition(slideOpts, curr, next, fwd, after);

            opts.API.calcNextSlide( opts );
        } else {
            opts.API.queueTransition( opts, slideOpts );
        }
    },

    // perform the actual animation
    doTransition: function(opts, currEl, nextEl, fwd, callback) {
        var curr = $(currEl), next = $(nextEl);
        var fn = function() {
            next.animate(opts.animIn || {}, opts.speed, opts.easeIn || opts.easing, callback);
        };

        next.css(opts.cssBefore || {});
        curr.animate(opts.animOut || {}, opts.speed, opts.easeOut || opts.easing, function() {
            curr.css(opts.cssAfter || {});
            if (!opts.sync) {
                fn();
            }
        });
        if (opts.sync) {
            fn();
        }
    },

    queueTransition: function(opts, slideOpts) {
        if (opts.nextSlide === 0 && --opts.loop === 0) {
            opts.API.log('terminating; loop=0');
            opts.timeout = 0;
            opts.API.trigger('cycle-finished', [ opts ]);
            // reset nextSlide
            opts.nextSlide = opts.currSlide;
            return;
        }
        if (slideOpts.timeout) {
            opts.timeoutId = setTimeout(function() { 
                opts.API.prepareTx( opts, false, !opts.reverse ); 
            }, slideOpts.timeout );
        }
    },

    stopTransition: function( opts ) {
        if ( opts.slides.filter(':animated').length ) {
            opts.slides.stop(false, true);
            opts.API.trigger('cycle-transition-stopped', [ opts ]);
        }

        if ( opts._tx && opts._tx.stopTransition )
            opts._tx.stopTransition( opts );
    },

    // advance slide forward or back
    advanceSlide: function( opts, val ) {
        clearTimeout(opts.timeoutId);
        opts.timeoutId = 0;
        opts.nextSlide = opts.currSlide + val;
        
        if (opts.nextSlide < 0)
            opts.nextSlide = opts.slides.length - 1;
        else if (opts.nextSlide >= opts.slides.length)
            opts.nextSlide = 0;

        opts.API.prepareTx( opts, true,  val >= 0 );
        return false;
    },

    buildSlideOpts: function( opts, slide ) {
        var val, shortName;
        var slideOpts = slide.data() || {};
        for (var p in slideOpts) {
            // allow props to be accessed sans 'cycle' prefix and log the overrides
            if (slideOpts.hasOwnProperty(p) && /^cycle[A-Z]+/.test(p) ) {
                val = slideOpts[p];
                shortName = p.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, lowerCase);
                log('['+(opts.slideCount-1)+']', shortName+':', val, '('+typeof val +')');
                slideOpts[shortName] = val;
            }
        }

        slideOpts = $.extend( {}, $.fn.cycle.defaults, opts, slideOpts );
        slideOpts.slideNum = opts.slideCount;

        try {
            // these props should always be read from the master state object
            delete slideOpts.API;
            delete slideOpts.slideCount;
            delete slideOpts.currSlide;
            delete slideOpts.nextSlide;
            delete slideOpts.slides;
        } catch(e) {
            // no op
        }
        return slideOpts;
    },

    getSlideOpts: function( opts, index ) {
        if ( index === undefined )
            index = opts.currSlide;

        var slide = opts.slides[index];
        var slideOpts = $(slide).data('cycle.opts');
        return $.extend( {}, opts, slideOpts );
    },
    
    initSlide: function( opts, slideOpts, slide, suggestedZindex ) {
        slide.css( slideOpts.slideCss || {} );
        if ( suggestedZindex > 0 )
            slide.css( 'zIndex', suggestedZindex );

        // ensure that speed settings are sane
        if ( isNaN( slideOpts.speed ) )
            slideOpts.speed = $.fx.speeds[slideOpts.speed] || $.fx.speeds._default;
        if ( !slideOpts.sync )
            slideOpts.speed = slideOpts.speed / 2;
    },

    updateView: function( opts ) {
        if ( !opts._initialized )
            return;
        var slideOpts = opts.API.getSlideOpts( opts );
        var currSlide = opts.slides[ opts.currSlide ];

        if ( opts.slideActiveClass ) {
            opts.slides.removeClass( opts.slideActiveClass )
                .eq( opts.currSlide ).addClass( opts.slideActiveClass );
        }

        opts.API.trigger('cycle-update-view', [ opts, slideOpts, currSlide ]);
    },

    getComponent: function( opts, name ) {
        var selector = opts[name];
        if (typeof selector === 'string') {
            // if selector is a child selector then use find, otherwise query full dom
            return (/^\s*\>/).test( selector ) ? opts.container.find( selector ) : $( selector );
        }
        if (selector.jquery)
            return selector;
        
        return $(selector);
    },

    stackSlides: function( opts, curr, next, fwd ) {
        if ( !curr ) {
            curr = opts.slides[opts.currSlide];
            next = opts.slides[opts.nextSlide];
            fwd = !opts.reverse;
        }

        // reset the zIndex for the common case:
        // curr slide on top,  next slide beneath, and the rest in order to be shown
        $(curr).css('zIndex', opts.maxZ);

        var i;
        var z = opts.maxZ - 2;
        var len = opts.slideCount;
        if (fwd) {
            for ( i = opts.currSlide + 1; i < len; i++ )
                $( opts.slides[i] ).css( 'zIndex', z-- );
            for ( i = 0; i < opts.currSlide; i++ )
                $( opts.slides[i] ).css( 'zIndex', z-- );
        }
        else {
            for ( i = opts.currSlide - 1; i >= 0; i-- )
                $( opts.slides[i] ).css( 'zIndex', z-- );
            for ( i = len - 1; i > opts.currSlide; i-- )
                $( opts.slides[i] ).css( 'zIndex', z-- );
        }

        $(next).css('zIndex', opts.maxZ - 1);
    }

}; // API

// expose default logger
$.fn.cycle.log = log;

// automatically find and run slideshows
$(document).ready(function() {
    $( $.fn.cycle.defaults.autoSelector ).cycle();
});

$.fn.cycle.version = function() { return 'Cycle2: ' + version; };

// helper functions
function log() {
    /*global console:true */
    if (window.console && console.log)
        console.log('[cycle2] ' + Array.prototype.join.call(arguments, ' ') );
}
function lowerCase(s) {
    return (s || '').toLowerCase();
}

// expose transition object
$.fn.cycle.transitions = {
    custom: {
    },
    none: {
        before: function( opts, curr, next, fwd ) {
            opts.API.stackSlides( opts, next, curr, fwd );
            opts.cssBefore = { opacity: 1, display: 'block' };
        }
    },
    fade: {
        before: function( opts, curr, next, fwd ) {
            var css = opts.API.getSlideOpts( opts, opts.nextSlide ).slideCss || {};
            opts.API.stackSlides( opts, curr, next, fwd );
            opts.cssBefore = $.extend(css, { opacity: 0, display: 'block' });
            opts.cssAfter = { display: 'none' };
            opts.animIn = { opacity: 1 };
            opts.animOut = { opacity: 0 };
        }
    },
    fadeout: {
        before: function( opts , curr, next, fwd ) {
            var css = opts.API.getSlideOpts( opts, opts.nextSlide ).slideCss || {};
            opts.API.stackSlides( opts, curr, next, fwd );
            opts.cssBefore = $.extend(css, { opacity: 1, display: 'block' });
            opts.cssAfter = { display: 'none' };
            opts.animOut = { opacity: 0 };
        }
    },
    scrollHorz: {
        before: function( opts, curr, next, fwd ) {
            opts.API.stackSlides( opts, curr, next, fwd );
            var w = opts.container.css('overflow','hidden').width();
            opts.cssBefore = { left: fwd ? w : - w, top: 0, opacity: 1, display: 'block' };
            opts.cssAfter = { display: 'none' };
            opts.animIn = { left: 0 };
            opts.animOut = { left: fwd ? -w : w };
        }
    }
};

// @see: http://jquery.malsup.com/cycle2/api
$.fn.cycle.defaults = {
    allowWrap:        true,
    autoSelector:     '.cycle-slideshow',
    delay:            0,
    easing:           null,
    fx:              'fade',
    loop:             0,
    manualFx:         undefined,
    manualSpeed:      undefined,
    maxZ:             100,
    pauseOnHover:     false,
    reverse:          false,
    slideActiveClass: 'cycle-slide-active',
    slideCss:         { position: 'absolute', top: 0, left: 0 },
    slides:          '> img',
    speed:            500,
    startingSlide:    0,
    sync:             true,
    timeout:          4000
};

})(jQuery);

/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: BETA-1 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    autoHeight: 0
});    

$(document).on( 'cycle-initialized', function( e, opts, slideOpts, currSlide ) {
    var ratio;
    if ( $.type( opts.autoHeight ) == 'number' && opts.autoHeight >= 0 ) {
        // use existing slide
        opts._sentinel = $( opts.slides[opts.autoHeight] ).clone().css({
            position: 'static',
            visibility: 'hidden',
            display: 'block'
        }).prependTo( opts.container ).removeClass().addClass('cycle-sentinel');
    }
    else if ( $.type( opts.autoHeight ) == 'string' && /\d+\:\d+/.test( opts.autoHeight ) ) { 
        // use ratio
        ratio = opts.autoHeight.match(/(\d+)\:(\d+)/);
        ratio = ratio[1] / ratio[2];
        $(window).on( 'resize', onResize );
        opts._autoHeightOnResize = onResize;
        setTimeout(function() {
            $(window).triggerHandler('resize');
        },15);
    }

    function onResize() {
        opts.container.height( opts.container.width() / ratio );
    }
});

$(document).on( 'cycle-destroyed', function( e, opts ) {
    if ( opts._sentinel )
        opts._sentinel.remove();
    if ( opts._autoHeightOnResize )
        $(window).off( 'resize', opts._autoHeightOnResize );
});

})(jQuery);

/*! caption plugin for Cycle2;  version: BETA-1 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    caption:          '> .cycle-caption',
    captionTemplate:  '{{slideNum}} / {{slideCount}}',
    overlay:          '> .cycle-overlay',
    overlayTemplate:  '<div>{{title}}</div><div>{{desc}}</div>'
});    

$(document).on( 'cycle-update-view', function( e, opts, slideOpts, currSlide ) {
    var el;
    $.each(['caption','overlay'], function() {
        var name = this, template = slideOpts[name+'Template'];
        if( opts[name] && template ) {
            el = opts.API.getComponent( opts, name );
            el.html( opts.API.tmpl( template, slideOpts, currSlide ) );
        }
    });
});

$(document).on( 'cycle-destroyed', function( e, opts ) {
    var el;
    $.each(['caption','overlay'], function() {
        var name = this, template = opts[name+'Template'];
        if ( opts[name] && template ) {
            el = opts.API.getComponent( opts, 'caption' );
            el.empty();
        }
    });
});

})(jQuery);

/*! command plugin for Cycle2;  version: BETA-1 */
(function($) {
"use strict";

var c2 = $.fn.cycle;

$.fn.cycle = function( options ) {
    var cmd, cmdFn, opts;
    var args = $.makeArray( arguments );

    if ( $.type( options ) == 'number' ) {
        return this.cycle( 'goto', options );
    }

    if ( $.type( options ) == 'string' ) {
        return this.each(function() {
            var cmdArgs;
            cmd = options;
            opts = $(this).data('cycle.opts');

            if ( opts === undefined ) {
                c2.log('slideshow must be initialized before sending commands; "' + cmd + '" ignored');
                return;
            }
            else {
                cmdFn = opts.API[ cmd ];
                if ( $.isFunction( cmdFn )) {
                    cmdArgs = $.makeArray( args );
                    cmdArgs.shift();
                    cmdArgs.unshift( opts );
                    return cmdFn.apply( opts, cmdArgs );
                }
                else {
                    c2.log( 'unknown command: ', cmd );
                }
            }
        });
    }
    else {
        return c2.apply( this, arguments );
    }
};

// copy props
$.extend( $.fn.cycle, c2 );

$.extend( c2.API, {
    
    destroy: function(opts) {
        clearTimeout(opts.timeoutId);
        opts.timeoutId = 0;
        opts.API.stop( opts );
        opts.container.removeData( 'cycle.opts' );
        opts.API.trigger( 'cycle-destroyed', [ opts ] ).log('cycle-destroyed');
    },

    goto: function( opts, index ) {
        // go to the requested slide
        var num = parseInt( index, 10 );
        if (isNaN(num) || num < 0 || num >= opts.slides.length) {
            opts.API.log('goto: invalid slide index: ' + num);
            return;
        }
        if (num == opts.currSlide) {
            opts.API.log('goto: skipping, already on slide', num);
            return;
        }
        opts.nextSlide = num;
        clearTimeout(opts.timeoutId);
        opts.timeoutId = 0;
        opts.API.log('goto: ', num, ' (zero-index)');
        opts.API.prepareTx(opts, true, !opts.reverse);
    },

    stop: function( opts ) {
        clearTimeout(opts.timeoutId);
        opts.timeoutId = 0;
        opts.API.stopTransition( opts );
        opts.API.trigger('cycle-stopped', [ opts ]).log('cycle-stopped');
    },

    pause: function(opts) {
        opts.paused = true;
        opts.API.trigger('cycle-paused', [ opts ]).log('cycle-paused');
    },

    resume: function(opts) {
        opts.paused = false;
        opts.API.trigger('cycle-resumed', [ opts ]).log('cycle-resumed');
    },

    reinit: function( opts ) {
        opts.API.destroy( opts );
        opts.container.cycle();
    },

    remove: function( opts, index ) {
        var slide, slideToRemove, slides = [], slideNum = 1;
        for ( var i=0; i < opts.slides.length; i++ ) {
            slide = opts.slides[i];
            if ( i == index ) {
                slideToRemove = slide;
            }
            else {
                slides.push( slide );
                slide.data('cycle.opts').slideNum = slideNum;
                slideNum++;
            }
        }
        if ( slideToRemove ) {
            opts.slides = $( slides );
            opts.slideCount--;
            $( slideToRemove ).remove();
            if (index == opts.currSlide) {
                opts.API.advanceSlide( opts, 1 );
            }

            opts.API.trigger('cycle-slide-removed', [ opts, index, slideToRemove ]).log('cycle-slide-removed');
            opts.API.updateView( opts );
        }
    }

});

// listen for clicks on elements with data-cycle-cmd attribute
$(document).on('click.cycle', '[data-cycle-cmd]', function(e) {
    // issue cycle command
    e.preventDefault();
    var el = $(this);
    var command = el.data('cycle-cmd');
    var context = el.data('cycle-context') || '.cycle-slideshow';
    $(context).cycle(command, el.data('cycle-arg'));
});


})(jQuery);

/*! hash plugin for Cycle2;  version: BETA-1 */
(function($) {
"use strict";

$(document).on( 'cycle-pre-initialize', function( e, opts ) {
    onHashChange( opts, true );

    opts._onHashChange = function() {
        onHashChange( opts, false );
    };

    $( window ).on( 'hashchange', opts._onHashChange);
});

$(document).on( 'cycle-update-view', function( e, opts, slideOpts ) {
    if ( slideOpts.hash )
        window.location.hash = slideOpts.hash;
});

$(document).on( 'cycle-destroyed', function( e, opts) {
    if ( opts._onHashChange ) {
        $( window ).off( 'hashchange', opts._onHashChange );
    }
});

function onHashChange( opts, setStartingSlide ) {
    var hash = window.location.hash.substring(1);

    opts.slides.each(function(i) {
        if ( $(this).data( 'cycle-hash' ) === hash ) {
            if ( setStartingSlide === true ) {
                opts.startingSlide = i;
            }
            else {
                opts.nextSlide = i;
                opts.API.prepareTx( opts, true, false );
            }
            return false;
        }
    });
}

})(jQuery);

/*! loader plugin for Cycle2;  version: BETA-1.1 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    loader: false
});

$(document).on( 'cycle-bootstrap', function( e, opts ) {
    var addFn;

    if ( !opts.loader )
        return;

    // override API.add for this slideshow
    addFn = opts.API.add;
    opts.API.add = add;

    function add( opts, slides, prepend ) {
        var slideArr = [];
        slides = $( slides );
        var slideCount = slides.length;

        slides.hide().each(function() {
            var count = 0;
            var slide = $(this);
            var images = slide.is('img') ? slide : slide.find('img');
            images = images.filter(':not(.cycle-loader-ignore)'); // allow some images to be marked as unimportant
            if ( ! images.length ) {
                --slideCount;
                slideArr.push( slide );
                return;
            }

            count = images.length;
            images.each(function() {
                // add images that are already loaded
                if ( this.complete ) {
                    imageLoaded();
                }
                else {
                    $(this).load(function() {
                        imageLoaded();
                    }).error(function() {
                        if ( --count === 0 ) {
                            // ignore this slide
                            opts.API.log('slide skipped; img not loaded:', this.src);
                            if ( --slideCount === 0 && opts.loader == 'wait') {
                                addFn.apply( opts, [ opts, slideArr, prepend ] );
                            }
                        }
                    });
                }
            });

            function imageLoaded() {
                if ( --count === 0 ) {
                    --slideCount;
                    addSlide( slide );
                }
            }
        });

        if ( slideCount )
            opts.container.addClass('cycle-loading');
        

        function addSlide( slide ) {
            if ( opts.loader == 'wait' ) {
                slideArr.push( slide );
                if ( slideCount === 0 ) {
                    addFn.apply( opts, [ opts, slideArr, prepend ] );
                    opts.container.removeClass('cycle-loading');
                }
            }
            else {
                addFn.apply( opts, [ opts, slide, prepend ] );
                opts.container.removeClass('cycle-loading');
            }
        }
    }
});

})(jQuery);

/*! pager plugin for Cycle2;  version: BETA-1 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    pager:            '> .cycle-pager',
    pagerActiveClass: 'cycle-pager-active',
    pagerEvent:       'click.cycle',
    pagerTemplate:    '<span>&bull;</span>'
});    

$(document).on( 'cycle-bootstrap', function( e, opts, API ) {
    // add method to API
    API.buildPagerLink = buildPagerLink;
});

$(document).on( 'cycle-slide-added', function( e, opts, slideOpts, slideAdded ) {
    if ( opts.pager ) {
        opts.API.buildPagerLink ( opts, slideOpts, slideAdded );
        opts.API.page = page;
    }
});

$(document).on( 'cycle-slide-removed', function( e, opts, index, slideRemoved ) {
    if ( opts.pager ) {
        var pagers = opts.API.getComponent( opts, 'pager' );
        pagers.each(function() {
            var pager = $(this);
            $( pager.children()[index] ).remove();
        });
    }
});

$(document).on( 'cycle-update-view', function( e, opts, slideOpts ) {
    var pagers;

    if ( opts.pager ) {
        pagers = opts.API.getComponent( opts, 'pager' );
        pagers.each(function() {
           $(this).children().removeClass( opts.pagerActiveClass )
            .eq( opts.currSlide ).addClass( opts.pagerActiveClass );
        });
    }
});

$(document).on( 'cycle-destroyed', function( e, opts ) {
    var pagers;
    if (opts.pager && opts.pagerTemplate) {
        pagers = opts.API.getComponent( opts, 'pager' );
        pagers.empty();
    }
});

function buildPagerLink( opts, slideOpts, slide ) {
    var pagerLink;
    var pagers = opts.API.getComponent( opts, 'pager' );
    pagers.each(function() {
        var pager = $(this);
        if ( slideOpts.pagerTemplate ) {
            var markup = opts.API.tmpl( slideOpts.pagerTemplate, slideOpts, slide[0] );
            pagerLink = $( markup ).appendTo( pager );
        }
        else {
            pagerLink = pager.children().eq( opts.slideCount - 1 );
        }
        pagerLink.on( opts.pagerEvent, function(e) {
            e.preventDefault();
            opts.API.page(opts, pager, e.currentTarget);
        });
    });
}

function page( opts, pager, target ) {
    var index = pager.children().index( target );
    var nextSlide = index;
    var fwd = opts.currSlide < nextSlide;
    if (opts.currSlide == nextSlide) {
        return; // no op, clicked pager for the currently displayed slide
    }
    opts.nextSlide = nextSlide;
    opts.API.prepareTx( opts, true, fwd );
    opts.API.trigger('cycle-pager-activated', [opts, pager, target ]);
}

})(jQuery);


/*! prevnext plugin for Cycle2;  version: BETA-1 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    next:           '> .cycle-next',
    nextEvent:      'click.cycle',
    disabledClass:  'disabled',
    prev:           '> .cycle-prev',
    prevEvent:      'click.cycle',
    swipe:          true
});    


$(document).on( 'cycle-bootstrap', function( e, opts, API ) {
    // add methods to API
    API.next = function( opts ) {
        var count = opts.reverse ? -1 : 1;
        if ( opts.allowWrap === false && ( opts.currSlide + count ) >= opts.slideCount )
            return;

        opts.API.advanceSlide( opts, count );
        opts.API.trigger('cycle-next', [ opts ]).log('cycle-next');
    };

    API.prev = function( opts ) {
        var count = opts.reverse ? 1 : -1;
        if ( opts.allowWrap === false && ( opts.currSlide + count ) < 0 )
            return;

        opts.API.advanceSlide( opts, count );
        opts.API.trigger('cycle-prev', [ opts ]).log('cycle-prev');
    };
});

$(document).on( 'cycle-initialized', function( e, opts ) {
    opts.API.getComponent( opts, 'next' ).off( opts.nextEvent ).on( opts.nextEvent, function(e) {
        e.preventDefault();
        opts.API.next( opts );
    });

    opts.API.getComponent( opts, 'prev' ).off( opts.prevEvent ).on( opts.prevEvent, function(e) {
        e.preventDefault();
        opts.API.prev( opts );
    });

    if ( opts.swipe ) {
        opts.container.on( 'swipeleft.cycle', function() {
            opts.API.next( opts );
        });
        opts.container.on( 'swiperight.cycle', function() {
            opts.API.prev( opts );
        });
    }
});

$(document).on( 'cycle-update-view', function( e, opts, slideOpts, currSlide ) {
    if ( opts.allowWrap )
        return;

    var cls = opts.disabledClass;
    var next = opts.API.getComponent( opts, 'next' );
    var prev = opts.API.getComponent( opts, 'prev' );
    var prevBoundry = opts._prevBoundry || 0;
    var nextBoundry = opts._nextBoundry || opts.slideCount - 1;

    if ( opts.currSlide == nextBoundry )
        next.addClass( cls ).prop( 'disabled', true );
    else
        next.removeClass( cls ).prop( 'disabled', false );

    if ( opts.currSlide === prevBoundry )
        prev.addClass( cls ).prop( 'disabled', true );
    else
        prev.removeClass( cls ).prop( 'disabled', false );
});


$(document).on( 'cycle-destroyed', function( e, opts ) {
    $( opts.next ).off( opts.nextEvent );
    $( opts.prev ).off( opts.prevEvent );
    opts.container.off( 'swipeleft.cycle swiperight.cycle' );
});

})(jQuery);

/*! progressive loader plugin for Cycle2;  version: BETA-1 */
(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    progressive: false
});

$(document).on( 'cycle-pre-initialize', function( e, opts ) {
    if ( !opts.progressive )
        return;

    var API = opts.API;
    var nextFn = API.next;
    var prevFn = API.prev;
    var prepareTxFn = API.prepareTx;
    var slides;
    var type = $.type( opts.progressive );

    if ( type == 'array' ) {
        slides = opts.progressive;
    }
    else if ($.isFunction( opts.progressive ) ) {
        slides = opts.progressive( opts );
    }
    else if ( type == 'string' ) {
        slides = $( opts.progressive ).html();
        if ( ! $.trim( slides ) )
            return;
        try {
            slides = $.parseJSON( slides );
        }
        catch(err) {
            API.log( 'error parsing progressive slides', err );
            return;
        }
    }

    if ( prepareTxFn ) {
        API.prepareTx = function( opts, manual, fwd ) {
            var index, slide;

            if ( manual || slides.length === 0 ) {
                prepareTxFn.apply( opts, [ opts, manual, fwd ] );
                return;
            }

            if ( fwd && opts.currSlide == ( opts.slideCount-1) ) {
                slide = slides[ 0 ];
                slides = slides.slice( 1 );
                opts.container.one('cycle-slide-added', function(e, opts ) {
                    opts.API.advanceSlide( opts, 1 );
                    // opts.container.removeClass('cycle-loading');
                });
                // opts.container.addClass('cycle-loading');
                opts.API.add( opts, slide );
            }
            else if ( !fwd && opts.currSlide === 0 ) {
                index = slides.length-1;
                slide = slides[ index ];
                slides = slides.slice( 0, index );
                opts.container.one('cycle-slide-added', function(e, opts ) {
                    opts.currSlide = 1;
                    opts.API.advanceSlide( opts, -1 );
                    // opts.container.removeClass('cycle-loading');
                });
                // opts.container.addClass('cycle-loading');
                opts.API.add( opts, slide, true );
            }
            else {
                prepareTxFn.apply( opts, [ opts, manual, fwd ] );
            }
        };
    }

    if ( nextFn ) {
        API.next = function( opts ) {
            if ( slides.length && opts.currSlide == ( opts.slideCount - 1 ) ) {
                var slide = slides[ 0 ];
                slides = slides.slice( 1 );
                opts.container.one('cycle-slide-added', function(e, opts ) {
                    nextFn.apply( opts, [ opts ] );
                    opts.container.removeClass('cycle-loading');
                });
                opts.container.addClass('cycle-loading');
                opts.API.add( opts, slide );
            }
            else {
                nextFn.apply( opts, [ opts ] );    
            }
        };
    }
    
    if ( prevFn ) {
        API.prev = function( opts ) {
            if ( slides.length && opts.currSlide === 0 ) {
                var index = slides.length-1;
                var slide = slides[ index ];
                slides = slides.slice( 0, index );
                opts.container.one('cycle-slide-added', function(e, opts ) {
                    opts.currSlide = 1;
                    opts.API.advanceSlide( opts, -1 );
                    opts.container.removeClass('cycle-loading');
                });
                opts.container.addClass('cycle-loading');
                opts.API.add( opts, slide, true );
            }
            else {
                prevFn.apply( opts, [ opts ] );
            }
        };
    }
});

})(jQuery);

/*! tmpl plugin for Cycle2;  version: BETA-1 */
(function($) {
"use strict";

$.extend($.fn.cycle.API, {
    tmpl: function( str, opts, extra ) {
        if (str && opts) {
            return str.replace(/\{\{((\.)?.*?)\}\}/g, function(_, str) {
                var i, prop, obj = opts, names = str.split('.');
                if (names.length > 1) {
                   prop = opts;
                   for (i=0; i < names.length; i++) {
                      obj = prop;
                      prop = prop[ names[i] ] || str;
                   }
                } else {
                    prop = opts[str];
                }

                if ($.isFunction(prop))
                   return prop.call(obj, opts);
                if (prop !== undefined && prop !== null)
                    return prop;
                if (extra && extra[ str ] !== undefined)
                    return extra[ str ];
                return str;
            });
        }
    }
});    

})(jQuery);
