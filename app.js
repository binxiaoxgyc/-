//导入第三方模块
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const session=require("express-session")
//创建服务器，监听端口号
var server=express();
server.listen(3000);
//拖管静态资源
server.use(express.static("public"));
server.use(cors({
	origin:["http://127.0.0.1:8080","http://localhost:8080"],
	credentials:true
}));
server.use(session({
	secret:"128位字符串",
	resave:true,
	saveUninitialized:true
}));
//使用body-parser模块，接收post请求传递的数据
server.use(bodyParser.urlencoded({extended:false}));
//导入路由器，并挂载
const userRouter=require("./routers/user.js");
server.use("/user",userRouter)
//主页-----商品列表
const index=require("./routers/index.js");
server.use("/index",index);
//商品详情路由
const details=require("./routers/details.js");
server.use("/details",details);
//购物车路由
const cart=require("./routers/cart.js");
server.use("/cart",cart);
