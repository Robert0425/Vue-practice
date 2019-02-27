<template>
  <div class="timer">
    <h1>倒數<input class="sec" type="text" v-model="second">秒鐘</h1>
    <button @click="countdown" :disabled="isdisabled">Start</button>
  </div>
</template>

<style>
    .sec{
      font-size: 35px;
      width: 60px;
      text-align: center;
    }
</style>

<script>
export default {
  data() {
    return{
      second: " ",
      isdisabled: false,
    }
  },
  methods: {
    countdown() {
      this.isdisabled==='true';
      const time = window.setInterval(() => {
        if (this.second === 0) {
          this.second = 0;
          window.clearInterval(time);
        } else {
          this.second -= 1;
        }
      }, 1000);
    },
  },
};
</script>
