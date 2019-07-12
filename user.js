//导入第三方模块
const express=require("express");
const pool=require("../pool.js");
//创建路由器
var router=express.Router();
//登录路由
router.post("/login",(req,res)=>{
	var obj=req.body;
	//判断非空
	if(!obj.uname){res.send("2")}
	if(!obj.upwd){res.send("3")}
	//连接数据库，查询用户表
	pool.query("select uname,uid from user where uname=? and upwd=?",[obj.uname,obj.upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			req.session.uname=result[0].uname;
			req.session.uid=result[0].uid
			res.send("1");//1 表示登录成功
		}else{
			res.send("0");//0 表示用户名或密码错误
		}
	})
});
// 验证用户名是否被占用
router.get("/reg_uname",function(req,res){
	var obj=req.query;
	pool.query("select uname from user where uname=?",[obj.uname],function(err,result){
		if(err) throw err;
		if(result.length>0){
			res.send("0");//0表示用户名已被占用
		}else{
			res.send("1");//1表示用户名可以使用
		}
	})
})
// 注册路由
router.post("/reg",function(req,res){
	var obj=req.body;
	pool.query("insert into user set uname=?,upwd=?,email=?,phone=?",[obj.uname,obj.upwd,obj.email,obj.phone],function(err,result){
		
		if(result.affectedRows>0){
			pool.query("select uid from user where uname=?",[obj.uname],function(err,result2){
				if(err) throw err;
				if(result2.length>0){
					req.session.uid=result2[0].uid
					res.send("1");//1表示注册成功
				}
			})
			
		}else{
			res.send("0");//0表示注册失败
		}
	});
});
//导出路由器
module.exports=router;