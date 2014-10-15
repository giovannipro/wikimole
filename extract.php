<?php

echo "extract.php";
echo "<br/>";

echo "ciao 030";
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
$apiLang = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Mahatma%20Gandhi');
$apiCat = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Mahatma%20Gandhi');

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

JSON validator
http://jsonlint.com/

References
http://codular.com/json
http://www.academia.edu/4092169/Get_data_from_string_with_JSON_object_in_PHP
http://www.developersnacks.com/2012/06/export-html-to-csv-in-php.html
http://stackoverflow.com/questions/8858848/php-read-and-write-json-from-file

*/

?>


