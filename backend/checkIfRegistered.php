<?php

        $email = $_POST['email']; 
        $pwd = $_POST['pwd']; 
        $servername = "localhost";
        $username = "riidlorg_d2021";
        $password = "darwin@riidl520";
        $dbname = "riidlorg_darwin2021";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
	                                                                    
        $sql= "SELECT * FROM `attendees` WHERE `Email ID`= '$email' AND `Common_Password`= '$pwd'";
        $result = mysqli_query($conn,$sql);
        $output = array();
        while($row = mysqli_fetch_array($result)){
            array_push($output,$row);
        }

        echo json_encode($output);
        $conn->close();

?>

