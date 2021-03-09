<template>
  <div class="markdown">
    <header class="header">
      <p class="item" @click="downLoadMdFile">下载</p>
      <p class="item pre-view" @click="preView">{{preViewBtn}}</p>
    </header>
    <div class="content">
      <div class="mobile" v-if="isMobile">
        <van-field
          class="text-mobile"
          v-model="text"
          autosize
          type="textarea"
          autofocus
          clearable
          v-if="!isShowPreView"
        />
        <div 
          v-html="mdResult" 
          class="render-md-mobile" v-if="isMobile && isShowPreView"></div>
      </div>
      <div class="pc" v-else>
        <van-field
          class="text text-pc"
          v-model="text"
          autosize
          type="textarea"
          autofocus
          clearable
        />
        <div 
          v-html="mdResult" 
          class="render-md render-md-pc"></div>
      </div>
    </div>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'
import { saveAs } from 'file-saver';
import { Storage } from '@jomsou/utils';
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    console.log('lang>>>', lang);
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
const storage = new Storage();
export default {
  data () {
    return {
      mdResult: '',
      text: '',
      md: undefined,
      isShowPreView: false,
      preViewBtn: '预览'
    }
  },
  props: {
  },
  methods: {
    renderMd () {
      let mdResult = md.render(this.text);
      this.mdResult = mdResult;
      storage.setLocal({'text': this.text});
      storage.setLocal({'mdResult': this.mdResult});
    },
    downLoadMdFile () {
      let blob = new Blob([this.text], {type : 'application/json'});
      let filename = new Date().toLocaleDateString() + '.md';
      saveAs(blob, filename);
    },
    preView () {
      if (!this.isMobile) return
      this.isShowPreView = !this.isShowPreView
      if (this.isShowPreView) {
        this.preViewBtn = '编写'
      } else {
        this.preViewBtn = '预览'
      }
    },
    init () {
      this.text = storage.getLocal('text') || '';
      this.mdResult = storage.getLocal('mdResult') || '';
    }
  },
  computed: {
    isMobile () {
      return /(iPhone|iPod|Android|ios)/i.test(navigator.userAgent)
    }
  },
  components: {
  },
  created() {
  },
  mounted() {
    this.init();
  },
  updated () {
    this.renderMd();
  },
  destroyed() {
  }
};
</script>
<style lang="scss" scoped>
body {
  overflow-x: hidden !important;
}
.markdown {
  .header {
    display: flex;
    .item {
      width: 50%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      border: 1px dashed #282c34;
    }
    .pre-view {
    }
  }
  .content {
    display: flex;
    a {
      text-decoration: none;
      color: #0269c8;
      border-bottom: 1px solid #d1e9ff;
    }
    .render-md-mobile,
    .render-md-pc {
      background: #282c34;
      color: #fff;
      padding: 1em;
      min-height: 100vh;
    }
    .text-mobile, 
    .text-pc {
      min-height: 100vh;
    }
    .pc {
      width: 100%;
      display: flex;
      .text-pc,
      /deep/ .render-md-pc {
        width: 50%;
      }
    }
    .mobile {
      width: 100%;
      .text-mobile,
      /deep/ .render-md-mobile {
        width: 100%;
      }
    }
    .download-btn {
      position: fixed;
      bottom: 0;
      right: 0;
      /* transform: translateX(-115%); */
    }
  }
}

/* ipad pro */
@media screen and (max-width: 1024px) {

}
/* ipad */
@media screen and (max-width: 768px) {

}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {

}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {

}
/* iphone5 */
@media screen and (max-width: 320px) {
}

</style>