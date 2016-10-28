<?php



phpinfo();

// print_r(get_loaded_extensions());

$textoRetorno="table: profile";
$textoRetorno.="\n----------------------------------------------";
$textoRetorno.="\nprofile_id | name        | date_of_birth   | document  ";
$textoRetorno.="\n----------------------------------------------";

try {
	$conn = new \PDO('mysql:host=127.0.0.1;dbname=curriculum_vitae', 'root', '23775811');
	$conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

	$data = $conn->query("SELECT * FROM profile");

	$retorno = array();
	foreach($data as $row) {
		$textoRetorno.="\n".$row[0]." | ".$row[1];
	}
} catch(PDOException $e) {
	$textoRetorno.="ERROR: " . $e->getMessage();
}

echo  $textoRetorno;





?>