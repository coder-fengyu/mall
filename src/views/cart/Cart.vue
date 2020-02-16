<template>
 <div class="cart">
   <nav-bar class="nav-bar">
     <div slot="conent">购物车({{cartlength}})</div>
   </nav-bar>
   <cart-list></cart-list>
   <cart-bottom></cart-bottom>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
import CartList from './childComps/CartList'
import CartBottom from './childComps/CartBottom'
 export default {
   data () {
     return {

     }
   },
   computed: {
    //  cartlength(){
    //    return this.$store.getters.cartlength
    //  },
    ...mapGetters(['cartlength','cartlist'])
   },
   components: {
     NavBar,
     CartList,
     CartBottom
   }
 }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
 .cart{
   height: 100vh;
 }
</style>

