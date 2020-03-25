<template>
    <div>
      <Header></Header>
      <div class="homePage">
          <div class="article-container">
            <div class="article-list">
              <div
                class="article-item"
                v-for="(item, index) in tabList"
                :key="index"
                @click="handleNavigate(item)"
              >
                <div class="item-top">
                  <p class="item-label label-primary">{{ item.label }}</p>
                  <p class="item-date">{{ item.date }}</p>
                </div>
                <div class="title-part">
                  <p class="item-iitle">{{ item.title }}</p>
                  <p class="title-notice">(〃'▽'〃)</p>
                </div>
                <p class="item-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="custom-div">
              <div class="label-list">
                <div class="label-item">js[1]</div>
                <div class="label-item">css[1]</div>
                <div class="label-item">随记[0]</div>
                <div class="label-item">笔记[0]</div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/common/Header'
import {getHomePageData} from '../../api/artcle'
export default {
  components: {
    Header
  },
  data () {
    return {
      tabList: []
    }
  },
  mounted () {
    this.tabList = []
    this.getData()
    let _this = this
    window.addEventListener('scroll', _this.scroll)
  },
  destroyed () {
    let _this = this
    window.removeEventListener('scroll', _this.scroll)
  },
  methods: {
    handleNavigate (item) {
      this.$router.push({
        name: item.urlName
      })
    },
    getData () {
      getHomePageData().then(res => {
        console.log(res)
        const list = res.data.map(item => {
          return {
            id: item.id,
            useName: item.useName,
            label: item.columnName,
            date: item.createTime.replace('T', ' '),
            title: item.title,
            desc: item.conent.substr(0, 45),
            apprecTimes: item.apprecTimes,
            commentTimes: item.commentTimes
          }
        })
        this.tabList.push(...list)
      })
    },
    // 滚动条在y轴上的滚动距离
    getScrollTop () {
      return document.body.scrollTop + document.documentElement.scrollTop
    },
    // 文档的总高度
    getScrollHeight () {
      var scrollHeight = 0
      var bodyScrollHeight = 0
      var documentScrollHeight = 0
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      return scrollHeight
    },
    // 浏览器视口的高度
    getWindowHeight () {
      var windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      return windowHeight
    },
    scroll () {
      console.log('getScrollTop' + this.getScrollTop())
      console.log('getWindowHeight' + this.getWindowHeight())
      console.log('getScrollHeight' + this.getScrollHeight())
      if (this.getScrollTop() + this.getWindowHeight() === this.getScrollHeight()) {
        // 查询接口
        console.log('触发')
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
