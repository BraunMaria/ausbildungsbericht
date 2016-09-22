<?php

include "connect.php";

try {
    
   $key = $_POST['loadkey'];
	echo $redis->get("Maria Braun");
	
} catch (Exception $e) {
    echo $e;
}
