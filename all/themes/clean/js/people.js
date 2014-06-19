(function ($) {
	Drupal.behaviors.peopleBehavior = {
		attach: function(context){
	    	var opt = {
		    	collapsible: true,
		    	active: false, //close all at first
		    	autoHeight: false,
		    	heightStyle: "auto",
		    	clearStyle: true,
		    	icons: false,
	    	}
	    	
	    	$('img').load(function(){
	    		$('.view-people.view-display-id-page .view-content').focus().accordion(opt);
	    	});
		}
	}
})(jQuery)