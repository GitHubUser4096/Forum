<?php

session_start();

if(!isSet($_SESSION['user'])) {
  echo '{"loggedIn":false}';
  exit;
}

echo '{"loggedIn":true,"username":"'.$_SESSION['user']['username'].'"}';

?>
