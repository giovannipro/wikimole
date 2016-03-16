function test_2() {
    console.log('ready editors.js');
}

/* ------------------------------------
WIKIPEDIA API
-------------------------------------*/

var edits_14 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Cuser%7Csize&rvlimit=500&rvstart=1420070399&rvend=1388534400&rvlimit=10rvdir=newer&indexpageids=&titles=';
var edits_15 = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp%7Cuser%7Csize&rvlimit=500&rvstart=1451606399&rvend=1420070400&rvlimit=10rvdir=newer&indexpageids=&titles=';
var user_contributs_14 = 'https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1420070399&ucend=1388534400&ucprop=ids%7Ctitle%7Ctimestamp%7Ccomment%7Csize%7Csizediff%7Cflags%7Ctags&ucuser='; // %7Cparsedcomment
var user_contributs_15 = 'https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&format=json&ucstart=1451606399&ucend=1420070400&ucprop=ids%7Ctitle%7Ctimestamp%7Ccomment%7Csize%7Csizediff%7Cflags%7Ctags&ucuser='; // %7Cparsedcomment
var user_info = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=users&meta=&titles=&inprop=&usprop=blockinfo%7Cgroups%7Crights%7Ceditcount%7Cregistration%7Cemailable%7Cgender&ususers=';

var edit_api = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=timestamp|user|size&rvlimit=500&rvend=1451606399&rvdir=newer&indexpageids=&titles='; // 1419984000 -  until Wed, 31 Dec 2014 00:00:00 GMT

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

var art_list = '../articles/articles_test.json';  // articles_test  articles_1of2 articles_2of2  articles

// it does not contain bots
var editor_list_14 = '../../data/edit/20160224/editors_14.csv';  // editors_14    editors_test
var editor_list_15 = '../../data/edit/20160224/editors_15.csv';  // editors_15    editors_test

var edited_articles_14 = '../../data/edit/20160224/edited_articles_14.csv'; // edited_articles_14  articles_test
var edited_articles_15 = '../../data/edit/20160224/edited_articles_15.csv'; // edited_articles_15  articles_test

var editor_identity = '../../data/edits/identity_test.csv';  // editors_identity_2014  identity_test

// get the list of articles
$.getJSON(art_list, function (mydata) {
    var parse_art = $.parseHTML(mydata);
    articles_b = $(mydata);
});

/* ------------------------------------
LISTS
-------------------------------------*/

var community = [
    'Agriculture in South Africa',
    'Apartheid',
    'Bicycle',
    'Children"s Act (South Africa)',
    'Children"s Day',
    'Coal in South Africa',
    'Cradle of Humankind',
    'Discrimination',
    'Domestic violence',
    'Domestic violence in South Africa',
    'Frances Baard',
    'Gender role',
    'Hand washing',
    'Health care in South Africa',
    'Herero and Namaqua Genocide',
    'Heritage Day (South Africa)',
    'Human Rights Day',
    'Khoikhoi',
    'Mapungubwe Museum',
    'National Women"s Day',
    'Nelson Mandela',
    'Oliver Tambo',
    'Day of Reconciliation',
    'Republic of South Africa',
    'San healing practices',
    'San people',
    'San rock art',
    'Sexism',
    'Transport in South Africa',
    'Walter Sisulu',
    'Water pollution',
    'Water privatization in South Africa',
    'Water supply and sanitation in South Africa',
    'Western Cape',
    'Winnie Madikizela-Mandela',
    'Wood'
];

var review = [
    'Agriculture in South Africa',
    'Apartheid',
    'Bicycle',
    'Children"s Act (South Africa)',
    'Children"s Day',
    'Cradle of Humankind',
    'Domestic violence in South Africa',
    'Gender role',
    'Hand washing',
    'Health care in South Africa',
    'Heritage Day (South Africa)',
    'Human Rights Day',
    'Khoikhoi',
    'Mapungubwe Museum',
    'National Women"s Day',
    'Nelson Mandela',
    'Oliver Tambo',
    'Reconciliation Day',
    'San healing practices',
    'San people',
    'San rock art',
    'Walter Sisulu',
    'Water pollution',
    'Water privatisation in South Africa',
    'Water supply and sanitation in South Africa',
    'Western Cape'
];

var new_articles = [
    'Gas',
    'Gender role',
    'Kaditshwene',
    'Makhonjwa Mountains',
    'Mind map',
    'Processed food'
];

/* ------------------------------------
FINDME
-------------------------------------*/

var findme1 = 'xxxxxxxxxx', //bot

wikipedia = 'Wikipedia:',
user = 'User:',
category = 'Category:',
help = 'Help:',
project = 'Project:',
discussion =  'Discussion:',
discussion_template =  'Discussion template:',
discussion_proj = 'Discussion project:',
user_discussion = 'User discussion:',
wiki_dscussion = 'Wikipedia discussion:',
talk = 'talk:',
Talk = 'Talk:',
template = 'Template',
user_talk = 'User talk:',
draft = 'Draft',
mediawiki = 'MediaWiki',
w_talk = 'Wikipedia talk',
e_p_talk = 'Education Program talk';
file = 'File:'
portal = 'Portal:';


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
            url_clean = url.replace(/_/g,' ').replace(edits_14, '').replace(edits_15, '').replace(', ', '_');
            
            obj = [];
            obj = $(wikiResponse.query.pageids);

            pageids = obj[0].toString();
            edit =  $(wikiResponse.query.pages)[0][pageids].revisions;

            //console.log(edit)
            container.append(url_clean + ',');

            if (jQuery.type(edit) === 'undefined') {
                
                container.append('0,0,0,');
            }
            else {
                sum_edits = 0;
                sum_editors = 0;
                sum_unique_editors = 0;
                sum_size = 0;

                index++;

                var size_array = [],
                user_array = [],
                result = [];

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

                                sum_unique_editors++;
                            }
                        });

                        size_array.push(size);

                        total = eval(size_array.join("+"));
                        average = Math.round(total / size_array.length);
                    }
                });

                container.append(sum_unique_editors + ',');
                container.append(sum_edits + ',');
                container.append(average + ',');
            }
            //console.log(index + '-' + url_clean);
            //console.log(sorted_result);

            /*if (edit != null) {   
                container.append(sum_unique_editors + ',');
            }
            else{
                container.append('0,');
                console.log(url + ' - null');
            }

            container.append(sum_edits + ',');
            container.append(average + ',');*/


            if ($.inArray(url_clean, community) != -1 ) {
                container.append('true,')
            }
            else if ($.inArray(url_clean, community) -1 ) {
                container.append('false,')
            }

            if ($.inArray(url_clean, review) != -1 ) {
                //console.log('review')
                container.append('true,')
            }
            else if ($.inArray(url_clean, review) -1 ) {
                container.append('false,')
            }

            if ($.inArray(url_clean, new_articles) != -1 ) {
                container.append('true<br/>')
            }
            else if ($.inArray(url_clean, new_articles) -1 ) {
                container.append('false<br/>')
            } 
            else {
               container.append('<br/>') 
            }

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

    container.append('article_2014,unique_editors,edits,avg_size,community,review,new_articles<br/>');
    jQuery.each( articles_b, function( i, val ) {
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

    container.append('article_2015,unique_editors,edits,avg_size,community,review,new_articles<br/>');
    jQuery.each( articles_b, function( i, val ) {
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

    jQuery.each( articles_b, function( i, val ) {
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

    jQuery.each( articles_b, function( i, val ) {
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

                var t = b.title,
                limit = 0,
                title = t.replace(/_/g, " ").replace(/,/g, "_");
                title_low = title.toString().toLowerCase()
                //console.log(title_low)

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
                            container.append(title + ',' + b.count + ','  + b.avg + ','); 

                            if ($.inArray(title, community) != -1 ) {
                                container.append('true,')
                            }
                            else if ($.inArray(title, community) -1 ) {
                                container.append('false,')
                            }

                            if ($.inArray(title, review) != -1 ) {
                                //console.log('review')
                                container.append('true,')
                            }
                            else if ($.inArray(title, review) -1 ) {
                                container.append('false,')
                            }

                            if ($.inArray(title, new_articles) != -1 ) {
                                container.append('true,<br/>')
                            }
                            else if ($.inArray(title, new_articles) -1 ) {
                                container.append('false,<br/>')
                            }
                        }                          
                    else {
                        //console.log('no: ' + title);
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

    container.append('article_14,edits,avg_size,community,review,new<br/>');
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
            //console.log(val)
            get_edited_articles( user_contributs_14 + val );
        }
    });

    $('#hide_a').hide();
    $('#hide_b').show();
}

function get_all_edited_articles_2015() {
    var container = $('#output');
    console.log('2015');

    container.append('article_15,edits,avg_size,community,review,new<br/>');
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
        stop++;

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

    jQuery.each( articles_b, function( i, val ) {
        

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

    jQuery.each( articles_b, function( i, val ) {
        

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


/* ------------------------------------
EDITS CHRONOLOGY
-------------------------------------*/

// get edits for one article
function edits_csv(url,limit) {
    
    $.ajax(url, {
        dataType:  "jsonp",
        success: function( wikiResponse ) {
            //console.log(wikiResponse)

            container = $('#output');
            url_clean = url.replace(edit_api, '').replace(/_/g,' ').replace(/, /g,'_')
            n_limit = parseInt(limit)
            
            obj = []
            obj = $(wikiResponse.query.pageids)

            pageids = obj[0].toString()
            edit =  $(wikiResponse.query.pages)[0][pageids].revisions

            //console.log(edit)
            //console.log(url_clean)

            jQuery.each( edit, function( i , v ) {

                user = v.user;
                timestamp = v.timestamp;
                size = v.size;
                
                user_clean = user.replace("'",'').replace(/_/g,' ').replace(/, /g,'_')
                timestamp_clean = timestamp.substring(0, 10); 

                user_low = user.toLowerCase()
                //console.log(user_low)

                if ( timestamp.indexOf(n_limit) >= 0 || // 2016, 15, 14, 13, 12
                timestamp.indexOf(n_limit+1) >= 0  ||
                timestamp.indexOf(n_limit+2) >= 0  || 
                timestamp.indexOf(n_limit+3) >= 0  || 
                timestamp.indexOf(n_limit+4) >= 0 ) {

                    if ( user_low.indexOf("bot")  >= 0 ) {
                        //console.log('bot: ' + user)
                    } else {
                        container.append(url_clean + ',' );
                        container.append(user_clean + ',' );
                        container.append(timestamp_clean+ ',');
                        container.append(size + '</br>');
                        
                        console.log ('limit: ' + timestamp)
                        console.log(n_limit+1)
                    }

                }

            })
        },   
        error : function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    })

}

// get entry links for all of article
function get_all_edits_csv(myLimit) {
    var container = $('#output')
    container.append('article,user,timestamp,size<br/>')
    
    limit = $("#limit_edit").val(); 
    myLimit = limit
    console.log(myLimit);
    
    jQuery.each( articles_b, function( i, val ) { 
        edits_csv( edit_api + val , myLimit) 
        console.log(val)
    })  
    $('#hide_a').hide();
    $('#hide_b').show();
      
}
