<?php
    session_start();

    if (isset($_SESSION['auth']) == false or $_SESSION["auth"] == null) {
        echo "<script>window.location='../';</script>";
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>The Pauper's Post | Publish</title>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        
        <link rel="icon" type="image/png" href="../res/ast/fav.ico">
<!--        <link href="css/style.css" rel="stylesheet" type="text/css">-->
        <link href="../css/hearth.css" rel="stylesheet" type="text/css">
        <link href="../css/general.css" rel="stylesheet" type="text/css">
        <link href="../css/post.css" rel="stylesheet" type="text/css">
        
        <script src="../js/general.js"></script>
        <script src="../js/post.js"></script>
<!--        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>-->
        <script src="../js/ajax.min.js"></script>
        <script>
            var user = "<?php echo $_SESSION['pname'] ?>";
        </script>
    </head>
    <body>
        <div class="title-main">
            <div id="auth-cont" style="width: 100%; background-color: #eee; border-bottom:2px solid brown; margin-bottom: 20px;">
                <div id="inner-div" style="width: 900px; display: block; margin: auto; height: 28px; overflow: hidden;">
                    <?php
                        if (isset($_SESSION['auth'])) {
                            // if variable exists
                            if ($_SESSION['auth'] == false) {
                                echo '<div style="text-align: center;"><a href="./sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="../sign/up/">Sign Up</a></div>';
                            } else {
                                echo '<div style="float: left;"><a href="#" onclick="logOut(\'../php/leave.php\')" style="float: left; margin-left: 0px;">Log Out</a></div><div style="float: right;"><a href="../dashboard">Dashboard</a><a href="../settings">Settings</a>&emsp;<a href="#">Write</a></div><div style="width: 200px;margin: 0px auto; margin-top: -5px;"><p style="text-align: center; font-size: 12px; display: block;">Welcome, ' . $_SESSION['fname'] . ' ' . $_SESSION['lname'] . '</p></div>';
                            }
                        } else {
                            // if variable doesn't exist
                            echo '<div style="text-align: center;"><a href="../sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="../sign/up/">Sign Up</a></div>';
                        }
                    ?>
                </div>
            </div>
            
            <img id="title-pic" onclick="window.location='../'" src="../res/ast/title.png" style="width: 400px; display: block; margin: auto;">
            <p id="sub-title" class="sub-title">THE NEWS OUTLET THAT ALLOWS YOU ... TO BE THE JOURNALIST</p>
<!--            <p class="title" onclick="window.location='../'">THE PAUPER'S POST</p>-->
<!--            <p class="sub-title">THE NEWS OUTLET THAT ALLOWS YOU ... TO BE THE JOURNALIST</p>-->
        </div>
        
        <div id="body-cont">
            <div style="width: 80%; display: block; margin: auto;">
                <div style="width: 29%; float: left;">
                    <p style="font-size: 24px; text-align: center;">ARTICLE VISUALS</p>
                    <p style="font-size: 12px; line-height: 0px; text-align: center; margin-top: -12px;">What Catches the Reader's Attention</p>
                </div>
                <div style="width: 69%; float: right;">
                    <p style="font-size: 24px; text-align: center;">THE ARTICLE ITSELF</p>
                    <p style="font-size: 12px; line-height: 0px; text-align: center; margin-top: -12px;">Check yor Grammer</p>
                </div>
            </div>
            <div style="width: 80%; display: block; margin: auto;">
                
                <form name="article" method="post" action="../php/post.php?mod=publish" enctype="multipart/form-data">
                    <div class="pub-cont" style="width: 29%; float: left;">
                        <div style="margin: 20px; display: block; background-color: #eee;">
                            <div id="tag-div-conts" style="display: block; width: 100%; margin-bottom: 10px;">
                                <div style="width: 100%; display: block; height: 40px;">
                                    <div style="display: inline;"><input id="tag-create-name" type="text" style=" width: 200px; pading: 0;border: 1px solid black; margin: 0; display: inline;" placeholder="tags"><input type="color" id="tag-create-color"></div>
                                    <div class="tag" style="position: static; display: inline; background-color: grey; cursor: pointer;" onclick="createTag()">ADD tag</div>
                                </div>
                                <div id="tag-div" style="width: 100%; display: block; min-height: 30px;">
                                </div>

                                <input id="tags" name="tags" type="text" style="display: none;" value="[" required>
                            </div>

                            <input name="lead-pic" id="lead" type='file' required>
                            <div id="lead-cont" style="display: none; position: relative">
                                <img id="leadImg" src="#" alt="your image" width=100%>
                                <div class="tag" style="top: 15px; cursor: pointer; font-family: monospace; background-color: #cc0000; position:absolute; top: 10px; left: 10px;" onclick="removeImg()">remove</div>
                            </div>
                            <a href="https://unsplash.com/" target="_blank">Unsplash | Suggested</a><br><br>
                            <a href="https://pixabay.com/" target="_blank">Pixabay</a><br>
                            <a href="https://stocksnap.io/" target="_blank">Stock Snap</a><br>
                            <a href="https://www.pexels.com/" target="_blank">Pexels</a><br>
                            
                        </div>
                    </div>


                    <div class="pub-cont" style="width: 69%; float: right;">
                        <div style="margin: 20px; display: block; background-color: #eee;">
                            
                            <textarea name="headline" id="head-line" placeholder="HEADLINE" required></textarea>
                            
                            <textarea name="article" id="article-box" placeholder="THIS IS THE AREA WHERE YOU CAN WRITE YOUR ARTICLE OR COPY AND PASTE YOUR PREVIOUSLY-WRITTEN ARTICLE. ONCE COMPLETED, ENSURE THAT YOU HAVE A LEAD, OR AN IMAGE FOR YOUR ARTICLE. IF YOU DO NOT KNOW WHERE TO RETRIEVE AN IMAGE, YOU CAN USE SOME OF THE FREE STOCK PHOTO WEBSITES LISTED TO THE LEFT..." required></textarea>
                        </div>
                    </div>
                    
                    <input id="sub-but" type="submit" style="display: none;">
                    <button onclick="prepPub()">PUBLISH</button>
                </form>
                
                
            </div>
            
            <div id="footer" class="widest" style="border-top: 1px solid #ddd;  margin-top: 100px;">
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
























