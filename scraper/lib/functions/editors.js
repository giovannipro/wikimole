function test() {
	console.log('ready')
}

/* ------------------------------------
WIKIPEDIA API
-------------------------------------*/

//var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
//var wikilink = 'https://en.wikipedia.org/wiki/';
var edits_14 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Cuser%7Csize&rvlimit=500&rvstart=1420070399&rvend=1388534400&rvlimit=10rvdir=newer&indexpageids=&titles=';
var edits_15 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Cuser%7Csize&rvlimit=500&rvstart=1451606399&rvend=1420070400&rvlimit=10rvdir=newer&indexpageids=&titles=';

// it is valid only for registered editors 
var user_contributs_14 = 'https://it.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1420070399&ucend=1388534400&ucprop=ids%7Ctitle%7Ctimestamp%7Ccomment%7Csize%7Csizediff%7Cflags%7Ctags&ucuser='; // %7Cparsedcomment
var user_contributs_15 = 'https://it.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1451606399&ucend=1420070400&ucprop=ids%7Ctitle%7Ctimestamp%7Ccomment%7Csize%7Csizediff%7Cflags%7Ctags&ucuser='; // %7Cparsedcomment

/*
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=1000&format=json&bltitle=';
*/

/*
http://www.epochconverter.com/

2014
1.01.2014, 00:00:00     1388534400
31.12.2014, 23:59:59    1420070399

2015
1.01.2015, 00:00:00     1420070400
31.12.2015, 23:59:59    1451606399
*/


/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles.json';  // articles  articles_test

var list = [
	'nelson_mandela',
	'africa',
    'AIDS',
    'sexism'
]	

var editors = [
    'iopensa',
    'RebeccaCasper', 
    'Mean_as_custard',
    'Nonsurgicalliposection',
    'Nanno1992',
    'example'
]

// get the list of articles
$.getJSON(art_list, function(mydata) {
	var parse_art = $.parseHTML(mydata);
	articles = $(mydata)
})

// clean the string
function string_clean(string) {
	string.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
}

// hide graphical elements
function hide() {
	$('#hide_a').hide();
	$('#hide_b').show();
    console.log('works')
}


/* ------------------------------------
EDITS
-------------------------------------*/

function get_edits(url) {
    // edits,unique_editors,avgerage_size
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {
            //console.log(wikiResponse)

        	container = $('#edits');
        	url_clean = url.replace(edits_14,'').replace(edits_15,'').replace(edits, '').replace('_',' ')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions

        	sum_edits = 0
            sum_editors = 0
            sum_size = 0

            index++

            findme1 = 'bot'

            size_array = []
            user_array = []

            var result = [];

            var sumX = 0
            var total = 0
            
        	jQuery.each( edit, function( a,b ) {

                user = b.user
                size = b.size
                //console.log(user)

                if ( user.toLowerCase().indexOf(findme1) >= 0 ) {
                    user.toLowerCase().replace(findme1, " bot");
                }
                else {
                    sum_edits++
                    
                    user_clean = user.replace(/./g,'_')

                    user_array.push( user );
                    sorted_user_array =  user_array.sort()

                    $.each(sorted_user_array, function(i, e) {
                        if ($.inArray(e, result) == -1) {
                            //console.log(e)
                            result.push(e);
                            sorted_result = result.sort()

                            sum_editors++
                        }
                    })

                    size_array.push(size)

                    total = eval(size_array.join("+"))
                    average = Math.round(total / size_array.length)
                }
        	})
    
            console.log(index + '-' + url_clean)
            console.log(sorted_result)

            container.append(url_clean + ',')
            container.append(sum_edits + ',')
            container.append(sum_editors + ',')
            container.append(average + '<br/>')
        },   
		error : function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.status);
	        console.log(thrownError);
		}
    })

}

// get entry links for all of article
function get_all_edits_2014() {
	var container = $('#output')
    index = 0

    container.append('article_2014,edits,unique_editors,avg_size<br/>')
	jQuery.each( articles, function( i, val ) {
		get_edits( edits_14 + val )
	})	

    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_edits_2015() {
    var container = $('#edits')
    index = 0

    container.append('article_2015,edits,unique_editors,avg_size<br/>')
    jQuery.each( articles, function( i, val ) {
        get_edits( edits_15 + val )
    })  

    $('#hide_a').hide();
    $('#hide_b').show();
}


/* ------------------------------------
EDITORS
-------------------------------------*/

function get_editors(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

            container = $('#output');
            url_clean = url.replace(edits_14,'').replace(edits_15,'').replace('/ /g','_');
            
            obj = []
            obj = $(wikiResponse.query.pageids)
            pageids = obj[0].toString()
            edit =  $(wikiResponse.query.pages)[0][pageids].revisions

            findme1 = 'bot'

            user_array = []
            result = []
            sorted_result = []

            all_clean = []

            var sumX = 0
            var total = 0

            index++

            jQuery.each( edit, function( a,b ) {

                user = b.user

                if ( user.toLowerCase().indexOf(findme1) >= 0 ) {
                    user.toLowerCase().replace(findme1, " bot");
                }
                else {
                    user_clean = user.replace(/./g,'_').replace(/ /g,'_')

                    user_array.push( user );
                    user_array_sort =  user_array.sort()

                    $.each(user_array_sort, function(i, e) {
                        if ($.inArray(e, result) == -1) {

                            //e_clean = e.replace('/ /g','_');
                            result.push(e);
                            all.push(e);
                        }
                    })
                    sorted_result = result.sort()
                }
            })

            all_sort = all.sort();

            $.each(all_sort, function(i, a) {
                if ($.inArray(a, all_clean) == -1) {
                    all_clean.push(a);
                }
            })
            sorted_all_clean = all_clean.sort()


            if (index ==  stop) {  //
                container.append(sorted_all_clean + ',<br/>')
            }

            console.log(index)
            console.log(url_clean)
            console.log(result)
        },   
        error : function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    })
}

// get entry links for all of article
function get_all_editors_2015() {
    //var container = $('#output')
    //container.append('article,edits,unique_editors,avg_size<br/>')
    index = 0
    stop = 0
    all = []

    jQuery.each( articles, function( i, val ) {
        get_editors( edits_15 + val )
        stop++
    }) 
    //console.log(stop)

    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_editors_2014() {
    index = 0
    stop = 0
    all = []

    jQuery.each( articles, function( i, val ) {
        get_editors( edits_14 + val )
        stop++
    }) 
    //console.log(stop)
    
    $('#hide_a').hide();
    $('#hide_b').show();
}


/* ------------------------------------
EDITED ARTICLES
-------------------------------------*/

var editor_list_14 = '../../data/edits/editors_14.csv';  // editors_14    editors_test
var editor_list_15 = '../../data/edits/editors_15.csv';  // editors_15    editors_test

// get the list of editors
editors_14 = []
editors_15 = []

$.get(editor_list_14, function(data) {

    var rows = data.split(",\n");
    
    rows.forEach( function getvalues(ourrow) {

        //var columns = ourrow.split(",");
        editors_14.push(ourrow)
        //console.log(ourrow)
    })
    //console.log(editors_14)
});

$.get(editor_list_15, function(data) {

    var rows = data.split(",\n");
    
    rows.forEach( function getvalues(ourrow) {
        editors_15.push(ourrow)
    })
});

function get_edited_articles(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

            container = $('#output');
            url_clean = url.replace(user_contributs_14,'').replace(user_contributs_15,'').replace('_',' ')

            user_art = $(wikiResponse.query.usercontribs)
            
            //console.log(wikiResponse)
            //console.log(user_art)
    
            result = []
            art_array = []

            index++

            jQuery.each( user_art, function( a,b ) {

                art = b.title
                art_array.push(art)

                art_array_sort =  art_array.sort()
                
                $.each(art_array_sort, function(i, e) {
                    if ($.inArray(e, result) == -1) {
                        result.push(e);
                    }
                })
            })
            sorted_result = result.sort()

            //console.log(sorted_result)
            //container.append(url_clean + '<br>')

            if (sorted_result !== null) {
                container.append(sorted_result + ',<br>')
                //console.log(sorted_result)
            }

            //container.append(sorted_result + '<br>')

            if (index == stop) {  //
                console.log('> finished');
            }

        },   
        error : function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    })

}

// get entry links for all of article
function get_all_edited_articles_2014() {
    var container = $('#output')
    //container.append('article,edits,unique_editors,avg_size<br/>')
    index = 0
    stop = 0

    jQuery.each( editors_14, function( i, val ) {
        get_edited_articles( user_contributs_14 + val )
        console.log(val)
        stop++
    })  

    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_edited_articles_2015() {
    var container = $('#output')
    //container.append('article,edits,unique_editors,avg_size<br/>')
    index = 0
    stop = 0

    jQuery.each( editors_15, function( i, val ) {
        get_edited_articles( user_contributs_15 + val )
        console.log(val)
        stop++
    })  

    $('#hide_a').hide();
    $('#hide_b').show();
}

