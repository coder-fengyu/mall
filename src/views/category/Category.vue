<template>
 <div id="category">
     <nav-bar class="nav-bar"><div slot="conent">商品分类</div></nav-bar>
     <div class="content">
       <tab-menu :cate="categories" @itemclick ='itemclick'></tab-menu>

       <scroll id="tab-content" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-con :title="['综合', '新品', '销量']" @tabclick="tabClick"></tab-con>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
     </div>
 </div>
</template>

<script>
import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
 
 import NavBar from 'components/common/navbar/NavBar'
 import TabMenu from './childComps/TabMenu'
 import TabCon from 'components/content/tarcon/TarCon'
 import Scroll from 'components/common/scroll/Scroll'
 import TabContentDetail from './childComps/TabContentDetail'

 import TabContentCategory from './childComps/TabContentCategory'

import {itemMixin} from 'common/mixin'

 export default {
   data () {
     return {
        categories: [],
        categoryData: {
        },
        currentIndex: -1,
        currentType:'pop'
     }
   },
   mixins:[itemMixin],

   components: {
     NavBar,
     TabMenu,
     Scroll,
     TabContentCategory,
     TabCon,
     TabContentDetail
   },
   created() {
     this.getCategory()
   },
   computed: {
     showSubcategory(){
      //  console.log('-----')
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
     },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
   },
   methods: {
     //获取数据
     getCategory(){
       getCategory().then(res=>{
       this.categories = res.data.category.list
       console.log(this.categories)
       for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          //// 3.请求第一个分类的数据
          this.getSubcategories(0)
       })
     },
     getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          // console.log(this.categoryData);
          
          this.categoryData = {...this.categoryData}
          this.getCategoryDetail('pop')
          this.getCategoryDetail('new')
          this.getCategoryDetail('sell')

        })
      },
      getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
          // console.log(this.categoryData[this.currentIndex]);
          
        })
      },
     


     tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

     itemclick(index){
       this.getSubcategories(index)
     }
   },
 }
</script>

<style scoped>
 #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
 
</style>
