{{#each articles}}
	<div class="left">
		
		{{index}} - 
		<a href="https://en.wikipedia.org/wiki/{{title}}" target="_blank">{{title}}</a>
		<br/>
		
		PR: {{page_rank}}
		<br/>
		
		<!--L: {{languages}}
		<br/>-->
		
		PV (03-2015): {{page_view}}
		<br/>

		MR (PR * PV)/1000: {{myrank}}
		<br/>

		<!--{{#graph}}
			<iframe src="{{graph}}" scrolling="no" name="{{title}} page views"></iframe>
		{{/graph}}
		{{^graph}}
			
		{{/graph}}
		-->

		{{#graph}} <!-- if graph exists -->
			<img src="../graphs/{{graph}}" class="graph"></img>
		{{/graph}}
		{{^graph}}<!-- if not -->
			
		{{/graph}}

		{{i}}

	</div>
{{/each}}


<!--
<script type="text/javascript">
	articles.forEach(function(articles, index) { 
  		articles[index] = { articles: articles, index: index };
	});
</script>
-->



<script>

	function graph() {

		var svg = d3.selectAll('.left')
			.append("svg")
		    .attr("width", 10)
		    .attr("height", 10)
		    .attr("class","blue")

		var data = [54495,375969,34392,1923]

		var group = d3.select('svg')
			.append('g')
			.attr("class","miniblue")
	};

/*
 svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });
*/
</script>


<style type="text/css">
	.left{
		float: left;
		width: 23%;
		height: 180px;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin: 10px 0.3%;
		padding: 5px;
	}
	.red{
		background-color: red;
	}
	.blue{
		background-color: blue;
	}
	iframe{
		border: none;
		width: 100%;
		height: 100px;

	}
	.graph{
		width: 100%;
		height: 100px;
	}

</style>

<!--
<div>
{{#articles}}
	<li>
		{{index}} {{title}} (PR: {{pagerank}})
	</li>
{{/articles}}
</div>
-->