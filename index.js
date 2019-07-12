const express=require("express");
const pool=require('../pool.js');
var router=express.Router();
router.get("/",(req,res)=>{
	pool.query("select lid,price,oldprice,title,lname,laptop_pic,sold_count from fk_laptop where lid between 1 and 17",function(err,result){
		if(err) {throw err}
		else{
			res.send(result)
		}
	})
});
	module.exports=router