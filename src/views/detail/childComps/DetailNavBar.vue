<template>
    <nav-bar class="detailnavbar">
        <div slot="left" class="backleft" @click="backleft"><img src="~assets/img/common/back.svg" alt=""></div>
        <div slot="conent" class="conent">
            <div class="conent-item" v-for="(item,index) in titles" :key="index" :class="{active:currIendx===index}" @click="itemclick(index)">{{item}}</div>
        </div>
    </nav-bar> 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
 export default {
   data () {
     return {
        titles:['商品','参数','评论','推荐'],
        currIendx:0
     }
   },
   components: {
       NavBar
   },
   methods: {
       itemclick(index){
           this.currIendx = index
           this.$emit('Navitemclick', index)
       },
       backleft(){
           this.$router.back()
       }
   }
 }
</script>

<style scoped>
.detailnavbar{
    background-color: white;
    position: relative;
    z-index: 9
}
    .conent{
        display: flex;
        font-size: 13px;
    }
    .conent-item{
        flex: 1;
    }
 .active{
     color: var(--color-high-text)
 }
 .backleft img{
     margin-top: 12px;
 }
</style>
