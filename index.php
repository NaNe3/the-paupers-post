<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>The Pauper's Post | You are the Journalist</title>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        
        <link rel="icon" type="image/png" href="./res/ast/fav.ico">
<!--        <link href="css/style.css" rel="stylesheet" type="text/css">-->
        <link href="css/general.css" rel="stylesheet" type="text/css">
        <link href="css/hearth.css" rel="stylesheet" type="text/css">
        
        <script src="js/general.js"></script>
<!--        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>-->
        <script src="js/ajax.min.js"></script>
        <script src="js/imagesloaded.pkgd.min.js"></script>
        <script>
            var user = "<?php echo $_SESSION['pname'] ?>";
        </script>
        <script src="js/hearth.js"></script>
    </head>
    <body>
        <div class="title-main">
            <div id="auth-cont" style="width: 100%; background-color: #eee; border-bottom:2px solid brown;">
                <div id="inner-div" style="max-width: 900px; display: block; margin: auto; height: 28px; overflow: hidden;">
                    
<!--                LOGGED IN-->
<!--
                    <div style="float: left;">
                        <a href="#" onclick="logOut('../php/leave.php')" style="float: left; margin-left: 0px;">Log Out</a>
                    </div>
                    <div style="float: right;">
                        <a href="#">Dashboard</a>
                        <a href="#">Settings</a>&emsp;
                        <a href="./publish/">Write</a>
                    </div>
                    <div style="width: 200px;margin: 0px auto; margin-top: -5px;"><p style="text-align: center; font-size: 12px; display: block;">Welcome Eli Summers</p></div>
-->

<!--
                    <div style="text-align: center;">
                    <a href="./sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span>
                    <a href="./sign/up/">Sign Up</a></div>
-->     
                    <?php
                        if (isset($_SESSION['auth'])) {
                            // if variable exists
                            if ($_SESSION['auth'] == false) {
                                echo '<div style="text-align: center;"><a href="./sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="./sign/up/">Sign Up</a></div>';
                            } else {
                                echo '<div style="float: left;"><a href="#" onclick="logOut(\'./php/leave.php\')" style="float: left; margin-left: 0px;">Log Out</a></div><div style="float: right;"><a href="./dashboard/">Dashboard</a><a href="./settings/">Settings</a>&emsp;<a href="./publish/">Write</a></div><div style="width: 200px;margin: 0px auto; margin-top: -5px;"><p style="text-align: center; font-size: 12px; display: block;">Welcome, ' . $_SESSION['fname'] . ' ' . $_SESSION['lname'] . '</p></div>';
                            }
                        } else {
                            // if variable doesn't exist
                            echo '<div style="text-align: center;"><a href="./sign/in/">Sign In</a> <span style="font-family: arial; font-size: 12px;">&emsp;or&emsp;</span><a href="./sign/up/">Sign Up</a></div>';
                        }
                    ?>
                </div>
            </div>
<!--            <p class="title">THE PAUPER'S POST</p>-->
            <img id="title-pic" src="res/ast/title.png" style="width: 400px; display: block; margin: auto;  margin-top: 20px;">
            <p id="sub-title" class="sub-title">COVERAGE OF THE PEOPLE, BY THE PEOPLE</p>
<!--            <button onclick="logOut('./php/leave.php')" style="position: absolute; top: 20px; left: 5px;">LOG OUT</button>-->
            
            <img id="drop-but" src="res/ast/more.png" style="width: 40px; border-radius: 6px; position: absolute; top: 30px; left: 20px; display: none;">
            <img id="pro-but" src="res/ast/pro.png" style="width: 40px; border-radius: 6px; position: absolute; top: 30px; right: 20px; display: none;">
            
            <div id="news-select" style="text-align: center; margin: 0px 0px 0px 0px;">
                <div style="display: inline-block; margin: auto;">
                    <div class="hil-mod" style="border-bottom: 3px solid brown"><p>Home</p></div>
                    <div class="hil-mod"><p onclick="window.location = './topic/politics'">Politics</p></div>
                    <div class="hil-mod"><p onclick="window.location = './topic/business'">Business</p></div>
                    <div class="hil-mod"><p onclick="window.location = './topic/technology'">Technology</p></div>
                    <div class="hil-mod"><p onclick="window.location = './topic/entertainment'">Entertainment</p></div>
                    <div class="hil-mod"><p onclick="window.location = './topic/lifestyle'">Lifestyle</p></div>
                    <div class="hil-mod"><p onclick="window.location = './topic/other'">Other</p></div>
                </div>
            </div>
        </div>
        <div id="body-cont">
            <div id="feat-cont" style="overflow: auto; margin-bottom: 100px; width: 80%; margin: auto;">
                
<!--                FEATURED POSTS AND STUF-->
<!--                -->
<!--                -->
                <div id="latest-div" class="latest-div" style="display: block; background-color: inherit; width: 62%; padding: 0; float: left;">
                    <div id="feat-box" style="display: inline-block; width: 100%; position: relative; overflow: hidden; white: inherit;">
                        
                    </div>
                    
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <p style="display: inline-block; font-size: 16px; font-family: Arial; border-bottom: 3px solid brown; border-radius: 3px; padding-bottom: 3px;">FEATURED STORIES</p>
                    </div>
                    <div id="feat-stories-box" style="display: inline-block; width: 100%; float: right;">
                        
                    </div>
                    
                </div>
                <div id="agg-cont" style="width: 36%; float: right; margin-left: 0px; margin-bottom: 50px;">
                    <div style="text-align: center;">
                        <p style="display: inline-block; font-size: 16px; font-family: Arial; border-bottom: 3px solid brown; border-radius: 3px; padding-bottom: 3px;">AGGREGATE NEWS</p>
                    </div>
                    <div id="link-box" style="max-width: 310px; margin: auto;">
                        
                    </div>
                </div>
            </div>
            
            
            <div style="width: 100%; background-color: #ccc; height: 200px;"></div>
<!--            NEWS THIS WEEK-->
            
            <div id="week-articles-box" style="margin: 100px 0px; margin: auto; overflow: auto;">
<!--
                <p style="font-size: 24px; text-align: center;">ARTICLES PUBLISHED THIS WEEK</p>
                <p id="week-date" style="font-size: 12px; line-height: 0px; text-align: center; margin-top: -12px;  margin-bottom: 50px;"></p>
-->
                
                <div id="week-box-cont" style="display: block; width: 80%; max-width: 1600px; margin: auto; margin-top: 50px;">
                    
                    <div id="week-left" style="display: block; width: 62%; padding-right: 2%; float: left;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <p style="display: inline-block; font-size: 16px; font-family: Arial; border-bottom: 3px solid brown; border-radius: 3px; padding-bottom: 3px;">MORE FROM US</p>
                        </div>
                        <div id="new-cont-right" style="width: 100%;">
<!--
                            <div class="new-cont">
                                <img src="img/gw.jpg">
                                <p>Crazy Lady talks about global warming and other things at the Joe Biden Town Hall...</p>
                            </div>
-->
                        </div>
                        <button onclick="grabNews();" style="width: 200px; display: block; margin: auto; background-color: brown; color: white; border: 0; margin-top: 50px; margin-bottom: 50px;">Load More</button>
                    </div>
                    
                    <div id="week-right" style="width: 36%; float: right; margin-left: 0px; margin-bottom: 50px;">
                        <div style="text-align: center;">
                            <p style="display: inline-block; font-size: 16px; font-family: Arial; border-bottom: 3px solid brown; border-radius: 3px; padding-bottom: 3px;">RELEVANT NEWS</p>
                        </div>
                        <div id="spot-box" style="max-width: 310px; margin: auto;">
<!--                            <p class="ag-link">Six Staffers Working On Trump’s Tulsa Rally Test Positive For COVID-19</p><hr>-->
                        </div>
                    </div>
                    
<!--
                    <div id="week-right" style="display: inline-block; width: 36%; float: right;">
                        <div id="new-cont-left" style="width: 100%; float: left;">
                            <div class="new-cont">
                                <img src="img/gw.jpg">
                                <p>Crazy Lady talks about global warming and other things at the Joe Biden Town Hall...</p>
                            </div>
                        </div>
                    </div>
-->
                </div>
            </div>
            
            
<!--            <div style="width: 100%; background-color: #ccc; height: 200px;"></div>-->
<!--
            OLD NEWS OLD NEWS OLD NEWS OLD NEWS OLD NEWS
            OLD NEWS OLD NEWS OLD NEWS OLD NEWS OLD NEWS
            OLD NEWS OLD NEWS OLD NEWS OLD NEWS OLD NEWS
            OLD NEWS OLD NEWS OLD NEWS OLD NEWS OLD NEWS
            OLD NEWS OLD NEWS OLD NEWS OLD NEWS OLD NEWS
-->
            
            <div class="widest" style="margin-top: 80px;">
                <div id="feat-parent" style="margin: 20px;">
<!--
                    <p style="font-size: 24px; text-align: center;">ARTICLES PUBLISHED AGES AGO</p>
                    <p style="font-size: 12px; line-height: 0px; text-align: center; margin-top: -12px;">May 1, 2020 - May 8, 2020</p>
-->
                    <div id="old-cont-box" class="latest-div" style="display: none;">
<!--                        THIS IS WHERE THE OLD POSTS GO-->
                    </div>
<!--                    <button onclick="grabOld();" style="width: 200px; display: block; margin: auto; background-color: brown; color: white; border: 0; margin-top: 50px; margin-bottom: 50px;">Load More</button>-->
                </div>
            </div>
            
            <div id="footer" class="widest">
                <div id="newsletter-form" style="padding-top: 25px;">
                    <p style="text-align: center; font-family: arial; font-size:30px;">THE PAUPER'S NEWSLETTER</p>
                    <p style="color: grey; font-size: 12px;text-align: center;">WE GET YOUR EMAIL AND YOU GET OUR NEWS</p>
                    <div id="news-form" name="news" style="padding-bottom: 50px; margin: auto; width: 30%;">
                        <div id="letter-box" style="width: 100%; overflow: auto;">
                            <input id="news-email-box" type="email" placeholder="yours@example.com" style="text-align: center; width: 68%; float: left;">
                        
                            <button id="go-but" style="background-color: brown; border: 1px solid brown; color: white;  width: 28%; float: right; margin: 0; padding: 14px 8px;" onclick="addEmail();">GO</button>
                        </div>
                        <p id="congrat-text" style="display: none; text-align: center;">Thank You For Signing Up For Our Newsletter! We Look Forward To Connecting With You!</p>
                    </div>
                </div>
                <div style="width: 100%; background-color: #ddd;">
                    <div id="ref-div" style="text-align: center; min-height: 260px; width: 80%; margin: auto;">
                        <div id="small-div-1" class="wider">
                            <div class="small info-box" style="float: left;">
                                <img src="res/ast/title.png" style="width: 80%; display: block; margin: auto;">
                            </div>
                            <div class="small info-box" style="float: left;">
                                <p>STUFF FOR US</p>
                                <a href="./contactus/?reason=adv">Advertise</a>
                                <a href="./contactus/">Contact Us</a>
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
                                <a target="_blank" href="https://twitter.com/thepauper_"><img class="svg" src="res/ast/twitter.svg"></a>
                                <a target="_blank" href="https://www.facebook.com/The-Paupers-Post-102948201469905/"><img class="svg" src="res/ast/facebook.svg"></a>
                                <a target="_blank" href="https://discord.gg/AaBjwy9"><img class="svg" src="res/ast/discord.svg"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; background-color: #111; display: block;">
                    <p style="text-align: center; color: white; font-family: monospace; padding: 20px 0px; margin: 0px;">© Copyright 2020, The Pauper's Post</p>
                </div>
            </div>
        </div>
        
        <div id="load-modal" style="display: none;">
            <div id="modal-content">
                <img id="modal-image" src="res/ast/title.png" style="display: block; margin: auto; width: 100%; max-width: 500px;">
                <div style="width: 100%; text-align: center; margin-top: 100px;">
                    <p style="color: #aaa; text-align: center; font-family: arial; line-height: 16px;">LOADING ARTICLES</p>
                    <img src="res/ast/Dual%20Ring-1s-200px.gif" style="width: 150px; margin: auto;">
                </div>
            </div>
        </div>
    </body>
</html>
























