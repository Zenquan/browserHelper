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
    <van-checkbox v-model="isShowDiagrams"
      @change="showDiagrams"
      class="item"
      >diagrams工具
    </van-checkbox>
  </div>
</template>
<script>
import { Storage } from '@jomsou/utils';
const storage = new Storage();
export default {
  data () {
    return {
      isShowQrcode: true,
      isShowMarkdown: true,
      isShowDiagrams: false
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
      storage.setLocal('isShowQrcode', this.isShowQrcode)
    },
    showMarkdown() {
      console.log('>>>', typeof this.isShowMarkdown);
      chrome.storage.sync.set({
        isShowMarkdown: this.isShowMarkdown
      })
      storage.setLocal('isShowMarkdown', this.isShowMarkdown)
    },
    showDiagrams() {
      console.log('>>>', typeof this.isShowDiagrams);
      chrome.storage.sync.set({
        isShowDiagrams: this.isShowDiagrams
      })
      storage.setLocal('isShowDiagrams', this.isShowDiagrams)
    },
  },
  computed: {
  },
  components: {
  },
  created() {
  },
  mounted() {
    this.isShowQrcode = storage.getLocal('isShowQrcode');
    this.isShowMarkdown = storage.getLocal('isShowMarkdown');
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