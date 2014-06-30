var miniframes = new Array();
var superframe;
var currFrame;
var currMiniframe = 0;
var firstInit = true;
var mobile = "";
var superTimeOut;
var timeOut;
var initialPageLoad = true;
var lastTime = new Date();
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
			lastTime = new Date();
			$('body').addClass('in-transit');
			superframe.cycle('next');
		}
		//next project
		down_ = function(e) {
			e.preventDefault();
			lastTime = new Date();
			$('body').addClass('in-transit');
			superframe.cycle('prev');
		}
		//previous frame
		left_ = function(e) {
			lastTime = new Date();
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
			lastTime = new Date();
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
		var info = $('<div id="info-trigger" class="nav"></div>');
		
		var nav = up.add(down).add(left).add(right);
		if(mobile == "")
		{

		}		
		nav.add(info).appendTo($('body'));

		var interval;
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
			$('body').addClass('list-closed');
			setTimeout(removeHelper, 2500);
			var nid = $(this).attr('data-nid');
			var index = $('.miniframe[data-nid="'+nid+'"]').index();
			superframe.cycle(index);
		});

		//Help
		var helpClass = 'helper';
		var helper = $('.'+helpClass);
		function removeHelper(){
			helper.addClass('helpout');
		}
		helper.click(removeHelper);
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

    //bind mousewheel
    superframe.on('mousewheel', wheelMove);
    $('.proj-info').on('mousewheel', function(e){e.stopPropagation();})
    function wheelMove(e, deltaY) {
    	//superframe.unbind('mousewheel', wheelMove);
    	var threshold = 0;
    	if(new Date() - lastTime > 900)
    	{
    		lastTime = new Date();
    		if(e.deltaX < threshold){
    			left_(e);
    			return;
    		}
    		else if(e.deltaX > threshold){
    			right_(e);
    			return;
    		}
    		if (e.deltaY > threshold) {
    			up_(e);
    		}
    		else if (e.deltaY < -threshold) {
    			down_(e);
    		}
    	}
    }

	//EOBEHAVIOR	
}
};

})(jQuery);

//include mousewheel
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */
 !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});