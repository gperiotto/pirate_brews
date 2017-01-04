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
echo "".$conn."";
/////////////////////////////try include /////////////////////////////

//Fetching Values from URL  
$name2=$_POST['name1'];
$surname2=$_POST['surname1'];
$email2=$_POST['email1'];
$password=$_POST['password1'];
$nickname2=$_POST['nickname1'];
$password2= md5($password);



//Insert query 
  $query = mysql_query("insert into user_table(user_Name, user_Email, user_Surname, user_Password, user_Nickname ) values ('$name2', '$email2', '$surname2', '$password2', '$nickname2')");
  $exeprodSQL=mysql_query($query) or die(mysql_error());
  echo "Form Submitted succesfully";  
//connection closed 

?>