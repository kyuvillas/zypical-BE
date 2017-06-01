<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class pics extends CI_Controller {

	function __construct() {
	    parent::__construct();
	}
	public function getUserImg(){
    	$uploaddir = 'uploads/profile_dp/';
		$name = $_GET['img']; // Assuming the file name is in the URL for this example
		readfile($uploaddir.$name);
    }
    public function shopdp(){
    	$uploaddir = 'uploads/shop_dp/';
		$name = $_GET['img']; // Assuming the file name is in the URL for this example
		readfile($uploaddir.$name);
    }
	
}

/* End of file pics.php */
/* Location: ./application/controllers/pics.php */