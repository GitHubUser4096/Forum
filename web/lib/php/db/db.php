<?php

class DB {

  public $db;

  function __construct($server, $username, $password, $dbName){
    $this->db = new mysqli($server, $username, $password, $dbName);
    if($this->db->connect_error) die($this->$db->connect_error);
  }

  function execute($query, ...$args) {

    $stmt = $this->db->prepare($query);
    if(!$stmt) die('Invalid statement: '.$query);
    if(count($args)>0){
      $stmt->bind_param(str_repeat("s", count($args)), ...$args);
    }
    $executed = $stmt->execute();
    if(!$executed) die('Failed executing statement '.$query.': '.$this->db->error);
    $stmt->close();

  }

  function query($query, ...$args) {

  	$stmt = $this->db->prepare($query);
  	if(!$stmt) die('Invalid statement: '.$query);
  	if(count($args)>0){
  		$stmt->bind_param(str_repeat("s", count($args)), ...$args);
  	}
  	$executed = $stmt->execute();
  	if(!$executed) die('Failed executing statement '.$query.': '.$this->db->error);
  	$res = $stmt->get_result();
  	$stmt->close();

  	if(!$res) return false;

  	$rows = [];

  	while($row = $res->fetch_assoc()){
  		$rows[count($rows)] = $row;
  	}

  	return $rows;

  }

  function insert($query, ...$args) {

  	$stmt = $this->db->prepare($query);
  	if(!$stmt) die('Invalid statement: '.$query);
  	if(count($args)>0){
  		$stmt->bind_param(str_repeat("s", count($args)), ...$args);
  	}
  	$executed = $stmt->execute();
  	if(!$executed) die('Failed executing statement '.$query.': '.$this->db->error);
  	$res = $this->db->insert_id;
  	$stmt->close();

  	return $res;

  }

  function close(){
  	$this->db->close();
  }

  function __destruct(){
    $this->close();
  }

}

?>
