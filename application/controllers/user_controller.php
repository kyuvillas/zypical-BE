<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user_controller extends CI_Controller {

	function __construct() {
	    parent::__construct();
	    $this->load->model('user_model');
	}
	  public function index(){
	    echo 'index';
	  }
	  
	public function getSavedStores(){
		 
		$status = $this->user_model->getSavedStores($_GET['id']);
		
		echo json_encode($status);
	}
	public function updateUser(){
		 
		$pic = $_FILES['picture'];
		$id = $_POST['id'];
		$fname = $_POST['fname'];
		$lname = $_POST['lname'];
		$username = $_POST['username'];
		$emailaddress = $_POST['emailaddress'];
		$profilepic = basename($pic['name']); 
        $uploaddir = 'uploads/profile_dp/';
        $str = "";
 
    	$uploadfile = $uploaddir . basename($pic['name']);
		if (move_uploaded_file($pic['tmp_name'], $uploadfile)) {
			$this->user_model->updateUser($id,$fname,$lname,$username,$emailaddress,$profilepic);

            $str= "successful";
        } else {
        	// print_r($pic['error']);
            $str= "error";
        }
		
		echo $str;
	}
}

/* End of file shop_controller.php */
/* Location: ./application/controllers/shop_controller.php */