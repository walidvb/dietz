<?php

	$aliases['dev'] = array(
	  'root' => '/Users/Gaston/Sites/dietz',
	  'uri'  => 'http://localhost',
	  'path-aliases' => array(
    '%files' => 'sites/default/files',
    '%mod' => 'sites/all/modules',
    '%themes' => 'sites/all/themes',
  )
	);
		
	$aliases['prod'] = array (  
	  'uri' => 'http://vbbros.net/dietz',
	  'root' => '/home2/vbbrosne/public_html/dietz',
	  'remote-user' => 'vbbrosne',
	  'remote-host' => 'vbbros.net',
	  'remote-password' => 'Coudrette236!',
	  'path-aliases' => array(
	  	'%files' => 'sites/default/files',
	  	'%mod' => 'sites/all/modules',
	  	'%themes' => 'sites/all/themes',
	  	)
    );