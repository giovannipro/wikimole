function test() {
	console.log('ok')
}

/* ------------------------------------
SOURCE
-------------------------------------*/

var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
var wikilink = 'https://en.wikipedia.org/wiki/';
var edits_15 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles='; 
var edits_14 = '';
var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=1000&format=json&bltitle='


/* ------------------------------------
ARTICLES LIST
-------------------------------------*/

var art_list = '../articles/articles.json'; //  articles  /  articles_test

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
        	url_clean = url.replace('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles=','').replace(edits, '').replace('_',' ')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions
            //users = $(wikiResponse.query.pages)[0][pageids].revisions.user

        	//console.log(edit)

        	sum_edits = 0
            sum_editors = 0

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

        	jQuery.each( edit, function( a,b ) {

                user = b.user
                size = b.size


                /*
                sorted_user = []
                sorted_user.push( this );
                */

                //sorted_user.push(b.user)
                //sorted_user.sort()

                //$.each( user, function( x ) {
                
                //});

                


                if ( user.toLowerCase().indexOf(findme1) >= 0 ) {
                        
                    user.toLowerCase().replace(findme1, " bot");


                }
                else {
                    //console.log(user)
                    sum_edits++
                    sum_editors++

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


                    /*
                    function unique(list) {
                        
                        $.each(list, function(i, e) {
                            if ($.inArray(e, result) == -1) result.push(e);
                        });
                        return result;
                    }*/

                    //var thelist = ["ball_1", "ball_13", "ball_23", "ball_1"];
                    //console.log(unique(thelist));


                    /*

                    if (sorted_user_array[a + 1] !== sorted_user_array[a]  ) {
                        console.log (user)
                    }
                    else {
                        //console.log ('no - ' + user)
                    }
                    */

                    //var arr = [9, 9, 111, 2, 3, 4, 4, 5, 7];
                    //var sorted_arr = arr.sort(); // You can define the comparing function here. 
                                                 // JS by default uses a crappy string compare.
                    /*
                    var results = [];
                    for (var i = 0; i < user.length - 1; i++) {
                        if (user[i + 1] == user[i]) {
                            results.push(user[i]);
                        }
                    }*/

                    /*
                    var unique = $(user_clean).filter(i,itm){
                        return i == $(user_clean).index(itm);
                    }
                    */

                    /*
                    $(user_clean).filter(function(i,itm){  // $.makeArray($(user).filter(function(i,itm){ 
                        return i == $(user_clean).index(itm);
                    })
                    
                    */

                }

        	})
    
            //console.log(sorted_user_array)
            console.log(result)
            //sorted_user.sort()
            //console.log(sorted_user)

            container.append(url_clean + ',')
            container.append(sum_edits + ',')
            container.append(sum_editors + '<br/>')

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
		get_edits( edits_15 + val )
	})	
}


/* ------------------------------------------------------------ */


function get_editors(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

        	container = $('#edits');
        	url_clean = url.replace('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvstart=1420066800&rvend=1448924400&rvdir=newer&indexpageids=&titles=','').replace(/_/g,' ').replace(edits, '')
        	
        	obj = []
			obj = $(wikiResponse.query.pageids)

			pageids = obj[0].toString()
			edit =  $(wikiResponse.query.pages)[0][pageids].revisions

        	console.log(edit)

        	sum = 0

        	jQuery.each( edit, function( a,b ) {

        		sum++;
				container.append()

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

// get entry links for all of articles
function get_all_editors() {
	var container = $('#edits')
	jQuery.each( articles, function( i, val ) { 
		get_edits( edits_15 + val )
	})	
}