<template>
    <div>
      <Header></Header>
      <div class="topics">
          主题cvbdsfsd
        </div>
    </div>
</template>

<script>
import Header from '../../components/common/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      tabList: []
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/common.scss';
  .topics {
    @include displayflex(row, space-between, flex-start);
    width: 960px;
    margin-top: 72px;
  }
</style>
