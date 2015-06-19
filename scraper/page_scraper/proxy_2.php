<?php
	//echo file_get_contents($_POST['http://it.wikipedia.org/wiki/JavaScript_Object_Notation']);
	
	header('Access-Control-Allow-Origin: *');

	if (!isset($_GET['url'])) {
	    die(); // Don't do anything if we don't have a URL to work with
	}
	$url = urldecode($_GET['url']);
	$url = 'https://' . str_replace('https://', '', $url); // Avoid accessing the file system

	?>

	<div><?php echo file_get_contents($url);?>"></div>
	 // You should probably use cURL. The concept is the same though
	
