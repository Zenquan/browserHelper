<template>
  <div class="diagrams">
    <h2 class="diagrams-h2">diagrams</h2>
    <div v-for="(item, index) of pathsData"
      :key="`PATHS-${index}`"
      class="diagrams-item">
      <header class="diagrams-h3">
        <p>{{item.path}}</p>
        <van-uploader :after-read="file => afterRead(file, item.path)" />
      </header>
      <div v-for="(pItem, pIndex) of item.data"
        :key="`PATH-${pIndex}`"
        class="diagrams-pitem">
          <p class="diagrams-name">{{pItem.name}}</p>
          <div class="diagrams-p-img" >
            <van-image
              class="diagrams-img"
              @click="e => preView(e, pItem.img_url)"
              :src="pItem.img_url"
              v-if="pItem.isImg"
              lazy-load>
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
              <template v-slot:error>加载失败</template>
            </van-image>
            <p v-else>该文件不是图片</p>
          </div>
          <p class="diagrams-url">{{pItem.img_url}}</p>
          <van-button type="info" 
            @click="copyUrl(pItem.img_url)"
            class="copy-btn">复制url</van-button>
          <van-button type="info" 
            @click="copyMdUrl(pItem.img_url)"
            class="copy-btn"
            v-if="pItem.isImg">复制md链接</van-button>
          <van-button type="danger" 
            @click="deleteFile(pItem.path, pItem.sha)"
            class="copy-btn"
            >删除</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Octokit } from '@octokit/core';
import { Mime } from '@jomsou/utils';
import { ImagePreview, Toast } from 'vant';
const mime = new Mime();
const octokit = new Octokit({ auth: `0d05ef13e7b55e951cd9dcb95fa35ba2bbc925c6`});
import CryptoJS  from 'crypto-js'
import { Base64, encode, decode } from 'js-base64';
export default {
  data () {
    return {
      pathsData: []
    }
  },
  props: {
  },
  methods: {
    async fetch (path) {
      const baseUrl = `https://cdn.jsdelivr.net/gh/zenquan/diagrams@master/${path}/`;
      const result = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'zenquan',
        repo: 'diagrams',
        path
      })

      const data = result.data.map(d => {
        const type = mime.lookup(d.name);
        let isImg;  
        if (!type) {
          isImg = false
        } else {
          isImg = !!type.match(/image\//).length
          console.log('isImg>>>', isImg);
        }

        return {
          ...d,
          isImg,
          img_url: `${baseUrl}${d.name}`
        }
      })
      return data;
    },
    async getReposData () {
      const paths = ['img', 'uml', 'mind'];
      paths.forEach(async path => {
        const data = await this.fetch(path);
        this.pathsData.push({
          path,
          data
        })
      })
      console.log('pathsData>>>', this.pathsData);
    },
    preView (e, url) {
      ImagePreview({
        images: [url],
        closeable: true,
      })
    },
    copyUrl (url) {
      this.$copyText(url).then(function (e) {
        Toast('已复制')
      }, function (e) {
        Toast('无法复制')
      })
    },
    copyMdUrl (url) {
      this.copyUrl(`![](${url})`)
    },
    async deleteFile (path, sha) {
      const response = await octokit.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
        owner: 'zenquan',
        repo: 'diagrams',
        path,
        message: `delete: 删除${path}`,
        sha
      })
      if (response) {
        if (!response.content) { 
          Toast('删除成功');
          this.init()
          // this.$router.reload()
        } else {
          Toast('删除失败');
        }
      } else {
        Toast('删除失败');
      }
    },
    afterRead(file, path) {
      // 此时可以自行将文件上传至服务器
      console.log(file, path);
      this.uploadFile(file, path);
    },
    async uploader (files, path, sha) {
      const { file: {name}, content } = files
      console.log('content>>>', Base64.encode(content));
      const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'zenquan',
        repo: 'diagrams',
        path,
        message: `update: 上传${path}`,
        content: Base64.encode(content),
        sha
      })

      return response
    },
    async uploadFile (files, path) {
      //生成实例
      let fileReads = new FileReader(), sha;
    	//开始读取文件
      fileReads.readAsArrayBuffer(files.file);
      //读取回调
      fileReads.onload = () => {
        //将读取结果：文件数据类型：ArrayBuffer 转化 为wordArray格式
        var wordArray = CryptoJS.lib.WordArray.create(fileReads.result);
        //直接调用SHA256()并转化得到十六进制字符串（也就是我们要的SHA256）
        sha = CryptoJS.SHA256(wordArray).toString();
        console.log('sha>>>', sha);
        const response = this.uploader(files, `${path}/${files.file.name}`, sha)
        if (response) {
          if (!response.commit) { 
            Toast('上传成功');
            this.init()
            // his.$router.reload()
          } else {
            Toast('上传失败');
          }
        } else {
          Toast('上传失败');
        }
      }
    },
    init () {
      this.getReposData()
    }
  },
  computed: {
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
.diagrams {
  padding: 20px;
  .diagrams-h2 {

  }
  .diagrams-item {
    .diagrams-h3 {

    }
    .diagrams-pitem {
      display: flex;
      align-items: center;
      .diagrams-name {
        width: 100px;
        word-break: break-all;
        margin: 0 20px;
      }
      .diagrams-p-img {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .diagrams-url {
        width: 200px;
        word-break: break-all;
        margin: 0 20px;
      }
      .copy-btn {
        margin: 0 20px;
      }
      .diagrams-img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>