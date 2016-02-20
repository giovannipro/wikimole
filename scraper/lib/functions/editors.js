function test() {
    console.log('ready');
}

/* ------------------------------------
WIKIPEDIA API
-------------------------------------*/

//var baseurl = 'http://localhost:8888/wikimole/scraper/proxy/';
//var wikilink = 'https://en.wikipedia.org/wiki/';
//var backlinks = 'https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bllimit=1000&format=json&bltitle=';
var edits_14 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Cuser%7Csize&rvlimit=500&rvstart=1420070399&rvend=1388534400&rvlimit=10rvdir=newer&indexpageids=&titles=';
var edits_15 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Cuser%7Csize&rvlimit=500&rvstart=1451606399&rvend=1420070400&rvlimit=10rvdir=newer&indexpageids=&titles=';
var user_contributs_14 = 'https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1420070399&ucend=1388534400&ucprop=ids%7Ctitle%7Ctimestamp%7Ccomment%7Csize%7Csizediff%7Cflags%7Ctags&ucuser='; // %7Cparsedcomment
var user_contributs_15 = 'https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1451606399&ucend=1420070400&ucprop=ids%7Ctitle%7Ctimestamp%7Ccomment%7Csize%7Csizediff%7Cflags%7Ctags&ucuser='; // %7Cparsedcomment
var user_info = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=users&meta=&titles=&inprop=&usprop=blockinfo%7Cgroups%7Crights%7Ceditcount%7Cregistration%7Cemailable%7Cgender&ususers=';

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
ARTICLES AND EDITORS LIST
-------------------------------------*/

var art_list = '../articles/articles.json';  // articles  articles_test

// it does not contain bots
var editor_list_14 = '../../data/edits/editors_test.csv';  // editors_14    editors_test
var editor_list_15 = '../../data/edits/editors_15.csv';  // editors_15    editors_test

var edited_articles_14 = '../../data/edits/edited_articles_14.csv'; // edited_articles_14  articles_test
var edited_articles_15 = '../../data/edits/edited_articles_15.csv'; // edited_articles_15  articles_test

var editor_identity = '../../data/edits/identity_test.csv';  // editors_identity_2014  identity_test

var list = [
    'nelson_mandela',
    'africa',
    'AIDS',
    'sexism',
    'Alcohol_abuse'
];  

var editors = [
    'iopensa',
    'RebeccaCasper', 
    'Mean_as_custard',
    'Nonsurgicalliposection',
    'Nanno1992',
    'example'
];

// get the list of articles
$.getJSON(art_list, function(mydata) {
    var parse_art = $.parseHTML(mydata);
    articles = $(mydata);
});

// clean the string
function string_clean(string) {
    string.replace(/^-+/, '').replace(/-+$/, '').replace('%C7%83', '!').replace(/_/g, ' ').replace('%28', '(').replace('%29', ')').replace('%27', "'");
}

// hide graphical elements
function hide() {
    $('#hide_a').hide();
    $('#hide_b').show();
    console.log('works');
}


/* ------------------------------------
FINDME
-------------------------------------*/


var findme1 = 'xxxxxxxxxx', //bot

wikipedia = 'Wikipedia:',
user = 'User:',
category = 'Category',
help = 'Help',
project = 'Project:',
discussion =  'Discussion:',
discussion_template =  'Discussion template:',
discussion_proj = 'Discussion project:',
user_discussion = 'User discussion:',
wiki_dscussion = 'Wikipedia discussion:',
Talk = 'Talk',
talk = 'talk:',
template = 'Template',
user_talk = 'User talk:',
draft = 'Draft',
mediawiki = 'MediaWiki',
w_talk = 'Wikipedia talk',
e_p_talk = 'Education Program talk';
file = 'File'
portal = 'Portal';


/* ------------------------------------
EDITS
-------------------------------------*/

function get_edits(url) {
    // edits,unique_editors,avgerage_size
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {
            //console.log(wikiResponse)

            container = $('#output');
            url_clean = url.replace('_',' ').replace(edits_14, '').replace(edits_15, '');
            
            obj = [];
            obj = $(wikiResponse.query.pageids);

            pageids = obj[0].toString();
            edit =  $(wikiResponse.query.pages)[0][pageids].revisions;

            sum_edits = 0;
            sum_editors = 0;
            sum_size = 0;

            index++;

            size_array = [];
            user_array = [];

            var result = [];

            //var sumX = 0;
            //var total = 0;


            if (edit == null) {
                console.log(url + ' - null');
            }
            else{
                // ok;
            }
            
            jQuery.each( edit, function( a,b ) {

                user = b.user;
                size = b.size;

                if ( user.toLowerCase().indexOf(findme1) >= 0 ) {
                    user.toLowerCase().replace(findme1, " bot");
                }
                else {
                    sum_edits++;
                    
                    user_clean = user.replace(/./g,'_');

                    user_array.push( user );
                    sorted_user_array =  user_array.sort();

                    $.each(sorted_user_array, function(i, e) {
                        if ($.inArray(e, result) == -1) {
                            result.push(e);
                            sorted_result = result.sort();

                            sum_editors++;
                        }
                    });

                    size_array.push(size);

                    total = eval(size_array.join("+"));
                    average = Math.round(total / size_array.length);
                }
            });
    
            console.log(index + '-' + url_clean);
            console.log(sorted_result);

            container.append(url_clean + ',');
            container.append(sum_editors + ',');
            container.append(sum_edits + ',');
            container.append(average + '<br/>');

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

// get entry links for all of article
function get_all_edits_2014() {
    var container = $('#output');
    index = 0;
    stop = 0;

    container.append('article_2014,unique_editors,edits,avg_size<br/>');
    jQuery.each( articles, function( i, val ) {
        get_edits( edits_14 + val );
        stop++;
    }); 

    if (index == stop) { 
        console.log('DONE');
    }

    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_edits_2015() {
    var container = $('#output');
    index = 0;
    stop = 0;

    container.append('article_2015,unique_editors,edits,avg_size<br/>');
    jQuery.each( articles, function( i, val ) {
        get_edits( edits_15 + val );
        stop++;
    });  

    if (index == stop) { 
        console.log('DONE');
    }

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
            
            obj = [];
            obj = $(wikiResponse.query.pageids);
            pageids = obj[0].toString();
            edit =  $(wikiResponse.query.pages)[0][pageids].revisions;

            findme1 = 'xxxxxxxxxx'; // bot

            user_array = [];
            result = [];
            sorted_result = [];
            all_clean = [];

            var sumX = 0;
            var total = 0;

            index++;

            jQuery.each( edit, function( a,b ) {

                us = b.user
                user = us.replace(/,/g,'_');


                if ( user.toLowerCase().indexOf(findme1) >= 0 ) {
                    user.toLowerCase().replace(findme1, " bot");
                }
                else {
                    user_clean = user.replace(/./g,'_').replace(/ /g,'_');

                    user_array.push( user );
                    user_array_sort =  user_array.sort();

                    $.each(user_array_sort, function(i, e) {
                        if ($.inArray(e, result) == -1) {

                            //e_clean = e.replace('/ /g','_');
                            e_clean = e.replace(', ','_');
                            result.push(e_clean);
                            all.push(e_clean);
                        }
                    });
                    sorted_result = result.sort();
                }
            });

            all_sort = all.sort();

            $.each(all_sort, function(i, a) {
                if ($.inArray(a, all_clean) == -1) {
                    all_clean.push(a);
                }
            });
            sorted_all_clean = all_clean.sort();


            if (index ==  stop) { 
                container.append(sorted_all_clean + ',<br/>');
            }

            console.log(index + ' - ' + url_clean);
            console.log(result);
        },   
        error : function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

// get entry links for all of article
function get_all_editors_2015() {
    //var container = $('#output')
    //container.append('article,edits,unique_editors,avg_size<br/>')
    index = 0;
    stop = 0;
    all = [];
    console.log(2015)

    jQuery.each( articles, function( i, val ) {
        get_editors( edits_15 + val );
        stop++;
    }); 
    
    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_editors_2014() {
    index = 0;
    stop = 0;
    all = [];
    console.log(2014)

    jQuery.each( articles, function( i, val ) {
        get_editors( edits_14 + val );
        stop++;
    }); 
    //console.log(stop)
    $('#hide_a').hide();
    $('#hide_b').show();
}


/* ------------------------------------
EDITED ARTICLES
-------------------------------------*/

// get the list of editors
editors_14 = [];
editors_15 = [];

$.get(editor_list_14, function(data) {

    var rows = data.split(",\n");
    
    rows.forEach( function getvalues(ourrow) {
        //var columns = ourrow.split(",");
        editors_14.push(ourrow);
    });
});


$.get(editor_list_15, function(data) {

    var rows = data.split(",\n");
    
    rows.forEach( function getvalues(ourrow) {
        editors_15.push(ourrow);
    });
});

function get_edited_articles(url) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {

            container = $('#output');
            url_clean = url.replace(user_contributs_14,'').replace(user_contributs_15,'').replace('_',' ');

            user_art = $(wikiResponse.query.usercontribs);
            //console.log(wikiResponse)

            var my_dict = {};

            index++;

            for (var i=0; i<user_art.length; i++) {
                var b = user_art[i],
                pid = String(b.pageid);

                if (!my_dict.hasOwnProperty(pid)) {
                    my_dict[pid] = {
                        title: b.title,
                        size: b.size,
                        tot: b.size,
                        count: 1,
                        avg: b.size
                    };
                    continue;
                }

                var art_data = my_dict[pid];

                var size = b.size,
                tot = art_data.tot + size,
                count = art_data.count + 1,
                new_avg = Math.ceil(tot/count);

                my_dict[pid].size = size;
                my_dict[pid].tot = tot;
                my_dict[pid].count = count;
                my_dict[pid].avg = new_avg;
            }
            //console.log(my_dict); 

            jQuery.each( my_dict, function( a, b ) {

                t = b.title

                title = t.replace(/,/g, "_");

                limit = 0

                if (b.count > limit ) {
                    
                    if (
                        title.indexOf(discussion_template)!== 0 && 
                        title.indexOf(template)!== 0 &&  
                        title.indexOf(category)!== 0 &&  
                        title.indexOf(discussion) !== 0  &&
                        title.indexOf(discussion) !== 0  &&                              
                        title.indexOf(user_discussion) !== 0 && 
                        title.indexOf(wiki_dscussion) !== 0  &&
                        title.indexOf(wikipedia) !== 0 && 
                        title.indexOf(help) !== 0 && 
                        title.indexOf(project) !== 0 && 
                        title.indexOf(discussion_proj) !== 0 &&
                        title.indexOf(user) !== 0 && 
                        title.indexOf(Talk) !== 0 && 
                        title.indexOf(talk) !== 0 && 
                        title.indexOf(user_talk) !== 0 && 
                        title.indexOf(draft) !== 0 && 
                        title.indexOf(w_talk) !== 0 && 
                        title.indexOf(mediawiki) !== 0 &&
                        title.indexOf(file) !== 0 &&
                        title.indexOf(portal) !== 0 &&
                        title.indexOf(template) !== 0 &&
                        title.indexOf(e_p_talk) !== 0
                        )

                        {   
                            container.append(title + ',' + b.count + ','  + b.avg +',<br/>');  
                        }
                          
                    else {
                        // console.log('no: ' + b.title);
                    }

                    //console.log(b.count) 
                
                }
            });

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

// get entry links for all of article
function get_all_edited_articles_2014() {
    var container = $('#output');
    console.log('2014');

    container.append('article_14,edits,avg_size,<br/>');
    index = 0;
    stop = 0;

    jQuery.each( editors_14, function( i, val ) {
        //console.log(val);
        stop++;

        bot = 'bot';
        val_lc = val.toLowerCase();

        if (val_lc.indexOf(bot) >= 0 ) {
            //console.log('>>> bot: ' + val_lc);
        }
        else{
            console.log(val)
            get_edited_articles( user_contributs_14 + val );
        }
    });

    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_edited_articles_2015() {
    var container = $('#output');
    console.log('2015');

    container.append('article_15,avg_size,edits<br/>');
    index = 0;
    stop = 0;

    jQuery.each( editors_15, function( i, val ) {
        //console.log(val);
        stop++;

        bot = 'bot';
        val_lc = val.toLowerCase();

        console.log(val_lc);

        if (val_lc.indexOf(bot) >= 0 ) {
            console.log('>>> bot: ' + val_lc);
        }
        else{
            //console.log(val_lc)
            get_edited_articles( user_contributs_15 + val );
        }
    });  

    $('#hide_a').hide();
    $('#hide_b').show();
}


/* ------------------------------------
EDITORS INFO - DATA PER EDITOR
-------------------------------------*/

function get_editor_info(url,art) {

    var pack = [];

    $.ajax(url, {
    dataType:  "jsonp",
    success: function( wikiResponse ) {
        //console.log(wikiResponse)

        container = $('#output');

        url_clean = url.replace('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=users&meta=&titles=&inprop=&usprop=blockinfo%7Cgroups%7Crights%7Ceditcount%7Cregistration%7Cemailable%7Cgender&ususers=','')

        name = $(wikiResponse.query.users)[0].name;
        gender = $(wikiResponse.query.users)[0].gender;
        editcount = $(wikiResponse.query.users)[0].editcount;
        emailable = $(wikiResponse.query.users)[0].emailable;
        registration = $(wikiResponse.query.users)[0].registration;

        rights = $(wikiResponse.query.users)[0].rights

        var my_user = {};
        
        rights_count = 0

        jQuery.each( rights, function( i, val ) {
            //console.log(val)
            rights_count++
        })

        user_name_clean = name.replace(',','_')

        my_user = {
            //art: art_clean,
            name: user_name_clean,
            gender: gender,
            editcount: editcount,
            emailable: emailable,
            registration: registration,
            rigths: rights_count
        };

        console.log(my_user)
        //pack.push(my_user)

        //json = JSON.stringify(my_user)
        //console.log(json)

        stop++;

        //art_clean = art.replace('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Cuser%7Csize&rvlimit=500&rvstart=1420070399&rvend=1388534400&rvlimit=10rvdir=newer&indexpageids=&titles=','')
        art_clean = art.replace(edits_14,'').replace(edits_15,'')

        pack = [];

        email = my_user.emailable

        pack.push(art_clean)
        pack.push(my_user.name)
        
        name_low = name.toLowerCase()

        if (name_low.indexOf('bot') >= 0 )  {
            pack.push('bot')
            //console.log('bot' + name_low)
        }
        else {
            pack.push(my_user.gender)
            //console.log('nobot' + name_low)
        }

        pack.push(my_user.editcount)
        pack.push(my_user.registration)

        if ( email === '') {
            // nothing
            pack.push('undefined')
            //console.log('undefined')
        }
        else{
            pack.push('no')
        }

        pack.push(my_user.rigths)

        container.append(pack + '<br/>')

        if (index == stop) { 
            console.log('DONE');
            console.log(pack)
        }
        
    },
    error : function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        }
    })
}

function get_editor_name(url) {

    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {
            console.log(wikiResponse)

            //var index_1 = 0;

            container = $('#output');
            url_clean = url.replace('_',' ').replace(edits_14, '').replace(edits_15, '');
            
            obj = [];
            obj = $(wikiResponse.query.pageids);

            pageids = obj[0].toString();
            edit =  $(wikiResponse.query.pages)[0][pageids].revisions;
            title = $(wikiResponse.query.pages)[0][pageids].title

            //console.log(title)

            var users = [],
            result = [];

            //result.push(title)

            jQuery.each( edit, function( i, val ) {

                var user = val.user;
                
                users.push(user)

                users_sort = users.sort()

                $.each(users_sort, function(i, e) {
                    if ($.inArray(e, result) == -1) {
                        result.push(e);
                        index++;
                    }
                });
            })

            console.log(url_clean)
            console.log(result)

            jQuery.each( result, function( i, val ) {
                get_editor_info(user_info + val, url)
            })
        },   
        error : function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });

}

function get_all_editor_info_2014() {
    var container = $('#output');
    index = 0;
    stop = 0;
    container.append('article_15,editor,gender,editcount,registration,emailable,rigths<br/>')

    jQuery.each( articles, function( i, val ) {
        

        bot = 'bot';
        val_lc = val.toLowerCase();

        console.log(val_lc);

        if (val_lc.indexOf(bot) >= 0 ) {
            console.log('>>> bot: ' + val_lc);
        }
        else{
            get_editor_name( edits_14 + val );
        }

    });  

    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_editor_info_2015() {
    var container = $('#output');
    index = 0;
    stop = 0;
    container.append('article_15,editor,gender,editcount,registration,emailable,rigths<br/>')

    jQuery.each( articles, function( i, val ) {
        

        bot = 'bot';
        val_lc = val.toLowerCase();

        console.log(val_lc);

        if (val_lc.indexOf(bot) >= 0 ) {
            console.log('>>> bot: ' + val_lc);
        }
        else{
            get_editor_name( edits_15 + val );
        }

    });  

    $('#hide_a').hide();
    $('#hide_b').show();
}