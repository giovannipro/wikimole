
    
    /*
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 1200 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        console.log(margin)

         /*
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .10);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        d3.json("../data/articles_features.json", function(data) {
           // x.domain(data.map(function(d) { return d.letter; }));
            //y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

            console.log(data)
        })*/





var w = 500,
h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['!Kung people']; //'Smartphone','Tablet'

//Data
var d = [
          [
            {axis:"Email",value:0.59},
            {axis:"Social Networks",value:0.56},
            {axis:"Internet Banking",value:0.42},
            {axis:"News Sportsites",value:0.34},
            {axis:"Search Engine",value:0.48},
            {axis:"View Shopping sites",value:0.14},
            {axis:"Paying Online",value:0.11},
            {axis:"Buy Online",value:0.05},
            {axis:"Stream Music",value:0.07},
            {axis:"Online Gaming",value:0.12},
            {axis:"Navigation",value:0.27},
            {axis:"App connected to TV program",value:0.03},
            {axis:"Offline Gaming",value:0.12},
            {axis:"Photo Video",value:0.4},
            {axis:"Reading",value:0.03},
            {axis:"Listen Music",value:0.22},
            {axis:"Watch TV",value:0.03},
            {axis:"TV Movies Streaming",value:0.03},
            {axis:"Listen Radio",value:0.07},
            {axis:"Sending Money",value:0.18},
            {axis:"Other",value:0.07},
            {axis:"Use less Once week",value:0.08}
          ],[
            {axis:"Email",value:0.48},
            {axis:"Social Networks",value:0.41},
            {axis:"Internet Banking",value:0.27},
            {axis:"News Sportsites",value:0.28},
            {axis:"Search Engine",value:0.46},
            {axis:"View Shopping sites",value:0.29},
            {axis:"Paying Online",value:0.11},
            {axis:"Buy Online",value:0.14},
            {axis:"Stream Music",value:0.05},
            {axis:"Online Gaming",value:0.19},
            {axis:"Navigation",value:0.14},
            {axis:"App connected to TV program",value:0.06},
            {axis:"Offline Gaming",value:0.24},
            {axis:"Photo Video",value:0.17},
            {axis:"Reading",value:0.15},
            {axis:"Listen Music",value:0.12},
            {axis:"Watch TV",value:0.1},
            {axis:"TV Movies Streaming",value:0.14},
            {axis:"Listen Radio",value:0.06},
            {axis:"Sending Money",value:0.16},
            {axis:"Other",value:0.07},
            {axis:"Use less Once week",value:0.17}
          ]
        ];

var x = [
    [
        {axis:"notes",value:5},
        {axis:"issues",value:1},
        {axis:"references",value:2}, //15
        {axis:"seeAlso",value:2},
        {axis:"images",value:0.3}
    ]
]

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", x); // d, mycfg

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
    .selectAll('svg')
    .append('svg')
    .attr("width", w+300)
    .attr("height", h)

//Create the title for the legend
var text = svg.append("text")
    .attr("class", "title")
    .attr('transform', 'translate(90,0)') 
    .attr("x", w - 70)
    .attr("y", 10)
    .attr("font-size", "12px")
    .attr("fill", "#404040")
    .text("What % of owners use a specific service in a week");
        
//Initiate Legend   
var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(90,20)') 
    ;
    //Create colour squares
    legend.selectAll('rect')
      .data(LegendOptions)
      .enter()
      .append("rect")
      .attr("x", w - 65)
      .attr("y", function(d, i){ return i * 20;})
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d, i){ return colorscale(i);})
      ;
    //Create text next to squares
    legend.selectAll('text')
      .data(LegendOptions)
      .enter()
      .append("text")
      .attr("x", w - 52)
      .attr("y", function(d, i){ return i * 20 + 9;})
      .attr("font-size", "11px")
      .attr("fill", "#737373")
      .text(function(d) { return d; })
      ; 




        

          /*

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          /*svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Frequency");

          svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.letter); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.frequency); })
              .attr("height", function(d) { return height - y(d.frequency); });

            console.log(d.frequency) 
        });

        function type(d) {
          d.frequency = +d.frequency;
          return d;
        }*/