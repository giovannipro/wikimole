/* -----------------------
main variables
------------------------- */

var w = window;
	width = w.outerWidth,
	height = width - (width * 0.01); // 0.5

var margin = {
		top: 50, 
		right: 50, 
		bottom: 50, 
		left: 50
	},
	nomargin_w = width - margin ;

var padding = width/100,
offset = padding*1.5,
bar_h = 8; //5

var start_id = padding,
start_out = padding * 10,
start_in = padding * 45,
start_icon = padding * 55,
start_label = padding * 75;

var font_size = '0.8em';

var c_page = '#35B7BB',
c_user = '#EC4C4E',
c_category = '#5CB44E';
c_template = '#EC9144',
c_portal = '#AD72C0',
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

var dataset = "20170803/links_2015.csv";

d3.csv("../../data/" + dataset, loaded); // 20160227/in_out_links
console.log("links_2015")

function loaded (data){

	data.sort(function(a,b) {return a.total_in-b.total_in;});

	console.log(width + ',' + height)
	console.log(data)

	var max_in = d3.max(data, function(d) { return +d.total_in;} );
	var max_out = d3.max(data, function(d) { return +d.total_out;} );

/* -----------------------
set axis
------------------------- */

	var x_in = d3.scale.linear()
		.domain([0,max_in])
		.range([start_in,(start_icon-offset) ]);

	var in_Axis = d3.svg.axis()
		.scale(x_in)
		.ticks(5)
		.tickSize(-height + (margin.top*2) )
		.orient('top')
	typeof(in_Axis);

	var x_out = d3.scale.linear()
		.domain([0,max_out])
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

/* --- in ---  */
/* ----------  */

var in_link = article.append('g')
		.attr('class','in')

	// article
	in_link.append('rect')
		.attr('class','page')
		.attr('x',start_in)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.page_in * (start_icon-start_in-offset) / max_in )
		})
		.attr('fill',c_page)
		.attr('height',bar_h)

	// user
	in_link.append('rect')
		.attr('class','user')
		.attr('x', function(d,i){
			return start_in + (d.page_in * (start_icon-start_in-offset) / max_in )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.user_in * (start_icon-start_in-offset) / max_in )
		})
		.attr('fill',c_user)
		.attr('height',bar_h)

	// category
	in_link.append('rect')
		.attr('class','category')
		.attr('x',function(d,i){
			return start_in + ((d.page_in) * (start_icon-start_in-offset) / max_in ) + ((d.user_in) * (start_icon-start_in-offset) / max_in )
		})
		.attr('y', bar_h )
		.attr('width',function(d,i){
			return (d.category_in * (start_icon-start_in-offset) / max_in)
		})
		.attr('fill',c_category)
		.attr('height',bar_h)

	// template
	in_link.append('rect')
		.attr('class','template')
		.attr('x',function(d,i){
			return start_in + ((d.page_in) * (start_icon-start_in-offset) / max_in ) + ((d.user_in) * (start_icon-start_in-offset) / max_in ) + ((d.category_in) * (start_icon-start_in-offset) / max_in )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.template_in * (start_icon-start_in-offset) / max_in )
		})
		.attr('fill',c_template)
		.attr('height',bar_h)

	// portal
	in_link.append('rect')
		.attr('class','portal')
		.attr('x', function(d,i){
			return start_in + ((d.page_in) * (start_icon-start_in-offset) / max_in ) + ((d.user_in) * (start_icon-start_in-offset) / max_in ) + ((d.category_in) * (start_icon-start_in-offset) / max_in ) + (d.template_in * (start_icon-start_in-offset) / max_in )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (d.portal_in * (start_icon-start_in-offset) / max_in )
		})
		.attr('fill',c_portal)
		.attr('height',bar_h)

	// in - benchmark
	/*in_link.append('line')
		.attr('class','benchmark')
		.attr('x1',function(d,i){
			return start_in + (d.total_in_2015 * (start_icon-start_in-offset) / max_in )
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_in + (d.total_in_2015 * (start_icon-start_in-offset) / max_in )
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
	
	// article
	out_link.append('rect')
		.attr('class','art')
		.attr('x', function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.page_out) / max_out ))
		}) 
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.page_out) / max_out )
		})
		.attr('fill',c_page) 
		.attr('height',bar_h)

	// user
	out_link.append('rect')
		.attr('class','user')
		.attr('x', function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.page_out) / max_out )) - (((start_in-start_out-offset) * d.user_out) / max_out ) 
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.user_out) / max_out )
		})
		.attr('fill',c_user)
		.attr('height',bar_h)

	// category
	out_link.append('rect')
		.attr('class','category')
		.attr('x',function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.page_out) / max_out )) - (((start_in-start_out-offset) * d.user_out) / max_out ) - (((start_in-start_out-offset) * d.category_out) / max_out )
		})
		.attr('y', bar_h )
		.attr('width', function(d,i){
			return (((start_in-start_out-offset) * d.category_out) / max_out )
		})
		.attr('fill',c_category) 
		.attr('height',bar_h)

	// template
	out_link.append('rect')
		.attr('class','template')
		.attr('x',function(d,i){
			return  start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.page_out) / max_out )) - (((start_in-start_out-offset) * d.user_out) / max_out )  - (((start_in-start_out-offset) * d.category_out) / max_out ) - (((start_in-start_out-offset) * d.template_out) / max_out )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.template_out) / max_out )
		})
		.attr('fill',c_template) 
		.attr('height',bar_h)

	// portal
	out_link.append('rect')
		.attr('class','portal')
		.attr('x', function(d,i){
			return  start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.page_out) / max_out )) - (((start_in-start_out-offset) * d.user_out) / max_out )  - (((start_in-start_out-offset) * d.category_out) / max_out ) - (((start_in-start_out-offset) * d.template_out) / max_out ) - (((start_in-start_out-offset) * d.portal_out) / max_out )
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return (((start_in-start_out-offset) * d.portal_out) / max_out )
		})
		.attr('fill',c_portal) 
		.attr('height',bar_h)

	// out - benchmark
	/*out_link.append('line')
		.attr('class','benchmark')
		.attr('x1',function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.total_out_2015) / max_out ))
		})
		.attr('y1',function(d,i){
			return bar_h+(bar_h)
		})
		.attr('x2',function(d,i){
			return start_out + ( (start_in-start_out-offset) - (((start_in-start_out-offset) * d.total_out_2015) / max_out ))
		})
		.attr('y2',function(d,i){
			return bar_h
		})
		.attr('stroke',c_benchmark)
		.attr('stroke-width',1)
		*/

/* -----------------------
icons
------------------------- */

	var icon_scale = 0.12;
	var icon_space = 15;
	var roate = "90";

	// icons
	var icons = article.append('g')
		//.attr('transform','scale(0.2)')
		.attr('transform','translate(' + start_icon  + ',' + 0 +')' )  // bar_hx
		.attr('class','icons')
		
	// 1 RW_by_community
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.RW_by_community == 1)   { 
				return 'translate('+ (icon_space*2) + ',' + bar_h +')'
			}
		})
		.attr('class', function (d,i){
			if (d.RW_by_community == 1)   { 
				return "RW_by_community"
			}
		})	
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.RW_by_community == 1) { // (1 == 1)
				return '#RW_by_community'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 2 RW_by_expert_pdf
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.RW_by_expert_pdf == 1)   { 
				return 'translate('+ (icon_space*3) + ',' + bar_h +')'
			}
		})
		.attr('class', function (d,i){
			if (d.RW_by_expert_pdf == 1)   { 
				return "RW_by_expert_pdf"
			}
		})
		.append('g')
		.attr('transform','rotate(90)')
		.append("use")
		.attr("xlink:href", function(d,i) {
			if (d.RW_by_expert_pdf == 1) {
				return '#RW_by_expert_pdf'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 3 RW_by_expert_pdf_wiki
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.RW_by_expert_pdf_wiki == 1){ 
				return 'translate('+ (icon_space*4) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.RW_by_expert_pdf_wiki == 1)   { 
				return "RW_by_expert_pdf_wiki"
			}
		})
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.RW_by_expert_pdf_wiki == 1) { // (1 == 1)
				return '#RW_by_expert_pdf_wiki'
			}
		})	
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 4 New_article_suggested_by_expert
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.New_article_suggested_by_expert == 1){ 
				return 'translate('+ (icon_space*5) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.New_article_suggested_by_expert == 1)   { 
				return "New_article_suggested_by_expert"
			}
		})
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.New_article_suggested_by_expert == 1) { // (1 == 1)
				return '#New_article_suggested_by_expert'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 5 AFC
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.AFC == 1){ 
				return 'translate('+ (icon_space*6) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.AFC == 1)   { 
				return "AFC"
			}
		})	
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.AFC == 1) { // (1 == 1)
				return '#AFC'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 6 Featured_on_WP_SA_portal
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.Featured_on_WP_SA_portal == 1){ 
				return 'translate('+ (icon_space*7) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.Featured_on_WP_SA_portal == 1)   { 
				return "Featured_on_WP_SA_portal"
			}
		})	
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.Featured_on_WP_SA_portal == 1) { // (1 == 1)
				return '#Featured_on_WP_SA_portal'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 7 Rewrite_based_on_expert_review
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.Rewrite_based_on_expert_review == 1){ 
				return 'translate('+ (icon_space*8) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.Rewrite_based_on_expert_review == 1)   { 
				return "Rewrite_based_on_expert_review"
			}
		})	
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.Rewrite_based_on_expert_review == 1) { // (1 == 1)
				return '#Rewrite_based_on_expert_review'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 8 WP_Assessment
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.WP_Assessment == 1){ 
				return 'translate('+ (icon_space*9) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.WP_Assessment == 1)   { 
				return "WP_Assessment"
			}
		})	
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.WP_Assessment == 1) { // (1 == 1)
				return '#WP_Assessment'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 9 Bold_reassesment
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.Bold_reassesment == 1){ 
				return 'translate('+ (icon_space*10) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.Bold_reassesment == 1)   { 
				return "Bold_reassesment"
			}
		})
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.Bold_reassesment == 1) { // (1 == 1)
				return '#Bold_reassesment'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 10 Africa_Destubathon
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.Africa_Destubathon == 1){ 
				return 'translate('+ (icon_space*11) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.Africa_Destubathon == 1)   { 
				return "Africa_Destubathon"
			}
		})	
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.Africa_Destubathon == 1) { // (1 == 1)
				return '#Africa_Destubathon'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

	// 12 Edit_a_thon
	d3.selectAll(".icons").append('g')
		.attr('transform', function (d,i){
			if (d.Edit_a_thon == 1){ 
				return 'translate('+ (icon_space*12) + ',' + bar_h + ')' 
			}
		})
		.attr('class', function (d,i){
			if (d.Edit_a_thon == 1)   { 
				return "Edit_a_thon"
			}
		})	
		.append('g')
		.attr('transform','rotate(90)')	
		.append("use")
		.attr("xlink:href", function(d,i) {
			if  (d.Edit_a_thon == 1) { // (1 == 1)
				return '#Edit_a_thon'
			}
		})
		.attr("x", 0)
		.attr("y", 45) // bar_h-(bar_h/2)
		.attr('transform','scale(' + icon_scale + ')')

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



