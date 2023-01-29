<?php
 $serverName = "localhost";
 $userName = "root";
 $dbName = "PizzaTime";

 $connection = mysqli_connect($serverName, $userName, "", $dbName);
 if (!$connection) {
     die("Connection failed: " . mysqli_connect_error());
 }

 $name = $_GET["name"];
 $mobile = $_GET["mobile"];
 $checkbox = $_GET["checkbox"];
 $adres = $_GET["adres"];
 $comment = $_GET["comment"];
 $cart = $_GET["choise"];
 $price = $_GET["price"];

 $sql = "INSERT INTO `order` (`id`, `name`, `mobile`, `type_Delivery`, `adress`, `comment`, `choise`, `price`)
        VALUES (NULL, $name, $mobile, $checkbox, $adres, $comment, $cart, $price);";

mysqli_query($connection, $sql);
mysqli_close($connection);
?>