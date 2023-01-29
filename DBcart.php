<?php
    $serverName = "localhost";
    $userName = "root";
    $dbName = "PizzaTime";
    
    $connection = mysqli_connect($serverName, $userName, "", $dbName);
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
      }
    
    $searchID = $_GET['searchID'];
    
    $sql = "SELECT products.id, name, img, description, price, type FROM products JOIN types ON type = types.id WHERE products.id IN (".$searchID.")";
    $result = mysqli_query($connection, $sql);
    mysqli_close($connection);

    for ($i=0; $i<mysqli_num_rows($result); $i++)
    {
        $f = mysqli_fetch_array($result);
        echo 
        "
        <li id=".$f['id']." class=\"chopbag__block\">
                    <img class=\"shopbag__block__delete\" src=\"./src/pictures/shopbag/x.png\">
                    <div class=\"chopbag__block__with__img\">
                        <img class=\"chopbag__block__with__img\" src=\"".$f['img']."\">
                    </div>
                    <div class=\"chopbag__block__without__img\">
                        <p class=\"chopbag__block__title__text\">".$f['name']."</p>
                        <div class=\"chopbag__block__price\">
                            <div class=\"chopbag__block__price__container\">
                                <span class=\"chopbag__block__price__number\">".$f['price']." грн</span>
                            </div>
                            <div class=\"chopbag__block__price__quantity\">
                                <img class=\"chopbag__block__price__minus-plus minus\" src=\"./src/pictures/shopbag/minus.png\">
                                <div class=\"chopbag__block__price__number__epta\">1</div>
                                <img class=\"chopbag__block__price__minus-plus plus\" src=\"./src/pictures/shopbag/plus.png\">
                            </div>
                        </div>
                    </div>
                </li>
        ";
    }


?>