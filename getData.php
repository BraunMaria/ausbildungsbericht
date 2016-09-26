<?php

include"connect.php";

if (!empty($_POST['loadkey'])) {
    $key = $_POST['loadkey'];
    echo $redis->get($key);
}
	

?>