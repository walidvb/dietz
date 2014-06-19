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

})(jQuery);