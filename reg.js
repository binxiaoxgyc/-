// 获取焦点事件，提示信息显示
$(".main ul").on("focus","input",function(){
    var $input=$(this);
    switch($input.attr("id")){
        case "uname":$("#uname_msg").html("用户名为4~16位普通字符").attr("class","vali");break;
        case "upwd":$("#upwd_msg").html("密码长度为6~16位").attr("class","vali");break;
        case "cupwd":$("#cupwd_msg").html("两次密码必须保持一致").attr("class","vali");break;
        case "phone":$("#phone_msg").html("请输入您的手机号码").attr("class","vali");break;
        case "email":$("#email_msg").html("请输入合法邮箱账号").attr("class","vali");break;
    }
})
.on("blur","input",function(){
    var $input=$(this);
    switch($input.attr("id")){
        case "uname":
            var str=$input.val();
            var reg=/^[0-9a-zA-Z_-]{4,16}$/
            if(reg.test(str)){
                var xhr=new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4&&xhr.status==200){
                        var result=xhr.responseText;
                        if(result==0){
                            $("#uname_msg").html("该用户名已被占用").attr("class","vali_fail")
                        }else{
                            $("#uname_msg").html("该用户名可用").attr("class","vali_success")
                        }
                    }
                }
                xhr.open("get","http://127.0.0.1:3000/user/reg_uname?uname="+$input.val(),true);
                xhr.send();
            }else{
                $("#uname_msg").html("用户名需介于4~16位普通字符之间").attr("class","vali_fail")
            }; 
            break;
       
        case "upwd":
            if(/^\w{6,16}$/.test($input.val())){
                $("#upwd_msg").html("密码可用").attr("class","vali_success");
            }else{
                $("#upwd_msg").html("输入密码不符合规则").attr("class","vali_fail")
            };break;
        
        case "cupwd":
            if($input.val()==""){
                $("#cupwd_msg").html("密码不能为空").attr("class","vali_fail");  
            }else{
                if($input.val()==$("#upwd").val()){
                    $("#cupwd_msg").html("密码正确").attr("class","vali_success");  
                }else{
                    $("#cupwd_msg").html("两次密码不一致").attr("class","vali_fail");  
                }
            };break;
        case "phone":
            if(/^1[3-9][0-9]{9}$/.test($input.val())){
                $("#phone_msg").html("手机号输入正确").attr("class","vali_success");
            }else{
                $("#phone_msg").html("手机号不可用,请重新输入").attr("class","vali_fail");
            };break;
        case "email":
            if(/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test($input.val())){
                $("#email_msg").html("邮箱账号合法").attr("class","vali_success")
            }else{
                $("#email_msg").html("邮箱账号不合法").attr("class","vali_fail")
            };break;
    }
})
$(".main button").click(function(){
    var $span=$(".vali_success");
    console.log($span)
    if($span.length==5){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var result=xhr.responseText;
                if(result==0){
                    alert("注册失败")
                }else if(result==1){
                   alert("注册成功");
                    sessionStorage.setItem("uname",uname.value);
                    location.replace("index.html")

                }
            }
        }
        // 打开连接，建立请求
        xhr.open("post","http://127.0.0.1:3000/user/reg",true);
        var formdata=`uname=${uname.value}&upwd=${upwd.value}&email=${email.value}&phone=${phone.value}`
        // 设置头信息
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        // 发送请求
        xhr.send(formdata);
    }else{
        alert("您输入的未完成，请继续")
    }
})
































