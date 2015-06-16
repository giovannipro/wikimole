<?php			
	
	header('Access-Control-Allow-Origin: *');
	echo file_get_contents($_GET['https://it.wikipedia.org/wiki/Pagina_principale']); 

	/*
	$url = $_GET['https://it.wikipedia.org/wiki/Pagina_principale'];
	$ch = curl_init(); 
	curl_setopt($ch, CURLOPT_URL, $url); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	$output = curl_exec($ch); 
	curl_close($ch);
	echo $content;
	*/
?>