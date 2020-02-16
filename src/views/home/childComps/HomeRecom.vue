<template>
 <div class="comment">
     <div class="comment-item" v-for="(item,index) in recommends" :key="index">
         <a :href="item.link">
             <img :src="item.image" alt="">
             <div>{{item.title}}</div>
         </a>
     </div>
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
       recommends:{
           type:Array,
           default(){
               return []
           }
       }
   }
 }
</script>

<style scoped>
.comment{
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 12px;
    margin: 10px 0 20px;
    border-bottom: 10px solid #eee;
}
 .comment-item{
     flex: 1;
 }
 .comment-item img{
     width: 70px;
     height: 70px;
     margin-bottom: 10px;
 }
</style>
