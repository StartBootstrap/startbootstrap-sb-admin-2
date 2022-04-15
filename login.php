<?php
session_start();
$message = "";
if (isset($_POST['btn_submit'])) {
    if ($_POST['email'] != '' && $_POST['password'] != '') {
        include_once 'beans/Admin.php';
        include_once 'services/AdminService.php';
        $es = new AdminService();
        $id = $es->findByEmail($_POST['email']);
        $em = $es->findById($id);
        if ($em->getPassword() == md5($_POST['password'])) {
            $_SESSION['administrator'] = $em->getId();
            $_SESSION['nom'] = $em->getNom().' '.$em->getPrenom();
            $_SESSION['email'] = $em->getEmail();
            $_SESSION['role'] = $em->getRole();
            header('Location: admin.php');
        }
        else{
            include_once 'beans/Professeur.php';
            include_once 'services/ProfesseurService.php';
            $es = new ProfesseurService();
            $id = $es->findByEmail($_POST['email']);
            $em = $es->findById($id);
            if ($em->getPassword() == md5($_POST['password'])) {
                $_SESSION['professeur'] = $em->getId();
                $_SESSION['nom'] = $em->getNom();
                $_SESSION['prenom'] = $em->getPrenom();
                $_SESSION['photo'] = $em->getPhoto();
                $_SESSION['cin'] = $em->getCin();
                $_SESSION['drpp'] = $em->getDrpp();
                $_SESSION['date_recrutement'] = $em->getDateRecrutement();
                $_SESSION['telephone'] = $em->getTelephone();
                $_SESSION['email'] = $em->getEmail();
                $_SESSION['date_naissance'] = $em->getDateNaissance();
                $_SESSION['etat'] = $em->getEtat();
                $_SESSION['specialite'] = $em->getSpecialite();
                $_SESSION['structure'] = $em->getStructure();
                $_SESSION['directeur'] = $em->getDirecteur();
                $_SESSION['dossier_scientifique'] = $em->getDossierScientifique();
                $_SESSION['dossier_pedagogique'] = $em->getDossierPedagogique();
                $_SESSION['dossier_administratif'] = $em->getDossierAdministratif();
                header('Location: Profs.php');
            }
            else{
                header('Location:./login.php?error=invalid');
            }
        }
    } else {
        header('Location:./login.php?error=vide');
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SB Admin 2 - Login</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <form action="" method="POST">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6" style="height: 80vh;">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user" action="" method="POST">
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." id="email" name="email">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password" id="password" name="password">
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck">
                                                    <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <button class="btn btn-primary btn-user btn-block" name="btn_submit">
                                                Login
                                            </button>
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <a class="small" href="register.php">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>

    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

</body>

</html>