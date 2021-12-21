<?php

session_start();

require_once '../php/Forum.php';

$parent = $_GET['parent'];
// TODO offset, limit, depth

function getComments($db, $parent){

  $comments = $db->query("select * from Comment where parentId=?", $parent);

  for($i=0; $i<count($comments); $i++){

    $comments[$i]['content'] = $db->query("select * from Content where id=?", $comments[$i]['contentId'])[0];
    $comments[$i]['content']['user'] = $db->query("select username from User where id=?", $comments[$i]['content']['userId'])[0];
    $comments[$i]['content']['blocks'] = $db->query("select * from Block where contentId=?", $comments[$i]['content']['id']);
    $comments[$i]['comments'] = getComments($db, $comments[$i]['content']['id']);

  }

  return $comments;

}

$comments = getComments($db, $parent);

echo json_encode($comments);

?>
