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
start_label = padding*75;

var font_size = '0.6em';

var /*
c_user = '#EC4C4E',
c_category = '#5CB44E';
c_template = '#EC9144',
c_portal = '#AD72C0',*/
c_exe = '#35B7BB',
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
        .ticks(10)
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

/* --- in ---  */
/* ----------  */

/*var in_link = article.append('g')
		.attr('class','in')

	// user
	in_link.append('rect')
		.attr('class','user')
		.attr('x',start_in)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.user_in * (start_label-start_in-offset) / max_in )
		})
		.attr('fill',c_user)
		.attr('height',bar_h)

	// category
	in_link.append('rect')
		.attr('class','category')
		.attr('x', function(d,i){
			return start_in + (d.user_in * (start_label-start_in-offset) / max_in )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.category_in * (start_label-start_in-offset) / max_in )
		})
		.attr('fill',c_category)
		.attr('height',bar_h)

	// template
	in_link.append('rect')
		.attr('class','template')
		.attr('x',function(d,i){
			return start_in + ((d.user_in) * (start_label-start_in-offset) / max_in ) + ((d.category_in) * (start_label-start_in-offset) / max_in )
		})
		.attr('y', bar_h )
		.attr('width',function(d,i){
			return (d.template_in * (start_label-start_in-offset) / max_in)
		})
		.attr('fill',c_template)
		.attr('height',bar_h)

	// portal
	in_link.append('rect')
		.attr('class','template')
		.attr('x',function(d,i){
			return start_in + ((d.user_in) * (start_label-start_in-offset) / max_in ) + ((d.category_in) * (start_label-start_in-offset) / max_in ) + ((d.template_in) * (start_label-start_in-offset) / max_in )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.portal_in * (start_label-start_in-offset) / max_in )
		})
		.attr('fill',c_portal)
		.attr('height',bar_h)

	// portal
	/*in_link.append('rect')
		.attr('class','portal')
		.attr('x', function(d,i){
			return start_in + ((d.page_in) * (start_label-start_in-offset) / max_in ) + ((d.user_in) * (start_label-start_in-offset) / max_in ) + ((d.category_in) * (start_label-start_in-offset) / max_in ) + (d.template_in * (start_label-start_in-offset) / max_in )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.portal_in * (start_label-start_in-offset) / max_in )
		})
		.attr('fill',c_portal)
		.attr('height',bar_h)
	*/

	// in - benchmark
	/*in_link.append('line')
		.attr('class','benchmark')
		.attr('x1',function(d,i){
			return start_in + (d.total_in_2015 * (start_label-start_in-offset) / max_in )
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_in + (d.total_in_2015 * (start_label-start_in-offset) / max_in )
		})
		.attr('y2',function(d,i){
			return bar_h
		})
		.attr('stroke',c_benchmark)
		.attr('stroke-width',1)
	*/

/* --- out ---  */
/* ----------  */

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
			return start_out - 2 + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.total_out_2015) / ms ))
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_out - 2 + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.total_out_2015) / max_out ))
		})
		.attr('y2',function(d,i){
			return bar_h
		})
		.attr('stroke',c_benchmark)
		.attr('stroke-width',1)

};



