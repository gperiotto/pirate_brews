<?php

$email2=$_POST['email1'];


$to      = $email2;
$subject = 'NewsLetter';
$msg = 'https://w1524720.users.ecs.westminster.ac.uk/newsletter/newsletter.html'; 
$headers = 'From: w1524720@my.westminster.ac.uk' . "\r\n" .
    'Reply-To: w1524720@my.westminster.ac.uk' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $msg, $headers);
?> 