new Vue({
    el:"#app",
    data:{
        p1:{price:0,oldprice:0},
        p2:{price:0,oldprice:0},
        p3:{price:0,oldprice:0},
        p4:{price:0,oldprice:0},
        p5:[],
        p11:{price:0,oldprice:0},
        p12:[]
       
     
    },
    created(){
        axios.get("http://127.0.0.1:3000/index").then(result=>{
            console.log(result),
            this.p1=result.data[0]
            this.p2=result.data[1]
            this.p3=result.data[2]
            this.p4=result.data[3]
            this.p5=result.data.splice(4,6)
            this.p11=result.data[4]
            this.p12=result.data.splice(5,6)
        })

    }
})