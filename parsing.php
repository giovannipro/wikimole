<?php 
require('extract.php');

<<<<<<< HEAD
echo "ciao 006";
=======
echo "ciao 001";
>>>>>>> parent of 65f20dc... try again to extract list from html
echo "<br/>";

echo "parsing.php";
echo "<br/>";

# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);

//indico il nome del file e la sua posizione
$csv_folder  = getenv("DOCUMENT_ROOT").'/wikimole/data/';
$filename = 'file.txt';
$filenameb = 'data.txt';

//uso l'estensione json al posto del txt
$jsonTxt = rename($csv_folder . $filename, $csv_folder . "file.json");
$jsonlang = $apilang;
$jsoncat = $apicat;

//decodifico i json
<<<<<<< HEAD
$jsonlang_parse = json_decode($apilang,true);
$jsoncat_parse = json_decode($apicat,true);
//$jsonlang_all_parse = json_decode($apilink_all,true);
//$jsontemp_parse = json_decode($apitemp,true);

=======
$jsonlang_parse = json_decode($jsonlang,true);
$jsoncat_parse = json_decode($jsoncat,true);
>>>>>>> parent of 65f20dc... try again to extract list from html

//definizione dei valori sotto forma di array
$lang = [];
$cat = [];

//estraggo una serie di valori dal json
foreach($jsonlang_parse[query][pages][19379][langlinks] as $a) {
    $lang[] = $a[lang];//"Lang: ". $a[lang];
};

foreach($jsoncat_parse[query][pages][19379][categories] as $b) {
    $cat[] = $b[title]; // 'Cat: '. $b[title];
};

/*foreach($jsonlang_all_parse[query][pages][0][langlinks] as $c) {
    $lang_all[] = $b[title]; // 'Cat: '. $b[title];
};*/

//scrivo il contenuto del file json con i due insiemi di dati
$twodata = '{"19379": {"Language": '.json_encode($lang).',"Category": '.json_encode($cat).'}}';
//$articles_all = '{"articles": {"Language":'.json_encode($jsonlang_all_parse).'}}';

//echo $articles_all;
echo $twodata;

//scrivo il file json con i due insiemi di dati
$jsonMerged = fopen($csv_folder . $filenameb, "w") or die("Unable to open file!"); 
$content = $twodata;
fwrite($jsonMerged, $twodata);
fclose($jsonMerged);
$jsonFile = rename($csv_folder . $filenameb, $csv_folder . "data.json");









?>