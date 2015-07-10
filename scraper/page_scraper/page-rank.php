<?php 
# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);
?>

<html>
	<body>
		<!-- Script works if loaded by MAMP -->
		<title>Page rank</title>
		<script src="../lib/js/jquery.min.js"></script>
		<script src="../lib/js/jquery.xdomainajax.js"></script>
		<link rel="stylesheet" href="../lib/css/scraper.css" rel="stylesheet">

		<main>
			<div id="title" class="hide_1">
				<h1>Google page rank<h1>
				<h2></h2>
			</div>
			<div class="box_100">
				<div class="label one hide_1" onclick=""><!-- get_source_target() -->
					<span>Page Rank</span>
				</div>
				<div id="" class="hide_2">
	
					<?php
						$json = file_get_contents('../articles/articles_test.json'); // this WILL do an http request for you
						$data = json_decode($json, true); // json_decode($json, true);

						$url = array("http://www.maind.supsi.ch/", "http://www.supsi.ch/", "http://www.fablab.supsi.ch/");

						//array_push($url, 'http://www.maind.supsi.ch/'); //'http://www.maind.supsi.ch/'

						foreach ( $data as $val )
						{
							//array_push($url, $val)
							echo 'https://en.wikipedia.org/wiki/' . $val . '<br/>';
							//$newjson = json_encode($val);
						}

						echo '<br/><br/>';

						//print_r($data); 
						//echo $data;

						//$articles = print_r($data);
						//echo articles;
						//$articles = array();

						//$articles = array[];

   						/*
   						foreach ( $data as $val )
						{
							//echo $article;
						    // print_r($article);
						    //echo $articles; 
						    //$articles[] = $val;

						}
						*/

						//echo $articles;

						//print_r ($data);
						//echo $articles;

						/*
						$articles = array();

						foreach($data as $link) {
						    $articles[] = $link; 
						    //echo $link;
						    //echo $articles;
						    
						    //array_push($articles, $test);
						    echo $articles
						}*/

						//echo $articles
						
				
						require("PRclass.php");
						//$url = array("http://www.maind.supsi.ch/", "http://www.supsi.ch/", "http://www.fablab.supsi.ch/");
						$pr = new PR();

						foreach ($url as &$value) {  //$url // ($i = 1; $i <= 10; $i++) 
						    echo $value . ', ' . $pr->get_google_pagerank($value) . '<br/> ' ; //$url
						}

					?>
				</div>
				<div id="content1" class="hide_2" onclick=""><!-- hide() -->

				</div>
			</div>

			<!--<div class="box">
				<div class="label two hide_1" onclick="get_id_label()">
					<span>Get id-label (nodes)<span>
				</div>
				<div id="id_label" class="hide_2"></div>				
				<div id="content2" class="box_100 hide_2" onclick="hide()"></div>
			</div>-->

			<div class="clear"></div>
		</main>

	</body>
</html>