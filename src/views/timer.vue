<template>
  <div class="timer">
    <h2>請輸入:
      <input class="sec" type="text" v-model="second" id="sec" /> 秒
    </h2>
    <button id="start" @click="countdown" :disabled="isdisabled">Start</button>
    <h1 v-if="show" class="countdown">倒數{{sec}}秒</h1>
  </div>
</template>

<style>
.sec {
  font-size: 35px;
  width: 60px;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      second: '',
      isdisabled: false,
      sec: '',
      show: false,
    };
  },
  methods: {
    countdown() {
      this.sec = this.second;
      this.isdisabled = true;
      this.show = true;
      const time = setInterval(() => {
        console.log(this.sec);
        if (this.sec === 0) {
          clearInterval(time);
          this.isdisabled = false;
          this.show = false;
        } else {
          this.sec -= 1;
        }
      }, 1000);
    },
  },
  watch: {
    $route(to, from) {
      vm.countdown();
    },
  },
};
</script>
