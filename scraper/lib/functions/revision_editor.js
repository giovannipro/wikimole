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
var edits = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=100&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles='; 
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle='


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
// get edits for one article
function edits_json(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	//console.log(wikiResponse)

        	container = $('#edits');
        	url_clean = url.replace(edits, '')
        	
        	container.append( '[{"article":"' + url_clean + '"},{"edit":[<br/>')

        	obj = []
			obj = $(wikiResponse.query.pageids)//.pages)[0]
			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions //.pageids; .revisions

        	//console.log(edit)
        	console.log(url_clean)

        	jQuery.each( edit, function( i , v ) {

        		container.append( '{' )

        		jQuery.each( v, function( i, v ) {
        	   		if (i.indexOf("size")  === 0 ) {
        	   			container.append( '"' +i + '":' + v )
        	   		}
        	   		else{
        	   			container.append( '"' +i + '":"' + v + '",')
        	   		}
        	   	})

        		if ( i === (edit.length-1)) {
        			container.append( '}<br/>' )
        		}
        		else {
        			container.append( '},<br/>' )
        		}
        	
        	})

        	container.append( ']}],<br/>' )

			$('.hide_1').hide()
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })

}
*/

function edits_csv(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	//console.log(wikiResponse)

        	container = $('#edits');
        	url_clean = url.replace(edits, '')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)//.pages)[0]

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions //.pageids; .revisions

        	console.log(edit)
        	//console.log(url_clean)

        	
        	/*
        	jQuery.each( edit, function( i , v ) {

        		container.append( url_clean + ',' )

        		jQuery.each( v, function( i, v ) {

        			//container.append( v + ',')
        	   		
        			
        	   		if (i.indexOf("size")  === 0 ) {
        	   			container.append( v )
        	   		}
        	   	   	if (i.indexOf("timestamp")  === 0 ) {
        	   	   		// str.substring(1, 4); 
        	   			container.append( v.substring(0, 10) + ',' ); 
        	   		}
        	   		if (i.indexOf("user")  === 0 ) {
        	   			container.append( v + ',')
        	   		}
        	   		else {
        	   			//
        	   		}
        	   	})

        		if ( i === (edit.length-1)) {
        			container.append( '<br/>' )
        		}
        		else {
        			container.append( ',<br/>' )
        		}
        		
        		})
        	*/

        		container.append( '</br>')
        	
        	//})

        	//container.append( ']}],<br/>' )

			$('.hide_1').hide()
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })

}

/*
// get entry links for all of article
function get_all_edits_json() {
	var container = $('#edits')
	jQuery.each( list, function( i, val ) { // articles; list;
		edits_json( edits + val )
		//container.append( '[{"article":"' + val + '"},{"edit":[<br/>')

		//  start : '{"edits": ['
		//  end : 	']}'		
		console.log(val)
	})	
}
*/

// get entry links for all of article
function get_all_edits() {
	var container = $('#edits')
	//container.append('article,user,timestamp,size<br/>')
	jQuery.each( articles, function( i, val ) { // articles; list;
		edits_csv( edits + val )	
		console.log(val)
	})	
}