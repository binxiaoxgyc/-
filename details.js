const express=require("express");
const pool=require('../pool.js');
var router=express.Router();
router.get("/",(req,res)=>{
	var lid=req.query.lid;
  var output={
    product:{},
    pics:[]
  }
  if(lid!==undefined){
    var sql1=`select * from fk_laptop where lid=?`;
    pool.query(sql1,[lid],(err,result)=>{
      if(err) console.log(err);
      output.product=result[0];
      console.log(output);
     
			var sql2=`select * from fk_laptop_pic where laptop_id=?`
			pool.query(sql2,[lid],(err,result)=>{
				if(err) console.log(err);
				output.pics=result;
				console.log(output);
				res.send(output);
			})
      
    })
  }else{
    res.send(output);
  }
})

	module.exports=router