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

//creo il file
$csv_folder  = getenv("DOCUMENT_ROOT").'/wikimole/data/';
$filename = 'file.txt';

//echo $csv_folder . $CSVFileName;

$myfile = fopen($csv_folder . $filename, "w") or die("Unable to open file!"); //($fileLocation, "w")
$content = $pageContent . ";<br/>" . $pageContent1;
fwrite($myfile, $content);
fclose($myfile);

//stampo il contenuto della query di wikipedia
echo $content;

echo "<br/>";
echo "json creato";
echo "<br/>";
echo "ciao 100";

//uso l'estensione json al posto del txt
$json = rename($csv_folder . $filename, $csv_folder . "file.json");
$json_parse = json_decode($json,true);//($json, true)


$jsontest = file_get_contents('http://localhost:8888/wikipedia/data/filetest.json');
$json_parse_test = json_decode($jsontest,true);//($json, true)

/*
foreach($json_parse['query']['pages'] as $item) {
    print $item['query'];
    print ' - ';
    print $item['pageid'][0]['value'];
}

$output_test = "<ul>";
foreach ($json_parse_test["employees"] as $employees) {
	$output_test .= "<li>" . $employees["firstName"] . "</li>";
	//$output .= "<li>" . $19379["title"] . "</li>";
}
$output_test .= "</ul>";

echo $output_test;
echo "<br/>";


$output = "<ul>";
foreach ($json_parse->query as $query {
	$output .= "<li>" . "{$query->name}\n" . "</li>";
}
    foreach ( $json_parse->query as $query )
    {
    	echo "{$query->pages}\n";
    }
$output .= "</ul>";



echo $output;
echo "<br/>";

/*
$pageid = $json_parse['query']['pages'][0]['pageid'];

echo $pageid = $json_parse->{'query'}->{'pages'}->{'19379'}[0]->pageid;

echo $pageid;
echo "<br/>";

//listing the array
foreach($json_parse as $prop => $value)
echo '<br/>'. $prop.' : '. $value;

echo "<br/>";
print_r($json_parse);
echo "<br/>";
var_dump($json_parse);
*/

/* Riferimenti
http://www.developersnacks.com/2012/06/export-html-to-csv-in-php.html
http://stackoverflow.com/questions/8858848/php-read-and-write-json-from-file

*/

?>


