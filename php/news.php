<?php
    session_start();

    $mode = $_GET["mod"];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pauper_temp";

    if ($mode == "featured") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM articles ORDER BY id DESC LIMIT 5";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);   
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        
        echo $string . "]";
    } else if ($mode == "week") {
        //604800000
        
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM articles ORDER BY id DESC LIMIT 12 OFFSET " . $_GET['off'];// ORDER BY id DESC";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    } else if ($mode == "old") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM articles WHERE (" . time() ."-time) > 604800 ORDER BY id DESC LIMIT 12 OFFSET " . $_GET['off'];// ORDER BY id DESC";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    } else if ($mode == "journal") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "SELECT * FROM articles WHERE author = '" . $_GET['author'] . "' ORDER BY " . $_GET['ord'] . " " . $_GET['dis'] . " LIMIT 10 OFFSET " . $_GET['num'];// ORDER BY id DESC";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    } else if ($mode == "top") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM articles WHERE tags LIKE '%" . $_GET['topic'] . "%' ORDER BY id DESC LIMIT 11 OFFSET " . $_GET['num'];// ORDER BY id DESC";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    } else if ($mode == "single") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM articles WHERE id <= '" . $_GET['art'] . "' ORDER BY id DESC LIMIT 2 OFFSET " . $_GET['off'];// ORDER BY id DESC";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    } else if ($mode == "agg") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM aggregate ORDER BY id DESC LIMIT 5";// ORDER BY id DESC";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    } else if ($mode == "spot") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM articles WHERE (" . time() ."-time) > 604800 ORDER BY traffic DESC LIMIT 5";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    } else if ($mode == "user") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM users WHERE pname='" . $_SESSION['pname'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        
        $string = "[";
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            if ($i == 0) {
                $string .= json_encode($row);
            } else {
                $string .= ", " . json_encode($row);
            }
            
            $i += 1;
        }
        echo $string . "]";
    }
?>