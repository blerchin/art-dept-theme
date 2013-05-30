<?php
	//setup proper viewport behavior on mobile
function wcart_preprocess_html(&$vars){
	$viewport = array(
		  '#tag' => 'meta', 
			'#attributes' => array(
			    'name' => 'viewport', 
			    'content' => 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1',
									  ),
									);
	drupal_add_html_head($viewport, 'viewport');
	drupal_add_js( 'http://fast.fonts.com/jsapi/78f3f5fd-946a-48bb-b2a7-a2b9dd468dd4.js', 'external');

}
					
