<?php 
// addizione
function add($a,$b) {
	return $a + $b;
}

// scrivo il json con lingua e categoria
function lang_cat($a,$b,$c) {
	return '{'.$a.': {"Language": '.json_encode($b).',"Category": '.json_encode($c).'}}';
}






?>