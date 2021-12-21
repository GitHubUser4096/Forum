<?php

session_start();

require_once '../php/Forum.php';

$id = $_GET['id'];
$groups = $db->query("select * from PanelGroup where id=?", $id);

if(count($groups)==0){
  echo '{"success":false,"message":"Panel group does not exist"}';
  exit;
}

echo '{"success":true,"content":'.json_encode($groups[0])."}";

?>
