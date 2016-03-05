/* -----------------------
main variables
------------------------- */

var w = window;
width = w.outerWidth,
height = width + (width*0.5);

var margin = {top: 50, right: 50, bottom: 50, left: 50},
nomargin_w = width - margin.left - margin.right ;
nomargin_h = height - margin.top - margin.bottom ;

var padding = width/100,
offset = padding*1.5,
bar_h = 5;

/*
var start_id = padding,
start_out = padding*20,
start_in = padding*60,
start_icon = padding*73,
start_label = padding*75;
*/

var font_size = '0.8em';

var c_issues = '#EC4C4E',
c_reference = '#49A0D8',
c_note = '#A8D2A2',
c_image = '#F5A3BD'
c_seeAlso = '#36B7BB',
c_benchmark = 'black';

var w_line = '0.5px',
c_line = '#9E9E9E',
c_tick = '#636362';

var x = 10;

/* -----------------------
set plot
------------------------- */

var svg = d3.select("#svg_container")
	.append("svg")
	.attr("viewBox", '0 0 ' + width + ' ' + (height) )

var plot = svg.append("g")
    .attr("id", "d3_plot")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* -----------------------
get data
------------------------- */

d3.csv("../../data/20160227/edits_and_editors_2014_2015.csv", loaded);

function loaded (data){

	/*data.sort(function(a,b) {
		
		total_2016 = a.references + a.notes + a.images + a.seeAlso
		total_2015 = a.references_2015 + a.notes_2015 + a.images_2015 + a.seeAlso_2015 
		
		return a.total - b.total;
	});*/

	console.log(width + ',' + height)
	console.log(data)

	var max_edits = d3.max(data, function(d) { return +d.edits_2015} );
	var max_editors = d3.max(data, function(d) { return +d.unique_editors_2015 ;} );

	console.log(max_edits)
	console.log(max_editors)

/* -----------------------
set axis
------------------------- */

	var x_edits = d3.scale.linear()
		.domain([0,max_edits])
        .range([0,width-(margin.left*2) ]);

	var x_Axis = d3.svg.axis()
        .scale(x_edits)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
    typeof(x_Axis);

	var y_editors = d3.scale.linear()
		.domain([0,max_editors])
        .range([0,height]);

	var y_Axis = d3.svg.axis()
        .scale(y_editors)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
	typeof(out_Axis);

/* -----------------------
visualize grid
------------------------- */
/*
	var vl_in = plot.append('g')
		.attr('class','v_lines')
		.call(in_Axis)
	.selectAll('text')
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start")
        .attr('fill',c_tick)
        .attr("font-size",font_size)

	var vl_out = plot.append('g')
		.attr('class','v_lines')
		.call(out_Axis)
	.selectAll('text')
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start")
        .attr('fill',c_tick)
        .attr("font-size",font_size)

	// o_lines
	var o_lines = plot.append('g')
		.attr('class','o_lines')
		.attr('transform','translate(0,' + (bar_h-(bar_h/2.5)) + ')' )  

	for (var i=0; i<data.length; i++) { 
		if( i % 5 == 0 ){
       		o_lines.append('line')
			.attr('x1', 0)
			.attr('y1', i * ((height - margin.top - margin.bottom) / (data.length) ))
			.attr('x2', width - margin.top - margin.bottom)
			.attr('y2', i * ((height - margin.top - margin.bottom) / (data.length) )) 
			.attr('class','o_line')
			.attr('stroke',c_line)
			.attr('stroke-width',w_line)
    	}
	}

/* -----------------------
visualize elements
------------------------- */

var article = plot.selectAll('.article')
	.data(data)
	.enter()
	.append('g')
	.attr('class','article')
	.attr("id",function (d,i) {
		return d.article
	})

// lines
/*article.append('line')
	.attr('class','line')
	.attr('x1',function(d,i){
		return (nomargin_w * d.edits_2014 ) / max_edits
	})
	.attr('y1',function(d,i){
		return  (nomargin_h * d.unique_editors_2014) / max_editors
	})
	.attr('x2',function(d,i){
		return (nomargin_w * d.edits_2015) / max_edits 
	})
	.attr('y2',function(d,i){
		return (nomargin_h * d.unique_editors_2015) / max_editors
	})
	.attr('stroke',c_line)
	.attr('stroke-width',1)
*/

// 2015
article.append('circle')
	.attr('cx',function(d,i){
		return (nomargin_w * d.edits_2015) / max_edits
	})
	.attr('cy',function(d,i){
		return (nomargin_h * d.unique_editors_2015) / max_editors
	})
	.attr('r',function(d,i){
		return d.avg_size_2015 / 1000
	})
	.attr('fill','none')
	.attr('stroke','black')


	/*

	// article
	in_link.append('rect')
		.attr('class','issue')
		.attr('x',start_in)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('fill',c_issues)
		.attr('height',bar_h)



/*
	var article = plot.selectAll('.article')
		.data(data)
		.enter()
		.append('g')
		.attr('class','article')
		.attr("id",function (d,i) {
			return d.article_14
		})
		.attr('transform',function(d,i) {
			return 'translate(0,' + (((height-margin.bottom-margin.top) / (data.length) ) * i) + ')' 
		})	

	article.append('text')
        .attr('y', bar_h +bar_h)
        .attr('x', start_id)
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return i + 1
		})
		.attr("font-size",font_size)
		.attr('class','id')

	article.append('text')
        .attr('y', bar_h+ bar_h)
        .attr('x', start_label)
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return d.article
		})
		.attr("font-size",font_size)
		.attr('class','text')

/* --- issues  */
/* ----------  */
/*
var in_link = article.append('g')
		.attr('class','in')

	// article
	in_link.append('rect')
		.attr('class','issue')
		.attr('x',start_in)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('fill',c_issues)
		.attr('height',bar_h)

	// in - benchmark
	in_link.append('line')
		.attr('class','benchmark')
		.attr('x1',function(d,i){
			return start_in + (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_in + (d.issues * (start_icon-start_in-offset) / max_issue )
		})
		.attr('y2',function(d,i){
			return bar_h
		})
		.attr('stroke',c_benchmark)
		.attr('stroke-width',1)

/* --- other features ---  */
/* ----------------------  */


/* -----------------------
icons
------------------------- */
/*
    // icons
	var icons = article.append('g')
		.attr('class','icons')
		.attr('transform','translate(' + start_icon  + ',' + (bar_h*0.5) +')' ) 
	
	// community/review	
	d3.selectAll(".icons").append('g')
		//.attr('transform','translate('+ (-padding*1.5) + ',0)' ) 
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.community === 'true') {
				if (d.review === 'true') {
					return '#comm_rev'
				}
				return '#comm'
			}
			else if (d.review === 'true') {
				return '#rev'
			}
			else {

			}
		})
		.attr("x", 0)
		.attr("y", bar_h-(bar_h/2) )	
    	//.attr('transform','scale(0.2)')
		.attr('transform','scale(' + ((height - margin.top - margin.bottom) / (data.length) / 100)  + ')' )

	// new
	d3.selectAll(".icons").append('g')
		.attr('transform','translate('+ (-padding) + ',0)' ) 
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.new_article === 'true') {
				return '#new'
			}
			else {
			}
		})
		.attr("x", 0)
		.attr("y", bar_h/2)	
		//.attr('transform','scale(0.2)')
		.attr('transform','scale(' + ((height - margin.top - margin.bottom) / (data.length) / 100)  + ')' )

*/

};



