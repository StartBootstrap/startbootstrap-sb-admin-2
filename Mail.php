<?php
extract($_POST);
$email = $_POST['email'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];

//the subject
$sub = "Your subject";
//the message
$msg = "Bonjour $nom $prenom, Validez votre inscription en cliquant sur le lien ci-dessous : \n\n http://localhost/plateform-2/authentification.php?email=$email&nom=$nom&prenom=$prenom";
//recipient email here
$rec = "$email";
//send email
mail($rec,$sub,$msg);
echo "<script>if(confirm('Un mail a été envoyer sur votre adresse email !')){document.location.href='login.php'};</script>";

?>