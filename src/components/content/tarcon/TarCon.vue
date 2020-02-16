<template>
 <div class="toptar">
     <div class="toptar-item" v-for="(item,index) in title" :key="index" :class="{active:index===currenyIndex}" @click="itemclick(index)">
         <span>{{item}}</span>
     </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         currenyIndex:0
     }
   },
   components: {

   },
   props:{
       title:{
           type:Array,
           defult(){
               return []
           }
       }
   },
   methods: {
       itemclick(index){
           this.currenyIndex=index;
           this.$emit('tabclick', index)
       }
   }
 }
</script>

<style scoped>
.toptar{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: white;
    

}
.toptar span{
    padding-bottom: 5px;
}

.toptar-item{
    flex: 1;
}
 
.active{
    color: var(--color-high-text);
}
.active span{
     border-bottom: 2px solid var(--color-high-text);
}
</style>
