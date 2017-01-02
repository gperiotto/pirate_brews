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
$name2=$_POST['name1'];
$email2=$_POST['email1'];
$subject2=$_POST['subject1'];
$message2=$_POST['message1'];


//Insert query 
  $query = mysql_query("insert into contact_us(user_Name, user_Email, user_Subject, user_Message) values ('$name2', '$email2', '$subject2','$message2')");
  $exeprodSQL=mysql_query($query) or die(mysql_error());
  echo "Form Submitted succesfully";  
//connection closed 

?>