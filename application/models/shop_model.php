<?php

class shop_model extends CI_Model {

	public function insertShop($name,$category,$user_id,$username){
		$sql = "INSERT INTO shop (name,category,username) values ('$name','$category','$username');";
        $query=$this->db->query($sql);

        $last_id = $this->db->insert_id();
        $sql = "INSERT INTO shop_user_bridge (shop_id,user_id) values ('$last_id','$user_id')";
        $status=$this->db->query($sql);

        return $last_id ;
  //       if($status)
		//    return true;
		// else
		//     return false;
	}
	public function getShops($id){
		$sql = "SELECT * FROM shop s join (select shop_id from shop_user_bridge where user_id ='$id')sub on s.shopid = sub.shop_id";

        $query=$this->db->query($sql);
        if ($query->num_rows() > 0)
            return $query->result_array();
        else
            return null;
	}
    public function uploadProduct1($img){
        $sql = "INSERT INTO product_image imagedir values ('$img')";
        $query=$this->db->query($sql);
    }
    public function uploadProductSafe($name, $oriname, $mime){
        echo "$name, $oriname, $mime";
        $sql = "INSERT INTO product_image (imagedir, oriname, mime) VALUES ('$name', '$oriname', '$mime')";
        $query=$this->db->query($sql);
    }

    public function getImage(){
        $sql = "SELECT imagedir as name,oriname as original_name,mime as mime_type FROM PRODUCT_IMAGE where pi_id=3";
        $query=$this->db->query($sql);
        return $query->result_array();
    }
    public function insertProduct($shop_id,$name,$desc,$category,$price,$delivery){
        $sql = "INSERT INTO product (shop_id,name,description,category,price,delivery_method) values ('$shop_id','$name','$desc','$category','$price','$delivery');";
        $query=$this->db->query($sql);

        $last_id = $this->db->insert_id();
        return $last_id ;
    }
    public function insertProductPicture($product_id,$name){
        $sql = "INSERT INTO product_image (product_id,oriname) values ('$product_id','$name');";
        $query=$this->db->query($sql);

    }
    public function getProducts($id){
        $sql = "SELECT *,img.product_id,img.oriname as imgname FROM product p join(select oriname,product_id from product_image GROUP by product_id)img on p.id = img.product_id WHERE shop_id = '$id'";
        $query=$this->db->query($sql);
        if ($query->num_rows() > 0)
            return $query->result_array();
        else
            return null;
    }
    public function getShop($id){
    $sql = "SELECT * FROM shop where shopid =$id";
        $query=$this->db->query($sql);
        if ($query->num_rows() > 0)
            return $query->result_array();
        else
            return "No rows found";

    }
    public function checkShopUsername($name){
        $sql = "SELECT name FROM shop where username ='$name'";
        $query=$this->db->query($sql);
        if ($query->num_rows() > 0)
            return true;
        else
            return false;
    }
    public function updateShopInfo($shop_id,$fb,$insta,$delivery,$description,$profilepic=""){
        $sql = "";
        if($profilepic!=""){
            $sql = "UPDATE shop SET fb='$fb',ig='$insta',delivery='$delivery',about='$description',displaypic='$profilepic' WHERE shopid ='$shop_id'";
        }else{
            $sql = "UPDATE shop SET fb='$fb',ig='$insta',delivery='$delivery',about='$description' WHERE shopid ='$shop_id'";
        }
        $query=$this->db->query($sql);
    }
    public function getDP($id){
    $sql = "SELECT displaypic FROM shop where shopid =$id";
        $query=$this->db->query($sql);
        if ($query->num_rows() > 0)
            return $query->result_array();

    }
}