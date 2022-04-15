<?php
class Professeur {

private $id;
private $nom;
private $prenom;
private $photo;
private $cin;
private $drpp;
private $date_recructement;
private $telephone;
private $email;
private $password;
private $date_naissance;
private $etat;
private $specialite;
private $structure;
private $directeur;
private $dossier_scientifique;
private $dossier_pedagogique;
private $dossier_administratif;
private $verification;


function __construct($id, $nom, $prenom, $photo, $cin, $drpp, $date_recructement, $telephone, $email, $password, $date_naissance, $etat, $specialite, $structure, $directeur, $dossier_scientifique, $dossier_pedagogique, $dossier_administratif, $verification) {
    $this->id = $id;
    $this->nom = $nom;
    $this->prenom = $prenom;
    $this->photo = $photo;
    $this->cin = $cin;
    $this->drpp = $drpp;
    $this->date_recructement = $date_recructement;
    $this->telephone = $telephone;
    $this->email = $email;
    $this->password = $password;
    $this->date_naissance = $date_naissance;
    $this->etat = $etat;
    $this->specialite = $specialite;
    $this->structure = $structure;
    $this->directeur = $directeur;
    $this->dossier_scientifique = $dossier_scientifique;
    $this->dossier_pedagogique = $dossier_pedagogique;
    $this->dossier_administratif = $dossier_administratif;
    $this->verification = $verification;
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

function getPhoto() {
    return $this->photo;
}

function getCin() {
    return $this->cin;
}

function getDrpp() {
    return $this->drpp;
}

function getDateRecrutement() {
    return $this->date_recructement;
}

function getTelephone() {
    return $this->telephone;
}

function getEmail() {
    return $this->email;
}

function getPassword() {
    return $this->password;
}

function getDateNaissance() {
    return $this->date_naissance;
}

function getEtat() {
    return $this->etat;
}

function getSpecialite() {
    return $this->specialite;
}

function getStructure() {
    return $this->structure;
}

function getDirecteur() {
    return $this->directeur;
}

function getDossierScientifique() {
    return $this->dossier_scientifique;
}

function getDossierPedagogique() {
    return $this->dossier_pedagogique;
}

function getDossierAdministratif() {
    return $this->dossier_administratif;
}

function getVerification() {
    return $this->verification;
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

function setPhoto($photo) {
    $this->photo = $photo;
}
function setCin($cin) {
    $this->cin = $cin;
}
function setDrpp($drpp) {
    $this->drpp = $drpp;
}
function setDateRecrutement($date_recructement) {
    $this->date_recructement = $date_recructement;
}
function setTelephone($telephone) {
    $this->telephone = $telephone;
}

function setEmail($email) {
    $this->email = $email;
}

function setPassword($password) {
    $this->password = $password;
}

function setDateNaissance($date_naissance) {
    $this->date_naissance = $date_naissance;
}
function setEtat($etat) {
    $this->etat = $etat;
}
function setSpecialite($specialite) {
    $this->specialite = $specialite;
}
function setStructure($structure) {
    $this->structure = $structure;
}
function setDirecteur($directeur) {
    $this->directeur = $directeur;
}
function setDossierScientifique($dossier_scientifique) {
    $this->dossier_scientifique = $dossier_scientifique;
}
function setDossierPdagogique($dossier_pedagogique) {
    $this->dossier_pedagogique = $dossier_pedagogique;
}
function setDossierAdministratif($dossier_administratif) {
    $this->dossier_administratif = $dossier_administratif;
}
function setVerification($verification) {
    $this->verification = $verification;
}



}