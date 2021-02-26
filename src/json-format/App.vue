<template>
  <div>
    <van-field
      v-model="json"
      rows="10"
      autosize
      label=""
      type="textarea"
      maxlength="200"
      placeholder="请输入json"
    />
    <van-button @click="jsonFormatFn">
      格式化
    </van-button>
  </div>
</template>
<script>
import jsonFormat from 'json-format';
export default {
  data () {
    return {
      json: '',
      formatJson: {}
    }
  },
  props: {
  },
  methods: {
    jsonFormatFn () {
      const json = JSON.parse(this.json)
      // this.formatJson = jsonFormat(json, {
      //   type: 'space',
      //   size: 2
      // })

      console.log('>>>', json, this.json);
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
  destroyed() {
  }
};
</script>
<style lang="scss" scoped>
</style>