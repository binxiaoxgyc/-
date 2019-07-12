$(function(){
    $.ajax({
    url:"/cart/main",
    type:"get",
    dataType:"json"
    }).then(result=>{
        console.log(result)
        for(var elem of result){
            $(`<tr>
            <td><input type="checkbox" checked></td>
            <td>
                <img src="${elem.img_url}" alt="">
                <span>${elem.model}</span>
                <span> ${elem.lname}</span>
            </td>
            <td><span>¥${elem.price.toFixed(2)}</span></td>
            <td>
                <button>-</button><input type="text" value=${elem.count}><button>+</button>
            </td>
            <td><span class="sum">¥${(elem.price*elem.count).toFixed(2)}</span></td>
            <td><a href="#" class="cancel">删除</a></td>
        </tr>`).appendTo($(".carts tbody"))    
        }
        
        var $tbody=$(".carts>tbody");
    //全选按钮
        var $checkAll=$(".carts thead input");
        var $checks=$(".carts>tbody td:first-child input");
        // 定义多选框函数
        function loadcard(){
            var $checkAll=$(".carts thead input");
            var $checks=$(".carts>tbody td:first-child input");
            var isChecked=true;
            $checks.each(function(i,elem){
                console.log(111,elem.checked)
                if(elem.checked===false){
                    isChecked=false;
                }
            });
            $checkAll.prop("checked",isChecked)
            if($checks.length==0){
                $checkAll.prop("checked",false)
            }
            //计算总价
            var $checked=$("tbody [type=checkbox]:checked");
            var total=0;
            $checked.each(function(i,elem){
                var price=parseFloat($(elem).parent().parent().children(":eq(2)").children().html().slice(1));
                var count=parseInt($(elem).parent().parent().children(":eq(3)").children("input").val())
                total+=price*count
            })
            $("table+div big").html(total.toFixed(2))
        }
        loadcard();
        //调用该js文件时，判断购物车选项是否全选
        $checks.each(function(i,elem){
            if(elem.checked==false){
                $checkAll.prop("checked",false);
                return;
            }
            $checkAll.prop("checked",true)
        })
        // 全选按钮点击事件
        $checkAll.click(function(){
            $(".carts>tbody td:first-child input").prop("checked",$(this).prop("checked"));
            loadcard();
        })
        // 选项勾选事件
        $tbody.click(function(e){
            var $elem=$(e.target);
            // 勾选事件
            // if($elem.prop("type")==="checkbox"){
            // }
            // 点击按钮，商品数量增减
            if($elem.get(0).tagName=="BUTTON"){
                if($elem.html()=="-"){
                    var n=parseInt($elem.next().val());
                    if(n>1){
                        $elem.next().val(--n)
                    }
                }else{
                    var n=parseInt($elem.prev().val());
                    $elem.prev().val(++n)
                }
                // 获取当前商品单价
                var  price=parseFloat($elem.parent().parent().children(":eq(2)").children().html().slice(1)); 
                // 计算小计
                var sumPrice=(n*price).toFixed(2) ;
                $elem.parent().parent().find(".sum").html("￥"+sumPrice);
            }
            // 单个删除事件
            if($elem.is(".cancel")){
                if(confirm("是否确定删除？")){
                    $elem.parent().parent().remove();
                }
                loadcard();
            }
            // 调用函数，重新计算总价
            loadcard();  
        })
        // 输入框失去焦点事件
        $tbody.on("blur","input[type=text]",function(){
            var $input=$(this);
            // 获取当前行单价
            var  price=parseFloat($input.parent().parent().children(":eq(2)").children().html().slice(1)); 
            // 获取商品数量
            var n=parseInt($input.val());
            // 计算小计
            var sumPrice=(n*price).toFixed(2) ;
            $input.parent().parent().find(".sum").html("￥"+sumPrice); 
        });
    // 点击删除所选事件
	 });
})


