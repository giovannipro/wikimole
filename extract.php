<?php

echo "extract.php";
echo "<br/>";

echo "ciao 044";
echo "<br/>";

//richiamo il json con il nome degli articoli
$articlesfile = file_get_contents('http://localhost:8888/wikimole/articles.json');
$articles = json_decode($articlesfile,true);

$articleName = [];

//ottengo il link alle api della lingua
foreach($articles[articles] as $c) {
    $articleName[] = $c[art];
    //$c[art] = str_replace('"', "", $c[art]);
    $apilink = "https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=".json_encode($c[art]);//$articleName
    $apilink = str_replace('"', "", $apilink);
    

    $link = "'".$apilink."'";
    echo $link;
    //echo file_get_contents($link);
    //echo json_decode(file_get_contents("$apilink"),true);
    //echo json_encode($articleName)
    echo "<br/>";
};

/*
$json = $apiLang; //file_get_contents('http://localhost:8888/wikimole/data/file.json');
$json_parse = json_decode($json,true);
*/

//cerco api per lingua e categoria per un solo articolo
$apilang = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Mahatma%20Gandhi');
$apicat = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Mahatma%20Gandhi');

$template = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=transcludedin&titles=Mahatma%20Gandhi');
echo $template;
echo "<br/>";

$html = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers');
//$ret = $html->find('body');
//$html_a->load("https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info#mw-pageinfo-watchers");

echo "gli echo qui sotto non funzionano";
//echo $html;
//echo "<br/>";

//echo $ret;
//echo "<br/>";

echo $html->getElementById('content');
echo "<br/>";


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


