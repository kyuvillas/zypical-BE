<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class search_controller extends CI_Controller {
	function __construct() {
	    parent::__construct();
	    $this->load->model('search_model');
	}
	public function index1(){
		$keyword= $this->input->get('keyword');
		$array= explode(' ', $keyword);

		$find = "";
		$len = sizeof($array);
		
		if( $len== 1){
			$find = $find." name like ('%".$keyword . "%') ";
		}
		else if($len == 2){
			$find =$find. " name like ('%".$keyword . "%') ";
		}
		else if( $len> 2){
		  	$collect = array();
		  	for ($i=0; $i<$len ;$i++) {
		  		if($i == 0){
		  			$find = $find." name like ('%".$array[$i] . " ".$array[$i+1]. "%') ";
		  		}
		  		else if($i +1 <= $len-1 ){
		  			$find = $find."OR name like ('%".$array[$i] . " ".$array[$i+1]. "%') ";
		  		}
		  	}
		}
		//$elem = array_splice($arrcopy, $iNDEX, 1); // removes and returns the i'th element
		echo json_encode($this->search_model->search($find));
	}
	public function index(){
		$keyword= $this->input->get('keyword');
		$array= explode(' ', $keyword);

		$find = "";
		$len = sizeof($array);
		if( $len <= 2){
			$find = $find." p.name like ('%".$keyword . "%') ";
		}
		else if( $len> 2){
		  	for ($i=0; $i<$len ;$i++) {
		  		for($x = $i+1 ; $x< $len ; $x++){
		  			if($x == 0){
			  			// $find = $find." name like ('%".$array[$x] . " ".$array[$i+1]. "%') ";
			  			$find = $find." (p.p.name like ('%".$array[$i]. "%') AND p.name like ('%".$array[$x]. "%')) ";
			  		}
			  		else if($i +1 <= $len-1 ){
			  			$find = $find." OR (p.name like ('%".$array[$i]. "%') AND p.name like ('%".$array[$x]. "%')) ";
			  		}
		  		}
		  	}
		}
		// echo $find.'<br>';
		echo json_encode($this->search_model->search($find));

	}

	public function trial(){
		$array = explode(" ", "try this keyword");

		function depth_picker($arr, $temp_string, &$collect) {
		    if ($temp_string != "") 
		        $collect []= $temp_string;

		    for ($i=0; $i<sizeof($arr);$i++) {
		        $arrcopy = $arr;
		        $elem = array_splice($arrcopy, $i, 1); // removes and returns the i'th element
		        if (sizeof($arrcopy) > 0) {
		            depth_picker($arrcopy, $temp_string ." " . $elem[0], $collect);
		        } else {
		            $collect []= $temp_string. " " . $elem[0];
		        }   
		    }   
		}

		$collect = array();
		depth_picker($array, "", $collect);
		// print_r($collect);
		echo json_encode($collect);
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */