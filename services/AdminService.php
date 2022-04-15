<?php

include_once 'beans/Admin.php';
include_once 'connexion/Connexion.php';
include_once 'dao/IDao.php';

class AdminService implements IDao {

    private $connexion;

    function __construct() {
        $this->connexion = new Connexion();
    }

    public function create($o) {
        $query = "INSERT INTO `administrator`(`id`, `nom`, `prenom`, `email`, `password`, `role`, `photo`) "
                . "VALUES (?,?,?,?,?)";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($o->getId(), $o->getNom(), $o->getPrenom(), $o->getEmail(), $o->getPassword(), $o->getRole(), $o->getPhoto())) or die('Error');
    }

    public function delete($id) {
        $query = "DELETE FROM administrator WHERE id = ?";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($id)) or die("erreur delete");
    }

    public function findAll() {
        $query = "select * from administrator";
        $req = $this->connexion->getConnexion()->query($query);
        $f = $req->fetchAll(PDO::FETCH_OBJ);
        return $f;
    }

    public function findById($id) {
        $query = "select * from administrator where id =?";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($id));
        $res = $req->fetch(PDO::FETCH_OBJ);
        $professeur = new Administrator($res->id, $res->nom, $res->prenom, $res->email,  $res->password, $res->role, $res->photo);
        return $professeur;
    }

    public function findByEmail($email) {
        $query = "select * from administrator where email =?";
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
        $query = "UPDATE administrator SET  nom=?, prenom =?, email =?, password =?, role =?  where id = ?";
        $req = $this->connexion->getConnexion()->prepare($query);
        $req->execute(array($o->getNom(), $o->getPrenom(), $o->getEmail(), $o->getPassword(), $o->getRole(), $o->getPhoto(),$o->getid())) or die('Error');
    }

}
