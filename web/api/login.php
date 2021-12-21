<?php

session_start();

require_once '../php/Forum.php';

$username = $_POST['username'];
$password = $_POST['password'];

$query = $db->query("select * from User where username=?", $username);

if(count($query)==0) {
  echo '{"success":false,"message":"User does not exist!"}';
  exit;
}

$dbPassword = $query[0]['passwordHash'];

$validPassword = password_verify($password, $dbPassword);

if(!$validPassword){
  echo '{"success":false,"message":"Invalid password!"}';
  exit;
}

$_SESSION['user'] = $query[0];

echo '{"success":true}';

?>
