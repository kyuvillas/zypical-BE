<!DOCTYPE html>
<html>
<body>

<?php

	function randomHealth(){
		$health = rand(1, 100);
		return $health;
	}

	function randomAvail(){
		$status = array("Red", "Green", "Gray");
		$availability = array_rand($status);

		return $status[$availability];
	}

	function generate(){
		$arr = [];

		for($i=0; $i<10; $i++){
			$health = randomHealth();
			$avail = randomAvail();
			$result = array("name"=>"Dove", "health"=>$health, "availabiity"=>$avail);
			array_push($arr, $result);
		}

		echo json_encode($arr);
	}

	generate();


?>

</body>
</html>
