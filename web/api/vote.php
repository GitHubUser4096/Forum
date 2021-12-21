<?php

session_start();

require_once '../php/Forum.php';

if(!isSet($_SESSION['user'])){
  echo '{"success":false,"message":"Not logged in!"}';
  exit;
}

$contentId = $_POST['contentId'];
$typeId = $_POST['typeId'];
$value = $_POST['value'];

$currentVote = $db->query("select * from Rating where contentId=? and userId=? and typeId=?", $contentId, $_SESSION['user']['id'], $typeId);

if(count($currentVote)>0){
  $db->execute("update Rating set value=? where contentId=? and userId=? and typeId=?", $value, $contentId, $_SESSION['user']['id'], $typeId);
} else {
  $db->execute("insert into Rating(contentId, userId, typeId, value) values (?, ?, ?, ?)", $contentId, $_SESSION['user']['id'], $typeId, $value);
}

echo '{"success":true}';

?>
