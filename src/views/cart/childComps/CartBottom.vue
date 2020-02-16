<template>
 <div class="bottom">
     <div class="cartboleft">
         <CheckButton class="lefttop" :isshowcheck='isshowall' @click.native="isshowallcilck"></CheckButton>
         <span>全选</span>
     </div>
     <div class="cartbocen">
         总价格:{{allprice}}
     </div>
     <div class="cartboright">
         去计算({{checkedlength}})
     </div>
 </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

 export default {
   data () {
     return {

     }
   },
   components: {
       CheckButton
   },
   computed: {
       allprice(){
           return '¥' + this.$store.state.cartlist.filter(item => {
                 return item.checked
               }).reduce((preValue,item) => {
                   return preValue + item.price*item.count
               },0).toFixed(2)
       },
       checkedlength(){
           return this.$store.state.cartlist.filter(item => item.checked).length
       },
       isshowall(){
           return !this.$store.state.cartlist.find(item => !item.checked)
       }
   },
   methods: {
       isshowallcilck(){
           if(this.isshowall){//说明全选
             this.$store.state.cartlist.forEach(item => item.checked=false)
           }else{
               this.$store.state.cartlist.forEach(item => item.checked=true)
           }
       }
   },
 }
</script>

<style scoped>
.bottom{
    display: flex;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    background-color: #eee;
}
.cartboleft{
    width: 60px;
    display: flex;
    align-items: center;
    margin-left: 10px;
}
 .lefttop{
     width: 18px;
     height: 18px;     
     line-height: 20px;
     margin-right: 5px;
 }
 .cartbocen{
     margin-left: 20px; 
     flex: 1;
 }
 .cartboright{
     width: 80px;
     background-color: red;
     text-align: center;
     color: #fff;
 }
</style>
