<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>insert page</title></head>
<body>
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
</body>
</html>