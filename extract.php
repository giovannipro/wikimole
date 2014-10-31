<?php
//require_once('parsing.php');
require_once('functions.php');

echo "extract.php";
echo "<br/>";

echo "ciao 007";
echo "<br/>";

# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);

//richiamo il json con il nome degli articoli
$articlesfile = file_get_contents('http://localhost:8888/wikimole/articles.json');
$articles = json_decode($articlesfile,true);

//definisco la variabile che conterrà la lista delle api della lingua
$articleTitle = [];
$api = [];

//ottengo il link alle api della lingua 
foreach($articles['articles'] as $key=>$val) {

    $apilink = "https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=".$val['title'];//,true);
    $apilink = str_replace('"', "", $apilink);
    
    $link = "'".$apilink."'";

    //$test = file_get_contents($apilink); 

    $articleTitle = $val['title'];

    echo $apilink;
    //echo $articleTitle;
    //echo $test;
    echo "<br/>";

};
echo "<br/>";








$template = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=transcludedin&titles=Mahatma%20Gandhi');

$html = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info');

$dom_b = new DOMDocument();
$dom_b->loadHTML($html);
//$list = $dom_b->getElementsByTagName('ul');
foreach ($dom_b->getElementsByTagName('li') as $dom_b) {//[@id="mw-pageinfo-templates"]
//foreach ($dom_b->getElementById('wikitable') as $dom_b) {
    echo $dom_b->nodeValue.'<br />';               
}




/*
// Create DOM from URL or file
$html_a = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');

$dom_a = new DOMDocument();
$dom_a->loadHTML($html_a);
$postalCodesList = $dom_a->getElementsByTagName('ul');
foreach ($dom_a->getElementsByTagName('li') as $dom_a) {  //foreach ($dom_a->getElementsByTagName('li') as $dom_a) {
    echo $dom_a->nodeValue.'<br />';
    //$template = json_encode($postalCodesList);  
    //echo $template;                  
}
*/


/*
//estraggo soltanto il json
$dom = new DOMDocument();
$dom->loadHTML($apilang,$apicat,$apilang_b,$apicat_b);

$xpath = new DOMXPath($dom);
$tags = $xpath->query('//pre'); //('//div[@class="text"]')

foreach ($tags as $tag) {
    var_dump($tag->textContent);
}
*/

/* 

------------------------------------------
References
------------------------------------------

Estrarre contenuti da pagina html
http://simplehtmldom.sourceforge.net/manual.htm

JSON validator
http://jsonlint.com/

http://codular.com/json
http://www.academia.edu/4092169/Get_data_from_string_with_JSON_object_in_PHP
http://www.developersnacks.com/2012/06/export-html-to-csv-in-php.html
http://stackoverflow.com/questions/8858848/php-read-and-write-json-from-file

*/

?>


