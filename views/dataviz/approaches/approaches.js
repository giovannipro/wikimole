var height = 10000;
var width = window.outerWidth;

var margin = {
    top: 50, 
    right: 20, 
    bottom: 80, 
    left: 50
};

var v_shift = 50,
    fontsize = 14;

var file = "lists/pv_order.csv"

var filter = "examined"; // examined control all
console.log(filter)

// function load_icons() {
//     $.get("../../assets/icons/defs.svg", function(data) {
//         console.log(data)
//         $(".svg_content").append(data.documentElement);
//     });
// }
// setTimeout(load_icons, 10000);
// get the data

d3.csv(file, function(error, data) { // ed; edit_test1; _test ;
    if (error) throw error;
    console.log(file)

    data.forEach(function(d) {
        d.id_pv = +d.id_pv;
        d.article = d.article;
    })
    console.log(data)

    data.sort(function(a,b) {
        return a.id_pv - b.id_pv;
    })

    // set the container

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right) //margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom ) 
        // .attr('viewBox','0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom) ) // + width + ' ' + height)
        .attr('class','svg_content')

    var plot = svg.append("g")
        .attr("id", "d3_plot")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var article = plot.selectAll('.article')
        .data(data
            .filter(function (d) { 
                if (filter == "examined") {
                    return d.art == "Coal" ||
                        d.art == "Africa_Day" ||
                        d.art == "Agriculture_in_South_Africa" ||
                        d.art == "AIDS_orphan" ||
                        d.art == "Apartheid" ||
                        d.art == "Bias" ||
                        d.art == "Bicycle" ||
                        d.art == "Children's_Act_2005" ||
                        d.art == "Children's_Day" ||
                        d.art == "Clay" ||
                        d.art == "Convenience_food" ||
                        d.art == "Cradle_of_Humankind" ||
                        d.art == "Day_of_Reconciliation" ||
                        d.art == "Drakensberg" ||
                        d.art == "Fire_safety" ||
                        d.art == "Flag_of_South_Africa" ||
                        d.art == "Food_pyramid_(nutrition)" ||
                        d.art == "Frances_Baard" ||
                        d.art == "Gangster" ||
                        d.art == "Gender_role" ||
                        d.art == "Hand_washing" ||
                        d.art == "Healthcare_in_South_Africa" ||
                        d.art == "Herero_and_Namaqua_genocide" ||
                        d.art == "Heritage_Day_(South_Africa)" ||
                        d.art == "HIV" ||
                        d.art == "Home_safety" ||
                        d.art == "Human_Rights_Day" ||
                        d.art == "Kaditshwene" ||
                        d.art == "Khoikhoi" ||
                        d.art == "Khoisan_languages" ||
                        d.art == "Makhonjwa_Mountains" ||
                        d.art == "Mandela_Day" ||
                        d.art == "Map" ||
                        d.art == "Mapungubwe_Collection" ||
                        d.art == "National_Women's_Day" ||
                        d.art == "Nelson_Mandela" ||
                        d.art == "Nest" ||
                        d.art == "Oliver_Tambo" ||
                        d.art == "Petrol-paraffin_engine" ||
                        d.art == "San_healing_practices" ||
                        d.art == "San_people" ||
                        d.art == "San_religion" ||
                        d.art == "Sieve" ||
                        d.art == "Steve_Biko" ||
                        d.art == "Vibration" ||
                        d.art == "Walter_Sisulu" ||
                        d.art == "Water_pollution" ||
                        d.art == "Water_privatisation_in_South_Africa" ||
                        d.art == "Water_supply_and_sanitation_in_South_Africa" ||
                        d.art == "Western_Cape" ||
                        d.art == "Wildlife_management" ||
                        d.art == "Winnie_Madikizela-Mandela" ||
                        d.art == "!Kung_people"         
                }
                else if (filter == "control") {
                    return d.art != "Coal" &&
                        d.art != "Africa_Day" &&
                        d.art != "Agriculture_in_South_Africa" &&
                        d.art != "AIDS_orphan" &&
                        d.art != "Apartheid" &&
                        d.art != "Bias" &&
                        d.art != "Bicycle" &&
                        d.art != "Children's_Act_2005" &&
                        d.art != "Children's_Day" &&
                        d.art != "Clay" &&
                        d.art != "Convenience_food" &&
                        d.art != "Cradle_of_Humankind" &&
                        d.art != "Day_of_Reconciliation" &&
                        d.art != "Drakensberg" &&
                        d.art != "Fire_safety" &&
                        d.art != "Flag_of_South_Africa" &&
                        d.art != "Food_pyramid_(nutrition)" &&
                        d.art != "Frances_Baard" &&
                        d.art != "Gangster" &&
                        d.art != "Gender_role" &&
                        d.art != "Hand_washing" &&
                        d.art != "Healthcare_in_South_Africa" &&
                        d.art != "Herero_and_Namaqua_genocide" &&
                        d.art != "Heritage_Day_(South_Africa)" &&
                        d.art != "HIV" &&
                        d.art != "Home_safety" &&
                        d.art != "Human_Rights_Day" &&
                        d.art != "Kaditshwene" &&
                        d.art != "Khoikhoi" &&
                        d.art != "Khoisan_languages" &&
                        d.art != "Makhonjwa_Mountains" &&
                        d.art != "Mandela_Day" &&
                        d.art != "Map" &&
                        d.art != "Mapungubwe_Collection" &&
                        d.art != "National_Women's_Day" &&
                        d.art != "Nelson_Mandela" &&
                        d.art != "Nest" &&
                        d.art != "Oliver_Tambo" &&
                        d.art != "Petrol-paraffin_engine" &&
                        d.art != "San_healing_practices" &&
                        d.art != "San_people" &&
                        d.art != "San_religion" &&
                        d.art != "Sieve" &&
                        d.art != "Steve_Biko" &&
                        d.art != "Vibration" &&
                        d.art != "Walter_Sisulu" &&
                        d.art != "Water_pollution" &&
                        d.art != "Water_privatisation_in_South_Africa" &&
                        d.art != "Water_supply_and_sanitation_in_South_Africa" &&
                        d.art != "Western_Cape" &&
                        d.art != "Wildlife_management" &&
                        d.art != "Winnie_Madikizela-Mandela" &&
                        d.art != "!Kung_people" 
                }  
                else {
                    return d.art != "xyz"
                }                           
            })
        )
        .enter()
        .append('g')
        .attr("class","article")
        .attr("id",function (d,i){
            return (i+1) + "-" + d.article
        })
        .attr("transform",function (d,i){
            return "translate(0" + "," + (v_shift * i) + ")" 
        })

    var text = article.append("g")
        .append("text")
        // .attr("x", -10)
        // .attr("dy",5)
        // .attr("y", function(d){
        //     return 0
        // })
        .style("font-size",fontsize)
        .style("text-anchor","start")
        .text(function(d,i){
            // return d.id_pv +  ' - ' +  (d.article) 
            return d.article
        })

// icons

    var x_icon = 0,
        y_icon = 5
        icon_scale = 0.2,
        icon_space = icon_scale * 100,
        rotate = "0";

    // icons
    var icons = article.append('g')
        //.attr('transform','scale(0.2)')
        .attr('class','icons')
        .attr('transform','translate(' + x_icon  + ',' + y_icon +')' )  // 0x
    
    // 1 RW_by_community
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.RW_by_community == 1)   { 
                // return 'translate('+ (icon_space*2) + ',' + (y_icon * 0) +')'
                return 'translate('+ (icon_space * 1) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.RW_by_community == 1)   { 
                return "RW_by_community"
            }
        })  
        .append('g')
        .attr('transform',"rotate(" + rotate + ")") 
        .append("use")
        .attr("xlink:href", function(d,i) {
            if (d.RW_by_community == 1) {
                return '#RW_by_community'
            }
        })
        // .attr("x", 0)
        // .attr("y", 0)
        .attr('transform','scale(' + icon_scale + ')')

    // 2 RW_by_expert_pdf
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.RW_by_expert_pdf == 1)   { 
                // return 'translate('+ (icon_space*3) + ',' + 0 +')'
                return 'translate('+ (icon_space * 2) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.RW_by_expert_pdf == 1)   { 
                return "RW_by_expert_pdf"
            }
        })
        .append('g')
        .attr('transform',"rotate(" + rotate + ")") 
        .append("use")
        .attr("xlink:href", function(d,i) {
            if (d.RW_by_expert_pdf == 1) {
                return '#RW_by_expert_pdf'
            }
        })
        // .attr("x", 0)
        // .attr("y", 45) // 0-(0/2)
        .attr('transform','scale(' + icon_scale + ')')

    // // 3 RW_by_expert_pdf_wiki
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.RW_by_expert_pdf_wiki == 1){ 
                return 'translate('+ (icon_space * 3) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.RW_by_expert_pdf_wiki == 1)   { 
                return "RW_by_expert_pdf_wiki"
            }
        })
        .append('g')
        .attr('transform',"rotate(" + rotate + ")") 
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.RW_by_expert_pdf_wiki == 1) { // (1 == 1)
                return '#RW_by_expert_pdf_wiki'
            }
        })  
        .attr('transform','scale(' + icon_scale + ')')

    // // 4 New_article_suggested_by_expert
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.New_article_suggested_by_expert == 1){ 
                return 'translate('+ (icon_space * 4) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.New_article_suggested_by_expert == 1)   { 
                return "New_article_suggested_by_expert"
            }
        })
        .append('g')
        .attr('transform',"rotate(" + rotate + ")") 
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.New_article_suggested_by_expert == 1) {
                return '#New_article_suggested_by_expert'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')

    // // 5 AFC
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.AFC == 1){ 
                return 'translate('+ (icon_space * 5) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.AFC == 1)   { 
                return "AFC"
            }
        })  
        .append('g')
        .attr('transform',"rotate(" + rotate + ")") 
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.AFC == 1) { // (1 == 1)
                return '#AFC'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')

    // 6 Featured_on_WP_SA_portal
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.Featured_on_WP_SA_portal == 1){ 
                return 'translate('+ (icon_space * 6) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.Featured_on_WP_SA_portal == 1)   { 
                return "Featured_on_WP_SA_portal"
            }
        })  
        .append('g')
        .attr('transform',"rotate(" + rotate + ")") 
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.Featured_on_WP_SA_portal == 1) {
                return '#Featured_on_WP_SA_portal'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')

    // 7 Rewrite_based_on_expert_review
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.Rewrite_based_on_expert_review == 1){ 
                return 'translate('+ (icon_space * 7) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.Rewrite_based_on_expert_review == 1)   { 
                return "Rewrite_based_on_expert_review"
            }
        })  
        .append('g')
        .attr('transform',"rotate(" + rotate + ")")  
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.Rewrite_based_on_expert_review == 1) {
                return '#Rewrite_based_on_expert_review'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')

    // 8 WP_Assessment
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.WP_Assessment == 1){ 
                return 'translate('+ (icon_space * 8) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.WP_Assessment == 1)   { 
                return "WP_Assessment"
            }
        })  
        .append('g')
        .attr('transform',"rotate(" + rotate + ")") 
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.WP_Assessment == 1) {
                return '#WP_Assessment'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')

    // 9 Bold_reassesment
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.Bold_reassesment == 1){ 
                return 'translate('+ (icon_space * 9) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.Bold_reassesment == 1)   { 
                return "Bold_reassesment"
            }
        })
        .append('g')
        .attr('transform',"rotate(" + rotate + ")")
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.Bold_reassesment == 1) { // (1 == 1)
                return '#Bold_reassesment'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')

    // 10 Africa_Destubathon
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.Africa_Destubathon == 1){ 
                return 'translate('+ (icon_space * 10) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.Africa_Destubathon == 1)   { 
                return "Africa_Destubathon"
            }
        })  
        .append('g')
        .attr('transform',"rotate(" + rotate + ")")
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.Africa_Destubathon == 1) {
                return '#Africa_Destubathon'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')

    // 12 Edit_a_thon
    d3.selectAll(".icons").append('g')
        .attr('transform', function (d,i){
            if (d.Edit_a_thon == 1){ 
                return 'translate('+ (icon_space * 11) + ',' + 0 +')'
            }
        })
        .attr('class', function (d,i){
            if (d.Edit_a_thon == 1)   { 
                return "Edit_a_thon"
            }
        })  
        .append('g')
        .attr('transform',"rotate(" + rotate + ")")
        .append("use")
        .attr("xlink:href", function(d,i) {
            if  (d.Edit_a_thon == 1) {
                return '#Edit_a_thon'
            }
        })
        .attr('transform','scale(' + icon_scale + ')')
});




