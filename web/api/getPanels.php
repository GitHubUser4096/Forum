<?php

session_start();

require_once '../php/Forum.php';

$panels = $db->query("select * from Panel");

echo json_encode($panels);

?>
