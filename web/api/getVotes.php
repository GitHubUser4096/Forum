<?php

session_start();

require_once '../php/Forum.php';

$contentId = $_GET['contentId'];
$typeId = $_GET['typeId'];
$userId = isSet($_SESSION['user'])?$_SESSION['user']['id']:0;

$votes = $db->query("select * from Rating where contentId=? and userId<>? and typeId=?", $contentId, $userId, $typeId);

$list = [];

foreach($votes as $vote){
  $list[] = $vote['value'];
}

echo json_encode($list);

?>
