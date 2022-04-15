<?php

chdir('..');
include_once 'services/ProfesseurService.php';
extract($_POST);

$es = new ProfesseurService();
$r = true;

if (true) {
    if (true) {
        $es->create(new Professeur($id, $nom, $prenom, $photo, $cin, $drpp, $date_recrutement, $telephone, $email, md5($password),$date_naissance, $etat, $specialite, $structure, $directeur, $dossier_scientifique, $dossier_pedagogique, $dossier_administratif));
    } elseif ($op == 'update') {
        $_password = $es->findById($id)->getPassword();
        if($password==""){
            $password = $_password;
        }else{
            $password = md5($password);
        }
        $es->update(new Professeur($id, $nom, $prenom, $photo, $cin, $drpp, $date_recrutement, $telephone, $email, $password,$date_naissance, $etat, $specialite, $structure, $directeur, $dossier_scientifique, $dossier_pedagogique, $dossier_administratif));
    } elseif ($op == 'delete') {
        $es->delete($es->delete($id));
    } elseif ($op == 'find') {
        header('Content-type: application/json');
        echo json_encode($es->findById($id));
        $r = false;
    }
}
if ($r == true){
    header('Content-type: application/json');
    echo json_encode($es->findAll());
}

