<?php

echo "extract.php";
echo "<br/>";

echo "ciao 054";
echo "<br/>";

# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);


//richiamo il json con il nome degli articoli
$articlesfile = file_get_contents('http://localhost:8888/wikimole/articles.json');
$articles = json_decode($articlesfile,true);

//definisco la variabile che conterrà la lista delle api della lingua
$articleName = [];
//$api = [];

//ottengo il link alle api della lingua
foreach($articles[articles] as $c) {
    $articleName[] = $c[art];
    $apilink = "https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=".json_encode($c[art]);//$articleName
    $apilink = str_replace('"', "", $apilink);
    
    $link = "'".$apilink."'";

    echo $link;
    echo "<br/>";

    /*foreach ($link as $d) {
        $api[] = $d;
        echo $link."ce la faccio";
        echo "<br/>";
    }*/
};
echo "<br/>";

//cerco api per lingua e categoria per un solo articolo
$apilang = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Mahatma%20Gandhi');
$apicat = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Mahatma%20Gandhi');

//cerco info sui template
$template = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=transcludedin&titles=Mahatma%20Gandhi');
$html = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info');


$dom_b = new DOMDocument();
$dom_b->loadHTML($html);
//$list = $dom_b->getElementsByTagName('ul');
foreach ($dom_b->getElementsByTagName('li') as $dom_b) {
    echo $dom_b->nodeValue.'<br />';               
}

echo "<br/>";





//estraggo soltanto la list di template 
$dom_a = new DOMDocument();
$dom_a->loadHTML($html);

$xpath_a = new DOMXpath($dom_a);
$a_elements = $xpath_a->query("*//div/div[3]/table[4]/tr[2]/td[2]");//si conta a partire da 0; se 0 non inserire nulla, es. /div

foreach ($a_elements as $a_element) {
    //$apitemp = var_dump($a_element->textContent);
    $apitemp = $a_element->nodeValue.'<br />';   
}

$test = json_encode($apitemp);
echo $test;
echo 'ciao <br />';




/*
$dom_c = new DOMDocument();
$dom_c->loadHTML($html);
$c_elements = $dom_c->query("/div/div[3]/table[4]/tr[2]");//td[2]
//foreach ($c_elements->getElementsByTagName('td') as $dom_c) {
foreach ($c_elements as $c_element) {
    echo $c_elements->nodeValue.' xxx <br />';               
}

echo "<br/>";
*/

//estraggo soltanto il testo delle api lingua e categoria
$dom = new DOMDocument();
$dom->loadHTML($apiLang , $apiCat);

$xpath = new DOMXPath($dom);
$tags = $xpath->query('//pre'); //('//div[@class="text"]')

foreach ($tags as $tag) {
    var_dump($tag->textContent);
}




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


