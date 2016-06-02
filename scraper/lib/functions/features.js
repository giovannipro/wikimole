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

var proxy_pageview = baseurl + 'proxy_pageviews.php' + "?url=" ;
var pageview_service = "http://stats.grok.se/json/en/";

var redirect = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=redirects&list=&titles=';

var revision_api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&indexpageids=1&prop=revisions&list=&rvprop=ids%7Ctimestamp%7Cuser&rvlimit=1&rvdir=older';
var old_html_version = 'https://en.wikipedia.org/api/rest_v1/page/html/'
											
/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles_test.json';  // articles_test  articles_1of2 articles_2of2  articles

var list = [
    "Reconciliation_Day",
    "Domestic violence in South Africa"
];  

// get the list of articles
$.getJSON(art_list, function(mydata) {
    var parse_art = $.parseHTML(mydata);
    articles_a = $(mydata);
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
user_ = 'User:',
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
doi = 'Digital object identifier',
portal = 'Portal';


/* ------------------------------------
CHECK TITLES OF THE ARTICLES
-------------------------------------*/

function check_title(url) {

    $.ajax(url, {
        dataType: "jsonp",
        success: function( wikiResponse ) {
        	//console.log(wikiResponse)
        	
            obj = [];
            obj = $(wikiResponse.query.pages)[0];

			index++;

			url_clean = url.replace(redirect,'');
			
			container.append( '<a target="_blank" href="' + wikilink + url_clean + '">' + url_clean + '</a>')

	    	jQuery.each( obj, function( i, val ) {

	    		redirects = val.redirects;

				if (jQuery.type(redirects) === 'undefined') {
					container.append( ' - <span style="color:red">check</span><br/>');
					warnings++
				}
				else{
					//console.log('ok');
					container.append('<br/>');
				}

		 	})

            $('#hide_a').hide();
    		$('#hide_b').show();
	    	
	    	if (index == stop) { 
	    		console.log('warnings: ' + warnings);
	           	console.log('DONE');
	      	}
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    });
}

function check_all_titles() {

	container = $('#output')

	index = 0;
    stop = 0;
    warnings = 0;

	jQuery.each( articles_a, function( i, val ) {
		var title = val;
		check_title( redirect + val );
		//console.log(wikilink + val)
		stop++;
	});
}

/* ------------------------------------
INFOBOX
-------------------------------------*/

function get_infobox(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (wikiResponse) {
    	//console.log(wikiResponse)

    	var parsedata_func = $.parseHTML(wikiResponse);
    	get = []
		get = ($(parsedata_func).find('.infobox'))  //.find('.ambox').find('.mbox-text-span'))

		sum = 0;

		jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    	})

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");

		container = $('#output')
		//console.log(get)
		container.append(url_clean + ',');
		container.append(sum + '</br>');
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_infobox() {
	container = $('#output')
	container.append('article,infobox<br/>')
	jQuery.each( articles_a, function( i, val ) {  //  list; articles;
		get_infobox(val);
		console.log(wikilink + val);
	})	

	$('#hide_a').hide();
   	$('#hide_b').show();
}


/* ------------------------------------
ISSUES
-------------------------------------*/

function get_issues(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('.ambox').find('.mbox-text-span'))

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");

		container = $('#output')

    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    	})

    	container.append(url_clean + ',' + sum + ',')	        	

        if ($.inArray(url_clean, community) != -1 ) {
            container.append('true,');
        }
        else if ($.inArray(url_clean, community) -1 ) {
            container.append('false,');
        }

        if ($.inArray(url_clean, review) != -1 ) {
            //console.log('review')
            container.append('true,');
        }
        else if ($.inArray(url_clean, review) -1 ) {
            container.append('false,')
        }

        if ($.inArray(url_clean, new_articles) != -1 ) {
            container.append('true<br/>');
        }
        else if ($.inArray(url_clean, new_articles) -1 ) {
            container.append('false<br/>');
        } 

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_issues() {
	container = $('#output')
	container.append('article,issues,community,review,new_article<br/>')
	jQuery.each( articles_a, function( i, val ) {  //  list; articles;
		get_issues(val);
		console.log(wikilink + val);
	})	

	$('#hide_a').hide();
   	$('#hide_b').show();
}

/* ------------------------------------
ISSUES TYPE
-------------------------------------*/

function get_issuetype(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('.ambox').not('.ambox-move')) // .not('.hide-when-compact') // .filter('.ambox-move')  //    .find('.mbox-text-span').find('a'))

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");

		container = $('#output')
    	
    	//issue = get.find('.mbox-text').find('.mbox-text-span').prop('outerHTML') // .find('.ambox')
    	//console.log(get)

    	issue = get.find('.mbox-text').find('.mbox-text-span')
    	//total = 0


    	if (issue.length == 0) {
    		//consol.log(url)
    	}
    	else{
    		container.append('<span class="green">' + url_clean + ',</span><br/>')

	    	jQuery.each( issue, function( i, val ) {
	    		iss = $(this).find('b').prop('outerHTML')   // 
	    		date = $(this).find('i').text()            //.prop('outerHTML')  // 
	    		// console.log(iss)
	    		container.append(iss + ',')
	    		//total += 1

	    		if (date.indexOf('20')  !== 0 ) {
	    			var just_date = date.replace('(Learn how and when to remove this template message)').match(/\((.*)\)/);
	    			container.append('<span class="red">' + just_date[1] + '</span>,<br/>')
	    			console.log(date)
	    		}
	    		else{
	    			//console.log(date)
	    		}

	    	})
    	}

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_issuetype() {
	container = $('#output')
	container.append('article,issue,type<br/>')
	jQuery.each( articles_a, function( i, val ) {  //  list; articles;
		get_issuetype(val);
		//console.log(wikilink + val);
	})	

	$('#hide_a').hide();
   	$('#hide_b').show();
}


/* ------------------------------------
REFERENCES
-------------------------------------*/

function get_references(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('.references').find('li'))

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");
		var container = $('#output')

    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML')
    		sum++;
    	})

    	container.append(url_clean + ',' + sum + '</br>')	

		$('#hide_a').hide();
    	$('#hide_b').show();

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_references() {
	var container = $('#output')
	container.append('article,references</br>')
	jQuery.each( articles_a, function( i, val ) {  //articles_a;   // art_list; list 
		get_references(val);
		console.log(wikilink + val);
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
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('#Notes').closest( "h2" ).next().find('li'))  

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");

		container = $('#output')
		
    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML');
    		sum++;
    	})
    	container.append(url_clean + ',' + sum + '</br>');	        	

		$('#hide_a').hide();
    	$('#hide_b').show();

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_notes() {
	container = $('#output')
	container.append('article,notes</br>')	
	jQuery.each( articles_a, function( i, val ) {  // art; list; articles_a; 
		get_notes(val);
		console.log(wikilink + val);
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
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref)

    	get = [];
    	get1 = [];
    	get2 = [];

		get1 = $(parsedata_func).find('#mw-content-text').find('.thumbimage')
		//get2 = $(parsedata_func).find('#mw-content-text').find('.image')
		get3 = ($(parsedata_func).find('.thumb').find('a').find('img'));

		/*console.log(url)
		console.log(get1)
		console.log(get2)*/
		//console.log(get3)

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");
		
		container = $('#output')
    	
    	jQuery.each( get1, function( i, val ) {
    		txt = $(this).prop('href');
    		//txt_clean = txt.replace('http://localhost:8888/','');
			if (txt !== undefined) {
				console.log(txt);
				sum++;	
			}
			else{}
			//sum++;
			//console.log(wikilink + txt)
    	})
    	/*jQuery.each( get2, function( i, val ) {
    		txt = $(this).prop('href')
    		//txt_clean = txt.replace('http://localhost:8888/','')
			if (txt != undefined) {
				console.log(txt)
				sum++;	
			}
			else{}
			//sum++;
    	})*/
    	jQuery.each( get3, function( i, val ) {
    		//txt = $(this).prop('href')
			if (val !== undefined) {
				console.log(val);
				sum++;	
			}
			else{
				//console.log(val)
			}
			//sum++;
    	})
    	
    	container.append(url_clean + ',' + sum + '</br>')	

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_images() {
	container = $('#output')
	container.append('article,images</br>')	
	jQuery.each( articles_a, function( i, val ) {  //  list; articles_a;
		get_images(val);
		console.log(wikilink + val);
	})	

	$('#hide_a').hide();
    $('#hide_b').show();
}

/* ------------------------------------
SEE ALSO
-------------------------------------*/

function get_seeAlso(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('#mw-content-text').find('#See_also').closest( "h2" ).next().find('li'))

		sum = 0;

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");

    	jQuery.each( get, function( i, val ) {
    		txt = $(this).prop('outerHTML');
    		sum++;
    	})

    	container.append(url_clean + ',' + sum + '</br>')
	        	
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_seeAlso() {
	container = $('#output');
	container.append('article,seeAlso</br>');	
	jQuery.each( articles_a, function( i, val ) {  //list; articles_a;
		console.log(wikilink + val);
		get_seeAlso(val);
	})	
	$('#hide_a').hide();
	$('#hide_b').show();
}


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

			index++;
			
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
	    	
	    	if (index == stop) { 
	           	console.log('DONE');
	      	}
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    });
}

// EDGE - Source,Target
function get_entrylinks_st() {

	index = 0;
    stop = 0;

	$('#output').html('source,target<br/>');

	jQuery.each( articles_a, function( i, val ) {
		var title = val;
		get_source_target( backlinks + val );
		console.log(wikilink + val);
		stop++;
	});
}

// NODE - Id, Label
function get_entrylinks_il(url) {

	$('#output').append('id,label<br/>');

	jQuery.each( articles_a, function( i, val ) {

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

		index++;

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
					href_clean.indexOf(isni) !== 0 &&
					href_clean.indexOf(doi) !== 0 &&
					href_clean.indexOf(wikipedia) !== 0)  {

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

    	if (index == stop) { 
           	console.log('DONE');
      	}
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

// EDGE - Source,Target
function get_exitlinks_st() {

	index = 0;
    stop = 0;

	var container = $('#output');
	container.append('source,target<br/>');
	//console.log(articles)

	jQuery.each( articles_a, function( i, val ) {
		console.log(wikilink + val);
		scrape_exitlinks( val );
		stop++;
	});
}

// NODE - Id, Label
function get_exitlinks_il(url) {

	index = 0;
    stop = 0;

	var container = $('#output');
	container.append('id,label<br/>');

	jQuery.each( articles_a, function( i, val ) {
		val_clean = val.replace(/^-/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/,/g, ';').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
		
		console.log(wikilink + val_clean);	
		container.append('<span class="red">' + val_clean  + '</span>,' + val_clean + '<br/>');

	    $('#hide_a').hide();
    	$('#hide_b').show();
    	stop++;
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

			index++;

			var art_name = url.replace('https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=500&format=json&bltitle=','').replace(/_/g, ' ').replace(/, /g, '_');
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

			container.append('<span>' + page + ',' + user + ',' + port + ',' + templ + ',' + cat + ',' + sum + ',</span>');

            if ($.inArray(art_name, community) != -1 ) {
                container.append('true,');
            }
            else if ($.inArray(art_name, community) -1 ) {
                container.append('false,');
            }

            if ($.inArray(art_name, review) != -1 ) {
                //console.log('review')
                container.append('true,');
            }
            else if ($.inArray(art_name, review) -1 ) {
                container.append('false,');
            }

            if ($.inArray(art_name, new_articles) != -1 ) {
                container.append('true<br/>');
            }
            else if ($.inArray(art_name, new_articles) -1 ) {
                container.append('false<br/>');
            }               

        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    });
}

// get entry links for all of article
function get_n_entrylink() {
	index = 0;
    stop = 0;

	$('#output').html('article(entry),page,user,portal,template,category,total,community,review,new_article<br/>');
	jQuery.each( articles_a, function( i, val ) {  // articles list
		entrylinks( backlinks + val );
		console.log( wikilink + val);
		stop++;
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

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', '_');

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
	jQuery.each( articles_a, function( i, val ) { // list articles
		exitlinks( val )
	})
}


/* ------------------------------------
PAGE VIEWS
-------------------------------------*/

var yearPV = {};

function get_one_daily_pageview(yearString, monthString, article, doPrint) {

	var with_proxy = proxy_pageview + pageview_service + yearString + monthString +  '/' + article,
	no_proxy = pageview_service + yearString + monthString +  '/' + article;

	var container = $('#output');

	    $.ajax({			    	
       	type: 'GET',
       	url: with_proxy,
       	processData: true,
       	dataType: 'json',
       	crossOrigin: true,
    })
	.done (function (wikiResponse) {
		if (!yearPV.hasOwnProperty(yearString)) {
			yearPV[yearString] = {};
		}

		yearPV[yearString][monthString] = wikiResponse.daily_views;

		if (doPrint) {
			//console.log(yearPV[yearString]);
		}

		var art_clean = article.replace(/_/g, ' ').replace(/, /g, '_');

		jQuery.each( yearPV[yearString][monthString], function( i, v ) {
			container.append( art_clean + ',' + i +',' + v +'</br>')
	    })
	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	})
};

function get_daily_pageview(article,yearString) {
	var container = $('#output');

	index++;
	
	for (i = 1; i < 10; i++) { 
		var monthString = '0'+i ;
		get_one_daily_pageview(yearString, monthString, article);
	}
	for (i = 10; i < 13; i++) {
		var monthString =  i + '';
		get_one_daily_pageview(yearString, monthString, article, monthString === '12'); 
	}

    if (index == stop) { 
       	console.log('DONE');
    }
}

function get_all_daily_pageview(yearString,article) {
	var container = $('#output');
	console.log(yearString)

	container.append('article,date,pageview<br/>')

	index = 0;
    stop = 0;

	$('#hide_a').hide();
    $('#hide_b').show();

	jQuery.each( articles_a, function( i, val ) {
		get_daily_pageview(val,yearString)
		console.log(val)	
		stop++;
	})
}


/* ------------------------------------
SISTER PROJECTS
-------------------------------------*/

function get_sproject(url) {
    
    $.ajax({			    	
       	type: 'GET',
       	url: proxy + wikilink + url,
       	processData: true,
    })
    .done (function (get_ref) {

    	var parsedata_func = $.parseHTML(get_ref);
    	get = []
		get = ($(parsedata_func).find('.mbox-small').find('tr') )  // .find('.extiw').prop('outerHTML').toString()
		//console.log(get)

		var url_clean = url.replace('https://en.wikipedia.org/wiki/','').replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'").replace(', ', "_");

		container = $('#output')
		container.append(url + '</br>')

		sum = 0

		jQuery.each( get, function( i, val ) {
			project = $(this).text() // .replace(/ /g,'') // .html() .prop('outerHTML')  // .find('.extiw').prop('outerHTML')    //  .prop('outerHTML')  // .prop('outerHTML')  
			txt = project.toString().toLowerCase() //String(project)			

			if (txt.indexOf('book:') > -1   || txt.indexOf('find more')  > -1  ) { 
				console.log('no' + txt)
			}
			else {
				container.append('<span class="red">' + project + '</span>,')
				sum += 1 
			}
		
		})

		container.append( sum + '</br>')

	})
	.error (function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
	});
}

function get_all_sproject() {
	container = $('#output')
	container.append('article,sister_p<br/>')
	jQuery.each( articles_a, function( i, val ) {  //  list; articles;
		get_sproject(val);
		//console.log(wikilink + val);
	})	

	$('#hide_a').remove();
   	$('#hide_b').show();
}



/* ------------------------------------
REVISION ID
-------------------------------------*/


function get_revisionid(url,date) {

    $.ajax(url, {
        dataType: "jsonp",
        success: function(wikiResponse) {
        	//console.log(wikiResponse)

        	index++;

        	url_clean = url.replace(revision_api,'').replace(date,'').replace('&rvstart=','').replace('&titles=','').replace(/_/g,' ');

            obj = [];
           	obj = $(wikiResponse.query.pageids);
			pageids = obj[0].toString();
			revision_id = $(wikiResponse.query.pages)[0][pageids].revisions[0].revid.toString()

			timestamp = $(wikiResponse.query.pages)[0][pageids].revisions[0].timestamp.toString()

			console.log(timestamp + ' - ' + url)

			container.append(url_clean + ',')
			container.append(revision_id)
			container.append('<br/>')

            $('#hide_a').remove();
    		$('#hide_b').show();
	    	
	    	if (index == stop) {
	           	console.log('DONE');
	      	}
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    });
}

function get_all_revisionid(date) {

	date = '2015-08-01T13%3A42%3A44.000Z'

	container = $('#output')
	container.append('article,rev_id_aug15<br/>')

	index = 0;
    stop = 0;

	jQuery.each( articles_a, function( i, val ) {
		var title = val.replace(/ /g,'_');
		get_revisionid( revision_api  + '&rvstart=' + date + '&titles=' + title, date);
		//console.log(revision_api + title + '&rvstart=' + date)
		stop++;
	});
}


/* ------------------------------------
OLD HTML VERSION
-------------------------------------*/


function get_old_version(url) {

    $.ajax(url, {
        dataType: "HTML",
        success: function(wikiResponse) {
        	console.log(wikiResponse)

        	index++;

            $('#hide_a').remove();
    		$('#hide_b').show();
	    	

	    	if (index == stop) {
	           	console.log('DONE');
	      	}
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    });
}

function get_all_old_version(rev_id) {

	title = 'Nelson_Mandela'
	rev_id = '673950076';

	container = $('#output')
	container.append('article,html<br/>')

	index = 0;
    stop = 0;

    get_old_version(old_html_version + title + '/' + rev_id)
    console.log(old_html_version + title + '/' + rev_id)

	/*jQuery.each( articles_a, function( i, val ) {
		var title = val.replace(/ /g,'_');
		get_revisionid( old_html_version  + '/' + title + '/' + rev_id);
		console.log(old_html_version  + '/' + title + '/' + rev_id)
		stop++;
	});*/
}




