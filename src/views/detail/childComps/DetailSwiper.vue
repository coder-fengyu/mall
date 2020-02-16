<template>
     <Swiper class="detailswiper">
         <SwiperItem v-for="(item,key) in topImages" :key="key">
             <img :src="item" alt="">
         </SwiperItem>
     </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
 export default {
   data () {
     return {

     }
   },
   components: {
       Swiper,
       SwiperItem
   },
   props:{
       topImages:{
           type:Array,
           default(){
               return []
           }
       }
   }
 }
</script>

<style scoped>
.detailswiper{
    height: 300px;
    overflow: hidden;
}
 
</style>
