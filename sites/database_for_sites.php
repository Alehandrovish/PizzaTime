<?php
    $serverName = "localhost";
    $userName = "root";
    $dbName = "PizzaTime";
    
    $connection = mysqli_connect($serverName, $userName, "", $dbName);
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
      }
    
    $searchType = $_GET['searchType'];
    
    $sql = "SELECT products.id, name, img, description, price, type FROM products JOIN types ON type = types.id WHERE types.type_name = ".$searchType;
    $result = mysqli_query($connection, $sql);
    mysqli_close($connection);

    $lenght = mysqli_num_rows($result);

    for ($i=0; $i<$lenght; $i++)
    {
        $f = mysqli_fetch_array($result);
        echo 
        "
        <div class=\"block\">

                <div class=\"block__img\">
                    <img src=\""."."."".$f['img']."\">
                </div>
                <div class=\"block__without-img\">
                    <div class=\"block__title\">".$f['name']."</div>
                    <p class=\"block__text\">".$f['description']."</p>
                    <span id=".$f['id']." class=\"block__price\">".$f['price']." грн</span>
                </div>

            </div>
        ";
    }


?>