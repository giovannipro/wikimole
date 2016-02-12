function test() {
	console.log('ok')
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
var wikilink = 'https://en.wikipedia.org/wiki/';
var edits_14 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=1000&rvstart=1420070399&rvend=1388534400&rvdir=newer&indexpageids=&titles='; 
var edits_15 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=1000&rvstart=1451606399&rvend=1420070400&rvdir=newer&indexpageids=&titles=';
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=1000&format=json&bltitle='
var user_contributs_14 = 'https://it.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1420070399&ucend=1388534400&ucprop=ids|title|timestamp|comment|parsedcomment|size|sizediff|flags|tags&ucuser='
var user_contributs_15 = 'https://it.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1451606399&ucend=1420070400&ucprop=ids|title|timestamp|comment|parsedcomment|size|sizediff|flags|tags&ucuser='


/*
http://www.epochconverter.com/

1.01.2014, 00:00:00     1388534400 
31.12.2014, 23:59:59    1420070399

1.01.2015, 00:00:00     1420070400
31.12.2015, 23:59:59    1451606399
*/


/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles_test.json'; //  articles_test    / updated_articles_list

var list = [
	'nelson_mandela',
	'africa',
    'AIDS',
    'sexism'
]	

var editors = [
    'iopensa',
    'RebeccaCasper',  //
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
        	url_clean = url.replace(edits_14,'').replace(edits, '').replace('_',' ')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions
            //users = $(wikiResponse.query.pages)[0][pageids].revisions.user
        	//console.log(edit)

        	sum_edits = 0
            sum_editors = 0
            sum_size = 0

            findme1 = 'bot'

            //sorted_user = []
            //sorted_user.push($(wikiResponse.query.pages)[0][pageids].revisions)

            /*
            sorted_user.sort(function (a, b) {
                return b.user.localeCompare( b.user );
            });
            */

            size_array = []
            user_array = []

            var result = [];

            var sumX = 0
            var total = 0

        	jQuery.each( edit, function( a,b ) {

                user = b.user
                size = b.size

                if ( user.toLowerCase().indexOf(findme1) >= 0 ) {
                        
                    user.toLowerCase().replace(findme1, " bot");

                }
                else {
                    //console.log(user)
                    sum_edits++
                    

                    user_clean = user.replace(/./g,'_')

                    user_array.push( user );
                    sorted_user_array =  user_array.sort()

                    $.each(sorted_user_array, function(i, e) {
                        if ($.inArray(e, result) == -1) {
                            result.push(e);
                            //console.log(e)
                            sum_editors++
                        }
                    })

                    size_array.push(size)

                    /*
                    for (var i = 0; i < size_array.length; i++) {
                        total += size_array[i] << 0;
                    }
                    */

                    total = eval(size_array.join("+"))
                    average = Math.round(total / size_array.length)
                    
                    /*
                    length = size_array.length
                    console.log(length)
                    
                    var sumX = size_array.reduce(function(a, b) { return a + b; });
                    var avgX = sumX / length;
                    */

                }

        	})

            console.log(result)
            console.log(size_array)
            console.log(total)
            console.log(average)

            container.append(url_clean + ',')
            container.append(sum_edits + ',')
            container.append(sum_editors + ',')
            container.append(average + '<br/>')

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
    container.append('article,edits,unique_editors,avg_size<br/>')
	jQuery.each( articles, function( i, val ) {
		get_edits( edits_14 + val )
	})	
}



/* ------------------------------------
USERS
-------------------------------------*/

function get_editors(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

            container = $('#edits');
            url_clean = url.replace(edits_15,'').replace(edits, '').replace('_',' ')
            
            obj = []
            obj = $(wikiResponse.query.pageids)
            pageids = obj[0].toString()
            edit =  $(wikiResponse.query.pages)[0][pageids].revisions

            findme1 = 'bot'

            user_array = []
            result = [];

            var sumX = 0
            var total = 0

            console.log(edit)

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

                            result.push(e);
                            
                        }
                    })

                    sorted_result = result.sort()

                }

            })

            test = JSON.stringify(result);
            container.append(result + ',<br>')
            console.log(result)

            $('.hide_1').hide()
        },   
        error : function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    })

}

// get entry links for all of article
function get_all_editors() {
    var container = $('#edits')
    //container.append('article,edits,unique_editors,avg_size<br/>')
    jQuery.each( articles, function( i, val ) {
        get_editors( edits_15 + val )
        console.log(val)
    })  
}

/* ------------------------------------
EDITED ARTICLES
-------------------------------------*/

function get_edited_articles(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

            container = $('#edits');
            url_clean = url.replace(user_contributs_15,'').replace('_',' ')

            user_art = $(wikiResponse.query.usercontribs)
            
            //console.log(wikiResponse)
            console.log(user_art)
    
            result = []
            art_array = []

            jQuery.each( user_art, function( a,b ) {


                art = b.title
                art_array.push(art)

                art_array_sort =  art_array.sort()
                
                $.each(art_array_sort, function(i, e) {
                    if ($.inArray(e, result) == -1) {
                        result.push(e);
                    }

                })
                
                sorted_result = result.sort()

            })

            console.log(result)
            container.append(url_clean + '<br>')
            container.append(sorted_result + ',<br>')

            $('.hide_1').hide()
        },   
        error : function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    })

}

// get entry links for all of article
function get_all_edited_articles() {
    var container = $('#edits')
    //container.append('article,edits,unique_editors,avg_size<br/>')
    jQuery.each( editors, function( i, val ) {
        get_edited_articles( user_contributs_15 + val )
        console.log(val)
    })  
}
