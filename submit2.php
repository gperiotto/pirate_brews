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
$location2=$_POST['location1'];
$date2=$_POST['date1'];

//inner join 



$query = mysql_query("SELECT time FROM booking "); 
$data = array();
while ($row = mysql_fetch_array($query)) {
    $data[] = $row;
}

echo json_encode($data);


//Insert query 
 // $query1 = mysql_query("insert into bookingInfo(user_Name, user_Email, user_Location, user_Date) values ('$name2', '$email2', '$location2','$date2')");
 // $exeprodSQL1=mysql_query($query1) or die(mysql_error());
 // echo "Form Submitted succesfully";  
//connection closed 

?>