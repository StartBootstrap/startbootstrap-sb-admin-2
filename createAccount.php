<?php

include_once 'services/ProfesseurService.php';
include_once 'beans/Professeur.php';
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

$es = new ProfesseurService();


$nom=$_POST['nom'];
$prenom=$_POST['prenom'];
$password=$_POST['password'];
$email=$_POST['email'];
$cin = $_POST['cin'];
$date_naissance = $_POST['date_naissance'];
$msg = $_POST['validity'];
if($msg != 'non indentique'){
    $es->create(new Professeur(1,$nom, $prenom, 'default.jpg', $cin, '','','',$email,md5($password), $date_naissance,'','informatique','','','','','',''));
    echo "<script>if(confirm('Votre compte a été ajouté avec succès !')){document.location.href='login.php'};</script>";
}else{
    echo ('<script>alert("Erreur")</script>');
}

