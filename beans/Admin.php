<?php
class Administrator {

private $id;
private $nom;
private $prenom;
private $email;
private $password;
private $role;
private $photo;




function __construct($id, $nom, $prenom, $email, $password, $role, $photo) {
    $this->id = $id;
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->email = $email;
    $this->password = $password;
    $this->role = $role;
    $this->photo = $photo;
}

function getId() {
    return $this->id;
}

function getNom() {
    return $this->nom;
}

function getPrenom() {
    return $this->prenom;
}

function getEmail() {
    return $this->email;
}

function getPassword() {
    return $this->password;
}

function getRole() {
    return $this->role;
}

function getPhoto() {
    return $this->photo;
}

function setId($id) {
    $this->id = $id;
}

function setNom($nom) {
    $this->nom = $nom;
}

function setPrenom($prenom) {
    $this->prenom = $prenom;
}

function setEmail($email) {
    $this->email = $email;
}

function setRole($role) {
    $this->role = $role;
}

function setPhoto($photo) {
    $this->photo = $photo;
}



}