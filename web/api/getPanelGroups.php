<?php

session_start();

require_once '../php/Forum.php';

$panelId = $_GET['panelId'];

$groups = $db->query("select * from PanelGroup where panelId=?", $panelId);

echo json_encode($groups);

?>
