<?php

include"connect.php";

try {
		$key = $_POST['key'];
		$data = $_POST['data'];
		$redis->set($key, $data);
	
} catch (Exception $e) {
	echo $e;
}

?>