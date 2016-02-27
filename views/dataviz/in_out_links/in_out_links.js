/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth; 
var height = 4000;
var rectPadding = 10;

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var nomargin_w = width - margin ;

var padding = 10;
var bar_h = 8;

var set_out = 6
var set_in = 4

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

d3.csv("../../data/20160227/in_out_links.csv", loaded); // in_out_links

function loaded (data){

	data.sort(function(a,b) {return b.total_in-a.total_in;});

	console.log(width + ',' + height)
	console.log(data)

/* -----------------------
visualization
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
			return 'translate(0,' + (((height-margin.bottom-margin.top) / (data.length) ) * i) + ')' // (i*padding)
		})		

	article.append('text')
        .attr('y', bar_h +bar_h)
        .attr('x', (padding*1))
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return i + 1
		})
		.attr('class','id')

	article.append('text')
        .attr('y', bar_h+ bar_h)
        .attr('x', (padding*5))
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return d.article
		})
		.attr('class','text')

/* --- in ---  */
/* ----------  */

	article.append('rect')
		.attr('class','in')
		.attr('x',function(d,i){
			return (padding*50) - (d.total_in/4)
		})
		.attr('y', bar_h )
		.attr('width',function(d,i){
			return (d.total_in/set_in)
		})
		.attr('height',bar_h)

	// article
	article.append('rect')
		.attr('class','art')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.page_in/set_in)
		})
		.attr('height',bar_h)

	// user
	article.append('rect')
		.attr('class','user')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in) - (d.user_in/set_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.user_in/set_in)
		})
		.attr('height',bar_h)

	// portal
	article.append('rect')
		.attr('class','portal')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in) - (d.user_in/set_in)  - (d.portal_in/set_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.portal_in/set_in)
		})
		.attr('height',bar_h)

	// template
	article.append('rect')
		.attr('class','template')
		.attr('x',function(d,i){
			return (padding*50) - (d.page_in/set_in) - (d.user_in/set_in)  - (d.portal_in/set_in) - (d.template_in/set_in)
		})
		.attr('y', bar_h)
		.attr('width',function(d,i){
			return (d.template_in/set_in)
		})
		.attr('height',bar_h)

	// benchmark
	article.append('rect')
		.attr('class','benchmark')
		.attr('x',function(d,i){
			return (padding*50) - d.total_in_2015/set_in
		})
		.attr('y',bar_h )
		.attr('width',2)
		.attr('height',bar_h)

/* --- out ---  */
/* ----------  */

	article.append('rect')
		.attr('class','out')
		.attr('x',(padding*52))
		.attr('y', bar_h )
		.attr('width',function(d,i){
			return (d.total_out/set_out)
		})
		.attr('height',bar_h)
		.attr('fill','black')

	// article
	article.append('rect')
		.attr('class','art')
		.attr('x',(padding*52))
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.page_out/set_out)
		})
		.attr('height',bar_h)

	// user
	article.append('rect')
		.attr('class','user')
		.attr('x', function(d,i){
			return (d.user_out/set_out) + (padding*52)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.user_out/set_out)
		})
		.attr('height',bar_h)

	// portal
	article.append('rect')
		.attr('class','portal')
		.attr('x', function(d,i){
			return ((d.page_out/set_out) + (d.user_out/set_out) + (padding*52))
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.portal_out/set_out)
		})
		.attr('height',bar_h)

	// template
	article.append('rect')
		.attr('class','template')
		.attr('x', function(d,i){
			return ((d.portal_out/set_out) + (d.page_out/set_out) + (d.user_out/set_out) + (padding*52))
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.template_out/set_out)
		})
		.attr('height',bar_h)

	// out - benchmark
	article.append('rect')
		.attr('class','out')
		.attr('x',function(d,i){
			return (d.total_out_2015/set_out + (padding*52))
		})
		.attr('y',bar_h )
		.attr('width',2)
		.attr('height',bar_h)
		.attr('fill','red')

/* --- lines   */
/* ----------  */
	
	var lines = plot.append('g')
		.attr('class','lines')
		.attr('transform','translate(0,-10)')

	for (var i=0; i<data.length; i++) {
		lines.append('line')
		.attr('x1', 0)
		.attr('y1', i * ((height - margin.top - margin.bottom) / (data.length) ) + bar_h)
		.attr('x2', width - margin.top - margin.bottom)
		.attr('y2', i * ((height - margin.top - margin.bottom) / (data.length) ) + bar_h)
		.attr('class',function(d,i){
			if ((i/5) != 0 ) {
				return	'red'
			} 
			else{
				return 'line'
			}
		})
	}
};



