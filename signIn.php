<?php
/////////////////////////////try include /////////////////////////////
$dbhost = 'elephant.ecs.westminster.ac.uk';
$dbuser = 'w1469432';
$dbpass = '5FV3qg7lngXb';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) ;
if (!$conn)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("w1469432_0", $conn);

/////////////////////////////try include /////////////////////////////

//Fetching Values from URL
$emailL=$_POST['emailL'];  
$passwordL=$_POST['passwordL'];


$query = mysql_query("SELECT password, nickname FROM people where email = '".$emailL."' "); 
$data = array();
while ($row = mysql_fetch_array($query)) {
    $data[] = $row;
}

echo json_encode($data);

?>