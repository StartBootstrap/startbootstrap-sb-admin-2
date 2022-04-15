<?php

extract($_POST);
/* Getting file name */
$filename = $_FILES['file']['name'];
$file_ext = substr($filename, strripos($filename, '.')); // get file name
$newfilename = md5($cin) . $file_ext;

/* Location */
$location = "../img/" . $newfilename;
$uploadOk = 1;
$imageFileType = pathinfo($location, PATHINFO_EXTENSION);

/* Valid Extensions */
$valid_extensions = array("jpg", "jpeg", "png");
/* Check file extension */
if (!in_array(strtolower($imageFileType), $valid_extensions)) {
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    echo 0;
} else {
    /* Upload file */
    if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
        echo $newfilename;
    } else {
        echo 0;
    }
}
