<template>
 <div class="checkb" :class="{active:isshowcheck}">
     <img src="~assets/img/cart/tick.svg" alt="">
 </div>
</template>

<script>
 export default {
   data () {
     return {
         
     }
   },
   components: {

   },
   props:{
       isshowcheck:{
           type:Boolean,
           default:false
       }
   }
 }
</script>

<style scoped>
.checkb{
    border-radius: 50%;
    border: 2px solid #aaa;
}
.active{
     background-color: red;
     border: 2px solid red;
}
 
</style>
