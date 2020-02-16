<template>
 <div class="wrapper" ref="wrapper">
     <div class="content">
         <slot></slot>
     </div>

 </div>
</template>

<script>
import BScroll from 'better-scroll'
 export default {
   data () {
     return {
        scroll:null
     }
   },
   props:{
       probeType:{
           type:Number,
           default:0
       },
       pullUpLoad:{
           type:Boolean,
           default:false
       }

   },
   components: {

   },
   mounted() {
       this.scroll = new BScroll(this.$refs.wrapper,{
           click:true,
           probeType:this.probeType,
           pullUpLoad:this.pullUpLoad,
       })
       this.scroll.on('scroll',(position)=>{
           this.$emit('scroll', position)
       })
       this.scroll.on('pullingUp',()=>{
        //    console.log('wwwwww'); 
           this.$emit('pullingUp')
       })
   },
   methods: {
       scrollTo(x,y,time=300){
           this.scroll && this.scroll.scrollTo(x,y,time)
       },
       finishPullUp(){
           this.scroll && this.scroll.finishPullUp()
       },
       refresh(){
        //    console.log('-----');
           this.scroll && this.scroll.refresh();
       },
       getscrolly(){
           return this.scroll ? this.scroll.y : 0
       }
   }
 }
</script>

<style scoped>

</style>>


