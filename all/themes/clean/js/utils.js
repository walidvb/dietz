(function ($) {
	Drupal.behaviors.utilsBehavior = {
		attach: function(context){
	    	var opt = {
		    	collapsible: true,
		    	active: false,
		    	heightStyle: 'content',
	    	}
	    	$('.view-people .view-content').focus().accordion(opt);

		}
	}
})(jQuery)