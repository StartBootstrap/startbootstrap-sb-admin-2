<?php

include_once 'beans/Professeur.php';
include_once 'connexion/Connexion.php';
include_once 'dao/IDao.php';

class ProfesseurService implements IDao {

    private $connexion;

    function __construct() {
        $this->connexion = new Connexion();
    }

    public function create($o) {
        $query = "INSERT INTO `professeur`(`id`, `nom`, `prenom`,  `photo`,  `cin`,  `drpp`,  `date_recrutement`,  `telephone`, `email`, `password`, `date_naissance`, `etat`, `specialite`, `structure`, `directeur`, `dossier_scientifique`, `dossier_pedagogique`, `dossier_administratif`, `verification`) "
                . "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array(null, $o->getNom(), $o->getPrenom(), $o->getPhoto(), $o->getCin(), $o->getDrpp(), $o->getDateRecrutement(), $o->getTelephone(), $o->getEmail(), $o->getPassword(), $o->getDateNaissance(), $o->getEtat(), $o->getSpecialite(), $o->getStructure(), $o->getDirecteur(), $o->getDossierScientifique(), $o->getDossierPedagogique(), $o->getDossierAdministratif(), 'En attente')) or die('Error');
    }

    public function delete($id) {
        $query = "DELETE FROM professeur WHERE id = ?";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($id)) or die("erreur delete");
    }

    public function findAll() {
        $profs = array();
        $query = "select * from Professeur";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute();
        while ($e = $req->fetch(PDO::FETCH_OBJ)) {
            $profs[] = new Professeur($e->id, $e->nom, $e->prenom, $e->photo, $e->cin, $e->drpp, $e->date_recrutement, $e->telephone, $e->email,  $e->password, $e->date_naissance, $e->etat, $e->specialite, $e->structure, $e->directeur, $e->dossier_scientifique, $e->dossier_pedagogique, $e->dossier_administratif, $e->verification);
        }
        return $profs;
    }

    public function findById($id) {
        $query = "select * from professeur where id =?";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($id));
        $res = $req->fetch(PDO::FETCH_OBJ);
        $professeur = new professeur($res->id, $res->nom, $res->prenom, $res->photo, $res->cin, $res->drpp, $res->date_recrutement, $res->telephone, $res->email,  $res->password, $res->date_naissance, $res->etat, $res->specialite, $res->structure, $res->directeur, $res->dossier_scientifique, $res->dossier_pedagogique, $res->dossier_administratif, $res->verification);
        return $professeur;
    }

    public function findByEmail($email) {
        $query = "select * from professeur where email =?";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($email));
        $s = $req->fetchAll(PDO::FETCH_OBJ);
        if (count($s) != 0) {
            foreach ($s as $res) {
                $id = $res->id;
        }
            return $id;
        } else
            return -1;
        /* $professeur = new professeur($res->id$id, $res->nom, $res->prenom, $res->email, $res->telephone, $res->adresse, $res->password, $res->role, $res->photo, $res->fonction, $res->departement);
          return $professeur; */
    }

    public function update($o) {
        $query = "UPDATE professeur SET  nom=?, prenom =?, photo =?, cin =?, drpp =?, date_recrutment =?, telephone=?, email =?, password =?, date_naissance =?, etat =?, specialite =?, structure =?, directeur =?, dossier_scientifique =?, dossier_pedagogique =?, dossier_administratif =?  where id = ?";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($o->getNom(), $o->getPrenom(), $o->getEmail(),$o->getid())) or die('Error');
    }

    public function findDemands() {
        $profs = array();
        $query = "select * from Professeur where verification = 'En attente' and dossier_scientifique <> '' and dossier_pedagogique <> '' and dossier_administratif <> ''";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute();
        while ($e = $req->fetch(PDO::FETCH_OBJ)) {
            $profs[] = new Professeur($e->id, $e->nom, $e->prenom, $e->photo, $e->cin, $e->drpp, $e->date_recrutement, $e->telephone, $e->email,  $e->password, $e->date_naissance, $e->etat, $e->specialite, $e->structure, $e->directeur, $e->dossier_scientifique, $e->dossier_pedagogique, $e->dossier_administratif, $e->verification);
        }
        return $profs;
    }
}
