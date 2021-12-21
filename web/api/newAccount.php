<?php

session_start();

require_once '../php/Forum.php';

$username = $_POST['username'];
$password = $_POST['password'];

$query = $db->query("select * from User where username=?", $username);

if(count($query)>0) {
  echo '{"success":false,"message":"User already exists!"}';
  exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$userId = $db->insert("insert into User(username, passwordHash) values (?, ?)", $username, $passwordHash);

$_SESSION['user'] = ['id'=>$userId,'username'=>$username];

echo '{"success":true}';

?>
