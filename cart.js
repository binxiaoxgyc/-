const express=require("express");
const pool=require('../pool.js');
var router=express.Router();
router.get("/add",(req,res)=>{
	var lid=req.query.lid;
	var uid=req.session.uid;
	var count=req.query.count;
	if(!lid){
		res.send({code:0,msg:"商品id不能为空"});
		return;
	};
	if(!count){res.send({code:0,msg:"商品数量不能为空"});return};
	if(uid!==undefined){
		var sql1=`select * from fk_laptop where lid=?`;
	//	查询商品列表，获取商品数据	
		pool.query(sql1,[lid],(err,result)=>{
		if(err) console.log(err);
		var product=result[0];
				var lname=product.lname;
				var price=product.price;
				var model=product.model;
				var ischecked=1;
				var img_url=product.laptop_pic;
		//可以添加一个判断条件，如果购物车列表已经存在此商品，就只更改数量
				pool.query("select count from fk_cart where uid=? and lname=?",[uid,lname],(err,result1)=>{
					if(err) throw err;
					if(result1.length==0){
						//购物车插入数据
						var sql2=`insert into fk_cart set model=?,lname=?,price=?,uid=?,count=?,ischecked=?,img_url=?`
						pool.query(sql2,[model,lname,price,uid,count,ischecked,img_url],(err,result2)=>{
							if(err) console.log(err);
							if(result2.affectedRows>0){
								res.send({code:1,msg:"添加成功"})
							}else{
								res,send({code:-1,msg:"添加失败"})	
							}
						});
					}else{
					
						var num=parseInt(result1[0].count)+parseInt(count);
						pool.query("update fk_cart set count=?,ischecked=? where lname=? and uid=?",[num,ischecked,lname,uid],(err,result2)=>{
							if(err) throw err;
							if(result2.affectedRows>0){
								res.send({code:1,msg:"添加成功"})
							}else{
								res.send({code:-1,msg:"添加失败"})	
							}
						})
					}
				})
		
		})
	}else{
		res.send({code:0,msg:"未登陆"});
	}
})
router.get("/main",(req,res)=>{
	var uid=req.session.uid;
	console.log(uid)
	if(uid!==undefined){
		pool.query("select * from fk_cart where uid=?",[uid],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send(result)
				console.log(111,result)
			}else{
				res.send({code:0})
			}
		})
	}
})

module.exports=router