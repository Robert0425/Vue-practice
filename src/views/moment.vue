<template>
  <div class="moment">
    <h1>{{currentTime}}</h1>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      currentTime: null,
    };
  },
  methods: {
    update() {
      this.currentTime = moment().format('LTS');
    },
  },
  created() {
    this.currentTime = moment().format('LTS');
    setInterval(() => this.update(), 1000);
  }
};
</script>
