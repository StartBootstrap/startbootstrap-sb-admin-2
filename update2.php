<?php

include_once 'services/AdminService.php';
include_once 'beans/Admin.php';
extract($_POST);

$host = 'localhost';
$dbname = 'platform';
$login = 'root';
$password = '';
try {
    $con = new PDO("mysql:host=$host;dbname=$dbname", $login, $password);
    $con->query("SET NAMES UTF8");
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
  }
$image = $_FILES["photo"];
move_uploaded_file($image["tmp_name"], "dossiers/" . $image["name"]);
$id=$_POST['id'];
$nom=$_POST['nom'];
$prenom=$_POST['prenom'];
$email=$_POST['email'];
$photo=$_FILES['photo']['name'];


if($photo != null){
    $query = "UPDATE `administrator` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `email` = '$email' WHERE `id` = $id ";
}else{
    $query = "UPDATE `administrator` SET `nom` = '$nom', `prenom` = '$prenom', `email` = '$email' WHERE `id` = $id ";
}

$req = $con->prepare($query);
$req->execute() or die('Erreur dans votre code SQL');

header("location: admin.php");