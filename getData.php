<?php

include "connect.php";
try {
    
   $key = $_POST['loadkey'];
	echo $redis->get($key);
	
} catch (Exception $e) {
    echo $e;
}
