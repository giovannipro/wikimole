function test() {
	console.log('ok');
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=';
var proxy = baseurl + 'proxy_interlinks.php' + "?url=" ;
var proxy_pageview = baseurl + 'proxy_pageviews.php' + "?url=" ;
var wikilink = 'https://en.wikipedia.org/wiki/';
var pageview_service = "http://stats.grok.se/json/en/"; // '201506/nelson_mandela
var edit_api = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvend=1419984000&rvdir=newer&indexpageids=&titles='; //  until Wed, 31 Dec 2014 00:00:00 GMT
	
	// &rvlimit=5

/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles.json'; // '../articles/articles_test';

var list = [
	'nelson_mandela',
	'africa'//, //nelson_mandela
	//'cool' //Freedom Day (South Africa)
]	

// get the list of articles
$.getJSON(art_list, function(mydata) {
	var parse_art = $.parseHTML(mydata);
	articles = $(mydata)
})


/* ------------------------------------
PAGE VIEWS
-------------------------------------*/

var yearPV = {};
var article_a = "Bullying" //nelson_mandela; Bullying; Gender

function get_one_daily_pageview(yearString, monthString, article, doPrint) {
	
	//var container = $('#' + article);
	//var container = $('');

	var with_proxy = proxy_pageview + pageview_service + yearString + monthString +  '/' + article
	var no_proxy = pageview_service + yearString + monthString +  '/' + article

	var container = $('#pageviews');
	//console.log(with_proxy)

	//container.append( '[{"article":"' + article + '"},{"pageviews":[<br/>')

	var url_test = 'http://localhost:8888/wikimole/scraper/lib/test.json'

	    $.ajax({			    	
       	type: 'GET',
       	url: with_proxy,
       	processData: true,
       	dataType: 'json', // html
       	crossOrigin: true,
    })
	.done (function (wikiResponse) {
		if (!yearPV.hasOwnProperty(yearString)) {
			yearPV[yearString] = {};
		}

		//console.log(wikiResponse)

		yearPV[yearString][monthString] = wikiResponse.daily_views;

		if (doPrint) {
			//console.log(yearPV[yearString]);
		}

		
		//container.append( '[{"article":"' + article + '"},{"pageviews":[<br/>')

		jQuery.each( yearPV[yearString][monthString], function( i, v ) {
			//var container = $('.row');
			//container.append('<tr><td>' + article + '</td><td>' + i +'</td><td>' + v +'</tr>')
			//container.append( '"' + article + '","' + i +'",' + v +'</br>')
			container.append( article + ',' + i +',' + v +'</br>')
	    })

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        /*
			200 OK
			301 Moved Permanently
			400 Bad Request
			401 Unauthorized
			403 Forbidden
			404 Not Found
			500 Internal Server Error
			503 Service Unavailable
        */
	})
};

function get_daily_pageview(article) {
	var container = $('#pageviews');
	$('.hide_1').hide()

	//container.append( '[{"article":"' + article + '"},{"pageviews":[<br/>')
	
	for (i = 1; i < 10; i++) { 
		var yearString = '2014' ;
		var monthString = '0'+i ;		
		get_one_daily_pageview(yearString, monthString, article);
	}
	for (i = 10; i < 13; i++) {
		var yearString = '2014' ;
		var monthString =  i + '';
		get_one_daily_pageview(yearString, monthString, article, monthString === '12'); 
	}
}

function get_all_daily_pageview(yearString,article) {
	var container = $('#pageviews');

	jQuery.each( articles, function( i, val ) { //list; articles;
		//container.append('<table id="' + val + '" class="row" style="float:left; width:100%; font-size:10px;"></table>')

		//container.append( '[{"article":"' + val + '"},{"pageviews":[<br/>')

		get_daily_pageview( val )
		console.log(val)	
	})

}

/* ------------------------------------
YEARLY PAGE VIEWS
-------------------------------------*/

var yearPV = {};
var article_a = "Bullying" //nelson_mandela; Bullying; Gender

function get_one_year_pageview(yearString, monthString, article, doPrint) {
	
	//var container = $('#' + article);
	//var container = $('');

	var with_proxy = proxy_pageview + pageview_service + yearString + monthString +  '/' + article
	var no_proxy = pageview_service + yearString + monthString +  '/' + article

	var container = $('#pageviews');
	//var url_test = 'http://localhost:8888/wikimole/scraper/lib/test.json'

	    $.ajax({			    	
       	type: 'GET',
       	url: with_proxy,
       	processData: true,
       	dataType: 'json', // html
       	crossOrigin: true,
    })
	.done (function (wikiResponse) {
		if (!yearPV.hasOwnProperty(yearString)) {
			yearPV[yearString] = {};
		}
		
		//console.log(wikiResponse)

		yearPV[yearString][monthString] = wikiResponse.daily_views;

		article_clean = article.replace(/,/g, ';')

		if (doPrint) {
			//console.log(yearPV[yearString]);
		}

		var year = 0

		//container.append( '[{"article":"' + article + '"},{"pageviews":[<br/>')

		jQuery.each( yearPV[yearString][monthString], function( i, v ) {
			year =  year + v
			//var container = $('.row');
			//container.append('<tr><td>' + article + '</td><td>' + i +'</td><td>' + v +'</tr>')
			//container.append( '"' + article + '","' + i +'",' + v +'</br>')
			//container.append( article + ',' + i +',' + v +'</br>')
			//console.log(i + ':' + v)
			//console.log(article_clean + ',' + year  +'</br>')
	    })

	    container.append( article_clean + ',' + monthString + ',' + year  +'</br>')

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	})
};

function get_monthly_pageview(article) {
	var container = $('#pageviews');
	$('.hide_1').hide()

	//container.append( '[{"article":"' + article + '"},{"pageviews":[<br/>')
	
	for (i = 1; i < 10; i++) { 
		var yearString = '2014' ;
		var monthString = '0'+i ;		
		get_one_year_pageview(yearString, monthString, article);
	}
	for (i = 10; i < 13; i++) { //13
		var yearString = '2014' ;
		var monthString =  i + '';
		get_one_year_pageview(yearString, monthString, article, monthString === '12'); 
	}
}

function get_yearly_pageview(article) {
	var container = $('#pageviews');
	$('.hide_1').hide()

	//container.append( '[{"article":"' + article + '"},{"pageviews":[<br/>')
	
	for (i = 1; i < 10; i++) { 
		var yearString = '2014' ;
		var monthString = '0'+i ;		
		get_one_year_pageview(yearString, monthString, article);
	}
	for (i = 10; i < 13; i++) { //13
		var yearString = '2014' ;
		var monthString =  i + '';
		get_one_year_pageview(yearString, monthString, article, monthString === '12'); 
	}
}

function get_all_yearly_pageview(yearString,article) {
	var container = $('#pageviews');

	jQuery.each( articles, function( i, val ) { //list; articles;
		//container.append('<table id="' + val + '" class="row" style="float:left; width:100%; font-size:10px;"></table>')

		//container.append( '[{"article":"' + val + '"},{"pageviews":[<br/>')

		get_yearly_pageview( val )
		console.log(val)	
	})

}


/* ------------------------------------
EDITS
-------------------------------------*/

// get edits for one article
function edits_json(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	//console.log(wikiResponse)

        	container = $('#edits');
        	url_clean = url.replace(edit_api, '')
        	
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

function edits_csv(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	//console.log(wikiResponse)

        	container = $('#edits');
        	url_clean = url.replace(edit_api, '')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)//.pages)[0]

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions //.pageids; .revisions

        	//console.log(edit)
        	console.log(url_clean)

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

        	   	/*

        		if ( i === (edit.length-1)) {
        			container.append( '<br/>' )
        		}
        		else {
        			container.append( ',<br/>' )
        		}
        		*/

        		//})

        		container.append( '</br>')
        	
        	})

        	//container.append( ']}],<br/>' )

			$('.hide_1').hide()
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })

}

// get entry links for all of article
function get_all_edits_json() {
	var container = $('#edits')
	jQuery.each( list, function( i, val ) { // articles; list;
		edits_json( edit_api + val )
		//container.append( '[{"article":"' + val + '"},{"edit":[<br/>')

		//  start : '{"edits": ['
		//  end : 	']}'		
		console.log(val)
	})	
}

// get entry links for all of article
function get_all_edits_csv() {
	var container = $('#edits')
	container.append('article,user,timestamp,size<br/>')
	jQuery.each( articles, function( i, val ) { // articles; list;
		edits_csv( edit_api + val )	
		console.log(val)
	})	
}