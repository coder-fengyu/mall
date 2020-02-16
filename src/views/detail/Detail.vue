<template>
 <div id="detail">
   <de-nav-bar @Navitemclick='Navitemclick' ref="navbar"></de-nav-bar>
   <scroll class="detailscroll" ref="scroll" :probeType='3' @scroll="poscroll">
     <detail-swiper :topImages='topImages'></detail-swiper>
     <detail-goods :goods="goods"></detail-goods>
     <detail-shop :shop="shop"></detail-shop>
     <detail-deta-info :detailInfo='detailInfo' @takeinfo='takeinfo'></detail-deta-info>
     <detail-param-info :paramInfo='paramInfo' ref="param" ></detail-param-info>
     <detail-comment-info :commentInfo='commentInfo' ref="comment"></detail-comment-info>
     <good-list :goods='recommendList' ref="recommend"></good-list>
   </scroll>
   <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
   <back-top @click.native="tacktop" v-show="TackTopshow"></back-top>
 </div>
</template>

<script>
import DeNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailGoods from './childComps/DetailGoods'
import DetailShop from './childComps/DetailShop'
import DetailDetaInfo from './childComps/DetailDetaInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodList from 'components/content/goodslist/GoodList'

import scroll from 'components/common/scroll/Scroll'

import {itemMixin,backtopMixin} from 'common/mixin'

import {getdetaildata,getrecom,Goods,Shop,GoodsParam} from 'network/detail'
 export default {
   name:'Detail',
   data () {
     return {
       iid:null,
       topImages:[],
       goods:{},
       shop:{},
       detailInfo: {},
       paramInfo:  {},
       commentInfo: {},
       recommendList:[],
       currscolly:[],
       currindex:0

     }
   },
   mixins:[itemMixin,backtopMixin],
   components: {
     DeNavBar,
     DetailSwiper,
     DetailGoods,
     DetailShop,
     DetailDetaInfo,
     scroll,
     DetailParamInfo,
     DetailCommentInfo,
     GoodList,
     DetailBottomBar
   },
   created() {
     //传入iid值
     this.iid = this.$route.params.iid
     //根据iid请求数据
     getdetaildata(this.iid).then(res => {
      //  console.log(res);
       const data = res.result
       this.topImages = data.itemInfo.topImages

       //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goods);

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.5.获取商品信息
      this.detailInfo = data.detailInfo

      // 2.6.保存参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 2.7.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      
       
     })
     getrecom().then((res) => {
       this.recommendList = res.data.list
     })
   },
   destroyed() {
     this.$bus.$off('ItemImgLoad', this.imagelodeasd)
   },
   methods: {
     takeinfo(){
       this.$refs.scroll.refresh()
       this.currscolly.push(0);
       this.currscolly.push(this.$refs.param.$el.offsetTop-44);
       this.currscolly.push(this.$refs.comment.$el.offsetTop-44);
       this.currscolly.push(this.$refs.recommend.$el.offsetTop-44);
       this.currscolly.push(Number.MAX_VALUE)
      //  console.log(this.currscolly);
       
     },
     Navitemclick(index){
      //  console.log(index);
       this.$refs.scroll.scrollTo(0,-this.currscolly[index],200)
     },
     poscroll(position){
      //  console.log(position.y);
      let positionY = -position.y
      const length = this.currscolly.length
       for(let i =0;i<length-1;i++){
         if(this.currindex!==i &&  positionY >= this.currscolly[i] && positionY<this.currscolly[i+1]){
           this.currindex = i
          //  console.log(this.currindex);
          this.$refs.navbar.currIendx = this.currindex
         }
         
       }
      this.tacktopshow(position)
     },
     addToCart(){
       const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.price = this.goods.price;
        // 3.添加到Store中
        this.$store.dispatch('addCart', obj)
     }
   },
   
 }
</script>

<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: white;
}
.detailscroll{
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
 
</style>
