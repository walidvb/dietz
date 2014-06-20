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
	    //EOattach	
	  }
	};

})(jQuery);