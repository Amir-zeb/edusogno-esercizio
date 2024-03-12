<?php
// db.php - Database configuration

// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$servername = "localhost";
$username = "root";
$password = "";
$database = "crud_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// API endpoints
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($_GET['route'] === 'evento') {
        // Retrieve all items
        $sql = "SELECT * FROM evento";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            echo json_encode($rows);
        } else {
            echo json_encode(array());
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_GET['route'] === 'login') {
        // Login route
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'];
        $password = $data['password'];

        $sql = "SELECT * FROM utenti WHERE email='$email' AND password='$password'";
        $result = $conn->query($sql);
        if ($result && $result->num_rows == 1) {
            // Fetch the row from the result set
            $user = $result->fetch_assoc();
            // Remove the password field from the user data for security reasons
            unset($user['password']);
            echo json_encode(array("success" => true, "message" => "Login successful","data"=>$user));
        } else {
            http_response_code(401);
            echo json_encode(array("success" => false, "message" => "Invalid email or password"));
        }
    } elseif ($_GET['route'] === 'register') {
        // Register route
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $data['name'];
        $cognome = $data['lastName'];
        $email = $data['email'];
        $password = $data['password'];
        
        // Check if username already exists
        $check_query = "SELECT * FROM utenti WHERE email='$email'";
        $check_result = $conn->query($check_query);
        
        if ($check_result && $check_result->num_rows == 1) {
            http_response_code(409);
            echo json_encode(array("success" => false, "message" => "Email already exists"));
        } else {
            // Insert new user into the database
            $insert_query = "INSERT INTO utenti (nome,cognome,email, password) VALUES ('$nome','$cognome','$email', '$password')";
            if ($conn->query($insert_query) === TRUE) {
                echo json_encode(array("success" => true, "message" => "Registration successful"));
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(array("success" => false, "message" => "Error registering user: " . mysqli_error($conn)));
            }
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

}

$conn->close();
?>
