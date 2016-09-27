<?php


$redis = new Redis();




try {
	$redis->connect('berichtsheftphp5-redis', 6379);
} catch (Exception $e) {
	echo $e;
}

?>