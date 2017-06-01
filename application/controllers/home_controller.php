<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class home_controller extends CI_Controller {

	function __construct() {
	    parent::__construct();
	    $this->load->model('user_model');
	}
	  public function index(){
	    echo 'index';
	  }
	  public function insertUser(){
	  	$data = file_get_contents("php://input");

		$user = json_decode($data);
	  	
		$status = false;
	  	if($user->fname!=null && $user->lname!=null && $user->gender!=null && $user->username!=null && $user->password!=null && $user->emailadd != null){
	  		$status = $this->user_model->insertUser($user->fname,$user->lname,$user->gender,$user->username,$user->password,$user->emailadd);
	  	}
	  	
	  	echo $status;
	  }


	  public function login(){
	  	$data = file_get_contents("php://input");
		$user = json_decode($data);
		// print_r($user);
		// print_r($_GET);
	  	$status = $this->user_model->checkUser($_GET['username'],$_GET['password']);
	  	
	  	echo json_encode($status);
	  }
}

/* End of file home_controller.php */
/* Location: ./application/controllers/home_controller.php */