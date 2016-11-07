<?php

include "connect.php";

try {
    $redis->del($_POST['delkey']);
    
    echo($jsonData);
	
} catch (Exception $e) {
    echo $e;
}

?>