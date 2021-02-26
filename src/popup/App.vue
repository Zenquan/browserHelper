<template>
  <div class="popup">
    <!-- github匹配显示部分 gitHubHelper -->
    <div v-if="isGitHubHelper">
      <div @click="copyGitClone">复制快速git clone</div>
      <div @click="goGithub1s">go github1s</div>
    </div>
    <!-- 公共部分 点击生成二维码 -->
    <div @click="getQrCode">生成二维码</div>
    <div @click="jsonFormat">json美化</div>
    <div>
      <span @click="setting">设置</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPageUrl: ''
    }
  },
  props: {
  },
  methods: {
    setting() {
      chrome.tabs.create({ url: "/options/options.html" });
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
          alert('已复制')
        }, function (e) {
          alert('无法复制')
        })
    }, 
    goGithub1s () {
      const url = this.currentPageUrl.replace(/github/, 'github1s')
      window.open(url)
    },
    jsonFormat () {
      chrome.tabs.create({ url: "/json-format/json-format.html" });
    },
    init () {
      chrome.tabs.getSelected(null, (tab) => {
        console.log('>>>', tab.url);
        this.currentPageUrl = tab.url
      })
    }
  },
  computed: {
    isGitHubHelper () {
      console.log('>>>', this.currentPageUrl);
      return this.currentPageUrl.match(/github.com/)
    }
  },
  components: {
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
  min-height: 150px;
}
</style>