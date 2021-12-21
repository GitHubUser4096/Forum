<?php

// TODO offset, limit

session_start();

require_once '../php/Forum.php';

$posts = $db->query("select * from Post");

for($i=0; $i<count($posts); $i++){

  $posts[$i]['content'] = $db->query("select * from Content where id=?", $posts[$i]['contentId'])[0];
  $posts[$i]['content']['user'] = $db->query("select username from User where id=?", $posts[$i]['content']['userId'])[0];
  $posts[$i]['content']['blocks'] = $db->query("select * from Block where contentId=?", $posts[$i]['content']['id']);

}

echo json_encode($posts);

?>
