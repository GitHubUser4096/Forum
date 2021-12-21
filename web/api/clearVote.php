<?php

session_start();

require_once '../php/Forum.php';

if(!isSet($_SESSION['user'])){
  echo '{"success":false,"message":"Not logged in!"}';
  exit;
}

$contentId = $_POST['contentId'];
$typeId = $_POST['typeId'];

$db->execute("delete from Rating where contentId=? and userId=? and typeId=?", $contentId, $_SESSION['user']['id'], $typeId);

echo '{"success":true}';

?>
