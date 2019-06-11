//导入第三方模块
const express=require("express");
const bodyParser=require("body-parser");
//创建服务器，监听端口号
var server=express();
server.listen(3000);
//拖管静态资源
server.use(express.static("public"));
server.use(express.static("./img"));
server.use(express.static("./css"));
server.use(express.static("./js"));
//使用body-parser模块，接收post请求传递的数据
server.use(bodyParser.urlencoded({extended:false}));
//导入路由器，并挂载
const userRouter=require("./routers/user.js");
server.use("/user",userRouter)
