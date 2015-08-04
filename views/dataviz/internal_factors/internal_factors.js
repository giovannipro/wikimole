
    
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
var LegendOptions = ['Smartphone','Tablet'];

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

var x = {
  "articles": [
    {
      "article": "!Kung people",
      "notes": 0,
      "issues": 1,
      "references": 15,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Acid",
      "notes": 0,
      "issues": 1,
      "references": 3,
      "seeAlso": 0,
      "images": 6
    },
    {
      "article": "Africa Day",
      "notes": 0,
      "issues": 0,
      "references": 3,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "African music",
      "notes": 0,
      "issues": 0,
      "references": 15,
      "seeAlso": 0,
      "images": 8
    },
    {
      "article": "Agriculture in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 16,
      "seeAlso": 3,
      "images": 5
    },
    {
      "article": "AIDS orphan",
      "notes": 0,
      "issues": 0,
      "references": 5,
      "seeAlso": 1,
      "images": 1
    },
    {
      "article": "Alcohol abuse",
      "notes": 0,
      "issues": 0,
      "references": 66,
      "seeAlso": 2,
      "images": 4
    },
    {
      "article": "Alcohol dependence",
      "notes": 12,
      "issues": 0,
      "references": 12,
      "seeAlso": 5,
      "images": 1
    },
    {
      "article": "Alcoholism",
      "notes": 0,
      "issues": 0,
      "references": 175,
      "seeAlso": 8,
      "images": 8
    },
    {
      "article": "Aloe",
      "notes": 0,
      "issues": 1,
      "references": 18,
      "seeAlso": 3,
      "images": 21
    },
    {
      "article": "Aloe vera",
      "notes": 0,
      "issues": 0,
      "references": 63,
      "seeAlso": 4,
      "images": 5
    },
    {
      "article": "Animal husbandry",
      "notes": 0,
      "issues": 1,
      "references": 4,
      "seeAlso": 14,
      "images": 1
    },
    {
      "article": "Animal husbandry in South Africa",
      "notes": 0,
      "issues": 2,
      "references": 4,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Animal-powered transport",
      "notes": 0,
      "issues": 0,
      "references": 0,
      "seeAlso": 16,
      "images": 1
    },
    {
      "article": "Apartheid",
      "notes": 0,
      "issues": 0,
      "references": 187,
      "seeAlso": 0,
      "images": 11
    },
    {
      "article": "Atom",
      "notes": 2,
      "issues": 0,
      "references": 141,
      "seeAlso": 0,
      "images": 13
    },
    {
      "article": "Automobile",
      "notes": 0,
      "issues": 1,
      "references": 72,
      "seeAlso": 0,
      "images": 14
    },
    {
      "article": "Base (chemistry)",
      "notes": 0,
      "issues": 1,
      "references": 12,
      "seeAlso": 5,
      "images": 0
    },
    {
      "article": "Bias",
      "notes": 0,
      "issues": 4,
      "references": 10,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Bicycle",
      "notes": 0,
      "issues": 0,
      "references": 119,
      "seeAlso": 0,
      "images": 29
    },
    {
      "article": "Bill of Rights (South Africa)",
      "notes": 0,
      "issues": 0,
      "references": 4,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Biome",
      "notes": 0,
      "issues": 2,
      "references": 11,
      "seeAlso": 0,
      "images": 3
    },
    {
      "article": "Bird nest",
      "notes": 0,
      "issues": 0,
      "references": 107,
      "seeAlso": 1,
      "images": 18
    },
    {
      "article": "Boiling",
      "notes": 0,
      "issues": 1,
      "references": 8,
      "seeAlso": 4,
      "images": 2
    },
    {
      "article": "Borehole",
      "notes": 0,
      "issues": 0,
      "references": 5,
      "seeAlso": 4,
      "images": 2
    },
    {
      "article": "Bullying",
      "notes": 0,
      "issues": 2,
      "references": 90,
      "seeAlso": 1,
      "images": 1
    },
    {
      "article": "Castle of Good Hope",
      "notes": 1,
      "issues": 0,
      "references": 10,
      "seeAlso": 3,
      "images": 7
    },
    {
      "article": "Cell (biology)",
      "notes": 0,
      "issues": 0,
      "references": 29,
      "seeAlso": 0,
      "images": 12
    },
    {
      "article": "Ceramic",
      "notes": 0,
      "issues": 0,
      "references": 11,
      "seeAlso": 5,
      "images": 6
    },
    {
      "article": "Child abuse",
      "notes": 0,
      "issues": 0,
      "references": 202,
      "seeAlso": 0,
      "images": 4
    },
    {
      "article": "Child abuseChild abuse",
      "notes": 0,
      "issues": 0,
      "references": 0,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Children's Act (South Africa)",
      "notes": 0,
      "issues": 0,
      "references": 0,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Children's Day",
      "notes": 0,
      "issues": 0,
      "references": 52,
      "seeAlso": 3,
      "images": 16
    },
    {
      "article": "Circuit diagram",
      "notes": 0,
      "issues": 1,
      "references": 9,
      "seeAlso": 0,
      "images": 5
    },
    {
      "article": "Clay",
      "notes": 0,
      "issues": 0,
      "references": 7,
      "seeAlso": 0,
      "images": 6
    },
    {
      "article": "Climate",
      "notes": 0,
      "issues": 0,
      "references": 51,
      "seeAlso": 16,
      "images": 10
    },
    {
      "article": "Coal",
      "notes": 0,
      "issues": 0,
      "references": 141,
      "seeAlso": 0,
      "images": 15
    },
    {
      "article": "Coal in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 25,
      "seeAlso": 2,
      "images": 4
    },
    {
      "article": "Control variable",
      "notes": 0,
      "issues": 1,
      "references": 1,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Convenience food",
      "notes": 0,
      "issues": 0,
      "references": 34,
      "seeAlso": 0,
      "images": 4
    },
    {
      "article": "Cooking",
      "notes": 0,
      "issues": 1,
      "references": 37,
      "seeAlso": 0,
      "images": 8
    },
    {
      "article": "Cradle of Humankind",
      "notes": 0,
      "issues": 0,
      "references": 7,
      "seeAlso": 0,
      "images": 2
    },
    {
      "article": "Decanting",
      "notes": 0,
      "issues": 0,
      "references": 0,
      "seeAlso": 0,
      "images": 2
    },
    {
      "article": "Dependent and independent variables",
      "notes": 0,
      "issues": 1,
      "references": 16,
      "seeAlso": 1,
      "images": 1
    },
    {
      "article": "Design",
      "notes": 0,
      "issues": 1,
      "references": 36,
      "seeAlso": 1,
      "images": 4
    },
    {
      "article": "Discrimination",
      "notes": 0,
      "issues": 4,
      "references": 137,
      "seeAlso": 40,
      "images": 13
    },
    {
      "article": "Domestic violence",
      "notes": 8,
      "issues": 1,
      "references": 351,
      "seeAlso": 5,
      "images": 17
    },
    {
      "article": "Domestic violence in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 22,
      "seeAlso": 0,
      "images": 4
    },
    {
      "article": "Drakensberg",
      "notes": 0,
      "issues": 0,
      "references": 19,
      "seeAlso": 2,
      "images": 9
    },
    {
      "article": "Duration (music)",
      "notes": 0,
      "issues": 0,
      "references": 2,
      "seeAlso": 1,
      "images": 1
    },
    {
      "article": "Economy of South Africa",
      "notes": 0,
      "issues": 1,
      "references": 111,
      "seeAlso": 0,
      "images": 6
    },
    {
      "article": "Ecosystem",
      "notes": 1,
      "issues": 0,
      "references": 46,
      "seeAlso": 8,
      "images": 12
    },
    {
      "article": "Electrical conductor",
      "notes": 0,
      "issues": 1,
      "references": 2,
      "seeAlso": 0,
      "images": 2
    },
    {
      "article": "Electrical network",
      "notes": 0,
      "issues": 1,
      "references": 0,
      "seeAlso": 31,
      "images": 1
    },
    {
      "article": "Electricity generation",
      "notes": 0,
      "issues": 1,
      "references": 22,
      "seeAlso": 0,
      "images": 9
    },
    {
      "article": "Energy in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 19,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "Fair trade",
      "notes": 0,
      "issues": 2,
      "references": 169,
      "seeAlso": 4,
      "images": 7
    },
    {
      "article": "Farm",
      "notes": 0,
      "issues": 1,
      "references": 27,
      "seeAlso": 0,
      "images": 11
    },
    {
      "article": "Fiber",
      "notes": 0,
      "issues": 1,
      "references": 9,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "Fire safety",
      "notes": 0,
      "issues": 4,
      "references": 8,
      "seeAlso": 12,
      "images": 2
    },
    {
      "article": "Fire safety",
      "notes": 0,
      "issues": 4,
      "references": 8,
      "seeAlso": 12,
      "images": 2
    },
    {
      "article": "Flag of South Africa",
      "notes": 0,
      "issues": 0,
      "references": 10,
      "seeAlso": 0,
      "images": 9
    },
    {
      "article": "Food",
      "notes": 93,
      "issues": 0,
      "references": 93,
      "seeAlso": 0,
      "images": 27
    },
    {
      "article": "Food groups",
      "notes": 0,
      "issues": 0,
      "references": 10,
      "seeAlso": 1,
      "images": 2
    },
    {
      "article": "Food pyramid (nutrition)",
      "notes": 0,
      "issues": 0,
      "references": 41,
      "seeAlso": 3,
      "images": 7
    },
    {
      "article": "Food security",
      "notes": 0,
      "issues": 1,
      "references": 133,
      "seeAlso": 0,
      "images": 15
    },
    {
      "article": "Food vs. fuel",
      "notes": 0,
      "issues": 0,
      "references": 145,
      "seeAlso": 0,
      "images": 2
    },
    {
      "article": "Frances Baard",
      "notes": 0,
      "issues": 0,
      "references": 7,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Free State (province)",
      "notes": 0,
      "issues": 0,
      "references": 4,
      "seeAlso": 1,
      "images": 7
    },
    {
      "article": "Freedom Day (South Africa)",
      "notes": 0,
      "issues": 0,
      "references": 2,
      "seeAlso": 7,
      "images": 1
    },
    {
      "article": "Gana and Gwi people",
      "notes": 0,
      "issues": 3,
      "references": 0,
      "seeAlso": 2,
      "images": 0
    },
    {
      "article": "Gangster",
      "notes": 0,
      "issues": 1,
      "references": 53,
      "seeAlso": 0,
      "images": 9
    },
    {
      "article": "Gauteng",
      "notes": 0,
      "issues": 0,
      "references": 73,
      "seeAlso": 0,
      "images": 8
    },
    {
      "article": "Gender stereotypes",
      "notes": 0,
      "issues": 4,
      "references": 185,
      "seeAlso": 0,
      "images": 19
    },
    {
      "article": "Glass",
      "notes": 0,
      "issues": 1,
      "references": 57,
      "seeAlso": 12,
      "images": 45
    },
    {
      "article": "Griqua people",
      "notes": 0,
      "issues": 0,
      "references": 8,
      "seeAlso": 3,
      "images": 5
    },
    {
      "article": "Hand washing",
      "notes": 0,
      "issues": 0,
      "references": 64,
      "seeAlso": 11,
      "images": 10
    },
    {
      "article": "Health",
      "notes": 0,
      "issues": 1,
      "references": 43,
      "seeAlso": 1,
      "images": 6
    },
    {
      "article": "Health care in South Africa",
      "notes": 26,
      "issues": 0,
      "references": 26,
      "seeAlso": 8,
      "images": 2
    },
    {
      "article": "Herero and Namaqua Genocide",
      "notes": 0,
      "issues": 1,
      "references": 88,
      "seeAlso": 0,
      "images": 10
    },
    {
      "article": "Heritage Day (South Africa)",
      "notes": 0,
      "issues": 0,
      "references": 5,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "History of South Africa",
      "notes": 0,
      "issues": 8,
      "references": 159,
      "seeAlso": 15,
      "images": 32
    },
    {
      "article": "History of writing",
      "notes": 2,
      "issues": 0,
      "references": 37,
      "seeAlso": 0,
      "images": 6
    },
    {
      "article": "HIV",
      "notes": 0,
      "issues": 0,
      "references": 124,
      "seeAlso": 0,
      "images": 12
    },
    {
      "article": "HIV/AIDS",
      "notes": 0,
      "issues": 0,
      "references": 265,
      "seeAlso": 0,
      "images": 15
    },
    {
      "article": "Home safety",
      "notes": 0,
      "issues": 1,
      "references": 4,
      "seeAlso": 2,
      "images": 0
    },
    {
      "article": "Hottentot Venus",
      "notes": 0,
      "issues": 1,
      "references": 59,
      "seeAlso": 0,
      "images": 8
    },
    {
      "article": "Human nutrition",
      "notes": 0,
      "issues": 2,
      "references": 95,
      "seeAlso": 0,
      "images": 3
    },
    {
      "article": "Human Rights Day",
      "notes": 0,
      "issues": 0,
      "references": 19,
      "seeAlso": 5,
      "images": 3
    },
    {
      "article": "Human swimming",
      "notes": 0,
      "issues": 0,
      "references": 23,
      "seeAlso": 0,
      "images": 8
    },
    {
      "article": "Hydraulics",
      "notes": 9,
      "issues": 0,
      "references": 9,
      "seeAlso": 7,
      "images": 4
    },
    {
      "article": "Insulator (electricity)",
      "notes": 9,
      "issues": 0,
      "references": 9,
      "seeAlso": 0,
      "images": 11
    },
    {
      "article": "Khoikhoi",
      "notes": 0,
      "issues": 1,
      "references": 9,
      "seeAlso": 0,
      "images": 5
    },
    {
      "article": "Khoikhoi mythology",
      "notes": 0,
      "issues": 0,
      "references": 27,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Later Stone Age",
      "notes": 0,
      "issues": 0,
      "references": 7,
      "seeAlso": 0,
      "images": 2
    },
    {
      "article": "Latitude",
      "notes": 0,
      "issues": 2,
      "references": 16,
      "seeAlso": 18,
      "images": 11
    },
    {
      "article": "Liquid fuel",
      "notes": 0,
      "issues": 1,
      "references": 3,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "List of South Africans",
      "notes": 0,
      "issues": 1,
      "references": 2,
      "seeAlso": 6,
      "images": 33
    },
    {
      "article": "Longitude",
      "notes": 0,
      "issues": 0,
      "references": 11,
      "seeAlso": 18,
      "images": 3
    },
    {
      "article": "Mahatma Gandhi",
      "notes": 0,
      "issues": 1,
      "references": 275,
      "seeAlso": 5,
      "images": 28
    },
    {
      "article": "Malaria",
      "notes": 0,
      "issues": 0,
      "references": 190,
      "seeAlso": 0,
      "images": 15
    },
    {
      "article": "Mandela Day",
      "notes": 0,
      "issues": 0,
      "references": 6,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "Map",
      "notes": 0,
      "issues": 0,
      "references": 6,
      "seeAlso": 0,
      "images": 10
    },
    {
      "article": "Mapungubwe",
      "notes": 11,
      "issues": 0,
      "references": 11,
      "seeAlso": 11,
      "images": 9
    },
    {
      "article": "Mapungubwe Museum",
      "notes": 0,
      "issues": 0,
      "references": 1,
      "seeAlso": 0,
      "images": 2
    },
    {
      "article": "Mapungubwe National Park",
      "notes": 0,
      "issues": 0,
      "references": 9,
      "seeAlso": 1,
      "images": 2
    },
    {
      "article": "Mining industry of South Africa",
      "notes": 0,
      "issues": 1,
      "references": 27,
      "seeAlso": 1,
      "images": 3
    },
    {
      "article": "Mpumalanga",
      "notes": 0,
      "issues": 0,
      "references": 9,
      "seeAlso": 1,
      "images": 3
    },
    {
      "article": "Music of South Africa",
      "notes": 0,
      "issues": 2,
      "references": 12,
      "seeAlso": 4,
      "images": 0
    },
    {
      "article": "National anthem of South Africa",
      "notes": 0,
      "issues": 0,
      "references": 6,
      "seeAlso": 5,
      "images": 0
    },
    {
      "article": "National symbols of South Africa",
      "notes": 0,
      "issues": 0,
      "references": 9,
      "seeAlso": 5,
      "images": 6
    },
    {
      "article": "National Women's Day",
      "notes": 0,
      "issues": 0,
      "references": 4,
      "seeAlso": 3,
      "images": 1
    },
    {
      "article": "Nelson Mandela",
      "notes": 0,
      "issues": 0,
      "references": 401,
      "seeAlso": 0,
      "images": 25
    },
    {
      "article": "Nest",
      "notes": 0,
      "issues": 0,
      "references": 11,
      "seeAlso": 3,
      "images": 8
    },
    {
      "article": "Noise pollution",
      "notes": 0,
      "issues": 0,
      "references": 25,
      "seeAlso": 6,
      "images": 5
    },
    {
      "article": "Oliver Tambo",
      "notes": 13,
      "issues": 1,
      "references": 13,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "Outer space",
      "notes": 0,
      "issues": 0,
      "references": 139,
      "seeAlso": 0,
      "images": 12
    },
    {
      "article": "Outline of domestic violence",
      "notes": 0,
      "issues": 0,
      "references": 65,
      "seeAlso": 9,
      "images": 1
    },
    {
      "article": "Paper",
      "notes": 0,
      "issues": 0,
      "references": 26,
      "seeAlso": 26,
      "images": 4
    },
    {
      "article": "People Against Gangsterism and Drugs",
      "notes": 0,
      "issues": 0,
      "references": 8,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Petrol-paraffin engine",
      "notes": 0,
      "issues": 1,
      "references": 8,
      "seeAlso": 0,
      "images": 4
    },
    {
      "article": "Pitch (music)",
      "notes": 0,
      "issues": 1,
      "references": 23,
      "seeAlso": 17,
      "images": 2
    },
    {
      "article": "Pneumatics",
      "notes": 1,
      "issues": 0,
      "references": 1,
      "seeAlso": 4,
      "images": 1
    },
    {
      "article": "Politics of South Africa",
      "notes": 0,
      "issues": 1,
      "references": 3,
      "seeAlso": 0,
      "images": 2
    },
    {
      "article": "Pollution",
      "notes": 0,
      "issues": 0,
      "references": 54,
      "seeAlso": 1,
      "images": 12
    },
    {
      "article": "Rail transport",
      "notes": 1,
      "issues": 0,
      "references": 49,
      "seeAlso": 0,
      "images": 26
    },
    {
      "article": "Rail transport in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 14,
      "seeAlso": 15,
      "images": 3
    },
    {
      "article": "Reconciliation Day",
      "notes": 0,
      "issues": 0,
      "references": 2,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "Reproduction",
      "notes": 20,
      "issues": 0,
      "references": 20,
      "seeAlso": 7,
      "images": 3
    },
    {
      "article": "Republic of South Africa",
      "notes": 1,
      "issues": 1,
      "references": 181,
      "seeAlso": 0,
      "images": 36
    },
    {
      "article": "Right to food",
      "notes": 0,
      "issues": 0,
      "references": 69,
      "seeAlso": 0,
      "images": 6
    },
    {
      "article": "Road map",
      "notes": 0,
      "issues": 0,
      "references": 7,
      "seeAlso": 1,
      "images": 6
    },
    {
      "article": "Rock (geology)",
      "notes": 0,
      "issues": 0,
      "references": 11,
      "seeAlso": 0,
      "images": 8
    },
    {
      "article": "San healing practices",
      "notes": 0,
      "issues": 1,
      "references": 10,
      "seeAlso": 1,
      "images": 0
    },
    {
      "article": "San languages",
      "notes": 5,
      "issues": 0,
      "references": 5,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "San people",
      "notes": 0,
      "issues": 0,
      "references": 89,
      "seeAlso": 10,
      "images": 7
    },
    {
      "article": "San religion",
      "notes": 0,
      "issues": 0,
      "references": 27,
      "seeAlso": 0,
      "images": 0
    },
    {
      "article": "San rock art",
      "notes": 9,
      "issues": 0,
      "references": 9,
      "seeAlso": 9,
      "images": 1
    },
    {
      "article": "Sand",
      "notes": 0,
      "issues": 7,
      "references": 10,
      "seeAlso": 0,
      "images": 9
    },
    {
      "article": "Scale (map)",
      "notes": 0,
      "issues": 2,
      "references": 6,
      "seeAlso": 0,
      "images": 10
    },
    {
      "article": "Scientific classification (disambiguation)",
      "notes": 0,
      "issues": 0,
      "references": 0,
      "seeAlso": 4,
      "images": 0
    },
    {
      "article": "Scientific method",
      "notes": 162,
      "issues": 2,
      "references": 162,
      "seeAlso": 36,
      "images": 10
    },
    {
      "article": "Settling",
      "notes": 0,
      "issues": 0,
      "references": 5,
      "seeAlso": 5,
      "images": 3
    },
    {
      "article": "Sexism",
      "notes": 0,
      "issues": 1,
      "references": 308,
      "seeAlso": 43,
      "images": 16
    },
    {
      "article": "Sieving",
      "notes": 0,
      "issues": 1,
      "references": 6,
      "seeAlso": 0,
      "images": 3
    },
    {
      "article": "Soil",
      "notes": 0,
      "issues": 0,
      "references": 216,
      "seeAlso": 0,
      "images": 24
    },
    {
      "article": "Sound",
      "notes": 0,
      "issues": 0,
      "references": 8,
      "seeAlso": 25,
      "images": 6
    },
    {
      "article": "South African cuisine",
      "notes": 0,
      "issues": 1,
      "references": 0,
      "seeAlso": 0,
      "images": 9
    },
    {
      "article": "South African locomotive history",
      "notes": 0,
      "issues": 0,
      "references": 30,
      "seeAlso": 2,
      "images": 340
    },
    {
      "article": "Standard Model",
      "notes": 0,
      "issues": 1,
      "references": 39,
      "seeAlso": 0,
      "images": 3
    },
    {
      "article": "Stereotype",
      "notes": 0,
      "issues": 1,
      "references": 83,
      "seeAlso": 37,
      "images": 6
    },
    {
      "article": "Steve Biko",
      "notes": 0,
      "issues": 0,
      "references": 42,
      "seeAlso": 4,
      "images": 1
    },
    {
      "article": "Structure (disambiguation)",
      "notes": 0,
      "issues": 0,
      "references": 0,
      "seeAlso": 1,
      "images": 0
    },
    {
      "article": "Tap (valve)",
      "notes": 0,
      "issues": 1,
      "references": 2,
      "seeAlso": 0,
      "images": 7
    },
    {
      "article": "Textile",
      "notes": 0,
      "issues": 0,
      "references": 23,
      "seeAlso": 18,
      "images": 12
    },
    {
      "article": "Trade",
      "notes": 50,
      "issues": 0,
      "references": 50,
      "seeAlso": 0,
      "images": 8
    },
    {
      "article": "Transport",
      "notes": 33,
      "issues": 0,
      "references": 33,
      "seeAlso": 0,
      "images": 20
    },
    {
      "article": "Transport in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 6,
      "seeAlso": 0,
      "images": 4
    },
    {
      "article": "Two foot gauge railways in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 40,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "Vibration",
      "notes": 0,
      "issues": 1,
      "references": 9,
      "seeAlso": 34,
      "images": 8
    },
    {
      "article": "Volume (disambiguation)",
      "notes": 0,
      "issues": 0,
      "references": 0,
      "seeAlso": 4,
      "images": 0
    },
    {
      "article": "Walter Sisulu",
      "notes": 0,
      "issues": 0,
      "references": 10,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "Water filter",
      "notes": 0,
      "issues": 1,
      "references": 10,
      "seeAlso": 9,
      "images": 2
    },
    {
      "article": "Water pollution",
      "notes": 0,
      "issues": 0,
      "references": 42,
      "seeAlso": 0,
      "images": 17
    },
    {
      "article": "Water privatization in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 6,
      "seeAlso": 1,
      "images": 0
    },
    {
      "article": "Water supply and sanitation in South Africa",
      "notes": 0,
      "issues": 0,
      "references": 67,
      "seeAlso": 4,
      "images": 5
    },
    {
      "article": "Water well",
      "notes": 0,
      "issues": 0,
      "references": 12,
      "seeAlso": 6,
      "images": 19
    },
    {
      "article": "Wax",
      "notes": 0,
      "issues": 0,
      "references": 6,
      "seeAlso": 1,
      "images": 7
    },
    {
      "article": "Western Cape",
      "notes": 0,
      "issues": 2,
      "references": 28,
      "seeAlso": 0,
      "images": 11
    },
    {
      "article": "Wetlands",
      "notes": 0,
      "issues": 0,
      "references": 80,
      "seeAlso": 0,
      "images": 10
    },
    {
      "article": "Wildlife conservation",
      "notes": 0,
      "issues": 0,
      "references": 16,
      "seeAlso": 4,
      "images": 2
    },
    {
      "article": "Wildlife management",
      "notes": 0,
      "issues": 0,
      "references": 20,
      "seeAlso": 0,
      "images": 1
    },
    {
      "article": "Winnie Madikizela-Mandela",
      "notes": 0,
      "issues": 2,
      "references": 43,
      "seeAlso": 1,
      "images": 1
    },
    {
      "article": "Wood",
      "notes": 0,
      "issues": 1,
      "references": 26,
      "seeAlso": 0,
      "images": 16
    },
    {
      "article": "Wool",
      "notes": 0,
      "issues": 0,
      "references": 40,
      "seeAlso": 37,
      "images": 17
    },
    {
      "article": "Youth culture",
      "notes": 0,
      "issues": 1,
      "references": 30,
      "seeAlso": 10,
      "images": 2
    }
  ]
}

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
RadarChart.draw("#chart", d, mycfg); // d

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