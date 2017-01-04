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
$nameB=$_POST['nameB'];
$emailB=$_POST['emailB'];  
$locationB=$_POST['locationB'];
$dateB=$_POST['dateB'];
$timeB=$_POST['timeB'];



$query = mysql_query("insert into booking(name, email, location, date, time ) values ('$nameB', '$emailB', '$locationB', '$dateB', '$timeB')"); 


echo "Booking submitted!";

?>