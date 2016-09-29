<?php

include"connect.php";

if (!empty($_POST['loadkey'])) {
    $key = $_POST['loadkey'];
    $jsonData = $redis->get($key);
    echo json_decode($jsonData, true , $depth = 512);
}
?>