<?php

// für Docker angepasst
$redis = new Redis();



// Port muss angepasst werden
try {
	$redis->connect('berichtsheft-redis', 6379);
} catch (Exception $e) {
	echo $e;
}

?>
