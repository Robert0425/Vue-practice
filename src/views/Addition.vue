<template>
    <div class="addition">
        <input type="text" v-model="num1"> + <input type="text" v-model="num2">
        <p>{{countNum}}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 0,
      num2: 0,
    };
  },
  computed: {
    countNum() {
      return Number(this.num1) + Number(this.num2);
    },
  },
};
</script>

