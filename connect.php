<?php


$redis = new Redis();



//test
try {
	$redis->connect('berichtsheft-redis', 6379);
} catch (Exception $e) {
	echo $e;
}

?>
