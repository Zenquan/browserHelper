<template>
  <div class="options">
    <h3 class="title">浏览器助手设置页</h3>
    <van-checkbox v-model="isShowQrcode"
      @change="showQrcode"
      class="item"
      >生成二维码
    </van-checkbox>
    <van-checkbox v-model="isShowMarkdown"
      @change="showMarkdown"
      class="item"
      >Markdown工具
    </van-checkbox>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShowQrcode: true,
      isShowMarkdown: true,
    }
  },
  props: {
  },
  methods: {
    showQrcode() {
      console.log('>>>', typeof this.isShowQrcode);
      chrome.storage.sync.set({
        isShowQrcode: this.isShowQrcode
      })
      localStorage.setItem('isShowQrcode', this.isShowQrcode)
    },
    showMarkdown() {
      console.log('>>>', typeof this.isShowMarkdown);
      chrome.storage.sync.set({
        isShowMarkdown: this.isShowMarkdown
      })
      localStorage.setItem('isShowMarkdown', this.isShowMarkdown)
    },
  },
  computed: {
  },
  components: {
  },
  created() {
  },
  mounted() {
    this.isShowQrcode = JSON.parse(localStorage.getItem('isShowQrcode'));
    this.isShowMarkdown = JSON.parse(localStorage.getItem('isShowMarkdown'));
  },
  destroyed() {
  }
};
</script>
<style lang="scss" scoped>
.options {
  padding: 10px;
  .title {
    font-size: 20px;
  }
  .item {
    height: 25px;
    font-size: 16px;
  }
}
</style>