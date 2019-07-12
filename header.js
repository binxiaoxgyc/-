// console.log(sessionStorage.getItem("uname"))
// if(sessionStorage.getItem("uname")!==null){
// 	console.log($(".header_top"))
// }else{
 
// };





(function(){
	$.ajax({
		url:"header.html",
		type:"get",
		success:function(result){
			$(result).replaceAll("header");
			$(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
			if(sessionStorage.getItem("uname")!==null){
				$(".header_top li:last").removeClass("loginOut").prev().addClass("loginOut");
				$(".header_top li:last span:first").html(sessionStorage.getItem("uname"))

			}else{
				$(".header_top li:last").addClass("loginOut").prev().removeClass("loginOut")
			};
		}
	});
})()