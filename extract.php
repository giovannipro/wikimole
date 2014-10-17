<?php

echo "extract.php";
echo "<br/>";


echo "ciao 082";
echo "<br/>";


# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);


//richiamo il json con il nome degli articoli
$articlesfile = file_get_contents('http://localhost:8888/wikimole/articles.json');
$articles = json_decode($articlesfile,true);

//definisco la variabile che conterrà la lista delle api della lingua
$articleName = [];
$api = [];


//ottengo il link alle api della lingua ---> non funziona
foreach($articles[articles] as $c) {
    $articleName[] = $c[art];
    $apilink = "https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=".json_encode($c[art]);
    $apilink = str_replace('"', "", $apilink);
    
    $link = "'".$apilink."'";

    echo $apilink;
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

$html = file_get_contents('https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info');


$dom_b = new DOMDocument();
$dom_b->loadHTML($html);
//$list = $dom_b->getElementsByTagName('ul');
foreach ($dom_b->getElementsByTagName('li') as $dom_b) {//[@id="mw-pageinfo-templates"]
//foreach ($dom_b->getElementById('wikitable') as $dom_b) {
    echo $dom_b->nodeValue.'<br />';               
}





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



//header('Content-type: application/json');
$url = $_GET['https://en.wikipedia.org/w/index.php?title=Mahatma_Gandhi&action=info'];//url
$result = get_data($url);
$result = explode('data-sc-track="', $result );
$result = explode( '"', $result[0]);//1
$json = array( "trackID" => $result[0] );//1
echo json_encode($json);
function get_data($url) {
$ch = curl_init();
$timeout = 5;
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
$data = curl_exec($ch);
curl_close($ch);
return $data;
}




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


