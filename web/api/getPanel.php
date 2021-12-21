<?php

session_start();

require_once '../php/Forum.php';

$id = $_GET['id'];
$panels = $db->query("select * from Panel where id=?", $id);

if(count($panels)==0){
  echo '{"success":false,"message":"Panel does not exist"}';
  exit;
}

echo '{"success":true,"content":'.json_encode($panels[0]).'}';

?>
