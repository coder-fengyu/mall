<template>
  <grid-view>
    <good-list-item v-for="(item, index) in categoryDetail" :key="index" :good="item"></good-list-item>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridview/GridView'
  import GoodListItem from 'components/content/goodslist/GoodListItem'

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
