/* -----------------------
main variables
------------------------- */

var w = window;
	width = w.outerWidth,
	height = width * 1.5;

var margin = {
		top: 50, 
		right: 50, 
		bottom: 50, 
		left: 50
	},
	nomargin_w = width - margin ;

var padding = width/100,
	offset = padding * 1.5,
	bar_h = 8; //5

var article_shift = 13.3;

var translate_out = 120,
	width_out = 300, // 250

	translate_benckmark = 30,
	width_benckmark = width_out / 5,
	
	translate_in = 450,
	width_in = 300,

	start_icon = 750,

	start_id = 0,
	start_label = 960;

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

var dataset = "20170803/in_out_links_2017.csv";

d3.csv("../../assets/data/" + dataset, loaded);
// console.log("links_2015")

function loaded (data){

	data.forEach(function(d) {
		d.id = +d.id;
		d.article = d.article;

		d.page_in = +d.page_in;
		d.user_in = +d.user_in;
		d.portal_in = +d.portal_in;
		d.template_in = +d.template_in;
		d.category_in = +d.category_in;
		d.total_in = +d.total_in;

		d.page_out = +d.page_out;
		d.user_out = +d.user_out;
		d.portal_out = +d.portal_out;
		d.template_out = +d.template_out;
		d.category_out = +d.category_out;
		d.total_out = +d.total_out;
		
		d.RW_by_community = +d.RW_by_community;
		d.RW_by_expert_pdf = +d.RW_by_expert_pdf;
		d.RW_by_expert_pdf_wiki = +d.RW_by_expert_pdf_wiki;
		d.New_article_suggested_by_expert = +d.New_article_suggested_by_expert;
		d.AFC = +d.AFC;
		d.Featured_on_WP_SA_portal = +d.Featured_on_WP_SA_portal;
		d.Rewrite_based_on_expert_review = +d.Rewrite_based_on_expert_review;
		d.WP_Assessment = +d.WP_Assessment;
		d.Bold_reassesment = +d.Bold_reassesment;
		d.Africa_Destubathon = +d.Africa_Destubathon;
		d.Edit_a_thon = +d.Edit_a_thon;

		d.page_in_2015 = +d.page_in_2015;
		d.page_out_2015 = +d.page_out_2015;

		d.in_out = +d.in_out;
  	});

	data.sort(function(a,b) {
		return d3.ascending(b.in_out, a.in_out) || d3.ascending(a.total_in, b.total_in);
	})
	console.log(data)

	var max_in = d3.max(data, function(d) { 
		return d.total_in - d.page_in;
	});
	var max_out = d3.max(data, function(d) { 
		return d.total_out - d.page_out;
	});
	var max_bench = d3.max(data, function(d) { 
		return (d.total_out - d.page_out) - (d.total_out_2015 - d.page_out_2015);
	});
	console.log(max_in, max_out, max_bench)

/* -----------------------
set axis
------------------------- */

	var max_in_domain = 1800,
		max_out_domain = 1800;
		max_bench_domain = 200;

	var x_in = d3.scale.linear()
		.domain([0, max_in_domain])
		.range([0,width_in])

	var in_Axis = d3.svg.axis()
		.scale(x_in)
		.ticks(10)
		// .tickFormat(d3.format(".2s"))
		.tickSize(-height + (margin.top*2) )
		.orient('top')
	typeof(in_Axis);

	var x_out = d3.scale.linear()
		.domain([0,max_in_domain])
		.range([0,width_out]);

	var out_Axis = d3.svg.axis()
		.scale(x_out)
		.ticks(10)
		.tickSize(-height + (margin.top*2) )
		.orient('top')

	var x_out_reverse = d3.scale.linear()
		.domain([0,max_out_domain])
		.range([width_out,0]);
	var out_Axis_reverse = d3.svg.axis()
		.scale(x_out_reverse)
		.ticks(10)
		.tickSize(-height + (margin.top*2) )
		.orient('top')
	typeof(out_Axis_reverse);

	var x_ben = d3.scale.linear()
		.domain([- max_bench_domain, + max_bench_domain])
		.range([0,width_benckmark]);

	var x_ben_Axis = d3.svg.axis()
		.scale(x_ben)
		.ticks(8)
		.tickSize(-height + (margin.top*2) )
		.orient('top')
	typeof(out_Axis);

// visualize grid

	var vl_in = plot.append('g')
		.attr("transform","translate(" + translate_in + ",0)")
		.attr('class','v_lines')
		.call(in_Axis)
		.selectAll('text')
			.attr("transform", "rotate(90)")
			.style("text-anchor", "start")
			.attr('fill',c_tick)
			.attr("font-size",font_size)

	var vl_out = plot.append('g')
		.attr("transform","translate(" + translate_out + ",0)")
		.attr('class','v_lines')
		.call(out_Axis_reverse)
		.selectAll('text')
			.attr("transform", "rotate(90)")
			.style("text-anchor", "start")
			.attr('fill',c_tick)
			.attr("font-size",font_size)

	var vl_ben = plot.append('g')
		.attr("transform","translate(" + translate_benckmark + ",0)")
		.attr('class','v_lines')
		.call(x_ben_Axis)
		.selectAll('text')
			.attr("transform", "rotate(90)")
			.style("text-anchor", "start")
			.attr('fill',c_tick)
			.attr("font-size",font_size)

	// o_lines
	var o_lines = plot.append('g')
		.attr('class','o_lines')
		.attr('transform','translate(0,' + article_shift/2  + ')')  

	for (var i=0; i<data.length; i++) { 
		if( i % 5 == 0 ){
	   		o_lines.append('line')
			.attr('x1', 0)
			.attr('y1', i * article_shift) //((height - margin.top - margin.bottom) / (data.length) ))
			.attr('x2', width - margin.top - margin.bottom)
			.attr('y2', i * article_shift) //((height - margin.top - margin.bottom) / (data.length) )) 
			.attr('class','o_line')
			.attr('stroke',c_line)
			.attr('stroke-width',w_line)
		}
	}

// visualize elements

	var article = plot.selectAll('.article')
		.data(data)
		.enter()
		.append('g')
		.attr('class','article')
		.attr("id",function (d,i) {
			return d.article
		})
		.attr('transform',function(d,i) {
			return "translate(0," + (i * article_shift) + ")";
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
			return d.article.replace(/_/g," ")
		})
		.attr("font-size",font_size)
		.attr('class','text')

// in

	var in_link = article.append('g')
		.attr('class', function (d){
			return 'in ' + d.total_in
		})
		.attr("transform","translate(" + translate_in + ",0)")

	// article
	/*in_link.append('rect')
		.attr('class', function (d){
			return 'page ' + d.page_in
		})
		.attr('x',0)
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return x_in(d.total_in)
		})
		.attr('fill',c_page)
		.attr('height',bar_h)*/

	// user
	in_link.append('rect')
		.attr('class', function (d){
			return 'user ' + d.user_in
		})
		.attr('x', function(d,i){
			return 0
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return x_in(d.user_in)
		})
		.attr('fill',c_user)
		.attr('height',bar_h)

	// category
	in_link.append('rect')
		.attr('class', function (d){
			return 'category ' + d.category_in
		})
		.attr('x',function(d,i){
			return x_in(d.user_in)
		})
		.attr('y', bar_h )
		.attr('width',function(d,i){
			return x_in(d.category_in)
			
		})
		.attr('fill',c_category)
		.attr('height',bar_h)

	// template
	in_link.append('rect')
		.attr('class', function (d){
			return 'template ' + d.template_in
		})
		.attr('x',function(d,i){
			return x_in(d.user_in + d.category_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			if (d.template_in != 0){
				return x_in(d.template_in)
			}
			else {
				return 0
			}
		})
		.attr('fill',c_template)
		.attr('height',bar_h)


	// portal
	in_link.append('rect')
		.attr('class', function (d){
			return 'portal ' + d.portal_in
		})
		.attr("x", function(d,i){
			return x_in(d.user_in + d.category_in + d.template_in)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return x_in(d.portal_in)
		})
		.attr('fill',c_portal)
		.attr('height',bar_h)

// out 

	var out_link = article.append('g')
		.attr('class', function(d,i){
			return 'out ' + d.total_out
		})
		.attr("transform","translate(" + (translate_out + width_out) + ",0)") 
	
	// article
	/*out_link.append('rect')
		.attr('class', function (d,i){
			return 'art ' + d.page_out
		})
		.attr('x', function (d,i){
			return 0 - x_out(d.page_out)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return x_out(d.page_out)
		})
		.attr('fill',c_page) 
		.attr('height',bar_h)*/

	// user
	out_link.append('rect')
		.attr('class', function (d,i){
			return 'user ' + d.user_out
		})
		.attr('x', function(d,i){
			return 0
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return x_out(d.user_out)
		})
		.attr('fill',c_user)
		.attr('height',bar_h)

	// category
	out_link.append('rect')
		.attr('class', function (d,i){
			return 'category ' + d.category_out
		})
		.attr('x',function(d,i){
			return 0 - x_out(d.category_out)		
		})
		.attr('y', bar_h )
		.attr('width', function(d,i){
			return x_out(d.category_out)
		})
		.attr('fill',c_category) 
		.attr('height',bar_h)


	// template
	out_link.append('rect')
		.attr('class', function (d,i){
			return 'template ' + d.template_out
		})
		.attr('x',function(d,i){
			return 0 - x_out(d.category_out + d.template_out)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return x_out(d.template_out)
		})
		.attr('fill',c_template) 
		.attr('height',bar_h)

	// portal
	out_link.append('rect')
		.attr('class', function (d,i){
			return 'portal ' + d.portal_out
		})
		.attr('x', function(d,i){
			return 0 - x_out(d.category_out + d.template_out + d.portal_out)
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			return x_out(d.portal_out)
		})
		.attr('fill',c_portal) 
		.attr('height',bar_h)
		
// icons

	var icon_scale = 0.12;
	var icon_space = 15;
	var roate = "90";

	// icons
	var icons = article.append('g')
		//.attr('transform','scale(0.2)')
		.attr('class','icons')
		.attr('transform','translate(' + start_icon  + ',' + 0 +')' )  // bar_hx
	
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

// benchmark

	var benchmark = article.append('g')
		.attr('class', function(d,i){
			return 'benckmark '
		})
		.attr("transform","translate(" + (translate_benckmark) + ",0)") 

	benchmark.append('rect')
		.attr('class', function (d,i){
			var b = (d.total_out - d.page_out) - (d.total_out_2015 - d.page_out_2015);
			return 'bench ' + b
		})
		.attr('x', function (d,i){
			var b = (d.total_out - d.page_out) - (d.total_out_2015 - d.page_out_2015);

			if (b < 0){
				return x_ben(b)
			}
			else {
				return x_ben(0)
			}
		})
		.attr('y',bar_h )
		.attr('width',function(d,i){
			var b = (d.total_out - d.page_out) - (d.total_out_2015 - d.page_out_2015);
			return Math.abs(x_ben(0) - x_ben(b));
		})
		.attr('fill',function(d){
			var b = (d.total_out - d.page_out) - (d.total_out_2015 - d.page_out_2015);
			if (b>0){
				return "black"
			}
			else{
				return "white" // #b5b4b4
			}
		}) 
		.attr('stroke',function(d){
			var b = (d.total_out - d.page_out) - (d.total_out_2015 - d.page_out_2015);
			if (b>0){
				return "none"
			}
			else{
				return "black"
			}
		}) 
		.attr('height',bar_h)

};



