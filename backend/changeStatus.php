<?php

        $newStatus = $_POST['newStatus']; 
        $id = $_POST['id']; 

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

        //start code
        $sql = "UPDATE `schedule` SET `status` = '{$newStatus}' WHERE `id`= '$id'";
        $result = mysqli_query($conn,$sql);
    
        echo "Updated";
                
        $conn->close();
?>
