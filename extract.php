<?php

echo "extract.php";
echo "<br/>";

echo "ciao 078";
echo "<br/>";

/*
# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);
*/

//richiamo il json con il nome degli articoli
$articlesfile = file_get_contents('http://localhost:8888/wikimole/articles.json');
$articles = json_decode($articlesfile,true);

//definisco la variabile che conterrà la lista delle api della lingua
$articleName = [];
$api = [];

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

$template = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=transcludedin&titles=Mahatma%20Gandhi');
//echo $template;
//echo "<br/>";

$html = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');





// Create DOM from URL or file
$html_a = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');

/*
$dom_a = new DOMDocument();

$dom_a->validateOnParse = true; //<!-- this first
$dom_a->loadHTML($html_a);        //'cause 'load' == 'parse

//$dom_a->preserveWhiteSpace = false;


$belement = $dom_a->getElementsByTagName('ul');//getElementById("mw-pageinfo-templates");
//$belement = $dom_a->find('div.mw-body');
//echo $dom_a;

//$postalCodesList = [];
*/
$dom_a = new DOMDocument();
$dom_a->loadHTML($html_a);
$postalCodesList = $dom_a->getElementsByTagName('ul');
foreach ($dom_a->/*item(0)->*/getElementsByTagName('li') as $dom_a) {
    echo $dom_a->nodeValue.'<br />';
    //$template = json_encode($postalCodesList);  
    //echo $template;                  
}


//echo $belement->nodeValue;
//echo "<br/>";

/*
    $dom = new DOMDocument();
    $dom->loadHTML($data);
    $postalCodesList = $dom->getElementsByTagName('ul');
    foreach ($postalCodesList->item(0)->getElementsByTagName('li') as $postalCodesList) {
        echo $postalCodesList->nodeValue.'<br />';                    
    }

/*
$doc = new DOMDocument();
$doc->loadHTML($html);
$liList = $doc->getElementsByTagName('li');
$liValues = array();
foreach ($liList as $li) {
    $liValues[] = $li->nodeValue;
}

var_dump($liValues);


/* 
//to fetch all images from a webpage
$images = array();
foreach($html->find('img') as $img) {
 $images[] = $img->src;
}
print_r($images);
 
//to find h1 headers from a webpage
$headlines = array();
foreach($html->find('h1') as $header) {
 $headlines[] = $header->plaintext;
}
print_r($headlines);

/*
//find the second paragraph
$element = $html->find("p");

//Get all data inside the <div> where class = "pricing"
foreach($html->find('div[class=mw-body]')->outertext as $data) {
    echo $data->outertext;
}


$url = 'https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers';

$html = file_get_html($url);

//Get all data inside the <tr> of <table class="results">
foreach($html->find('table[class=mw-page-info] tr') as $tr) {
    //get all <td> where class is NOT "debug"
    //foreach($tr->find('td[class!=debug]') as $t) {
        //get the inner HTML
        $data_a = $t->outertext;
    //}
    echo $data_a;
    echo "Non funziona";
}


/*
// Find all links
foreach($html->find('a') as $element)
       echo $element->href . '<br>'; 
*/



/*
$dom_a = new DOMDocument();
$dom_a->loadHTML($html_a);

$xpath_a = new DOMXPath($dom_a);
$tags_a = $xpath_a->query('div[@id="content"]');//div[@class="content"] 
foreach ($tags_a as $tag_a) {
    var_dump($tag_a->textContent_a);
}
echo "<br/>";
*/



/*
$templateb = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');
echo $templateb;
echo "<br/>";
*/

/*estraggo soltanto la lista dei template
$dom_a = new DOMDocument();
$dom_a->loadHTML($templateb);

$xpath_1 = new DOMXPath($dom_a);
$list_a = $xpath_1->query('//tr[@id="mw-pageinfo-templates"]'); //('//div[@class="text"]')

foreach ($list_a as $list_b) {
    var_dump($list_b->lsitContent);
}*/

/*
$html = file_get_html('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');
$x = $html->find('div.mw-body',0); //.content
echo $x;
echo "<br/>";

include "simple_html_dom.php";
$html = new simple_html_dom();
$html->load_file('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');
$con_div = $html->find('div',0);//get value plaintext each html


// Create DOM from URL or file
$html = file_get_html('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');

// Find all images
foreach($html->find('ul') as $element_a){
    echo $element_a->li . '<br>';
}*/

/*
echo $con_div;
echo "<br/>";
*/

/*
foreach($articles[articles] as $c) {
    echo "<br/>";
    $articleName[] = $c[art];
    echo "<br/>";
};
*/

//estraggo soltanto il json
$dom = new DOMDocument();
$dom->loadHTML($apiLang,$apiCat);

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


