<?php

$pageContent = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Mahatma%20Gandhi');
$pageContent1 = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Mahatma%20Gandhi');

//estraggo soltanto il json
$dom = new DOMDocument();
$dom->loadHTML($pageContent,$pageContent1);

$xpath = new DOMXPath($dom);
$tags = $xpath->query('//pre'); //('//div[@class="text"]')

foreach ($tags as $tag) {
    var_dump($tag->textContent);
}

//indico il nome del file e la sua posizione
$csv_folder  = getenv("DOCUMENT_ROOT").'/wikimole/data/';
$filename = 'file.txt';
$filenameb = 'data.txt';

//echo $csv_folder . $CSVFileName;
/*$myfile = fopen($csv_folder . $filename, "w") or die("Unable to open file!"); //($fileLocation, "w")
$content = $pageContent; // . $pageContent1;
fwrite($myfile, $content);
fclose($myfile);*/

//stampo il contenuto della query di wikipedia
//echo $content;

//echo "<br/>";
//echo "json creato";
//echo "<br/>";
echo "ciao 068";
echo "<br/>";

//uso l'estensione json al posto del txt
$jsonTxt = rename($csv_folder . $filename, $csv_folder . "file.json");
$json = $pageContent; //file_get_contents('http://localhost:8888/wikimole/data/file.json');
$json_parse = json_decode($json,true); //(array)json_decode($json,true);

$jsontest = file_get_contents('http://localhost:8888/wikimole/data/filetest.json');
$json_parse_test = json_decode($jsontest, true);

$jsontestb = $pageContent1;//file_get_contents('http://localhost:8888/wikimole/data/filetestb.json');
$jsonb_parse_test = json_decode($jsontestb, true);

//var_dump(json_decode($jsontest, true));
/*var_dump($json_parse_test);
echo '<br/>';*/

//var_dump($json_parse[query][pages][19379][langlinks]);
//echo '<br/>';

//definizione dei valori sotto forma di array
$lang = [];
$cat = [];

//estraggo una serie di valori dal json
foreach($json_parse[query][pages][19379][langlinks] as $a) {
    $lang[] = $a[lang];//"Lang: ". $a[lang];
};

foreach($jsonb_parse_test[query][pages][19379][categories] as $b) {
    $cat[] = $b[title]; // 'Cat: '. $b[title];
};

echo '{"19379": {"Language": ';
echo json_encode($lang);
echo ',"Category": ';
echo json_encode($cat);
echo '}}';
echo '<br/>';

$twodata = '{"19379": {"Language": '.json_encode($lang).',"Category": '.json_encode($cat).'}}';

//scrivo il file json con i due insiemi di dati
$jsonMerged = fopen($csv_folder . $filenameb, "w") or die("Unable to open file!"); 
$content = $twodata; // . $pageContent1;
fwrite($jsonMerged, $twodata);
fclose($jsonMerged);
$jsonFile = rename($csv_folder . $filenameb, $csv_folder . "data.json");


/*
echo json_encode(array_merge($lang,$cat));
echo '<br/>';

echo json_encode($lang).json_encode($cat);
echo '<br/>';

/*foreach($json_parse[query][pages][19379][langlinks] as $p) {
    $cat[] = 'Lang: '. $p[lang];
};*/

/*$arrayMerge = json_encode(array_merge($lang,$cat));
echo $arrayMerge;
echo '<br/>';

$arrayMergea = json_encode(array_merge($json_parse,$jsonb_parse_test));
echo $arrayMergea;
echo '<br/>';


/*
$myArray = json_encode($lang).",".json_encode($cat);
echo '{"article1":'.$myArray."}";
echo '<br/>';
*/

/*
foreach($json_parse_test[person] as $p) {
    echo 'Name: '.$p[name][first].' '.$p[name][last].'Age: '.$p[age].'';
}
echo '<br/>';
*/





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


