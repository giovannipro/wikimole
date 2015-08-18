function test() {
	console.log('ok')
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
EXTERNAL LINKS
-------------------------------------*/

// get exit links for one article
function scrape_exitlinks(url) {

    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
       	//dataType: 'json',
       	//crossOrigin: true,
    })
    .done (function (get_func) {

    	/* ---------------- 
    	FINDME 
    	---------------- */
    	var origin = window.location.origin + '/wiki/';
		var findme =  origin;
		var findme1 = origin + 'User:';
		var findme2 = origin + 'Template';
		var findme3 = origin + 'Talk:';
		var findme4 = origin + 'Help:';
		var findme5 = origin + 'File:';
		var findme6 = origin + 'Wikipedia:'
		var findme7 = origin + 'Category:'
		/* -------------- */

    	var parsedata_func = $.parseHTML(get_func);

    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('a'))

		jQuery.each( get, function( i, val ) {

			var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
			txt = $(this).prop('outerHTML')

			var href = $(val).prop('href');
			var href_clean = href.replace('http://localhost:8888/wiki/','').replace(/_/g, ' ').replace(/,/g, ';');

			var container = $('#source_target')

			if (typeof href === 'string' && href.indexOf(findme) === 0 )  {
				/*if (href.indexOf(findme1) !== 0  && href.indexOf(findme2) !== 0 && href.indexOf(findme3) !== 0 && href.indexOf(findme4) !== 0 && href.indexOf(findme5) !== 0 && href.indexOf(findme6) !== 0)  {
					container.append ('<span class="red">' + url_clean + '</span>,' + href_clean  + '</br>' );
				}*/
				if ( href.indexOf(findme4) !== 0 && href.indexOf(findme5) !== 0 )  {
					container.append ('<span class="red">' + url_clean + '</span>,' + href_clean  + '</br>' );
				}
				else {
					console.log('no: ' + href_clean )
				}
			}
		})
		$('.hide_1').hide()
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});

}

// get exit links for all of articles
function get_exitlinks_st() {

	var container = $('#source_target')
	$('#source_target').append('Source,Target<br/>')

	jQuery.each( list, function( i, val ) {
		scrape_exitlinks( val )
	})

}

// get id and labels for all articles
function get_exitlinks_il(url) {

	var container = $('#id_label')
	container.append('Id,Label<br/>')

	jQuery.each( articles, function( i, val ) {
		val_clean = val.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
		container.append('<span class="red">' + val_clean  + '</span>,' + val_clean + '<br/>')
		$('.hide_1').hide()
	})

}

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

/* -------- SOURCE - TARGET --------*/

// get backlinks list for one aricle
function get_source_target(url) {

    $.ajax(url, {
        dataType: "jsonp",
        success: function( wikiResponse ) {

        	var parse_back = $.parseHTML(wikiResponse);

        	back = []
			back = $(wikiResponse.query.backlinks)

			//console.log(back) 

			var art_name = url.replace('https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=','')
			
			//var art_name_clean = string_clean(art_name)
			var art_name_clean = art_name.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

			jQuery.each( back, function( i, val ) {

				var cont = val.title 
				var cont_clean = cont.replace(/,/g, ';')

				$('#content1').append('<span class="red">' + art_name_clean  + '</span>,' + cont_clean + '<br/>') 

			})

        	//console.log(url)

        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })
}    

// get backlinks list for all of articles
function get_all_source_target() {

	$('#source_target').html('Source,Target<br/>')

	jQuery.each( articles, function( i, val ) {
		
		var title = val // i

		//get_source_target('https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=' + val )  // i
		get_source_target( backlinks + val )
		
	})

	console.log('Done');	
	
	$('.hide_1').hide()
}

/* -------- ID - LABEL  --------*/

// get id and labels for all articles
function get_all_id_label(url) {

	$('#content2').append('Id,Label<br/>')

	jQuery.each( articles, function( i, val ) {

		val_clean = val.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		$('#content2').append('<span class="red">' + val_clean  + '</span>,' + val_clean + '<br/>')

		//console.log(val)
		$('.hide_1').hide()

	})
}

/* ------------------------------------
AMOUNT OF ENTRY LINKS
-------------------------------------*/

// get entry links for one article
function entrylinks(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	container = $('#entrylinks');

    		var sum = 0
    		var page = 0
    		var user = 0
    		var port = 0
    		var templ = 0
    		var utalk = 0
    		var cat = 0

           	
           	var parse_back = $.parseHTML(wikiResponse);

        	back = []
			back = $(wikiResponse.query.backlinks) // [1]

			//console.log(back)

			var art_name = url.replace('https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=','').replace(/_/g, ' ')
			container.append('<span class="red">' + art_name + ',</span>' )

			var link = []

			var findme1 = 'User';
			var findme2 = 'Template';
			var findme3 = 'Talk:';
			var findme4 = 'Help:';
			var findme5 = 'File:';
			var findme6 = 'Wikipedia'
			var findme7 = 'Category:';
			var findme8 = 'Portal';
			var findme9 = 'User talk';

			jQuery.each( back, function( i, val ) {
				
				// container.append('<span>' + i + '-' + val + '</span><br/>')
				var link = val //$(val)

				//console.log(link)

				/*
				if ( link.val().indexOf('user') === 0 ) {
					//if ( href.indexOf(findme4) !== 0 && href.indexOf(findme5) !== 0 )  {
					container.append('<span>' + link + '</span>')
					sum++;
				}
				else {
					console.log(val)
				}*/
				//if ( val.indexOf('user') !== 0 ) {

					jQuery.each( val, function( ind, v ) {

						//console.log(v)

						//if ( v.indexOf('talk') === 0 ) {
						if (typeof v === 'string'  &&  v !== ''  &&  v.indexOf(findme6) !== 0 &&  v.indexOf(findme9) !== 0  ) {


							if ( v.indexOf(findme1) === 0  ) { 
								user++;
								sum++;
								console.log(v)
								//container.append('<span>' + v + '</span><br/>') //  + ind + '-'
							}
							if ( v.indexOf(findme8) === 0  ) { 
								port++;
								sum++;
								console.log(v)
								//container.append('<span>' + v + '</span><br/>') //  + ind + '-'
							}
							if ( v.indexOf(findme2) === 0  ) { 
								templ++;
								sum++;
								console.log(v)
								//container.append('<span>' + v + '</span><br/>') //  + ind + '-'
							}
							if ( v.indexOf(findme9) === 0  ) { 
								utalk++;
								sum++;
								console.log(v)
								//container.append('<span>' + v + '</span><br/>') //  + ind + '-'
							}
							if ( v.indexOf(findme7) === 0  ) { 
								cat++;
								sum++;
								console.log(v)
							}
							if ( v.indexOf(findme1) !== 0 && v.indexOf(findme8) !== 0 && v.indexOf(findme2) !== 0 && v.indexOf(findme9) !== 0  && v.indexOf(findme7) !== 0) { // pages
								console.log(v)
								page++;
								sum++;
							}
						}
						else {
							//console.log('no: '+ v)
						}
					})

				//}
			})

			container.append('<span>' + page + ',' + user + ',' + port + ',' + templ + ',' + cat + ',' + sum + '</span><br/>')
			$('.hide_1').hide()
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })

}

// get entry links for all of article
function get_n_entrylink() {

	//article(exit),page,user,template,category,talk,total
	$('#entrylinks').html('article(entr),page,user,portal,template,category,total<br/>')
	jQuery.each( articles, function( i, val ) { // articles; list;
		entrylinks( backlinks + val )
	})	
}

/* ------------------------------------
AMOUNT OF EXIT LINKS
-------------------------------------*/

function exitlinks(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
       	//dataType: 'json',
       	//crossOrigin: true,
    })
    .done (function (get_func) {

    	container = $('#exitlinks');

    	var sum = 0
    	var user = 0
    	var templ = 0
    	var cat = 0
    	var talk = 0
    	var page = 0
    	var port = 0

    	var parsedata_func = $.parseHTML(get_func);

    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('a'))

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		container.append('<span class="red">' + url_clean + '</span>,' )

		/* ---------------- 
    	FINDME 
    	---------------- */
    	var origin = window.location.origin + '/wiki/';
		var findme =  origin;
		var findme1 = origin + 'User:';
		var findme2 = origin + 'Template';
		var findme3 = origin + 'Talk:';
		var findme4 = origin + 'Help:';
		var findme5 = origin + 'File:';
		var findme6 = origin + 'Wikipedia:'
		var findme7 = origin + 'Category:';
		var findme8 = origin + 'Portal';
		/* -------------- */


		jQuery.each( get, function( i, val ) {

			var findme = window.location.origin + '/wiki/'; //https://en.wikipedia.org/wiki/
			var href = $(val).prop('href');
			var href_clean = href.replace('http://localhost:8888/wiki/','').replace(/_/g, ' ').replace(/,/g, ';');

			//console.log(href)

			if (typeof href === 'string' && href.indexOf(findme) === 0 ) {

				//sum++;

				if ( href.indexOf(findme4) !== 0 && href.indexOf(findme5) !== 0  && href.indexOf(findme6) !== 0 )  {
					
					if ( href.indexOf(findme1) === 0 )  {
						user++;
						sum++;
						console.log(href_clean)
						//user_ar.push(href_clean)
					}
					if ( href.indexOf(findme2) === 0 )  {
						templ++;
						sum++;
						console.log(href_clean)
					}
					if ( href.indexOf(findme7) === 0 )  {
						cat++;
						sum++;
						console.log(href_clean)
					}
					/*if ( href.indexOf(findme3) === 0 )  {
						talk++;
						sum++;
						console.log(href_clean)
					}*/
					if ( href.indexOf(findme8) === 0 )  {
						port++;
						sum++;
						console.log(href_clean)
					}
					else {
						page++;
						sum++;
						console.log(href_clean)
					}
				}
				else {
					console.log('no: ' + href_clean )
				}
			}
			else {
				console.log('no: ' + href_clean )
			}

		})
		container.append('<span>' + page + ',' + user + ',' + port + ',' + templ + ',' + cat  + ',' + sum + '</span><br/>')
		$('.hide_1').hide()
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});

}

// get entry links for one article
function get_n_exitlink() {
	var container = $('#exitlinks')
	//article(entry),page,user,portal,template,category,total
	container.html('article(exit),page,user,portal,template,category,total<br/>')
	jQuery.each( articles, function( i, val ) { // articles;  list;
		exitlinks( val )
	})
}

/* ------------------------------------
REFERENCES
-------------------------------------*/

function get_references(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
       	//dataType: 'json',
       	//crossOrigin: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('.references').find('li'))

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		var container = $('#references')
		//container.append('article, references</br>')

    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    	})
    	console.log(url_clean + ':' + sum)
    	container.append(url_clean + ', ' + sum + '</br>')	

		$('.hide_1').hide()
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_references() {
	var container = $('#references')
	container.append('article,references</br>')
	jQuery.each( articles, function( i, val ) {  //articles;   // art_list; list 
		get_references(val)
	})	
}

/* ------------------------------------
SEE ALSO
-------------------------------------*/

function get_seeAlso(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
       	//dataType: 'json',
       	//crossOrigin: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('#See_also').closest( "h2" ).next().find('li'))  //.find('ul')) //.find('.div-col').find('li').find('a'))   //; .find('.references').find('li'))

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		container = $('#seeAlso')
		//container.append('article, seeAlso</br>')	

    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    	})

    	console.log(url_clean + ':' + sum)
    	container.append(url_clean + ', ' + sum + '</br>')	        	

		$('.hide_1').hide()
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_seeAlso() {
	container = $('#seeAlso')
	container.append('article,seeAlso</br>')	
	jQuery.each( articles, function( i, val ) {  //list; articles;
		get_seeAlso(val)
	})	
}

/* ------------------------------------
NOTES
-------------------------------------*/

function get_notes(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
       	//dataType: 'json',
       	//crossOrigin: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('#Notes').closest( "h2" ).next().find('li'))  //.find('ul')) //.find('.div-col').find('li').find('a'))   //; .find('.references').find('li'))

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		container = $('#notes')
		
    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    	})
    	container.append(url_clean + ', ' + sum + '</br>')	        	

		$('.hide_1').hide()

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_notes() {
	container = $('#notes')
	container.append('article,notes</br>')	
	jQuery.each( articles, function( i, val ) {  // art; list; articles; 
		get_notes(val)
	})
}

/* ------------------------------------
ISSUES
-------------------------------------*/

function get_issues(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
       	//dataType: 'json',
       	//crossOrigin: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func)/*.find('#mw-content-text')*/.find('.ambox').find('.mbox-text-span')) // mbox-text-span; .find('.metadata').find('tbody')) // ambox-content;  .find('#Notes').closest( "h2" ).next().find('li')) 

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");

		container = $('#issues')

    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    	})
    	console.log(url_clean + ':' + sum)
    	container.append(url_clean + ', ' + sum + '</br>')	        	

		$('.hide_1').hide()
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_issues() {
	container = $('#issues')
	container.append('article,issues</br>')
	jQuery.each( articles, function( i, val ) {  //  list; articles;
		get_issues(val)
	})	
}

/* ------------------------------------
IMAGES
-------------------------------------*/

function get_images(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
       	//dataType: 'json',
       	//crossOrigin: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get1 = ($(parsedata_func).find('#mw-content-text').find('.thumb'))  //.find('.image') 
		get2 = ($(parsedata_func).find('.image')) 

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
		
		container = $('#images')
    	
    	jQuery.each( get1, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    		//console.log(url + ':' +  txt)
    	})
    	jQuery.each( get2, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    		//console.log(url + ':' +  txt)
    	})
    	//console.log(url + ':' +  sum)
    	container.append(url_clean + ', ' + sum + '</br>')	

		$('.hide_1').hide()
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_images() {
	container = $('#images')
	container.append('article,images</br>')	
	jQuery.each( articles, function( i, val ) {  //  list; articles;
		get_images(val)
		//console.log(val)
	})	
}

/* ------------------------------------
PAGE VIEWS
-------------------------------------*/

var yearPV = {};
var article_a = "Bullying" //nelson_mandela; Bullying; Gender

function get_one_month_pageview(yearString, monthString, article, doPrint) {
	
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

function get_monthly_pageview(article) {
	var container = $('#pageviews');
	$('.hide_1').hide()

	//container.append( '[{"article":"' + article + '"},{"pageviews":[<br/>')
	
	for (i = 1; i < 10; i++) { 
		var yearString = '2014' ;
		var monthString = '0'+i ;		
		get_one_month_pageview(yearString, monthString, article);
	}
	for (i = 10; i < 13; i++) {
		var yearString = '2014' ;
		var monthString =  i + '';
		get_one_month_pageview(yearString, monthString, article, monthString === '12'); 
	}
}

function get_all_monthly_pageview(yearString,article) {
	var container = $('#pageviews');

	jQuery.each( articles, function( i, val ) { //list; articles;
		//container.append('<table id="' + val + '" class="row" style="float:left; width:100%; font-size:10px;"></table>')

		//container.append( '[{"article":"' + val + '"},{"pageviews":[<br/>')

		get_monthly_pageview( val )
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