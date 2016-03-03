/* -----------------------
main variables
------------------------- */

var w = window;
width = w.outerWidth,
height = width + (width*0.5)
rectPadding = 10;

var margin = {top: 50, right: 50, bottom: 50, left: 50},
nomargin_w = width - margin ;

var padding = width/100,
offset = padding*1.5,
bar_h = 5;

var start_id = padding,
start_out = padding*10,
start_in = padding*52,
start_icon = padding*70,
start_label = padding*75;

var font_size = '0.6em';

var c_exe = '#35B7BB',
c_benchmark = 'black',
c_line = 'black',
c_tick = '#636362';

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

d3.csv("../../data/20160227/edits_x_editor.csv", loaded);

function loaded (data){

	data.sort(function(a,b) {return a.editsxeditor_2015-b.editsxeditor_2015;});

	console.log(width + ',' + height)
	console.log(data)

	var max = d3.max(data, function(d) { return +d.editsxeditor_2015 ;} );
	console.log(max)

/* -----------------------
set axis
------------------------- */

	/*var x_in = d3.scale.linear()
		.domain([0,107])
        .range([start_in,(start_label-offset) ]);

	var in_Axis = d3.svg.axis()
        .scale(x_in)
        .ticks(5)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
    typeof(in_Axis);*/

	var x_out = d3.scale.linear()
		.domain([0,max])
        .range([(start_in-offset),start_out]);

	var out_Axis = d3.svg.axis()
        .scale(x_out)
        .ticks(5)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
	typeof(out_Axis);

/* -----------------------
visualize grid
------------------------- */

	/*var vl_in = plot.append('g')
		.attr('class','v_lines')
		.call(in_Axis)
	.selectAll('text')
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start")
        .attr('fill',c_tick)
        .attr("font-size",font_size)*/

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

/* --- edits per editor ---  */
/* ------------------------  */

	var out_link = article.append('g')
		.attr('class','out')
	
	// edits per editor
	out_link.append('rect')
		.attr('class','exe')
		.attr('x', function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.editsxeditor_2015) / max ))
		}) 
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.editsxeditor_2015) / max )
		})
		.attr('fill',c_exe) 
		.attr('height',bar_h)

	// out - benchmark
	out_link.append('line')
		.attr('class','benchmark')
		.attr('x1',function(d,i){
			return start_out - 2 + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.editsxeditor_2014) / max ))
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_out - 2 + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.editsxeditor_2014) / max ))
		})
		.attr('y2',function(d,i){
			return bar_h
		})
		.attr('stroke',c_benchmark)
		.attr('stroke-width',1)

/* -----------------------
icons
------------------------- */

    // icons
	var icons = article.append('g')
		.attr('class','icons')
		.attr('transform','translate(' + start_icon  + ',' + (-bar_h*2) +')' ) 
	
	// community/review	
	d3.selectAll(".icons").append('g')
		//.attr('transform','translate('+ (-padding*1.5) + ',0)' ) 
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.community == 'true') {
				if (d.review == 'true') {
					return '#comm_rev'
				}
				return '#comm'
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
		.attr('transform','translate('+ (-padding*1.5) + ',0)' ) 
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.new == 'true') {
				return '#new'
			}
			else {
			}
		})
		.attr("x", 0)
		.attr("y", bar_h/2)	
		//.attr('transform','scale(0.2)')
		.attr('transform','scale(' + ((height - margin.top - margin.bottom) / (data.length) / 100)  + ')' )


};



