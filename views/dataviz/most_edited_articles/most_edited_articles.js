/* -----------------------
main variables
------------------------- */

var w = window;

var width = w.outerWidth; 
height = width + (width*0.5);

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var nomargin_w = width - margin ;

var padding = width/100,
offset = padding*1.5,
bar_h = 6;

var font_size = '0.6em';

var start_id = padding,
start_bubble = padding*5,
start_icon = padding*12,
start_label = padding*14,
start_bar = padding*38;

var c_bubble = '#35B7BB',
c_bar = 'black', // 5CB44E
c_line = 'black';

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

d3.csv("../../data/20160227/edited_articles_15.csv", loaded); //edited_articles_15   edited_articles_14

function loaded (data){

	data.sort(function(a,b) {return b.edits-a.edits;});

	console.log(width + ',' + height)
	console.log(data)

/* -----------------------
visualize grid
------------------------- */

	// o_lines
	var o_lines = plot.append('g')
		.attr('class','o_lines')
		.attr('transform','translate(0,' + (-bar_h*2) +  ')' )  

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
			console.log(d.lenght)
		})
		.attr('transform',function(d,i) {
			return 'translate(0,' + (((height-margin.bottom-margin.top) / (data.length) ) * i) + ')' // (i*padding)
		})		

	// index
	article.append('text')
        .attr('y', 0)
        .attr('x', start_id)
		.attr("font-size",font_size)
		.text(function (d,i){
			return i + 1
		})
		.attr('class','id')

	// size
	article.append('circle')
		.attr('class','bubble')
		.attr('cx',start_bubble)
		.attr('cy',0)
		.attr('r',function(d,i){
			return d.avg_size/40000
		})
		.attr('fill',c_bubble)

    // icons
	var icons = article.append('g')
		.attr('class','icons')
		.attr('transform','translate(' + start_icon  + ',' + (-bar_h*2) +')' ) 
	
	// community/review	
	d3.selectAll(".icons").append("svg:image")
		.attr("xlink:href", function(d,i) {
			if (d.community == 'true') {
				if (d.review == 'true') {
					return "../../lib/img/comm-rew.svg"
				}
				return "../../lib/img/comm.svg"
			}
			else {
			}
		})
		.attr("x", 0)
		.attr("y", bar_h/2)	
    	.attr("width", padding*1)
	    .attr("height", padding*1)

	// new
	d3.selectAll(".icons").append("svg:image")
		.attr("xlink:href", function(d,i) {
			if (d.new_art == 'true') {
				return "../../lib/img/new.svg"
			}
			else {
			}
		})
		.attr("x", 0)
		.attr("y", bar_h/2)	
    	.attr("width", padding*1)
	    .attr("height", padding*1)
	    .attr('transform','translate('+ (-padding*1.5) + ',0)' ) 

	// label
	article.append('text')
        .attr('y', 0)
        .attr('x', start_label)
		.text(function (d,i){
			return d.article
		})
		.attr('class','text')
		.attr("font-size",font_size)

	// edits
	article.append('rect')
        .attr('y', (-bar_h*1.2) )
        .attr('x', start_bar)
        .attr('width',function(d,i){
        	return d.edits * 20
        })
        .attr('height', bar_h)
        .attr('fill',c_bar)

};



