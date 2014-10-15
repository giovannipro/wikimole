<?php

echo "extract.php";
echo "<br/>";

echo "ciao 009";
echo "<br/>";

$articles = file_get_contents('http://localhost:8888/wikimole/articles.json');

$articleName = [];

foreach($articles[articles] as $c) {
    $articleName[] = $c[0];
};

echo json_encode($articleName);
echo "<br/>";

$apiLang = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Mahatma%20Gandhi');
$apiCat = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Mahatma%20Gandhi');

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


