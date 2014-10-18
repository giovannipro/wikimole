<?php 
// addizione
function add($a,$b) {
	return $a + $b;
}

// scrivo il json con lingua e categoria
function lang_cat($a,$a1,$a2,$b,$b1,$b2) {
	return '{"Articles": [{"'.$a.'" : {"Language": '.json_encode($a1).',"Category": '.json_encode($a2).'}},{"'.$b.'" : {"Language": '.json_encode($b1).',"Category": '.json_encode($b2).'}}]}';
}






?>