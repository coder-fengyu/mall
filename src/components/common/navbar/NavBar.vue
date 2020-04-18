<template>
 <div class="navbar">
     <div class="left"><slot name="left"></slot></div>
     <div class="conent"><slot name="conent"></slot></div>
     <div class="right"><slot name="right"></slot></div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>
    
<style scoped>
.navbar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgb(100, 100,100,.1);
    position: relative;
    z-index: 9
}
.left, .right{
    width: 60px;
}
.conent{
    flex: 1;
}

</style>
