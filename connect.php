<?php


$redis = new Redis();




try {
	$redis->connect('10.0.0.1', 6379);
	echo "connected \n";
} catch (Exception $e) {
	echo $e;
}

?>