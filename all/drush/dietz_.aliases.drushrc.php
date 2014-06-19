<?php

	$aliases['dev'] = array(
	  'root' => '/Users/Gaston/Sites/dietz_',
	  'uri'  => 'http://localhost/dietz',
	  'path-aliases' => array(
    '%files' => 'sites/default/files',
    '%mod' => 'sites/all/modules',
    '%themes' => 'sites/all/themes',
  )
	);
		
	$aliases['prod'] = array (  
	  'uri' => 'http://vbbros.net/dietz',
	  'root' => '/home2/vbbrosne/public_html/dietz_',
	  'remote-user' => 'vbbrosne',
	  'remote-host' => 'vbbros.net',
	  'remote-password' => 'Coudrette236!',
	  'path-aliases' => array(
	  	'%files' => 'sites/default/files',
	  	'%mod' => 'sites/all/modules',
	  	'%themes' => 'sites/all/themes',
	  	)
    );
