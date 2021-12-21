<?php

session_start();

require_once '../php/Forum.php';

$panelId = $_POST['panelId'];
$name = $_POST['name'];

$db->insert("insert into PanelGroup(panelId, name) values (?, ?)", $panelId, $name);

?>
