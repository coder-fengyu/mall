<template>
 <div id="home">
   <nav-bar class="nav-bar"><div slot="conent">购物街</div></nav-bar>
   <tar-con v-show="istarShow" class="tarcon" :title="[' 流行','新款','精选']" @tabclick="tabclick" ref="tarcon1"></tar-con>
   <scroll class="content" ref="scroll" :probeType='3' @scroll="contenScroll" :pullUpLoad='true' @pullingUp='itemimglode'>
    <home-swiper :banners=banners @Swiperimglode='Swiperimglode'></home-swiper>
    <home-recom :recommends=recommends></home-recom>
    <home-comm></home-comm>
    <tar-con :title="[' 流行','新款','精选']" @tabclick="tabclick" ref="tarcon2"></tar-con>
    <good-list :goods=goods[currindex].list> </good-list>
   </scroll>
   <back-top @click.native="tacktop" v-show="TackTopshow"></back-top>
 </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecom from './childComps/HomeRecom'
import HomeComm from './childComps/Homecomm'

import NavBar from 'components/common/navbar/NavBar'
import TarCon from 'components/content/tarcon/TarCon'
import GoodList from 'components/content/goodslist/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import {debounce} from 'common/utils'

import {itemMixin} from 'common/mixin'

import {BACKTOP_DISTANCE} from 'common/const'

import {getHomeMultidata,getHomeGoods} from 'network/home'
 export default {
   name:'Home',
   data () {
     return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0,list: []},
          'new':{page: 0,list: []},
          'sell':{page: 0,list: []}
        },
        currindex:'pop',
        TackTopshow:false,
        TaroffsetTop:0,
        istarShow:false,
        saveY:0,
        
     }
   },
   mixins:[itemMixin],
   components: {
      HomeSwiper,
      HomeRecom,
      HomeComm,
      NavBar,
      TarCon,
      GoodList,
      Scroll,
      BackTop
   },
   //生命周期函数在组件挂载后调用
   created() {
     //获取多个数据
     this.getHomeMultidata();
     //获取goods里需要的数据
     this.getHomeGoods('pop');
     this.getHomeGoods('new');
     this.getHomeGoods('sell');

   },
   //生命周期函数，在dom挂载后调用
   mounted() {
    //  console.log('bbb');
     
   },

   activated() {
    //  console.log(this.saveY);
     this.$refs.scroll.scrollTo(0,this.saveY,10)
     this.$refs.scroll.refresh()

   },
   deactivated() {
     this.saveY = this.$refs.scroll.getscrolly()
     this.$bus.$off('ItemImgLoad', this.imagelodeasd)
   },

   methods: {
     /*
     *监听事件请求的方法
     */
    tabclick(index){
      switch(index){
        case 0:
          this.currindex = 'pop'
          break
        case 1:
          this.currindex = 'new'
          break
        case 2:
          this.currindex = 'sell'
          break
      }
      this.$refs.tarcon1.currenyIndex=index
      this.$refs.tarcon2.currenyIndex=index
    },

    tacktop(){
      this.$refs.scroll.scrollTo(0,0)
    },

    contenScroll(position){
      this.TackTopshow = -(position.y) > BACKTOP_DISTANCE
      this.istarShow =  -(position.y) >= this.TaroffsetTop
    },

    itemimglode(){
      // console.log('我到底了');
      this.getHomeGoods(this.currindex)
    },

    Swiperimglode(){
      this.TaroffsetTop = this.$refs.tarcon2.$el.offsetTop
      
    },


     /*
     网络请求事件的方法
     */
     getHomeMultidata(){
        getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;    
       })
     },
     getHomeGoods(type){
       const page = this.goods[type].page+1;
       getHomeGoods(type,page).then(res =>{
         this.goods[type].list.push(...res.data.list);
         this.goods[type].page+=1;
         this.$refs.scroll.finishPullUp();
       })
     }
      
   }
 }
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.nav-bar{
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */ 
}
 .tarcon{
   position: relative;
   z-index: 9;
 }
 .content{
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }
</style>
