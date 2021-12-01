<?php


  $attendee_rc = $_POST['attendee_rc']; 
  $attendee_type = $_POST['attendee_type']; 
  
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

        $output = "";

        if($attendee_type == "Regional") {
           $sql= "SELECT * FROM `schedule` WHERE `organized_by`= '$attendee_rc' OR `organized_by` = 'darwin' 
           ORDER BY IF(session_type = 'Regional', 1, 2) 
           ASC, id ASC";
        }
        else if($attendee_type == "Main"){
         $sql= "SELECT * FROM `schedule` ORDER BY IF(session_type = 'Main', 1, 2) ASC, id ASC";
        }

       

        $result = mysqli_query($conn,$sql);

        $output = array();

        while($row = mysqli_fetch_array($result)){

            array_push($output,$row);

        }

    

        echo json_encode($output);

                

        $conn->close();

?>

