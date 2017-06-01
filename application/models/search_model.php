<?php

class search_model extends CI_Model {

	
	public function search($condition){
		$sql = "SELECT p.*,sh.name as shopname,img.product_id,img.oriname as imgname FROM product p 
		join (select shopid,name from shop)sh on p.shop_id = sh.shopid
		join(select oriname,product_id from product_image GROUP by product_id)img on p.id = img.product_id
		 where $condition";

        $query=$this->db->query($sql);
        if ($query->num_rows() > 0)
            return $query->result_array();
        else
            return null;
	}
}