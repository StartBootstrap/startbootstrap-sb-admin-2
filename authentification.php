<?php 
$uri = $_SERVER['REQUEST_URI']; 

$url_components = parse_url($uri);

parse_str($url_components['query'], $params);
      
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SB Admin 2 - Register</title>

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

        <div class="card o-hidden border-0 shadow-lg my-5" style="width: 70%; margin: auto;">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-7" style="margin: auto;">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form class="user" method="POST" action="createAccount.php">
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                            placeholder="Nom" name="nom" value="<?php echo $params['nom'];?>" required readonly>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="Prenom" name="prenom" value="<?php echo $params['prenom'];?>" required readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address" name="email" value="<?php echo $params['email'];?>" required readonly>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            id="pass1" placeholder="Password" name="password"required>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="pass2" placeholder="Repeat Password" oninput="verify()" required>
                                        <input type="text" id="msg" name="validity" hidden>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                            placeholder="CIN" name="cin" required>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="date" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="Date naissance" name="date_naissance" required>
                                    </div>
                                </div>
                                <input type="submit" value="Register Account" class="btn btn-primary btn-user btn-block"/>
                                <hr>
                            </form>
                            <div class="text-center">
                            </div>
                        </div>
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
    <script>
        function verify (){
        var pass1 = document.getElementById("pass1");
        var pass2 = document.getElementById("pass2");
        var msg = document.getElementById("msg")
        
        if(pass1.value === pass2.value){
            msg.style.color = 'green';
            msg.value ="identique";
        }else  {
            msg.style.color = 'red';
            msg.value ="non indentique";
        }
    }
    </script>

</body>

</html>