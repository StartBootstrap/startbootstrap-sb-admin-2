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
$image = $_FILES["photo"];
$scientifique = $_FILES["dossier_scientifique"];
$pedagogique = $_FILES["dossier_pedagogique"];
$administratif = $_FILES["dossier_administratif"];
// Saving file in uploads folder
move_uploaded_file($scientifique["tmp_name"], "dossiers/" . $scientifique["name"]);
move_uploaded_file($pedagogique["tmp_name"], "dossiers/" . $pedagogique["name"]);
move_uploaded_file($administratif["tmp_name"], "dossiers/" . $administratif["name"]);
move_uploaded_file($image["tmp_name"], "dossiers/" . $image["name"]);


$id=$_POST['id'];
$nom=$_POST['nom'];
$prenom=$_POST['prenom'];
$cin=$_POST['cin'];
$drpp=$_POST['drpp'];
$date_recrutement=$_POST['date_recrutement'];
$telephone=$_POST['telephone'];
$email=$_POST['email'];
$photo=$_FILES['photo']['name'];
$date_naissance=$_POST['date_naissance'];
$etat = $_POST['etat'];
$specialite=$_POST['specialite'];
$structure=$_POST['structure'];
$directeur=$_POST['directeur'];
$dossier_scientifique=$_FILES['dossier_scientifique']['name'];
$dossier_pedagogique=$_FILES['dossier_pedagogique']['name'];
$dossier_administratif=$_FILES['dossier_administratif']['name'];
if($photo != null){
    if($dossier_administratif != null && $dossier_pedagogique != null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique', `dossier_pedagogique` = '$dossier_pedagogique', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id ";
    }else if($dossier_administratif == null && $dossier_pedagogique != null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique', `dossier_pedagogique` = '$dossier_pedagogique' WHERE `id` = $id ";
    }else if($dossier_administratif != null && $dossier_pedagogique == null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id ";
    }else if($dossier_administratif != null && $dossier_pedagogique != null && $dossier_scientifique == null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_pedagogique` = '$dossier_pedagogique', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id ";
    }else if($dossier_administratif == null && $dossier_pedagogique == null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique' WHERE `id` = $id ";
    }else if($dossier_administratif == null && $dossier_pedagogique != null && $dossier_scientifique == null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_pedagogique` = '$dossier_pedagogique' WHERE `id` = $id ";
    }else if($dossier_administratif != null && $dossier_pedagogique == null && $dossier_scientifique == null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id "; 
    }else{
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `photo` = '$photo', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur' WHERE `id` = $id ";
    }
}else{
    if($dossier_administratif != null && $dossier_pedagogique != null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique', `dossier_pedagogique` = '$dossier_pedagogique', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id ";
    }else if($dossier_administratif == null && $dossier_pedagogique != null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique', `dossier_pedagogique` = '$dossier_pedagogique' WHERE `id` = $id ";
    }else if($dossier_administratif != null && $dossier_pedagogique == null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id ";
    }else if($dossier_administratif != null && $dossier_pedagogique != null && $dossier_scientifique == null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_pedagogique` = '$dossier_pedagogique', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id ";
    }else if($dossier_administratif == null && $dossier_pedagogique == null && $dossier_scientifique != null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_scientifique` = '$dossier_scientifique' WHERE `id` = $id ";
    }else if($dossier_administratif == null && $dossier_pedagogique != null && $dossier_scientifique == null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_pedagogique` = '$dossier_pedagogique' WHERE `id` = $id ";
    }else if($dossier_administratif != null && $dossier_pedagogique == null && $dossier_scientifique == null){
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur', `dossier_administratif` = '$dossier_administratif' WHERE `id` = $id "; 
    }else{
        $query = "UPDATE `professeur` SET `nom` = '$nom', `prenom` = '$prenom', `cin` = '$cin', `drpp` = '$drpp', `date_recrutement` = '$date_recrutement', `telephone` = '$telephone', `email` = '$email', `date_naissance` = '$date_naissance', `etat` = '$etat', `specialite` = '$specialite', `structure` = '$structure', `directeur` = '$directeur' WHERE `id` = $id ";
    }
}

$req = $con->prepare($query);
$req->execute() or die('Erreur dans votre code SQL');

header("location: Profs.php");