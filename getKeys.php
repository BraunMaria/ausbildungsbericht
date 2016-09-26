<?php

include "connect.php";
try {
    
   if (!empty($_POST['aktion'])) {
	  $key = $_POST['loadkey'];
	  $jsonData = json_encode($redis->keys($key.'*'));
	
	  echo($jsonData);
	}
	
} catch (Exception $e) {
    echo $e;
}
