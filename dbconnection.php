<?php 

$redis = new Redis();

try {
	$redis->connect('10.0.0.3');
} catch (Exception $e) {
	echo $e;
}

try {
	if (!empty($_POST['loadkey'])) {
		$key = $_POST['loadkey'];
		echo $redis->get($key);
	}
	
	if (!empty($_POST['key']) && !empty($_POST['data'])) {
		$key = $_POST['key'];
		$data = $_POST['data'];
		
		$redis->set($key, $data);
	}
	
	if (!empty($_POST['aktion'])) {
		$jsonData = json_encode($redis->keys('Name*'));
	
		echo($jsonData);
	}
	
	if (!empty($_POST['delkey'])) {
		$redis->del($_POST['delkey']);
	
		echo($jsonData);
	}
	
} catch (Exception $e) {
	echo $e;
}




?>