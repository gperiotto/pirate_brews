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
$fnameS=$_POST['firstNameS'];
$snameS=$_POST['lastNameS'];
$emailS=$_POST['emailS'];  
$passwordS=$_POST['passwordS'];
$nickS=$_POST['nickS'];



$query = mysql_query("insert into people(email, firstName, lastName, password, nickname, achivementsPoints, favorites, newsletterBoost, bookingBoosts, hints, location ) 
                                        values ('$emailS', '$fnameS', '$snameS', '$passwordS', '$nickS', ' ', ' ', ' ', ' ', ' ', ' ')")or die(mysql_error()); 


echo "Sign Up Success!";

?>