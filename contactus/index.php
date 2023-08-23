<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Politics | The Pauper's Post</title>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        
        <link rel="icon" type="image/png" href="../res/ast/fav.ico">
<!--        <link href="css/style.css" rel="stylesheet" type="text/css">-->
        <link href="../css/general.css" rel="stylesheet" type="text/css">
        <link href="../css/hearth.css" rel="stylesheet" type="text/css">
        <link href="../css/settings.css" rel="stylesheet" type="text/css">
        
        <script src="../js/general.js"></script>
<!--        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>-->
        <script src="../js/ajax.min.js"></script>
        <script>
            var user = "<?php echo $_SESSION['pname'] ?>";
        </script>
        <script src="../js/contact.js"></script>
    </head>
    <body>
        <div class="title-main">
            <div id="auth-cont" style="width: 100%; background-color: #eee; border-bottom:2px solid brown; margin-bottom: 20px;">
                <div id="inner-div" style="width: 900px; display: block; margin: auto; height: 28px; overflow: hidden;">
                    <?php
                        if (isset($_SESSION['auth'])) {
                            // if variable exists
                            if ($_SESSION['auth'] == false) {
                                echo '<div style="text-align: center;"><a href="./sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="./sign/up/">Sign Up</a></div>';
                            } else {
                                echo '<div style="float: left;"><a href="#" onclick="logOut(\'../php/leave.php\')" style="float: left; margin-left: 0px;">Log Out</a></div><div style="float: right;"><a href="../dashboard">Dashboard</a><a href="#">Settings</a>&emsp;<a href="../publish/">Write</a></div><div style="width: 200px;margin: 0px auto; margin-top: -5px;"><p style="text-align: center; font-size: 12px; display: block;">Welcome, ' . $_SESSION['fname'] . ' ' . $_SESSION['lname'] . '</p></div>';
                            }
                        } else {
                            // if variable doesn't exist
                            echo '<div style="text-align: center;"><a href="../sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="../sign/up/">Sign Up</a></div>';
                        }
                    ?>
                </div>
            </div>
            
<!--            <p class="title">THE PAUPER'S POST</p>-->
            <img id="title-pic" onclick="window.location='../'" src="../res/ast/title.png" style="width: 400px; display: block; margin: auto;">
            <p id="sub-title" class="sub-title">COVERAGE OF THE PEOPLE, BY THE PEOPLE</p>
<!--            <button onclick="logOut('./php/leave.php')" style="position: absolute; top: 20px; left: 5px;">LOG OUT</button>-->
            
            <img id="drop-but" src="../res/ast/more.png" style="width: 30px; border-radius: 6px; position: absolute; top: 30px; left: 20px; display: none;">
            
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
        <div id="body-cont">
            <div id="pol-cont" style="width: 80%; display: block; margin: auto; margin-bottom: 80px;">
                <form method="post" method="post.php?mod=contact" style="display: block; overflow: auto;">
                    <div style="position: relative; display: inline-block; padding: 0; float: left; width: 48%;">
                        <label style="position: absolute; top: 15px; left: 16px; text-align: center; line-height: 0px; color: brown;">FIRST NAME</label>
                        <input id="fname" type="text" value="<?php echo $_SESSION['fname'] ?>">
                    </div>
                </form>
            </div>
            
            <div id="footer" class="widest" style="border-top: 1px solid #ddd;">
                <div style="width: 100%; background-color: #ddd;">
                    <div id="ref-div" style="text-align: center; min-height: 260px; width: 80%; margin: auto;">
                        <div id="small-div-1" class="wider">
                            <div class="small info-box" style="float: left;">
                                <img src="../res/ast/title.png" style="width: 80%; display: block; margin: auto;">
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
                                <a href="facebook.com"><img class="svg" src="../res/ast/twitter.svg"></a>
                                <a href="facebook.com"><img class="svg" src="../res/ast/facebook.svg"></a>
                                <a href="facebook.com"><img class="svg" src="../res/ast/discord.svg"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; background-color: #111; display: block;">
                    <p style="text-align: center; color: white; font-family: monospace; padding: 20px 0px; margin: 0px;">© Copyright 2020, The Pauper's Post</p>
                </div>
            </div>
            
        </div>
    </body>
</html>
























