function test() {
	console.log('ok')
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
/*var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=';
var proxy = baseurl + 'proxy_interlinks.php' + "?url=" ;
var proxy_pageview = baseurl + 'proxy_pageviews.php' + "?url=" ;
var pageview_service = "http://stats.grok.se/json/en/"; // '201506/nelson_mandela
var edit_api = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvend=1419984000&rvdir=newer&indexpageids=&titles='; //  until Wed, 31 Dec 2014 00:00:00 GMT*/
var wikilink = 'https://en.wikipedia.org/wiki/';
var edits_15 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles='; 
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=1000&format=json&bltitle='


/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles_test.json'; //  articles  /  articles_test

var list = [
	'nelson_mandela',
	'africa'
]	

// get the list of articles
$.getJSON(art_list, function(mydata) {
	var parse_art = $.parseHTML(mydata);
	articles = $(mydata)
})


/* ------------------------------------
ENTRY LINKS
-------------------------------------*/

// clean the string
function string_clean(string) {
	string.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
}

// hide graphical elements
function hide() {
	$('.hide_2').hide
	$('.hide_1').show
}


/* ------------------------------------
EDITS
-------------------------------------*/

/*
size in più o meno
editori unici
edit
*/

function get_edits(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	container = $('#edits');
        	url_clean = url.replace('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles=','').replace(edits, '')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions

			editors =  $(wikiResponse.query.pages)[0][pageids].revisions.user

        	console.log(edit)
        	//console.log(editors)

        	sum = 0

        	jQuery.each( edit, function( a,b ) {

        		jQuery.each( b, function( k,v ) {

        			console.log(v)
        		
        			if (k.indexOf("bot")  === 1 ) {
        				sum++;
        				console.log('si')
        			}
        		
        		})

				//console.log(b)

				container.append()
        		/*console.log(sum)
        		console.log(b)*/

        	})

        	console.log(sum)
        	container.append(url_clean + ',' + sum + '</br>')
			$('.hide_1').hide()
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })

}

// get entry links for all of article
function get_all_edits() {
	var container = $('#edits')
	//container.append( articles +',<br/>')
	jQuery.each( articles, function( i, val ) { // articles; list;
		get_edits( edits_15 + val )
		//container.append( articles +',')	
		//console.log(list)
	})	
}


function get_editors(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	container = $('#edits');
        	url_clean = url.replace('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles=','').replace(edits, '')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions

        	console.log(edit)

        	sum = 0

        	jQuery.each( edit, function( a,b ) {

        		sum++;
				container.append()
        		/*console.log(sum)
        		console.log(b)*/

        	})

        	container.append(url_clean + ',' + sum + '</br>')
			$('.hide_1').hide()
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })

}

// get entry links for all of articl5e
function get_all_editors() {
	var container = $('#edits')
	//container.append( articles +',<br/>')
	jQuery.each( articles, function( i, val ) { // articles; list;
		get_edits( edits_15 + val )
		//container.append( articles +',')	
		//console.log(list)
	})	
}