<?php 
# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);
?>

	<html>
	<body>
		<!-- Script works if loaded by MAMP -->
		<title>Page rank</title>
		<script src="../lib/js/jquery.min.js"></script>
		<script src="../lib/js/jquery.xdomainajax.js"></script>
		<link rel="stylesheet" href="../lib/css/scraper.css" rel="stylesheet">

		<script type="text/javascript">

			function hide() {

				$('form').hide()

			}
			
		</script>

		<?php 

			function pr() { 
				
				// remove special characters (%, #)
				$url = array (
				    "Convenience_food",
				    "Acid",
				    "Africa_Day",
				    "Agriculture_in_South_Africa",
				    "AIDS_orphan",
				    "Alcohol_abuse",
				    "Alcohol_dependence",
				    "Alcoholism",
				    "Animal_husbandry",
				    "Animal_husbandry_in_South_Africa",
				    "Animal-powered_transport",
				    "Apartheid",
				    "Atom",
				    "Automobile",
				    "Base_(chemistry)",
				    "Bias",
				    "Bicycle",
				    "Biome",
				    "Bird_nest",
				    "Boiling",
				    "Borehole",
				    "Bullying",
				    "Castle_of_Good_Hope",
				    "Cell_(biology)",
				    "Ceramic",
				    "Child_abuse",
				    "Circuit_diagram",
				    "Clay",
				    "Climate",
				    "Coal_in_South_Africa",
				    "Control_variable",
				    "Cooking",
				    "Cradle_of_Humankind",
				    "Decanting",
				    "Dependent_and_independent_variables",
				    "Design",
				    "Discrimination",
				    "Domestic_violence",
				    "Domestic_violence_in_South_Africa",
				    "Economy_of_South_Africa",
				    "Ecosystem",
				    "Electrical_conductor",
				    "Electrical_network",
				    "Electricity_generation",
				    "Energy_in_South_Africa",
				    "Farm",
				    "Fiber",
				    "Fire_safety",
				    "Fire_safety",
				    "Flag_of_South_Africa",
				    "Food",
				    "Food_groups",
				    "Food_pyramid_(nutrition)",
				    "Food_security",
				    "Food_vs._fuel",
				    "Frances_Baard",
				    "Gana_and_Gwi_people",
				    "Gangster",
				    "Gauteng",
				    "Glass",
				    "Griqua_people",
				    "Hand_washing",
				    "Health",
				    "Health_care_in_South_Africa",
				    "Herero_and_Namaqua_Genocide",
				    "History_of_South_Africa",
				    "History_of_writing",
				    "HIV",
				    "HIV/AIDS",
				    "Home_safety",
				    "Hottentot_Venus",
				    "Human_nutrition",
				    "Human_Rights_Day",
				    "Human_swimming",
				    "Hydraulics",
				    "Khoikhoi",
				    "Khoikhoi_mythology",
				    "Later_Stone_Age",
				    "Latitude",
				    "Liquid_fuel",
				    "List_of_South_Africans",
				    "Longitude",
				    "Mahatma_Gandhi",
				    "Malaria",
				    "Mandela_Day",
				    "Map",
				    "Mapungubwe",
				    "Mapungubwe_Museum",
				    "Mapungubwe_National_Park",
				    "Mining_industry_of_South_Africa",
				    "Mpumalanga",
				    "Music_of_South_Africa",
				    "National_anthem_of_South_Africa",
				    "National_symbols_of_South_Africa",
				    "Nelson_Mandela",
				    "Noise_pollution",
				    "Oliver_Tambo",
				    "Outer_space",
				    "Outline_of_domestic_violence",
				    "Paper",
				    "People_Against_Gangsterism_and_Drugs",
				    "Petrol-paraffin_engine",
				    "Pneumatics",
				    "Politics_of_South_Africa",
				    "Pollution",
				    "Rail_transport",
				    "Rail_transport_in_South_Africa",
				    "Reconciliation_Day",
				    "Reproduction",
				    "Republic_of_South_Africa",
				    "Right_to_food",
				    "Road_map",
				    "Rock_(geology)",
				    "San_healing_practices",
				    "San_languages",
				    "San_people",
				    "San_religion",
				    "San_rock_art",
				    "Sand",
				    "Scale_(map)",
				    "Scientific_classification_(disambiguation)",
				    "Scientific_method",
				    "Settling",
				    "Sexism",
				    "Sieving",
				    "Soil",
				    "Sound",
				    "South_African_cuisine",
				    "South_African_locomotive_history",
				    "Standard_Model",
				    "Stereotype",
				    "Steve_Biko",
				    "Structure_(disambiguation)",
				    "Textile",
				    "Trade",
				    "Transport",
				    "Transport",
				    "Transport_in_South_Africa",
				    "Two_foot_gauge_railways_in_South_Africa",
				    "Vibration",
				    "Walter_Sisulu",
				    "Water_filter",
				    "Water_pollution",
				    "Water_privatization_in_South_Africa",
				    "Water_supply_and_sanitation_in_South_Africa",
				    "Water_well",
				    "Wax",
				    "Western_Cape",
				    "Wetlands",
				    "Wildlife_conservation",
				    "Wildlife_management",
				    "Winnie_Madikizela-Mandela",
				    "Wood",
				    "Wool",
				    "Youth_culture"
				);

				require("../lib/php/PRclass.php");
				//$url = array("http://www.maind.supsi.ch/", "http://www.supsi.ch/", "http://www.fablab.supsi.ch/");
				$pr = new PR();

				foreach ($url as &$value) {  //$url // ($i = 1; $i <= 10; $i++) 
				    echo 'https://en.wikipedia.org/wiki/'. $value . ', ' . $pr->get_google_pagerank('https://en.wikipedia.org/wiki/' . $value) . '<br/> ' ; //$url
				}
			}
		?>

		<main>
			<div id="title" class="hide_1">
				<h1>Google page rank<h1>
				<h2></h2>
			</div>
			<div class="box_50">
				<div id="one" class="label one hide_1"><!-- pr() / get_source_target() -->
					<span>
						.
						<form><button name="get" onclick="hide()">Page Rank</button></form>
					</span>
				</div>
			</div>
			<div class="box_50" id="data">
				<div class="label three" onclick="">
					<span><?php if (isset($_REQUEST['get'])) pr(); ?><span>
				</div>
			</div>
			<div class="clear"></div>
		</main>

	</body>
</html>