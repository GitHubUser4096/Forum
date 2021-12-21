<?php

session_start();

require_once '../php/Forum.php';

if(!isSet($_SESSION['user'])){
  echo '{"exists":false}';
  exit;
}

$contentId = $_GET['contentId'];
$typeId = $_GET['typeId'];

$votes = $db->query("select * from Rating where contentId=? and userId=? and typeId=?", $contentId, $_SESSION['user']['id'], $typeId);

if(count($votes)>0){
  echo '{"exists":true,"value":'.$votes[0]['value'].'}';
} else {
  echo '{"exists":false}';
}

?>
