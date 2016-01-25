function test() {
	console.log('ok')
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
var wikilink = 'https://en.wikipedia.org/wiki/';
var edits_15 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=1000&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles='; 
var edits_14 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=1000&rvstart=1388530800&rvend=1419980400&rvdir=newer&indexpageids=&titles=';
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=1000&format=json&bltitle='
var user_contributs = 'https://it.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucnamespace=0&ucprop=title|timestamp|size|sizediff|flags&ucuser'


/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/updated_articles_list.json'; //  articles_test    / updated_articles_list

var list = [
	'nelson_mandela',
	'africa',
    'AIDS',
    'sexism'
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

            sum_edits = 0
            sum_editors = 0
            sum_size = 0

            findme1 = 'bot'

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
                    //sum_edits++
                    
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

            //test1 = result.replace(/./g,'_').replace(/ /g,'_')

            console.log(result)

            test = JSON.stringify(result);

            //container.append(url_clean + ':<br>')
            container.append(test + '<br>')

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
