<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>The Pauper's Post | You are the Journalist</title>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        
        <link rel="icon" type="image/png" href="../../res/ast/fav.ico">
<!--        <link href="css/style.css" rel="stylesheet" type="text/css">-->
        <link href="../../css/general.css" rel="stylesheet" type="text/css">
        <link href="../../css/sign.css" rel="stylesheet" type="text/css">
        
<!--        <script src="js/script.js"></script>-->
<!--        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>-->
        <script src="js/ajax.min.js"></script>
        <script>
            var user = "<?php echo $_SESSION['user'] ?>";
        </script>
<!--        <script src="js/hearth.js"></script>-->
    </head>
    <body>
        <div class="title-main">
            <img id="title-pic" onclick="window.location='../../'" src="../../res/ast/title.png" style="width: 400px; display: block; margin: auto;">
            <p id="sub-title" class="sub-title">WELCOME BACK, JOURNALIST</p>
            
<!--
            <p class="title">THE PAUPER'S POST</p>
            <p class="sub-title">THE NEWS OUTLET THAT ALLOWS YOU ... TO BE THE JOURNALIST</p>
-->
            <p style="text-align: center; margin-top: 40px;"><button style="background-color: #222; color: white;">SIGN IN</button> OR <button onclick="window.location='../up/'">SIGN UP</button></p>
        </div>
        
        <div id="sign-box">
            <form name="signin" method="post" action="../../php/access.php?mod=in">
                <p style="text-align: center; line-height: 0px; font-size: 17px; letter-spacing: 3px;">GREATNESS AWAITS</p>
                <input name="email" type="email" placeholder="yours@example.com" required>
                <input name="pass" type="password" placeholder="password" required>
                <div style="width: 250px; display: block; margin: auto;"><input type="checkbox" required><p style="display: inline;">I HEREBY AGREE TO ENJOY LIFE</p></div>
                <br><br>
                <input type="submit">
            </form>
        </div>
    </body>
</html>
























