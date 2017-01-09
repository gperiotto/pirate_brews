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
$db_fav=$_POST['db_fav'];
$db_hints=$_POST['db_hints'];  
$db_tokens=$_POST['db_tokens'];
$db_score=$_POST['db_score'];
$db_nickname=$_POST['db_nickname'];
$db_email=$_POST['db_email'];

$query = mysql_query("update people set achivementsPoints = '".$db_score."' ,  hints = '".$db_hints."',  favorites = '".$db_fav."' ,  tokens = '".$db_tokens."' where email = '".$db_email."'");

$data = array();
while ($row = mysql_fetch_array($query)) {
    $data[] = $row;
}

// UPDATE suppliers
// SET supplier_id = 150,
//     supplier_name = 'Apple',
//     city = 'Cupertino'
// WHERE supplier_name = 'Google';

echo json_encode($data);

?>