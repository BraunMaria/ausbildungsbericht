<?php

include "connect.php";
try {
    
   $key = $_POST['loadkey'];
	echo $redis->get("test");
	
} catch (Exception $e) {
    echo $e;
}
