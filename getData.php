<?php

include"connect.php";

if (!empty($_POST['loadkey'])) {
    $jsonData = [];
    $key = $_POST['loadkey'];
    $jsonData = $redis->get($key);
    echo $jsonData;
}
?>