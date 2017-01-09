<?php


$email2=$_POST['emailP'];
$String=$_POST['string'];


$to = $email2;
$subject = 'Favourite POI list ';
$msg = $String; 

$headers = 'From: w1524720@my.westminster.ac.uk' . "\r\n" .
    'Reply-To: w1524720@my.westminster.ac.uk' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $msg, $headers);

?> 