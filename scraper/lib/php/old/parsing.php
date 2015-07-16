<?php 
require_once('extract.php');
require_once('functions.php');

# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);

echo "ciao 042";
echo "<br/>";

echo "parsing.php";
echo "<br/>";

//indico il nome del file e la sua posizione
$csv_folder  = getenv("DOCUMENT_ROOT").'/wikimole/data/';
$filenameb = 'data.json';

//cerco api per lingua e categoria per due articoli
//$apilang = get_language("Mahatma Gandhi");
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

/*
echo $apilang;
echo "<br/>";
echo $apicat;
*/

//decodifico i json
//$jsonlang_parse_t1 = decode($apilang);

$jsonlang_parse = decode($apilang);
$jsoncat_parse = decode($apicat);

$jsonlang_parse_b = decode($apilang_b);
$jsoncat_parse_b = decode($apicat_b);

$jsonlang_parse_c = decode($apilang_c);
$jsoncat_parse_c = decode($apicat_c);

$jsonlang_parse_d = decode($apilang_d);
$jsoncat_parse_d = decode($apicat_d);

//definizione dei valori sotto forma di array
//$tit_1 = []

$lang = [];
$cat = [];

$lang_b = [];
$cat_b = [];

$lang_c = [];
$cat_c = [];

$lang_d = [];
$cat_d = [];

//estraggo il titolo del primo articolo
/*foreach($jsonlang_parse_t1['query']['pages']['19379'] as $a) {
    $tit_1[] = $a['title'];
};*/

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
//$twodata = lang_cat($articleTitle[0],$lang,$cat,$articleTitle[1],$lang_b,$cat_b,$articleTitle[2],$lang_c,$cat_c,$articleTitle[3],$lang_d,$cat_d); //vedi functions.php  --> stmpa le prime lettere del titolo dell'ultimo articolo 
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