<?php 
require('extract.php');

echo "ciao 001";
echo "<br/>";

echo "parsing.php";
echo "<br/>";

//indico il nome del file e la sua posizione
$csv_folder  = getenv("DOCUMENT_ROOT").'/wikimole/data/';
$filename = 'file.txt';
$filenameb = 'data.txt';

//uso l'estensione json al posto del txt
$jsonTxt = rename($csv_folder . $filename, $csv_folder . "file.json");
$json = $apiLang; //file_get_contents('http://localhost:8888/wikimole/data/file.json');
$json_parse = json_decode($json,true); //(array)json_decode($json,true);

//$jsontest = file_get_contents('http://localhost:8888/wikimole/data/filetest.json');
//$json_parse_test = json_decode($jsontest, true);

//$jsontestb = $apiCat;//file_get_contents('http://localhost:8888/wikimole/data/filetestb.json');
//$jsonb_parse_test = json_decode($jsontestb, true);

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

//scrivo il contenuto del file json con i due insiemi di dati
$twodata = '{"19379": {"Language": '.json_encode($lang).',"Category": '.json_encode($cat).'}}';
echo $twodata;

//scrivo il file json con i due insiemi di dati
$jsonMerged = fopen($csv_folder . $filenameb, "w") or die("Unable to open file!"); 
$content = $twodata;
fwrite($jsonMerged, $twodata);
fclose($jsonMerged);
$jsonFile = rename($csv_folder . $filenameb, $csv_folder . "data.json");









?>