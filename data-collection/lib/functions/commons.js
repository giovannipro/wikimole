function test_3() {
    console.log("ready commons.js");
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = "http://localhost:8888/wikimole/scraper/proxy/";
var proxy = baseurl + 'proxy.php' + "?url=";

var file_info = "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&format=json&indexpageids=1&titles=Image:"
var file_in_category = "https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtype=file&format=json&cmtitle=Category:"

var file_list = [
    "1880_circa_Bimpage_%26_Co.,_Am_Meere_in_Lüneburg,_Dr._Julius_Knövenagel_in_Hannover,_chem._Bildseite.jpg"
];  

var category = [
	"Zentralbibliothek_Zürich"
]

var container = $('#output');

/* ------------------------------------
GET FILE INFORMATION
-------------------------------------*/

function get_file_info(url) {
	
	var request = file_info + url;
	console.log(request)

	$.ajax(request, {
        dataType: "jsonp",
        success: function( response ) {
        	console.log(response)

        	
        	var obj = [],
	           	obj = $(response.query.pageids),
	           	pageids = obj[0].toString();
           	
           	var file_info = $(response.query.pages)[0][pageids];
           	console.log(file_info);

           	var title = file_info.title;
           		user = file_info.imageinfo[0].user,
           		timestamp = file_info.imageinfo[0].timestamp;

        	container.append(title + ',' + user + ',' + timestamp)

        	//$('#hide_a').hide();
    		$('#hide_b').show();

        },
        error: function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status)
	        console.log(thrownError)
		}
	})
}

function get_file_in_category(url) {
	
	var request = file_in_category + url;
	console.log(request)

	$.ajax(request, {
        dataType: "jsonp",
        success: function( response ) {
        	console.log(response)
        	
           	var files = $(response.query.categorymembers);
           	console.log(files);

           	jQuery.each( files, function( i, val ) {
           		title = val.title;
           		console.log(title)

           		container.append(title + "</br>")
           	})
        	
        	//$('#hide_a').hide();
    		$('#hide_b').show();

        },
        error: function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status)
	        console.log(thrownError)
		}
	})
}

