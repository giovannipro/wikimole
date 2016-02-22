function test_1() {
	console.log('ready features.js');
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
var proxy = baseurl + 'proxy_interlinks.php' + "?url=" ;
var wikilink = 'https://en.wikipedia.org/wiki/';
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=';

/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles.json';  // articles articles_1of2 articles_2of2  articles_test

var list = [
    "Reconciliation_Day",
    "Domestic violence in South Africa"
];  

//  "sexism",
//	"Alcohol_abuse"
//	"nelson_mandela
// 'sexism',
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

var origin = window.location.origin + '/wiki/',
findme =  origin,
user = origin + 'User:',
template = origin + 'Template',
template_ = 'Template',
talk = origin + 'Talk:',
user_talk = 'User talk',
talk_ = 'Talk:',
user_ = 'User:'
help = origin + 'Help:',
file = origin + 'File:',
category = origin + 'Category:',
category_ = 'Category:',
special = origin + 'Special:',
book = origin + 'Book:',
wikipedia = 'Wikipedia:',
isbn = 'International Standard Book Number',
issn = 'International Standard Serial Number',
isni = 'International Standard Name Identifier',
portal = 'Portal';

/*
// total amount of links
var findme1 = 'User',
findme2 = 'Template',
findme3 = 'Talk:',
findme4 = 'Help:',
findme5 = 'File:',
findme6 = 'Wikipedia',
findme7 = 'Category:',
findme8 = 'Portal',
;
*/

/* ------------------------------------
ENTRY LINKS
-------------------------------------*/

// get backlinks list for one aricle
function get_source_target(url) {

    $.ajax(url, {
        dataType: "jsonp",
        success: function( wikiResponse ) {

        	var parse_back = $.parseHTML(wikiResponse),
        	back = [],
			back = $(wikiResponse.query.backlinks);
	
			var art_name = url.replace('api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=',''),
			art_name_dec = decodeURIComponent(art_name).replace('https://en.wikipedia.org/w/','').replace(/,/g, ';');
			
			jQuery.each( back, function( i, val ) {

				var cont = val.title,
			 	cont_clean = cont.replace(/,/g, ';');

			 	//console.log(cont)

			 	if (cont.indexOf(wikipedia) === 0) {
			 		//console.log('no: ' + cont)
			 	}
			 	else{
			 		$('#output').append('<span class="red">' + art_name_dec  + '</span>,' + cont_clean + '<br/>'); 
			 		//console.log(cont)
			 	}
				
			});

            $('#hide_a').hide();
    		$('#hide_b').show();

        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    });
}

// EDGE - Source,Target
function get_entrylinks_st() {
	$('#output').html('Source,Target<br/>');

	jQuery.each( articles, function( i, val ) {
		var title = val;
		get_source_target( backlinks + val );
		console.log(wikilink + val);
	});
}

// NODE - Id, Label
function get_entrylinks_il(url) {
	$('#output').append('Id,Label<br/>');

	jQuery.each( articles, function( i, val ) {

		val_clean = val.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		$('#output').append('<span class="red">' + val_clean  + '</span>,' + val_clean + '<br/>');
		console.log(wikilink + val);

	    $('#hide_a').hide();
    	$('#hide_b').show();

	});
}


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

    	var parsedata_func = $.parseHTML(get_func),
    	get = [],
		get = ($(parsedata_func).find('#mw-content-text').find('a'));

		//console.log(get)

		jQuery.each( get, function( i, val ) {

			var url_dec = decodeURIComponent(url),
			url_clean = url_dec.replace('https://en.wikipedia.org/wiki/','').replace(/,/g,';').replace(/_/g, ' '); // .replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace('%28', '(').replace('%29', ')').replace('%27', "'");
			txt = $(this).prop('outerHTML');

			var href = $(val).prop('href');
			href_dec = decodeURIComponent(href);
			var href_clean = href_dec.replace('http://localhost:8888/wiki/','').replace(/,/g, ';').replace(/_/g, ' ');
			//console.log(href)

			var container = $('#output');

			if (typeof href === 'string' && href.indexOf(findme) === 0)  {

				if (href_clean.indexOf(isbn) !== 0 &&
					href_clean.indexOf(issn) !== 0 &&
					href_clean.indexOf(isni) !== 0)  {

					if ( 
						href.indexOf(help) !== 0 && 
						href.indexOf(file) !== 0 &&
						href.indexOf(book) !== 0 &&
						href.indexOf(talk) !== 0)  	
					{
						container.append ('<span class="red">' + url_clean + '</span>,' + href_clean  + '</br>' );
					}
				}
				else {
					//console.log('isbn: ' + href)
				}
			}
		});

	    $('#hide_a').hide();
    	$('#hide_b').show();

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

// EDGE - Source,Target
function get_exitlinks_st() {

	var container = $('#output');
	container.append('Source,Target<br/>');
	//console.log(articles)

	jQuery.each( articles, function( i, val ) {
		console.log(wikilink + val);
		scrape_exitlinks( val );
	});
}

// NODE - Id, Label
function get_exitlinks_il(url) {

	var container = $('#output');
	container.append('Id,Label<br/>');

	jQuery.each( articles, function( i, val ) {
		val_clean = val.replace(/^-/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/,/g, ';').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
		
		console.log(wikilink + val_clean);	
		container.append('<span class="red">' + val_clean  + '</span>,' + val_clean + '<br/>');

	    $('#hide_a').hide();
    	$('#hide_b').show();
	});
}


/* ------------------------------------
AMOUNT OF ENTRY LINKS
-------------------------------------*/

// get entry links for one article
function entrylinks(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	container = $('#output');

    		var sum = 0,
    		page = 0,
    		user = 0,
    		port = 0,
    		templ = 0,
    		utalk = 0,
    		cat = 0;
           	
           	var parse_back = $.parseHTML(wikiResponse);

        	back = [];
			back = $(wikiResponse.query.backlinks);

			//console.log(back)

			var art_name = url.replace('https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=','').replace(/_/g, ' ');
			container.append('<span class="red">' + art_name + ',</span>' );

			var link = [];

			jQuery.each( back, function( i, val ) {
				
				var link = val;

				jQuery.each( val, function( ind, v ) {

					if (typeof v === 'string'  &&  v !== '' &&  v.indexOf(talk_) !== 0  ) {  //   &&  v.indexOf(wikipedia) !== 0   &&  v.indexOf(user_talk) !== 0 

						if ( v.indexOf(user_) === 0  ) { 
							user++;
							sum++;
							//console.log(v)
						}
						else if ( v.indexOf(portal) === 0  ) { 
							port++;
							sum++;
							//console.log(v)
						}
						else if ( v.indexOf(template_) === 0  ) { 
							templ++;
							sum++;
							//console.log(v)
						}
						else if ( v.indexOf(category_) === 0  ) { 
							cat++;
							sum++;
							//console.log(v)
						}
						// get articles
						else if ( v.indexOf(user_) !== 0 && v.indexOf(portal) !== 0 && v.indexOf(template_) !== 0 && v.indexOf(category_) !== 0) {
							page++;
							sum++;
							//console.log('article: ' + v)
						}
					}
					else {
						//console.log('no: '+ v);
					}
				});
			});

            $('#hide_a').hide();
    		$('#hide_b').show();

			container.append('<span>' + page + ',' + user + ',' + port + ',' + templ + ',' + cat + ',' + sum + '</span><br/>');
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    });
}

// get entry links for all of article
function get_n_entrylink() {

	$('#output').html('article(entry),page,user,portal,template,category,total<br/>');
	jQuery.each( articles, function( i, val ) {  // articles list
		entrylinks( backlinks + val );
		console.log( wikilink + val)
	});	
}


/* ------------------------------------
AMOUNT OF EXIT LINKS
-------------------------------------*/

function exitlinks(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (get_func) {

    	container = $('#output');

    	var sum = 0,
    	page = 0,
    	user = 0,
    	port = 0,
    	templ = 0,
    	utalk = 0,
    	cat = 0;

    	var parsedata_func = $.parseHTML(get_func);

    	var get = [],
		get = ($(parsedata_func).find('#mw-content-text').find('a'));

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		container.append('<span class="red">' + url_clean + '</span>,' )

		jQuery.each( get, function( i, v ) {

			var findme = window.location.origin + '/wiki/',
			href = $(v).prop('href'),
			href_clean = href.replace(origin,'').replace(/_/g, ' ').replace(/,/g, ';');
			//console.log(href_clean)

			if (typeof href_clean === 'string'  &&  href_clean !== '' &&  href_clean.indexOf(talk_) !== 0  ) {  //   &&  v.indexOf(wikipedia) !== 0   &&  v.indexOf(user_talk) !== 0 

				//console.log(href)

				if ( href_clean.indexOf(user_) === 0  ) { 
					user++;
					sum++;
					//console.log(v)
				}
				else if ( href_clean.indexOf(portal) === 0  ) { 
					port++;
					sum++;
					//console.log(v)
				}
				else if ( href_clean.indexOf(template_) === 0  ) { 
					templ++;
					sum++;
					//console.log(v)
				}
				else if ( href_clean.indexOf(category_) === 0  ) { 
					cat++;
					sum++;
					//console.log(v)
				}
				// get articles
				else if ( href_clean.indexOf(user_) !== 0 && href_clean.indexOf(portal) !== 0 && href_clean.indexOf(template_) !== 0 && href_clean.indexOf(category_) !== 0) {
					page++;
					sum++;
					//console.log('article: ' + v)
				}
			}

		})
        
        $('#hide_a').hide();
    	$('#hide_b').show();

		container.append('<span>' + page + ',' + user + ',' + port + ',' + templ + ',' + cat  + ',' + sum + '</span><br/>')

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});

}

// get entry links for one article
function get_n_exitlink() {
	var container = $('#output')
	container.html('article(exit),page,user,portal,template,category,total<br/>')
	jQuery.each( articles, function( i, val ) { // list articles
		exitlinks( val )
	})
}