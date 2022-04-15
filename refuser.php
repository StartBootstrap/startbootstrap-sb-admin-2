<?php

include_once 'services/ProfesseurService.php';
include_once 'beans/Professeur.php';
extract($_GET);

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

$id=$_GET['id'];


$query = "UPDATE `professeur` SET `verification` = 'Refusé' WHERE `id` = $id ";


$req = $con->prepare($query);
$req->execute() or die('Erreur dans votre code SQL');

header("location: Demandes.php");