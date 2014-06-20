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

})(jQuery);