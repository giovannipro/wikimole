// main variables
// ------------------

var w = window;

var t = "\t";

var width = w.outerWidth;
    height = 10500; //3000; //width + (width*0.3);
// console.log(w)

var margin = {top: 50, right: 50, bottom: 50, left: 50},
    nomargin_w = width - (margin.left + margin.right),
    nomargin_h = height - (margin.top + margin.bottom);

var padding = width/100,
    offset = padding * 1.5,
    bar_h = 6;

// var streamHeight = 20;
    // dateFormat_edit = d3.time.format('%Y-%m-%d'), // 01.01.14 // %d-%m-%y"  // %d.%m.%y

var dateFormat_pageview = d3.time.format('%Y%m%d%H'); // 2015070100

var v_shift = 60,
    label_space = 300,
    bands = 3;

var fontsize = 16,
    fontweight = 300;

var filter = "control" // examined control all
console.log(filter)

// set plot
// ------------------

var svg = d3.select("#svg_container")
    .append("svg")
    .attr("widht",width)
    .attr("height",height)
    .attr("viewBox", '0 0 ' + width + ' ' + (height) )

var plot = svg.append("g")
    .attr("id", "d3_plot")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get data
// ------------------

d3.csv("../../assets/data/20170803/pageview_2015_2017.csv", horizon_chart); // pageview_2015_2017 pageview_2015_2017_test  horizon_chart loaded_pageview
// d3.csv("../../assets/data/20160227/edit.csv", loaded_pageview); 

function horizon_chart (error, data){
    if (error) throw error;

// data
    var dateFormat_pageview = d3.time.format('%Y%m%d%H'); // 2015070100

    data.forEach(function(d) {
        d.id = +d.id;
        d.article = d.article;
        d.timestamp = dateFormat_pageview.parse(d.timestamp);
        d.pageviews = +d.pageviews;
    })  

    var timeDomain = d3.extent(data, function(d){return d.timestamp});

    var nest = d3.nest()
        .key(function(d) { 
            return d.article; 
        })
        .rollup(function (g) {
            return g.map(function (d) {
                return [d.timestamp, d.pageviews]
            })
            // .sort( function(a,b){return a[0] - b[0]}) //sort temporally
        })
        .entries(data)
    // console.log(data[0].pageviews)

    nest.sort(function(a,b){
        return a.values.reduce(function (c,d) {return c + d[1]}, 0) - b.values.reduce(function (c,d) {return c + d[1]}, 0)
    })
    console.log(nest)

// axis

    var x = d3.time.scale()
        .domain(timeDomain)
        .range([0,nomargin_w - (label_space + 10)]); //margin.left - margin.right 

    // var y = d3.time.scale()
    //     .domain(timeDomain)
    //     .range([0,nomargin_w - (label_space + 10)]); //margin.left - margin.right 

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('top')
        .ticks(d3.time.months, 1)
        .tickFormat(d3.time.format('%y.%m'))
        .tickSize(10)
        // .tickSubdivide(true)

    var o_line = plot.append('g')
        .attr("transform","translate(" + 0 + ",0)")
        .attr('class','o_lines')
        .call(xAxis)
        .selectAll('text')
            .attr("transform", "rotate(0)")
            .style("text-anchor", "start")
            .attr('fill',"gray")
            .attr("font-size",fontsize)

    // var line = d3.svg.line()
    //     .x(function(d) { return x(d.key); })
    //     .y(function(d) { return 0 });

    // svg.append("path")
    //     .data(nest)
    //     .attr("class", "line")
    //     .attr("d", line);

// visual elements

    var horizon = d3.horizon()
        // .scale(scale() ? "global" : "local")
        .width(nomargin_w - (label_space + 10))
        .height(v_shift)
        .bands(bands) // 1 - 5
        .mode("mirror") // mirror offset
        .interpolate("basis") // basis linear

    var article = plot.selectAll('.article')
        .data(nest
            .filter(function (d) { 
                if (filter == "examined") {
                    return d.key == "Coal" ||
                        d.key == "Africa_Day" ||
                        d.key == "Agriculture_in_South_Africa" ||
                        d.key == "AIDS_orphan" ||
                        d.key == "Apartheid" ||
                        d.key == "Bias" ||
                        d.key == "Bicycle" ||
                        d.key == "Children's_Act_2005" ||
                        d.key == "Children's_Day" ||
                        d.key == "Clay" ||
                        d.key == "Convenience_food" ||
                        d.key == "Cradle_of_Humankind" ||
                        d.key == "Day_of_Reconciliation" ||
                        d.key == "Drakensberg" ||
                        d.key == "Fire_safety" ||
                        d.key == "Flag_of_South_Africa" ||
                        d.key == "Food_pyramid_(nutrition)" ||
                        d.key == "Frances_Baard" ||
                        d.key == "Gangster" ||
                        d.key == "Gender_role" ||
                        d.key == "Hand_washing" ||
                        d.key == "Healthcare_in_South_Africa" ||
                        d.key == "Herero_and_Namaqua_genocide" ||
                        d.key == "Heritage_Day_(South_Africa)" ||
                        d.key == "HIV" ||
                        d.key == "Home_safety" ||
                        d.key == "Human_Rights_Day" ||
                        d.key == "Kaditshwene" ||
                        d.key == "Khoikhoi" ||
                        d.key == "Khoisan_languages" ||
                        d.key == "Makhonjwa_Mountains" ||
                        d.key == "Mandela_Day" ||
                        d.key == "Map" ||
                        d.key == "Mapungubwe_Collection" ||
                        d.key == "National_Women's_Day" ||
                        d.key == "Nelson_Mandela" ||
                        d.key == "Nest" ||
                        d.key == "Oliver_Tambo" ||
                        d.key == "Petrol-paraffin_engine" ||
                        d.key == "San_healing_practices" ||
                        d.key == "San_people" ||
                        d.key == "San_religion" ||
                        d.key == "Sieve" ||
                        d.key == "Steve_Biko" ||
                        d.key == "Vibration" ||
                        d.key == "Walter_Sisulu" ||
                        d.key == "Water_pollution" ||
                        d.key == "Water_privatisation_in_South_Africa" ||
                        d.key == "Water_supply_and_sanitation_in_South_Africa" ||
                        d.key == "Western_Cape" ||
                        d.key == "Wildlife_management" ||
                        d.key == "Winnie_Madikizela-Mandela" ||
                        d.key == "!Kung_people"         
                }
                else if (filter == "control") {
                    return d.key != "Coal" &&
                        d.key != "Africa_Day" &&
                        d.key != "Agriculture_in_South_Africa" &&
                        d.key != "AIDS_orphan" &&
                        d.key != "Apartheid" &&
                        d.key != "Bias" &&
                        d.key != "Bicycle" &&
                        d.key != "Children's_Act_2005" &&
                        d.key != "Children's_Day" &&
                        d.key != "Clay" &&
                        d.key != "Convenience_food" &&
                        d.key != "Cradle_of_Humankind" &&
                        d.key != "Day_of_Reconciliation" &&
                        d.key != "Drakensberg" &&
                        d.key != "Fire_safety" &&
                        d.key != "Flag_of_South_Africa" &&
                        d.key != "Food_pyramid_(nutrition)" &&
                        d.key != "Frances_Baard" &&
                        d.key != "Gangster" &&
                        d.key != "Gender_role" &&
                        d.key != "Hand_washing" &&
                        d.key != "Healthcare_in_South_Africa" &&
                        d.key != "Herero_and_Namaqua_genocide" &&
                        d.key != "Heritage_Day_(South_Africa)" &&
                        d.key != "HIV" &&
                        d.key != "Home_safety" &&
                        d.key != "Human_Rights_Day" &&
                        d.key != "Kaditshwene" &&
                        d.key != "Khoikhoi" &&
                        d.key != "Khoisan_languages" &&
                        d.key != "Makhonjwa_Mountains" &&
                        d.key != "Mandela_Day" &&
                        d.key != "Map" &&
                        d.key != "Mapungubwe_Collection" &&
                        d.key != "National_Women's_Day" &&
                        d.key != "Nelson_Mandela" &&
                        d.key != "Nest" &&
                        d.key != "Oliver_Tambo" &&
                        d.key != "Petrol-paraffin_engine" &&
                        d.key != "San_healing_practices" &&
                        d.key != "San_people" &&
                        d.key != "San_religion" &&
                        d.key != "Sieve" &&
                        d.key != "Steve_Biko" &&
                        d.key != "Vibration" &&
                        d.key != "Walter_Sisulu" &&
                        d.key != "Water_pollution" &&
                        d.key != "Water_privatisation_in_South_Africa" &&
                        d.key != "Water_supply_and_sanitation_in_South_Africa" &&
                        d.key != "Western_Cape" &&
                        d.key != "Wildlife_management" &&
                        d.key != "Winnie_Madikizela-Mandela" &&
                        d.key != "!Kung_people" 
                } 
                else {
                    return d.art != "xyz"
                }                            
            })
        )        
        .enter()
        .append('g')
        .attr("class","article")
        .attr("id",function (d,i){
            return (i+1) + "-" + d.key
        })
        .attr("transform",function (d,i){
            return "translate(0" + "," + (v_shift * i) + ")" 
        })
        // .call(horizon);

    var text = article.append("g")        
        .attr("transform", function(d,i){
            return "translate(" + (nomargin_w - label_space) + "," + -10 + ")"
        })
        .append("text")
        .attr("x", 0)
        .attr("y", function(d){
            return (fontsize * 2)
        })        
        .style("font-size",fontsize)
        .style("font-weight",fontweight)
        .style("letter-spacing",0)
        .style("text-anchor","start") // end
        .text(function(d,i){
            // return (i+1) + t + (d.key)
            return d.key
        })

    var horizon = article.selectAll('horizon')
        .data(function (d) {
        return [d.values]
        })       
        .enter()
        .append('g')
        .call(horizon);

        
};

function loaded_pageview (data){

    data.forEach(function(d) {
        d.id = +d.id;
        d.article = d.article;
        d.timestamp = dateFormat_pageview.parse(d.timestamp);
        d.pageviews = +d.pageviews;
    })
    // console.log(data[0])

    // set x and y domain
    var pvDomain = d3.extent(data, function(d){return d.pageviews});
    var timeDomain = d3.extent(data, function(d){return d.timestamp});

    var max_pageviews = d3.max(data, function(d) {return d.pageviews}),
        max_pv = 1000;

    // nest dataset for every article 
    data = d3.nest().key(function(d){return d.article}).entries(data);

    // sort in descending order of total amount of edits
    data.sort(function(a,b){
        var a = d3.sum(a.values, function(d){return Math.abs(d.pageviews)  })
        var b = d3.sum(b.values, function(d){return Math.abs(d.pageviews)  })
        return a - b
    })
    
    console.log(data)
    console.log(pvDomain, max_pageviews)

// set axis
// ------------------

    // var height_stream = data.length * streamHeight

    // set x range
    var x = d3.time.scale()
        .domain(timeDomain)
        .range([0, nomargin_w]); //margin.left - margin.right 

    // set x axis
    // var xAxis = d3.svg.axis()
    //     .scale(x)
    //     .orient('bottom')
    //     .ticks(d3.time.months, 1)
    //     .tickFormat(d3.time.format('%m'))
    //     .tickSize(10)
    //     .tickSubdivide(true)

    // set y range
    var y = d3.scale.ordinal()
        .domain([0,max_pv]) // max_pageviews
        // .data.map(function(d){return d.key})
        // .rangePoints([0, 100], 1 ); // height_stream
        .range([0, 50]); // v_shift

    // set y axis  
    // var yAxis = d3.scale.linear()
    //     .domain(sizeDomain)
    //     .range([0, v_shift]); //height_stream - margin.top - margin.bottom ]);

    // area generator
    var area = d3.svg.area()
        .interpolate("linear") // bundle
        .x(function(d) { 
            return x(d.timestamp) //dateFormat_pageview.parse(d.timestamp)) //x(d.timestamp)
        }) 
        .y0(function(d) {
            return 0 // -(( ( (nomargin_h/n_art) * 20 ) * (d.pageviews )) / max_pageviews ) 
        })     
        .y1(function(d) {
            return -( (v_shift * d.pageviews) / max_pv) // max_pageviews    // -(( ( (nomargin_h/n_art) * 20 ) * (d.pageviews )) / max_pageviews ) 
        })
        
// visualize elements
// ------------------

    // articles
    var articles = plot.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr('class','article')
        .attr('id',function(d,i){
            return (i+1) + '-' + d.key
        })
        .attr("transform", function(d, i) {
            return 'translate(' + 0 + ',' + (v_shift * (i+1))  + ')' // shift ((nomargin_h/n_art)*i )
        }) 

    // pageviews
    var pv = articles.append('g')
        .attr('class','pageviews')
        .append("path")
        //.attr("transform", function(d, i) { return "translate(" + shift + "," + (y(d.key) + padding )   + ")" }) // 
        // .style("fill", "red")
        .style("stroke", "white") 
        .style("stroke-width", "1")
        .attr("d", function(d){ 
            return area(d.values) 
        })

    // var text = articles.append("text")
    //     .attr("x", -10)
    //     .attr("dy",5)
    //     .attr("y", function(d){
    //         return y(d.key) + padding 
    //     })
    //     .attr("transform", function(d,i){
    //         return "translate(" + (nomargin_w - 200) + "," + -10 + ")"
    //     })
    //     .style("font-size",30) // fontsize
    //     .style("font-weight",fontweight)
    //     .style("letter-spacing",1)
    //     .style("text-anchor","end")
    //     .text(function(d,i){
    //         return (d.key)
    //     })
}