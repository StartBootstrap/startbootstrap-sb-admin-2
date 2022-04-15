<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
chdir('..');
include_once 'beans/Employe.php';
include_once 'services/EmployeService.php';
extract($_POST);

$es = new EmployeService();
$cin = $es->findByEmail($email);
if ($cin != -1) {
    $employe = $es->findById($cin);
    if ($employe->getPassword() == md5($password)) {
        header('Content-type: application/json');
        echo json_encode(array("cin"=>$employe->getCin(),"nom"=>$employe->getNom(),"prenom"=>$employe->getPrenom()
                ,"password"=>$employe->getPassword(),"email"=>$employe->getEmail(),"photo"=>$employe->getPhoto()
                ,"role"=>$employe->getRole()));
    } else
        echo 0;
}else {
    echo 0;
}
