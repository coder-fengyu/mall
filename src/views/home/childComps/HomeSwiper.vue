<template>
 <div>
  <swiper>
     <swiper-item v-for="(item,key) in banners" :key="key">
        <a :href="item.link"><img :src="item.image" alt="" @load="Swiperimglode"></a>
     </swiper-item>
  </swiper>
 </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
 export default {
   data () {
     return {
       isLode:false
     }
   },
   components: {
       Swiper,
      SwiperItem
   },
   props:{
       banners:{
           type:Array,
           default(){
               return []
           }
           
       }
   },
   methods: {
     Swiperimglode(){
       if(!this.isLode){
         this.$emit('Swiperimglode')
         this.isLode=true
       }
       
     }
   }
 }
</script>

<style scoped>

 
</style>
