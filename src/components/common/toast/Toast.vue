<template>
 <div v-show="isShow" class="toast">
     <div>{{messase}}</div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         messase:'',
         isShow:false,
     }
   },
   methods: {
       show(mess='默认文字',delay=1500){
           this.messase = mess
           this.isShow = true
           setTimeout(()=>{
               this.isShow = false
               this.messase = '' 
           },delay)
       }
   }
 }
</script>

<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    z-index: 999;

    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
}
 
</style>
