<template>
  <div class="qrcode">
    <div class="before-option-wrapper"
      v-show="isShowField">
      <van-field
        v-model="text"
        rows="10"
        autosize
        label=""
        type="textarea"
        maxlength="200"
        placeholder="请输入文本或网址"
        clearable
      />
      <div class="after-options-wrapper">
        <van-button type="info"
          @click="makeQrcode">
          生成二维码
        </van-button>
        <van-button type="info"
          @click="downloadQrcode">
          下载二维码
        </van-button>
      </div>
    </div>
    <div ref="qrcode" 
      v-show="!isShowField"
      class="qrcode-wrapper"  
    ></div>
    <div class="after-options-wrapper"
      v-if="isShowMakeAginBtn">
      <van-button type="info"
        @click="makeQrcodeAgain">
        再建一个
      </van-button>
      <van-button type="info"
        @click="downloadQrcode">
        下载二维码
      </van-button>
    </div>
    <div ref="qrcodeList" class="qrcode-list"
      v-show="qrcodeList.length">
      <h2>历史生成二维码</h2>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import { Toast } from 'vant';
import utils from './utils';
export default {
  data () {
    return {
      text: '',
      isShowField: true,
      isShowMakeAginBtn: false,
      qrcodeList: [],
      qrcodeIndex: 0
    }
  },
  props: {
  },
  methods: {
    makeQrcode () {
      if (!this.text) {
        Toast('请输入文本或网址')
        return
      }

      this.qrcodeList.push(this.text);
      console.log('>>>', this.qrcodeList, this.qrcodeIndex);

      new QRCode(this.$refs.qrcode, {
        width: 200,
        height: 200,
        text: this.text
      });
      this.isShowField = false;
      this.isShowMakeAginBtn = true

      const qrcode = this.$refs.qrcode,
        qrcodeChildLen = qrcode.childNodes.length
      if (qrcodeChildLen == 4){
        const canvas = this.child(qrcode, 0),
          img = this.child(qrcode, 1);
          qrcode.removeChild(canvas)
          qrcode.removeChild(img);
        let divWrapper = document.createElement('div'),
          pWrapper = document.createElement('p'); 
        pWrapper.innerHTML = this.qrcodeList[this.qrcodeIndex]
        divWrapper.className = 'div-wrapper'
        pWrapper.className = 'p-wrapper'
        divWrapper.appendChild(img)
        divWrapper.appendChild(pWrapper)
        this.$refs.qrcodeList.appendChild(divWrapper)
        this.qrcodeIndex += 1;
        // divWrapper.addEventListener('click', () => {
        //   divWrapper.childNodes[0].style.width = '224px';
        //   divWrapper.childNodes[0].style.height = '224px';
        // })
      }
    },
    child (parent, i) {
      return parent.childNodes[i]
    },
    downloadQrcode () {
      const qrcode = this.$refs.qrcode,
        canvas = this.child(qrcode, 0),
        img = this.child(qrcode, 1);
      utils.qrodeUtil.drawImg(canvas, img);
      utils.qrodeUtil.download(canvas, 'png');
    },
    makeQrcodeAgain () {
      this.isShowField = true
      this.isShowMakeAginBtn = false
    }
  },
  computed: {
  },
  components: {
    Toast
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  }
};
</script>
<style lang="scss" scoped>
$padding: 12px;

.qrcode {
  .qrcode-wrapper {
    /deep/img {
      padding: $padding;
    }
  }
  .after-options-wrapper {
    padding: $padding;
  }
  .qrcode-list {
    padding: $padding;
    /deep/img {
      width: 50px;
      height: 50px;
      margin: 20px;
    }
    /deep/.div-wrapper {
      display: flex;
      align-items: center;
      .p-wrapper {

      }
    }
  }
}
</style>