import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop'
import {BACKTOP_DISTANCE} from 'common/const'
export const itemMixin = {
    data() {
        return {
            imagelodeasd:null    
        }
    },
    mounted() {
          //图片加载完成时的事件监听
      const newrefresh = debounce(this.$refs.scroll.refresh,200)
      this.imagelodeasd = ()=>{
        newrefresh()
      }
      this.$bus.$on('ItemImgLoad',this.imagelodeasd)
    //   console.log('aaa');
      
    },
}
export const backtopMixin = {
    components:{
        BackTop
    },
    data() {
        return {
            TackTopshow:false,
        }
    },
    methods: {
        tacktop(){
            this.$refs.scroll.scrollTo(0,0)
          },
        tacktopshow(position){
            this.TackTopshow = -(position.y) > BACKTOP_DISTANCE
        }
    },
}