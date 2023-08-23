<?php
    $tagsList = array("POLITICS", "BUSINESS", "TECHNOLOGY", "ENTERTAINMENT", "LIFESTYLE");

    session_start();

    $mode = $_GET["mod"];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pauper_temp";

    if ($mode == "publish") {
        if (empty($_POST['headline']) != true && empty($_FILES['lead-pic']) != true && empty($_POST['tags']) != true && empty($_POST['article']) != true) {
            $headline = str_replace('"', '\"', $_POST['headline']);
            $headline = str_replace("'", "\'", $headline);
            
            $tags = str_replace('"', '\"', $_POST['tags']);
            $tags = str_replace("'", "\'", $tags);
            
            $article = str_replace('"', '\"', $_POST['article']);
            $article = str_replace("'", "\'", $article);
            
            
            
            
//            TESTING
            //            TESTING
            //            TESTING
            //            TESTING
            //            TESTING
            
            
            $target_file = "../res/leads/" . basename($_FILES["lead-pic"]["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

            //echo $_FILES["lead-pic"]["size"] . " " . file_exists($target_file) . " " . $imageFileType . "<br><br><br>";
            
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["lead-pic"]["tmp_name"]);
                if($check !== false) {
                    echo "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    echo "File is not an image.";
                    $uploadOk = 0;
                }
            }

            // Check if file already exists
            if (file_exists($target_file)) {
                echo "Sorry, file already exists.";
                $uploadOk = 0;
            }

            // Check file size
            if ($_FILES["lead-pic"]["size"] > 1000000) {
                echo "Sorry, your file is too large.";
                $uploadOk = 0;
            }

            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }

            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                echo "Sorry, your file was not uploaded.";
                // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["lead-pic"]["tmp_name"], $target_file)) {
                    echo "The file ". basename( $_FILES["lead-pic"]["name"]). " has been uploaded.";
                } else {
                    echo "Sorry, there was an error uploading your file.";
                }
            }
            
            
            //            TESTING
            //            TESTING
            //            TESTING
            
            $conn2 = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn2->connect_error) {
                die("Connection failed: " . $conn2->connect_error);
            } 
            $sql = "SELECT * FROM articles ORDER BY id DESC";
            $result = $conn2->query($sql) or die($conn2->error);

            while ($row = $result->fetch_assoc()) {
                $thecount = $row["id"] + 1;
                break;
            }
            
//            the woek
            
            $conn = new mysqli($servername, $username, $password, $dbname);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            
            $datObj = getdate();
            $date = $datObj['month'] . " " . $datObj['mday'] . ", " . $datObj['year'];
            
            $sql = "INSERT INTO articles (author, headline, img, article, tags, time, date) VALUES ('" . $_SESSION['fname'] . " " . $_SESSION['lname'] . "', '" . $headline . "', '" . basename($_FILES["lead-pic"]["name"]) . "', '" . $article . "', '" . $tags . "]', '" . time() . "', '" . $date . "')";
            
            if ($conn->query($sql) === TRUE) {
                
                if (!file_exists('../news/' . $thecount)) {
                    mkdir(('../news/' . $thecount), 0777, true);
                }
                $srcfile = '../topic/redir.php';
                $destfile = '../news/' . $thecount . "/index.php";
                copy($srcfile, $destfile);
                
                echo "<script>window.location='../';</script>";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            $conn->close();
            
        }
    } else if ($mode == "addMail") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO newsletter (email) VALUES ('" . $_GET['mail'] . "')";
        
        $conn->query($sql) or die($conn->error);
    }

?>