<?php
	//echo file_get_contents($_POST['http://it.wikipedia.org/wiki/JavaScript_Object_Notation']);
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	header('Access-Control-Allow-Origin: *');

	if (!isset($_GET['url'])) {
	    die(); // Don't do anything if we don't have a URL to work with
	}
	$url = urldecode($_GET['url']);
	$url = 'http://' . str_replace('http://', '', $url); // Avoid accessing the file system

	//$id = $doc->getElementById('#content')
	echo file_get_contents($url);
?>