<template>
  <div class="msgbox">
    <p class="code">404</p>
    <p class="msg1">貌似有点问题</p>
    <p class="msg2">未找到对应页面，请按[后退]返回上一页面</p>
    <p class="timer">{{ interval }}秒后自动返回</p>
  </div>
</template>
<script>
export default {
  name: 'NotFound',
  data() {
    return {
      interval: 3
    }
  },
  created() {
    setTimeout(() => {
      clearInterval(this.timeOut)
      window.history.length > 1 ? this.$router.back() : this.$router.push('/')
    }, 1000 * this.interval)
    this.timeOut = setInterval(() => {
      this.interval -= 1
    }, 1000)
  }
}
</script>
<style lang="less" scoped>
.msgbox {
  text-align: center;
  margin-top: 150px;
  .code {
    font-size: 60px;
    color: chocolate;
  }
  .msg1 {
    font-size: 35px;
    color: burlywood;
  }
  .msg2 {
    font-size: 25px;
    color: burlywood;
  }
  .timer {
    font-size: 20px;
    color: grey;
  }
}
</style>
