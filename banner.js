"use strict";
var carousel=document.getElementById("carousel");
var imgs=carousel.children
var num=carousel.children.length;//轮播图片数量
var time=500;//图片移动时间
var i=0;//当前图片所在下标
var n=10;//
// 轮播指示器
var ul=document.querySelector(".banner .indicator");
var lis=ul.children;
// 定义一个移动函数
function show(to){
    n++;
    if(to==undefined){
        to=i+1;
    }
    i=to;
    for(var  li of lis){
        li.className="";
    }
    if(i==num){
        i=0;
    }
    for(var img of imgs ){
        img.className=""
    }   
    lis[i].className="active";
    imgs[i].style.zIndex=n;
    imgs[i].className="visible";
}
var delay=3000;//每张图片显示时间
// 周期性定时器，定时移动图片
var banner=carousel.parentNode;
var timer=setInterval(()=>{
         show();
    },delay);
// 鼠标悬浮清除定时器
banner.onmouseenter=()=>{
    clearInterval(timer);
	timer=null;
}
// 鼠标移开就开启定时器
banner.onmouseleave=()=>{
    timer=setInterval(()=>{
        show();
    },delay);
}
// 轮播指示器点击事件
var canClick=true;
ul.onclick=e=>{
    if(canClick){
       if(e.target.nodeName=="LI"){
           for(var  i=0; i<lis.length;i++){
               if(lis[i]==e.target){
                   break;
               }
           }
          show(i);
           canClick=false;
           setTimeout(()=>canClick=true,time)
       }
    }
}
