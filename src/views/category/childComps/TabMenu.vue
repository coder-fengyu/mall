<template>
 <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item" 
           v-for="(item, index) in cate" :key="index"
           :class="{active: index===currIndex}"
           @click="itemclick(index)"
           >
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
 export default {
   data () {
     return {
      currIndex:0
     }
   },
   components: {
     Scroll,
   },
   props:{
     cate:{
       type:Array,
       default(){
         return []
       }
     }
   },
   methods: {
     itemclick(index){
       this.currIndex = index
       this.$emit('itemclick',index)
     }
   },

 }
</script>

<style scoped>

  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

 .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
