<?php 
require_once('extract.php');
require_once('functions.php');

# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);

echo "ciao 022";
echo "<br/>";

echo "parsing.php";
echo "<br/>";

//indico il nome del file e la sua posizione
$csv_folder  = getenv("DOCUMENT_ROOT").'/wikimole/data/';
//$filename = 'file.txt';
$filenameb = 'data.json';//'data.txt';

//uso l'estensione json al posto del txt
//$jsonTxt = rename($csv_folder . $filename, $csv_folder . "file.json");

//cerco api per lingua e categoria per due articoli
$apilang = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Mahatma%20Gandhi');
$apicat = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Mahatma%20Gandhi');

$apilang_b = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Nelson%20Mandela');
$apicat_b = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Nelson%20Mandela');

$apilang_c = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Transport');
$apicat_c = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Transport');

$apilang_d = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&format=json&lllimit=500&titles=Oliver%20Tambo');
$apicat_d = file_get_contents('https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&cllimit=500&titles=Oliver%20Tambo');


//cambio nome della variabile --> se ne può fare a meno
/*$jsonlang = $apilang;
$jsoncat = $apicat;

$jsonlang_b = $apilang_b;
$jsoncat_b = $apicat_b;

$jsonlang_c = $apilang_c;
$jsoncat_c = $apicat_c;

$jsonlang_d = $apilang_d;
$jsoncat_d = $apicat_d;*/



//decodifico i json
$jsonlang_parse = json_decode($apilang,true);
$jsoncat_parse = json_decode($apicat,true);

$jsonlang_parse_b = json_decode($apilang_b,true);
$jsoncat_parse_b = json_decode($apicat_b,true);

$jsonlang_parse_c = json_decode($apilang_c,true);
$jsoncat_parse_c = json_decode($apicat_c,true);

$jsonlang_parse_d = json_decode($apilang_d,true);
$jsoncat_parse_d = json_decode($apicat_d,true);

//$jsonlang_all_parse = json_decode($apilink_all,true);
//$jsontemp_parse = json_decode($apitemp,true);

//definizione dei valori sotto forma di array
$lang = [];
$cat = [];

$lang_b = [];
$cat_b = [];

$lang_c = [];
$cat_c = [];

$lang_d = [];
$cat_d = [];

//estraggo una serie di valori dal json
foreach($jsonlang_parse['query']['pages']['19379']['langlinks'] as $a) {
    $lang[] = $a['lang'];//"Lang: ". $a[lang];
};

foreach($jsoncat_parse['query']['pages']['19379']['categories'] as $a) {
    $cat[] = $a['title']; // 'Cat: '. $b[title];
};

foreach($jsonlang_parse_b['query']['pages']['21492751']['langlinks']  as $a){  
    $lang_b[] = $a['lang'];//"Lang: ". $a[lang];
};

foreach($jsoncat_parse_b['query']['pages']['21492751']['categories']  as $a){ 
    $cat_b[] = $a['title'];//"Lang: ". $a[lang];
};

foreach($jsonlang_parse_c['query']['pages']['18580879']['langlinks']  as $a){
    $lang_c[] = $a['lang'];//"Lang: ". $a[lang];
};

foreach($jsoncat_parse_c['query']['pages']['18580879']['categories']  as $a){  
    $cat_c[] = $a['title'];//"Lang: ". $a[lang];
};

foreach($jsonlang_parse_d['query']['pages']['433822']['langlinks']  as $a){ 
    $lang_d[] = $a['lang'];//"Lang: ". $a[lang];
};

foreach($jsoncat_parse_d['query']['pages']['433822']['categories']  as $a){
    $cat_d[] = $a['title'];//"Lang: ". $a[lang];
};



//$secondo_art = '{"21492751": {"Language": '.json_encode($lang_b).',"Category": '.json_encode($cat_b).'}}';
//echo $secondo_art."<br/>";




//scrivo il contenuto del file json con i due insiemi di dati
//$twodata = '{"19379": {"Language": '.json_encode($lang).',"Category": '.json_encode($cat).'}}';
//$twodata = lang_cat("art_1",$lang,$cat,"art_2",$lang_b,$cat_b);


//$twodata = lang_cat("art_1",$lang,$cat,"art_2",$lang_b,$cat_b); --> funziona 

$twodata = lang_cat("art_1",$lang,$cat,"art_2",$lang_b,$cat_b,"art_3",$lang_c,$cat_c,"art_4",$lang_d,$cat_d); //vedi functions.php 
echo $twodata."<br/>";




//scrivo il file json con i due insiemi di dati
$jsonMerged = fopen($csv_folder . $filenameb, "w") or die("Unable to open file!"); 
$content = $twodata;
fwrite($jsonMerged, $twodata);
fclose($jsonMerged);
//$jsonFile = rename($csv_folder . $filenameb, $csv_folder . "data.json");


/* 

------------------------------------------
References
------------------------------------------


Parsing foreach
http://stackoverflow.com/questions/10758897/parsing-json-array-with-php-foreach


?>