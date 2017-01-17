<?php

// für Docker angepasst
$redis = new Redis();




try {
	$redis->connect('berichtsheft-redis', 6379);
} catch (Exception $e) {
	echo $e;
}

?>
