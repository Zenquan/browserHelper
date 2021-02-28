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
    <!-- <van-field
      v-model="formatJson"
      rows="10"
      autosize
      label=""
      type="textarea"
      maxlength="200"
    /> -->
  </div>
</template>
<script>
import jsonFormat from 'json-format';
export default {
  data () {
    return {
      json: '',
      formatJson: ''
    }
  },
  props: {
  },
  methods: {
    jsonFormatFn () {
      this.formatJson = jsonFormat(this.json, {
        type: 'space',
        size: 2
      })

      console.log('>>>', this.json, this.formatJson);
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