<?php
    session_start();

    $mode = $_GET["mod"];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pauper_temp";

    if ($mode == "view") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 

        $sql = "UPDATE articles SET traffic=traffic+1 WHERE id=" . $_GET['art'];
        
        $conn->query($sql) or die($conn->error);
        
        //ADD TO USER's PROFILE
        $conn2 = new mysqli($servername, $username, $password, $dbname);
        if ($conn2->connect_error) {
            die("Connection failed: " . $conn2->connect_error);
        }
    } else if ($mode == "del") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 

        $sql = "DELETE FROM articles WHERE id=" . $_GET['art'];
        
        $conn->query($sql) or die($conn->error);
        
        //ADD TO USER's PROFILE
        $conn2 = new mysqli($servername, $username, $password, $dbname);
        if ($conn2->connect_error) {
            die("Connection failed: " . $conn2->connect_error);
        } else {
            echo "success";
        }
    } else if ($mode == "adde") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "UPDATE users SET nmail=CONCAT(nmail, '," . $_GET['email'] . "') WHERE pname='" . $_SESSION['pname'] . "'";
        
        $conn->query($sql) or die($conn->error);
        
        //ADD TO USER's PROFILE
        $conn2 = new mysqli($servername, $username, $password, $dbname);
        if ($conn2->connect_error) {
            die("Connection failed: " . $conn2->connect_error);
        }
    } else if ($mode == "reme") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "UPDATE users SET nmail=REPLACE(nmail, '," . $_GET['email'] ."', '') WHERE pname='" . $_SESSION['pname'] . "'";
        
        $conn->query($sql) or die($conn->error);
    } else if ($mode == "usr") {
        $conn0 = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn0->connect_error) {
            die("Connection failed: " . $conn0->connect_error);
        }

        $sql = "SELECT COUNT(*) FROM users WHERE fname='" . $_GET['fname'] . "' AND lname='" . $_GET['lname'] . "'";
        
        $result = $conn0->query($sql) or die($conn0->error);
        
        while ($row = $result->fetch_assoc()) {
            $counted = $row['COUNT(*)'];
        }
        
        if ($counted == 0) {
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "UPDATE users SET fname='" . $_GET['fname'] . "', lname='" . $_GET['lname'] . "', pname='" . $_GET['pname'] . "', email='" . $_GET['email'] . "' WHERE pname='" . $_SESSION['pname'] . "'";

            $conn->query($sql) or die($conn->error);


    //        ARTICLES
            $conn2 = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn2->connect_error) {
                die("Connection failed: " . $conn2->connect_error);
            }

            $sql = "UPDATE articles SET author='" . $_GET['fname'] . " " . $_GET['lname'] . "' WHERE aid=" . $_SESSION['id'];

            $conn2->query($sql) or die($conn2->error);

            rename("../journalist/" . $_SESSION['fname'] . "-" . $_SESSION['lname'], "../journalist/" . $_GET['fname'] . "-" . $_GET['lname']);

            session_destroy();
            echo "<script>window.location = '../'</script>";   
        } else {
            echo "<script>alert('Could Not Change. Someone With That Name Already Exists'); window.location = './';</script>";
        }
    } else if ($mode == "pass") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "UPDATE users SET pass='" . $_GET['pass'] . "' WHERE pname='" . $_SESSION['pname'] . "'";
        
        $conn->query($sql) or die($conn->error);
        
        echo "<script>window.location='./';</script>";
    }

?>