<?php


       
        $username = $_POST['username'];
    // $pwd = $_POST['pwd']; 

    // echo $username;

        $servername = "localhost";
        $userdbname = "riidlorg_d2021";
        $password = "darwin@riidl520";
        $dbname = "riidlorg_darwin2021";

        // Create connection
        $conn = new mysqli($servername, $userdbname, $password, $dbname);
        // Check connection

      if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql= "SELECT * FROM `rc_credentials` WHERE `Username`= '$username'";
        $result = mysqli_query($conn,$sql);
        $output = array();
        
      
        while($row = mysqli_fetch_array($result)){
            array_push($output,$row);
        }

        echo json_encode($output);
        $conn->close();


    

    
        // $username = $_POST['username']; 
        // $pwd = $_POST['pwd']; 

       
?>
