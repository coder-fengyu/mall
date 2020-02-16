<template>
 <div class="cartlist">
     <scroll class="cartsceoll" ref="scroll">
       <cart-list-item v-for="(item,index) in cartlist" :key="index" :item-info='item'></cart-list-item>
     </scroll>
 </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem'
import scroll from 'components/common/scroll/Scroll'
 export default {
   data () {
     return {

     }
   },
   computed: {
       ...mapGetters(['cartlist'])
   },
   components: {
       CartListItem,
       scroll
   },
   activated() {
       this.$refs.scroll.refresh()
    //    console.log('----');
       
   },
 }
</script>

<style scoped>
.cartlist{
    height: calc(100% - 44px - 49px - 30px);
}
 .cartsceoll{
     height: 100%;
     overflow: hidden;
 }
</style>
