<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class shop_controller extends CI_Controller {

	function __construct() {
	    parent::__construct();
	    $this->load->model('shop_model');
	}
	  public function index(){
	    echo 'index';
	  }
	  public function insertShop(){
	  	$data = file_get_contents("php://input");
		$user = json_decode($data);
		
		$status = "null";
		if($user->user_id != null){
	  		$status = $this->shop_model->insertShop($user->name,$user->category,$user->user_id,$user->username);
	  	}	
	  	echo $status;
	  }
	public function getShops(){
		$id = $_GET['id'];

		echo json_encode($this->shop_model->getShops($id));
	}
	public function simple(){
        $verifyimg = getimagesize($_FILES['image']['tmp_name']);

        if($verifyimg['mime'] != 'image/png' || $verifyimg['mime'] != 'image/jpeg' || $verifyimg['mime'] != 'image/jpg') {
            echo "Only images are allowed!";
            exit;
        }

        $uploaddir = 'uploads/products';

        $uploadfile = $uploaddir . basename($_FILES['image']['name']);

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
            echo "Image succesfully uploaded.";
        } else {
            echo "Image uploading failed.";
        }
    }
    public function upload(){
	  	$pictures = $_FILES;
		$id = $this->shop_model->insertProduct($_POST['shop_id'],$_POST['name'],$_POST['desc'],$_POST['category'],$_POST['price'],$_POST['delivery']);

        $uploaddir = 'uploads/products/';
        $str = "";
		foreach($pictures as $pic){

        	$uploadfile = $uploaddir . basename($pic['name']);
			if (move_uploaded_file($pic['tmp_name'], $uploadfile)) {
				$this->shop_model->insertProductPicture($id,basename($pic['name']));
	            $str= "successful";
	        } else {
	        	// print_r($pic['error']);
	            $str= "error";
	        }
		}
		echo $str;
    }
    public function getProducts(){
		$id = $_GET['id'];

		echo json_encode($this->shop_model->getProducts($id));
	}
    public function getProductImg(){
    	$uploaddir = 'uploads/products/';
		$name = $_GET['img']; // Assuming the file name is in the URL for this example
		readfile($uploaddir.$name);
    }
    public function getShopImg(){
    	$uploaddir = 'uploads/shop_dp/';
		$name = $_GET['img']; // Assuming the file name is in the URL for this example
		readfile($uploaddir.$name);
    }
    public function getShop(){
    	$id = $_GET['id'];

		echo json_encode($this->shop_model->getShop($id));
    }
    public function checkShopUsername(){
    	$user = $this->input->get('name');
    	echo $this->shop_model->checkShopUsername($user);
    }
    public function updateShopInfo(){
    	$shop_id = !empty($_POST["shop_id"]) && $_POST["shop_id"] != "undefined" ? $_POST['shop_id'] : "";
		$fb = !empty($_POST["fb"]) && $_POST["fb"] != "undefined" ? $_POST['fb'] : "";
		$insta =!empty($_POST["insta"]) && $_POST["insta"] != "undefined" ? $_POST['insta'] : "";
		$delivery = !empty($_POST["delivery"]) && $_POST["delivery"] != "undefined" && $_POST["delivery"] != "[]" ? $_POST['delivery'] : "";
		$description = !empty($_POST["description"]) && $_POST["description"] != "undefined" ? $_POST['description'] : "";

		if((!empty($_FILES["displaypic"])) && ($_FILES['displaypic']['error'] == 0)){

			$pic = $_FILES['displaypic'];
			

		    $uploaddir = 'uploads/shop_dp/';
			$date = date("Ymd H g i");
			$profilepic = $shop_id . '_' . $date .'_' . basename($pic['name']); 
			$uploadfile = $uploaddir . $profilepic;

			if (move_uploaded_file($pic['tmp_name'], $uploadfile)) {
				$value = $this->shop_model->getDP($shop_id);
				if (file_exists($value[0]['displaypic'])) {
			        unlink($value[0]['displaypic']);
			    }
				$this->shop_model->updateShopInfo($shop_id,$fb,$insta,$delivery,$description,$profilepic);
	            $str= "successful";
	        } 
		} else {			
			$this->shop_model->updateShopInfo($shop_id,$fb,$insta,$delivery,$description);
	    }
		
    }

    // html - check if image
    // shopid_picname
    // check image
    // delete existing pic in folder
    // 

    public function checkImage(){
    	if((!empty($_FILES["uploaded_file"])) && ($_FILES['uploaded_file']['error'] == 0)) {
		  //Check if the file is JPEG image and it's size is less than 350Kb
		  $filename = basename($_FILES['uploaded_file']['name']);
		  $ext = substr($filename, strrpos($filename, '.') + 1);
		  if (($ext == "jpg") && ($_FILES["uploaded_file"]["type"] == "image/jpeg") && 
		    ($_FILES["uploaded_file"]["size"] < 350000)) {
		    //Determine the path to which we want to save this file
		      $newname = dirname(__FILE__).'/upload/'.$filename;
		      //Check if the file with the same name is already exists on the server
		      if (!file_exists($newname)) {
		        //Attempt to move the uploaded file to it's new place
		        if ((move_uploaded_file($_FILES['uploaded_file']['tmp_name'],$newname))) {
		           echo "It's done! The file has been saved as: ".$newname;
		        } else {
		           echo "A problem occurred during file upload!";
		        }
		      } else {
		         echo "File ".$_FILES["uploaded_file"]["name"]." already exists";
		      }
		  } else {
		     echo "Error: Only .jpg images under 350Kb are accepted for upload";
		  }
		} else {
		 echo "Error: No file uploaded";
		}
    }
}

/* End of file shop_controller.php */
/* Location: ./application/controllers/shop_controller.php */