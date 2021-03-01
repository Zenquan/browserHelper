<template>
  <div class="popup">
    <!-- github匹配显示部分 gitHubHelper -->
    <div v-if="isGitHubHelper">
      <div class="item" @click="copyGitClone" v-show="isShowGitHubClone">复制快速git clone</div>
      <div class="item" @click="goGithub1s" v-show="isShowGitHubClone">go github1s</div>
    </div>
    <!-- 公共部分 点击生成二维码 -->
    <div class="item" @click="getQrCode" v-show="isShowQrcode">生成二维码</div>
    <div class="item" @click="markdown" v-show="isShowMarkdown">Markdown工具</div>
    <div class="item setting">
      <span @click="github">github</span>
      <span @click="setting">设置</span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  data () {
    return {
      currentPageUrl: '',
      isShowQrcode: false,
      isShowMarkdown: false
    }
  },
  props: {
  },
  methods: {
    setting() {
      chrome.tabs.create({ url: "/options/options.html" });
    },
    github () {
      chrome.tabs.create({ url: "https://github.com/Zenquan/browserHelper" });
    },
    getQrCode () {
      chrome.tabs.create({ url: "/qrcode/qrcode.html" });
    },
    getGithubCnpmUrl (currentPageUrl) {
      const gitHubUrlArr = currentPageUrl.split('/'),
        urlArr = gitHubUrlArr.slice(0, 5);
      urlArr.splice(2, 1, 'github.com.cnpmjs.org')
      return urlArr.join('/');
    },
    copyGitClone () {
      const url = this.getGithubCnpmUrl(this.currentPageUrl),
        options = `git clone ${url}.git` 
      this.$copyText(options).then(function (e) {
          Toast('已复制')
        }, function (e) {
          Toast('无法复制')
        })
    }, 
    goGithub1s () {
      const url = this.currentPageUrl.replace(/github/, 'github1s')
      window.open(url)
    },
    markdown () {
      chrome.tabs.create({ url: "/markdown/markdown.html" });
    },
    init () {
      chrome.tabs.getSelected(null, (tab) => {
        console.log('>>>', tab.url);
        this.currentPageUrl = tab.url
      })

      chrome.storage.sync.get([
        'isShowQrcode',
        'isShowMarkdown'
      ], res => {
        console.log('res>>>', res);
        this.isShowQrcode = res.isShowQrcode;
        this.isShowMarkdown = res.isShowMarkdown;
      })
    }
  },
  computed: {
    isGitHubHelper () {
      console.log('>>>', this.currentPageUrl);
      return this.currentPageUrl.match(/github.com/)
    },
    isShowGitHubClone () {
      const gitHubUrlArr = this.currentPageUrl.split('/');
      return gitHubUrlArr.length >= 5;
    }
  },
  components: {
    Toast
  },
  created() {
  },
  mounted() {
    this.init();
  },
  destroyed() {
  }
};
</script>
<style lang="scss" scoped>
.popup {
  min-width: 120px;
  min-height: 25px;
  .item {
    padding: 3px 5px 3px 5px;
    cursor: pointer;
    color: #555;
    -webkit-transition: all .4s ease;
    text-align: justify;
    display: block;
    height: 20px;
    line-height: 20px;
    width: 116px;
    border-bottom: 1px dashed #e5e5e5;
    overflow: hidden;
  }
  .setting {
    display: flex;
    justify-content: space-around;
  }
}
</style>