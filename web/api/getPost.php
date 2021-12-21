<?php

session_start();

require_once '../php/Forum.php';

$post = $db->query("select * from Post where id=?", $_GET['id'])[0];

$post['content'] = $db->query("select * from Content where id=?", $post['contentId'])[0];
$post['content']['user'] = $db->query("select username from User where id=?", $post['content']['userId'])[0];
$post['content']['blocks'] = $db->query("select * from Block where contentId=?", $post['content']['id']);

echo json_encode($post);

?>
