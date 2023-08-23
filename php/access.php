<?php
    $mode = $_GET["mod"];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pauper_temp";
    

    if ($mode == "up") {
        if (empty($_POST['fname']) != true && empty($_POST['lname']) != true && empty($_POST['pname']) != true && empty($_POST['pass']) != true && empty($_POST['email']) != true) {
            $conn = new mysqli($servername, $username, $password, $dbname);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            
//            $rand = rand(0,27) . '.png';
//            $sql = "INSERT INTO users (name, img, fname, lname, email, password, scribbles, following, followers, saves, upvoted, downvoted) VALUES ('" . $_POST['user'] . "', '" . $rand . "', '" . $_POST['fname'] . "', '" . $_POST['lname'] . "', '" . $_POST['email'] . "', '" . $_POST['pass'] . "', 0, ',Scrilibr', ',Scrilibr', '', '', '')";
            
            $sql = "INSERT INTO users (newsletter, email, nmail, fname, lname, pname, pass) VALUES (0, '" . $_POST['email'] . "', '," . $_POST['email'] . "', '" . $_POST['fname'] . "', '" . $_POST['lname'] . "', '" . $_POST['pname'] . "', '" . $_POST['pass'] . "')";

            if ($conn->query($sql) === TRUE) {
                session_start();
                
                $_SESSION['pname'] = $_POST['pname'];
                $_SESSION["fname"] = $_POST['fname'];
                $_SESSION["lname"] = $_POST['lname'];
                $_SESSION["auth"] = true;
                
                if (!file_exists('../journalist/' . strtolower($_POST['fname']) . '-' . strtolower($_POST['lname']))) {
                    mkdir('../journalist/' . strtolower($_POST['fname']) . '-' . strtolower($_POST['lname']), 0777, true);
                }
                $srcfile = '../journalist/redir.php';
                $destfile = '../journalist/' . strtolower($_POST['fname']) . '-' . strtolower($_POST['lname']) . "/index.php";
                copy($srcfile, $destfile);
                echo "<script>window.location='../';</script>";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            $conn->close(); 
            
//            //SUBMIT SECOND ROUND
//            $conn = new mysqli($servername, $username, $password, $dbname);
//            if ($conn->connect_error) {
//                die("Connection failed: " . $conn->connect_error);
//            }
//            $sql = "UPDATE users SET followers=CONCAT(followers, '," . $_POST['user'] . "'),following=CONCAT(following, '," . $_POST['user'] . "') WHERE name = 'Locke'";
//            if ($conn->query($sql) === TRUE) {
//                echo "<script>window.location='../';</script>";
//            } else {
//                echo "Error: " . $sql . "<br>" . $conn->error;
//            }
//            $conn->close();
        }
    } else if ($mode == "in") {
        if (empty($_POST['email']) != true && empty($_POST['pass']) != true) {
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            } 

            $sql = "SELECT * FROM users WHERE email = '" . $_POST['email'] . "' AND pass = '" . $_POST['pass'] . "'";

            $arr = array();
            $result = $conn->query($sql) or die($conn->error);
            while ($row = $result->fetch_assoc()) {
                $arr[] = $row;
                session_start();
                
                $_SESSION['pname'] = $row['pname'];
                $_SESSION["fname"] = $row['fname'];
                $_SESSION["lname"] = $row['lname'];
                $_SESSION['id'] = $row['id'];
                $_SESSION["auth"] = true;
            }

            if (count($arr) == 0) {
                echo "<script>window.location = '../p/signin/'</script>";
            } else { 
                echo "<script>window.location = '../';</script>";
            } 
        }
    }
    
?>