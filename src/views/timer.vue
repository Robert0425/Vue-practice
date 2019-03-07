<template>
  <div class="timer">
    <h2>請輸入:
      <input class="sec" type="text" v-model="second" id="sec" /> 秒
    </h2>
    <button id="start" @click="countdown" :disabled="isdisabled">Start</button>
    <h1 v-if="show" class="countdown">倒數{{min}}分{{sec}}秒</h1>
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
      min: '',
      show: false,
    };
  },
  methods: {
    countdown() {
      let timeleft = Number(this.second) + 1;
      this.isdisabled = true;
      const time = setInterval(() => {
        this.show = true;
        // console.log(this.sec);
        if (timeleft <= 0) {
          clearInterval(time);
          this.isdisabled = false;
          this.show = false;
        } else {
          timeleft -= 1;
          this.sec = timeleft % 60;
          this.min = parseInt(timeleft / 60, 10);
          if (this.sec < 10) {
            this.sec = `0${this.sec}`;
          }
          if (this.min < 10) {
            this.min = `0${this.min}`;
          }
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
