<?php
	$url = $_POST['scrape-7.html'];
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
	$curl_scraped_page = curl_exec($ch);
	curl_close($ch);
	$curl_scraped_page;
	$content = str_replace('"', "'", $curl_scraped_page);
	$content = str_replace("<script", '', $content);
	$content = str_replace("</script>", '', $content);
	$content = str_replace("<img ", '<span ', $content);
	$content = str_replace(array("\r", "\r\n", "\n"), '', $content);
	$content = trim($content);
	echo '<div id="jqueryScrape">'.$content.'</div>';

?>

<?php			
	
	/*
	header('Access-Control-Allow-Origin: *');
	echo file_get_contents($_GET['https://it.wikipedia.org/wiki/Pagina_principale']); 
	*/

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