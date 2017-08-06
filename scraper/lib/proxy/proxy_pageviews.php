<?php
	//echo file_get_contents($_POST['http://it.wikipedia.org/wiki/JavaScript_Object_Notation']);
	
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if (!isset($_GET['url'])) {
	    die(); // Don't do anything if we don't have a URL to work with
	}
	$url = urldecode($_GET['url']);
	$url = 'http://' . str_replace('http://', '', $url); // Avoid accessing the file system

	//$id = $doc->getElementById('#content')

?>

<?php echo file_get_contents($url);?>
<?php /* <div> </div>  <!-- You should probably use cURL. The concept is the same though --> ?>