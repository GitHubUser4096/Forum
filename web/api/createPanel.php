<?php

session_start();

require_once '../php/Forum.php';

$name = $_POST['name'];

$db->insert("insert into Panel(name) values (?)", $name);

?>
