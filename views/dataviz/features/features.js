/* -----------------------
main variables
------------------------- */

var w = window;
width = w.outerWidth,
height = width + (width*0.5);

var margin = {top: 50, right: 50, bottom: 50, left: 50},
nomargin_w = width - margin ;

var padding = width/100,
offset = padding*1.5,
bar_h = 5;

var start_id = padding,
start_out = padding*20,
start_in = padding*60,
start_icon = padding*73,
start_label = padding*75;

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

d3.csv("../../data/20160227/features.csv", loaded);

function loaded (data){

	data.sort(function(a,b) {
		
		total_2016 = a.references + a.notes + a.images + a.seeAlso
		total_2015 = a.references_2015 + a.notes_2015 + a.images_2015 + a.seeAlso_2015 
		
		return a.total - b.total;
	});

	console.log(width + ',' + height)
	console.log(data)

	var max_issue = d3.max(data, function(d) { return +d.issues_2015 ;} );
	var max_tot = d3.max(data, function(d) { return +d.total ;} );

/* -----------------------
set axis
------------------------- */

	var x_issue = d3.scale.linear()
		.domain([0,max_issue])
        .range([start_in,(start_icon-offset) ]);

	var in_Axis = d3.svg.axis()
        .scale(x_issue)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
    typeof(in_Axis);

	var x_tot = d3.scale.linear()
		.domain([0,max_tot])
        .range([(start_in-offset),start_out]);

	var out_Axis = d3.svg.axis()
        .scale(x_tot)
        .ticks(10)
        .tickSize(-height + (margin.top*2) )
        .orient('top')
	typeof(out_Axis);

/* -----------------------
visualize grid
------------------------- */

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


	var out_link = article.append('g')
		.attr('class','other')
	
	// references
	out_link.append('rect')
		.attr('class','art')
		.attr('x', function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.references) / max_tot ))
		}) 
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.references) / max_tot )
		})
		.attr('fill',c_reference) 
		.attr('height',bar_h)

	// notes
	out_link.append('rect')
		.attr('class','notes')
		.attr('x', function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.references) / max_tot )) - (((start_in-start_out-offset) * d.notes) / max_tot ) 
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.notes) / max_tot )
		})
		.attr('fill',c_note)
		.attr('height',bar_h)

	// images
	out_link.append('rect')
		.attr('class','images')
		.attr('x',function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.references) / max_tot )) - (((start_in-start_out-offset) * d.notes) / max_tot ) - (((start_in-start_out-offset) * d.images) / max_tot )
		})
		.attr('y', bar_h )
		.attr('width', function(d,i){
			return (((start_in-start_out-offset) * d.images) / max_tot )
		})
		.attr('fill',c_image) 
		.attr('height',bar_h)

	// see also
	out_link.append('rect')
		.attr('class','seeAlso')
		.attr('x',function(d,i){
			return  start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.references) / max_tot )) - (((start_in-start_out-offset) * d.notes) / max_tot )  - (((start_in-start_out-offset) * d.images) / max_tot ) - (((start_in-start_out-offset) * d.seeAlso) / max_tot )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.seeAlso) / max_tot )
		})
		.attr('fill',c_seeAlso) 
		.attr('height',bar_h)
		.attr('height',bar_h)

	// tot - benchmark
	out_link.append('line')
		.attr('class','benchmark')
		.attr('x1',function(d,i){
			return start_out /* - 2*/ + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.total_2015) / max_tot ))
			//return start_out
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_out /* - 2*/ + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.total_2015) / max_tot ))
			//return start_out
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

};



