<?php

$pageContent = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Mahatma%20Gandhi');
//$pageContent1 = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Mahatma%20Gandhi');

//estraggo soltanto il json
$dom = new DOMDocument();
$dom->loadHTML($pageContent,$pageContent1);

$xpath = new DOMXPath($dom);
$tags = $xpath->query('//pre'); //('//div[@class="text"]')

foreach ($tags as $tag) {
    var_dump($tag->textContent);
}

//creo il file
$csv_folder  = getenv("DOCUMENT_ROOT").'/wikimole/data/';
$filename = 'file.txt';

//echo $csv_folder . $CSVFileName;
/*$myfile = fopen($csv_folder . $filename, "w") or die("Unable to open file!"); //($fileLocation, "w")
$content = $pageContent; // . $pageContent1;
fwrite($myfile, $content);
fclose($myfile);*/

//stampo il contenuto della query di wikipedia
//echo $content;

//echo "<br/>";
echo "json creato";
echo "<br/>";
echo "ciao 082";
echo "<br/>";

//uso l'estensione json al posto del txt
$jsonTxt = rename($csv_folder . $filename, $csv_folder . "file.json");
$json = file_get_contents('http://localhost:8888/wikimole/data/file.json');
$json_parse = json_decode($json,true); //(array)json_decode($json,true);

$jsontest = file_get_contents('http://localhost:8888/wikimole/data/filetest.json');
$json_parse_test = json_decode($jsontest, true);

//var_dump(json_decode($jsontest, true));
/*var_dump($json_parse_test);
echo '<br/>';*/

//var_dump($json_parse[query][pages][19379][langlinks]);
//echo '<br/>';

$lang = [];

foreach($json_parse[query][pages][19379][langlinks] as $p) {
    $lang[] = 'Lang: '. $p[lang];
};

$myArray = json_encode($lang);
echo $myArray;
echo '<br/>';

/*
foreach($json_parse_test[person] as $p) {
    echo 'Name: '.$p[name][first].' '.$p[name][last].'Age: '.$p[age].'';
}
echo '<br/>';
*/

$array = array(
    'name' => 'ben',
    'age' => 23,
    'skills' => array(
        'php', 'css', 'javascript'
    )
);

$jsonb = json_encode($array);

echo $jsonb;
echo '<br/>';


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


