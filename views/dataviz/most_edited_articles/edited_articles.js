/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth; 
var height = 1700;
var rectPadding = 10;

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var nomargin_w = width - margin ;

var padding = 10;

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

d3.csv("../../data/edited_articles_15.csv", loaded); //edited_articles_15   edited_articles_14

function loaded (data){

	data.sort(function(a,b) {return b.edits-a.edits;});

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
			console.log(d.lenght)
		})
		.attr('transform',function(d,i) {
			return 'translate(0,' + (((height-margin.bottom-margin.top) / (data.length) ) * i) + ')' // (i*padding)
		})		

	article.append('text')
        .attr('y', 0)
        .attr('x', (padding*1))
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return i + 1
		})
		.attr('class','id')

	article.append('circle')
		.attr('class','bubble')
		.attr('cx',(padding*6))
		.attr('cy',0)
		.attr('r',function(d,i){
			return d.avg_size/50000
		})

	article.append('text')
        .attr('y', 0)
        .attr('x', (padding*10))
        .attr('dy', '.20em')
        .attr('dx', '.20em')
		.text(function (d,i){
			return d.article
		})
		.attr('class','text')

	article.append('rect')
        .attr('y', -2)
        .attr('x', (padding*45))
        .attr('width',function(d,i){
        	return d.edits * 20
        })
        .attr('height', 4)



};



