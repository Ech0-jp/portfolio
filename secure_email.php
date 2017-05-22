<?php
    if(isset($_POST["submit"])){
        $name = $_POST["name"];
        $email = $_POST["email"];
        $sub = $_POST["sub"];
        $msg = $_POST["msg"];
        $from = "From: ech0-jp.portfolio";
        $to = "hit-the-hills@hotmail.ca";
        $body = "From: $name\nEmail: $email\n\nMessage:\n$msg";
        
        if (mail($to, $sub, $body, $from)){
            echo '<p>Your message has been sent!<p>';
        } else {
            echo '<p>Something went wrong! Please try again!<p>';
        }
    }
?>