<?php
/**
 * @file
 * Includes the library of functions.
 */
include('includes/clean.functions.inc');
include('includes/clean.preprocess.inc');

function render_($string){
	return strip_tags(drupal_clean_css_identifier($string, array(' & ' => '-', '&' => '-', ' ' => '-', '_' => '-', '/' => '-', '[' => '-', ']' => '')));
}


//return link to image, to be further processed by jquery to furnish the image
function clean_image_style($vars){
	if($vars['style_name'] == 'fullscreen' || $vars['style_name'] == 'more_imgs')
	{

		$title = $vars['project_first_load'];
		$alt = $vars['alt'];
		$loading = path_to_theme() . "/img/loading.gif";
		$path = file_create_url($vars['path']);
		$style_path = image_style_url('fullscreen', $vars['path']);
		$small_path = image_style_url('project_first_load', $vars['path']);
		$mobile_path = image_style_url('mobile', $vars['path']);
		$mobile_zoom = image_style_url('mobile_zoom', $vars['path']);
		$zoom_path = image_style_url('zoom_image', $vars['path']);
		$background = ($vars['style_name'] == 'more_imgs') ? "" : ", url('$small_path')";
		$backed  = ($vars['style_name'] == 'fullscreen') ? "bcked" : "";

		$return = "<div class=\"zoom-placeholder slide img-loading $backed\" data-small-src=\"$small_path\" data-small-src-mobile=\"$mobile_path\" data-src-zoom=\"$path\"  data-src-zoom-mobile=\"$mobile_zoom\" style=\"background-image:url('$loading') $background\">";
		$return .=  l('', $style_path, array('html' => 'true', 'attributes' => array(
																		'class' => 'link-to-img', 
																		'width' => '100%',
																		'alt' => $alt, 
																		'title' => $title,
																		)) );
		$return .= '</div>';
		return $return;
		//return '<a href="' . $path . '"><img typeof="foaf:Image" src="' . $style_path . '" width="100%" alt="' . $alt . '" title="' . $title .'"/></a>';
	}
	return theme_image_style($vars);
}

/*
* Implementation of hook_form_FORM_ID_alter
* 
* Hiding taxonomy term description field
*/

function clean_form_taxonomy_form_term_alter(&$form, &$form_state) {
  $form['description']['#access'] = FALSE;
}

