<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

chdir("..");

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

require 'vendor/autoload.php';
if (isset($_POST['btn_submit'])) {
    if ($_POST['email'] != '') {
        include_once 'beans/Employe.php';
        include_once 'services/EmployeService.php';
        $es = new EmployeService();
        $cin = $es->findByEmail($_POST['email']);
        if($cin != -1){
            $em = $es->findById($cin);
            $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
            try {
                //Server settings
                $mail->SMTPDebug = 0;                                 // Enable verbose debug output
                $mail->isSMTP();                                      // Set mailer to use SMTP
                $mail->Host = 'smtp-mail.outlook.com';  // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                               // Enable SMTP authentication
                $mail->Username = 'gestionpointage@outlook.com';                 // SMTP username
                $mail->Password = 'gp123456';                           // SMTP password
                $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 587;                                    // TCP port to connect to

                //Recipients
                $mail->setFrom('gestionpointage@outlook.com', 'Gestion Pointage');
                $mail->addAddress($_POST['email']);
                // Add a recipient
                $link = "http://$_SERVER[HTTP_HOST]/verify.php?email=".$_POST['email']."&token=".$em->getPassword();

                //Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Votre Mot de passe';
                $mail->Body    = '<br><b>Gestion Pointage</b><br>Bonjour<b> ' .$em->getNom().'</b><br><br>Pour changer votre mot de passe clicker sur le lien suivant : <a href="'.$link.'"><b>Verification</b></a>';
                $mail->AltBody = 'Gestion Pointage - Bonjour ' .$em->getNom().' - Pour changer votre mot de passe clicker sur le lien suivant : '.$link;

                if($mail->send()){
                    header("Location: ../forget.php?success=ok");
                }else {
                    header("Location: ../forget.php?error=invalid");
                }
            } catch (Exception $e) {
                header("Location: ../forget.php?error=invalid");
            }
        }else {
            header("Location: ../forget.php?error=invalid");
        }
    }else {
        header("Location: ../forget.php?error=vide");
    }
}