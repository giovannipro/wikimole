<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	//echo file_get_contents($_POST['http://it.wikipedia.org/wiki/JavaScript_Object_Notation']);
	
	header('Access-Control-Allow-Origin: *');
	//header('Content-Type: application/json');

	if (!isset($_GET['url'])) {
	    die(); // Don't do anything if we don't have a URL to work with
	}
	$url = urldecode($_GET['url']);
	//$url = 'https://' . str_replace('https://', '', $url); // Avoid accessing the file system

	$proxy = "localhost:8888";
	/*
	$arrContextOptions = array(
	    "ssl"=>array(
	        "verify_peer"=>true, // false
	        'request_fulluri' => true,
	        "verify_peer_name"=>true, // false
	    ),
	);  
	*/


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	//curl_setopt($ch, CURLOPT_PROXY, $proxy);
	//curl_setopt($ch, CURLOPT_PROXYUSERPWD, $proxyauth);
	//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($ch, CURLOPT_HEADER, 1);
	$curl_scraped_page = curl_exec($ch);
	curl_close($ch);
	echo $curl_scraped_page;

	//$id = $doc->getElementById('#content')
	//$response = file_get_contents($url, false, stream_context_create($arrContextOptions));
	//$response = file_get_contents($url,false);
	//echo $response; 

?>