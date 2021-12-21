<?php

session_start();

require_once '../php/Forum.php';

if(!isSet($_SESSION['user'])){
  echo '{"success":false,"message":"Not logged in!"}';
  exit;
}

$post = json_decode(file_get_contents('php://input'));

$contentId = $db->insert("insert into Content(userId, dateTimePosted) values (?, NOW())", $_SESSION['user']['id']);

$postId = $db->insert("insert into Post(title, contentId) values (?, ?)", $post->title, $contentId);

foreach($post->content->blocks as $block){
  $db->insert("insert into Block(text, blockType, meta, contentId) values (?, ?, ?, ?)", $block->text, $block->blockType, $block->meta, $contentId);
}

echo '{"success":true}';

?>
