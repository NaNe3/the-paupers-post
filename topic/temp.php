<?php
    session_start();
//    if (isset($_SESSION['auth'])) {
//        echo "<script> var auth = true; var per = '" . $_SESSION['user'] . "';</script>";
//    } else {
//        echo "<script> var auth = false; var per = 'none'</script>";
//    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1">
    </head>
    <body>
        
        <div class="title-main">
            <div id="auth-cont" style="width: 100%; background-color: #eee; border-bottom:2px solid brown; margin-bottom: 20px;">
                <div id="inner-div" style="width: 900px; display: block; margin: auto; height: 28px; overflow: hidden;">
                    <?php
                        if (isset($_SESSION['auth'])) {
                            // if variable exists
                            if ($_SESSION['auth'] == false) {
                                echo '<div style="text-align: center;"><a href="../../sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="../../sign/up/">Sign Up</a></div>';
                            } else {
                                echo '<div style="float: left;"><a href="#" onclick="logOut(\'../../php/leave.php\')" style="float: left; margin-left: 0px;">Log Out</a></div><div style="float: right;"><a href="../../dashboard">Dashboard</a><a href="../../settings">Settings</a>&emsp;<a href="../../publish">Write</a></div><div style="width: 200px;margin: 0px auto; margin-top: -5px;"><p style="text-align: center; font-size: 12px; display: block;">Welcome, ' . $_SESSION['fname'] . ' ' . $_SESSION['lname'] . '</p></div>';
                            }
                        } else {
                            // if variable doesn't exist
                            echo '<div style="text-align: center;"><a href="../sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="../sign/up/">Sign Up</a></div>';
                        }
                    ?>
                </div>
            </div>
<!--            <p class="title">THE PAUPER'S POST</p>-->
            <img id="title-pic" onclick="window.location = '../../'" src="../../res/ast/title.png" style="width: 400px; display: block; margin: auto;">
            <p id="sub-title" class="sub-title">COVERAGE OF THE PEOPLE, BY THE PEOPLE</p>
<!--            <button onclick="logOut('./php/leave.php')" style="position: absolute; top: 20px; left: 5px;">LOG OUT</button>-->
            
            <img id="drop-but" src="../../res/ast/more.png" style="width: 40px; border-radius: 6px; position: absolute; top: 30px; left: 20px; display: none;">
            <img id="pro-but" src="../../res/ast/pro.png" style="width: 40px; border-radius: 6px; position: absolute; top: 30px; right: 20px; display: none;">
            
            <?php
//                if (isset($_SESSION['auth'])) {
//                    // if variable exists
//                    if ($_SESSION['auth'] == false) {
//                        echo '<p style="text-align: center; position: absolute; top: 5px; right: 5px;"><button  onclick="window.location=\'./sign/in/\'">SIGN IN</button> OR <button onclick="window.location=\'./sign/up/\'">SIGN UP</button></p>';
//                    } else {
//                        echo 'WELCOME ' . $_SESSION['pname'];
//                    }
//                } else {
//                    // if variable doesn't exist
//                    echo '<p style="text-align: center; position: absolute; top: 5px; right: 5px;"><button  onclick="window.location=\'./sign/in/\'">SIGN IN</button> OR <button onclick="window.location=\'./sign/up/\'">SIGN UP</button></p>';
//                }
            ?>
        </div>
        
        <div id="parent-info" style="max-width: 2000px; width: 50%; display: block; margin: auto; margin-bottom: 100px;">
            <h1 id="headline" style="text-align: center; font-family: arial; font-size: 36px; line-height: 36px;"></h1>
            <p id="info" style="color: grey; text-align: center; font-weight: 200;"></p>
            <img id="lead" src="#" style="width: 100%"><br>
            <p id="article" style="font-size: 20px; font-family: sans-serif; margin: 30px 60px; line-height: 38px; color: #444; font-weight: 200;"></p>
        </div>
        
        <div id="next-cont" style="width: 100%; background-color: #ccc; height: 200px; margin-bottom: 100px;">
            <p id="mobile-next" style="font-family: sans-serif; margin: 10px 0px; padding: 5px 10px; font-size: 18px; color: brown; text-align: center; display: none;">UP NEXT</p>
            <div id="next-div" style="max-width: 2000px; width: 60%; display: block; margin: auto; position: relative;">
                <img id="lead-next" src="../../img/bsfr.jpg" style="width: 400px; margin-top: -12px; border-radius: 3px; float: left; cursor: pointer;">
                <div style="margin: 0px 0px 0px 420px; padding-top: 20px;">
                    <p style="font-family: sans-serif; border-bottom: 3px solid brown; margin: 0; padding: 5px 10px; font-size: 18px; color: grey; display: inline;">UP NEXT</p>
                    <p id="head-next" style="font-size: 20px; font-family: arial; margin: 20px 0 0 0;;"></p>
                    <p id="name-next" style="font-weight: 200; font-size: 15px; margin: 10px 0;"></p>
                </div>
            </div>
        </div>
        
        <div id="footer" class="widest">
            <div id="newsletter-form" style="padding-top: 25px;">
                    <p style="text-align: center; font-family: arial; font-size:30px;">THE PAUPER'S NEWSLETTER</p>
                    <p style="color: grey; font-size: 12px;text-align: center;">WE GET YOUR EMAIL AND YOU GET OUR NEWS</p>
                    <div id="news-form" name="news" style="padding-bottom: 50px; margin: auto; width: 30%;">
                        <div id="letter-box" style="width: 100%; overflow: auto;">
                            <input id="news-email-box" type="email" placeholder="yours@example.com" style="text-align: center; width: 68%; float: left;">
                        
                            <button id="go-but" style="background-color: brown; border: 1px solid brown; color: white;  width: 28%; float: right; margin: 0; padding: 14px 8px;" onclick="addEmail('../../');">GO</button>
                        </div>
                        <p id="congrat-text" style="display: none; text-align: center;">Thank You For Signing Up For Our Newsletter! We Look Forward To Connecting With You!</p>
                    </div>
                </div>
            <div style="width: 100%; max-width: 2000px; margin: auto; background-color: #ddd;">
                <div id="ref-div" style="text-align: center; min-height: 260px; width: 80%; margin: auto;">
                    <div id="small-div-1" class="wider">
                        <div class="small info-box" style="float: left;">
                            <img src="../../res/ast/title.png" style="width: 80%; display: block; margin: auto;">
                        </div>
                        <div class="small info-box" style="float: left;">
                            <p>STUFF FOR US</p>
                            <a href="facebook.com">Advertise</a>
                            <a href="facebook.com">Contact Us</a>
                        </div>
                        <div class="small info-box" style="float: left;">
                            <p>STUFF FOR YOU</p>
                            <a href="facebook.com">Privacy Policy</a>
                            <a href="facebook.com">Terms Of Use</a>
                            <a href="facebook.com" style="visibility: hidden;">invisible</a>
                            <a href="facebook.com">Opportunities</a>
                        </div>
                    </div>
                    <div id="small-div-2" class="small" style="float: right;">
                        <div id="social-box" style="padding-top: 47px; text-align: center;">
                            <a href="facebook.com"><img class="svg" src="../../res/ast/twitter.svg"></a>
                            <a href="facebook.com"><img class="svg" src="../../res/ast/facebook.svg"></a>
                            <a href="facebook.com"><img class="svg" src="../../res/ast/discord.svg"></a>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 100%; background-color: #111; display: block;">
                <p style="text-align: center; color: white; font-family: monospace; padding: 20px 0px; margin: 0px;">© Copyright 2020, The Pauper's Post</p>
            </div>
        </div>
        
        <script src="../../js/ajax.min.js"></script>
        <script src="../../js/general.js"></script>
        <script src="../../js/article.js"></script>
    </body>
</html>