function test_1() {
	console.log('ready features.js')
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
var proxy = baseurl + 'proxy_interlinks.php' + "?url=" ;
var wikilink = 'https://en.wikipedia.org/wiki/';
//var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=';

/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles.json';  // articles  articles_test

var list = [
	'Children"s_Act,_2005',
    'Reconciliation_Day'  
];  

//     "sexism",
    //"Alcohol_abuse"


//nelson_mandela
//'sexism',
// 'Alcohol_abuse'
// 'africa',
//    'AIDS'

// get the list of articles
$.getJSON(art_list, function(mydata) {
    var parse_art = $.parseHTML(mydata);
    articles = $(mydata);
});


/* ---------------- 
FINDME 
---------------- */

var origin = window.location.origin + '/wiki/';
var findme =  origin;
var user = origin + 'User:';
var template = origin + 'Template';
var talk = origin + 'Talk:';
var help = origin + 'Help:';
var file = origin + 'File:';
var wikipedia = origin + 'Wikipedia:'
var category = origin + 'Category:'
var special = origin + 'Special:'
var book = origin + 'Book:'

/* ------------------------------------
EXTERNAL LINKS
-------------------------------------*/

// get exit links for one article
function scrape_exitlinks(url) {

    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (get_func) {

    	var parsedata_func = $.parseHTML(get_func);

    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('a'))

		jQuery.each( get, function( i, val ) {

			url_dec = decodeURIComponent(url)

			var url_clean = url_dec.replace('https://en.wikipedia.org/wiki/','').replace(/,/g, '_'); // .replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace('%28', '(').replace('%29', ')').replace('%27', "'");
			txt = $(this).prop('outerHTML')

			var href = $(val).prop('href');
			var href_dec = decodeURIComponent(href)
			var href_clean = href_dec.replace('http://localhost:8888/wiki/','').replace(/,/g, '_');;	
			
			//console.log(wikilink + href_clean)

			var container = $('#output');

			if (typeof href === 'string' && href.indexOf(findme) === 0 )  {
				if ( 
					href.indexOf(help) !== 0 && 
					href.indexOf(file) !== 0 &&
					href.indexOf(book) !== 0 &&
					href.indexOf(talk) !== 0
					)  
				{
					container.append ('<span class="red">' + url_clean + '</span>,' + href_clean  + '</br>' );
				}
				else {
					//console.log('no: ' + href_clean )
				}
			}
		})

	    $('#hide_a').hide();
    	$('#hide_b').show();

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

// get exit links for all of articles
function get_exitlinks_st() {

	var container = $('#output')
	container.append('Source,Target<br/>')
	//console.log(articles)

	jQuery.each( articles, function( i, val ) {
		console.log(wikilink + val)
		scrape_exitlinks( val )
	})
}

// get id and labels for all articles
function get_exitlinks_il(url) {

	var container = $('#output')
	container.append('Id,Label<br/>')

	jQuery.each( articles, function( i, val ) {
		val_clean = val.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/,/g, ';').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
		
		console.log(wikilink + val_clean)	
		container.append('<span class="red">' + val_clean  + '</span>,' + val_clean + '<br/>')

	    $('#hide_a').hide();
    	$('#hide_b').show();
	})
}