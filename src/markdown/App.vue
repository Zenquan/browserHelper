<template>
  <div class="markdown">
    <textarea v-model="text" class="text"></textarea>
    <div v-html="mdResult" class="render-md"></div>
    <van-button 
      type="info"
      class="download-btn"
      @click="downLoadMdFile">
      下载
    </van-button>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'
import { saveAs } from 'file-saver';
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
export default {
  data () {
    return {
      mdResult: '',
      text: '',
      md: undefined
    }
  },
  props: {
  },
  methods: {
    renderMd () {
      let mdResult = md.render(this.text);
      this.mdResult = mdResult
      // console.log('text>>>', this.text);
      // console.log('mdResult>>>', mdResult);
    },
    downLoadMdFile () {
      let blob = new Blob([this.text], {type : 'application/json'});
      let filename = new Date().toLocaleDateString() + '.md';
      saveAs(blob, filename);
    }
  },
  computed: {
  },
  components: {
  },
  created() {
  },
  mounted() {
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
  margin: 0;
  padding: 0;
} 
.markdown {
  display: flex;
  .text {
    background: #fff;
  }
  .render-md {
    background: #282c34;
    color: #fff;
    padding: 1em;
  }
  .text,
  /deep/ .render-md {
    width: 50%;
    min-height: 100vh;
    a {
      text-decoration: none;
      color: #0269c8;
      border-bottom: 1px solid #d1e9ff;
    }
  }
  .download-btn {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-115%);
  }
}
</style>