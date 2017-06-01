<?php

class user_model extends CI_Model {

    public function getAdminDb() {
        return $this->load->database('default', TRUE);
    }
	public function insertUser($fname,$lname,$gender,$username,$pass,$emailadd){
		$sql = "INSERT INTO user (fname, lname, gender, username,password,emailaddress) VALUES ('$fname','$lname','$gender','$username','$pass','$emailadd');";

        $status=$this->db->query($sql);
        $last_id = $this->db->insert_id();

        return $last_id ;
	}

	public function checkUser($username,$pass){
		$sql = "SELECT * from user where username='$username' and password ='$pass'";

        $query=$this->getAdminDb()->query($sql);
        if ($query->num_rows() > 0)
            return $query->result();
        else
            return "No user found";
	}
    public function getSavedStores($id){
        $sql = "SELECT * from user where username='$username' and password ='$pass'";

        $query=$this->getAdminDb()->query($sql);
        if ($query->num_rows() > 0)
            return $query->result();
        else
            return "No user found";
    }
    public function updateUser($id,$fname,$lname,$username,$emailaddress,$profilepic){
        $sql = "UPDATE user SET fname='$fname',lname='$lname',username='$username',emailaddress='$emailaddress',profilepic='$profilepic' where userid='$id'";

        $query=$this->db->query($sql);
    }
}