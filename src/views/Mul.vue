<template>
    <div class="mul">
        <input type="text" v-model="num1"> * <input type="text" v-model="num2">
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
      const arg1 = this.num1;
      const arg2 = this.num2;
      let m = 0;
      const s1 = arg1.toString();
      const s2 = arg2.toString();
      try { m += s1.split('.')[1].length; } catch (e) { m = 0; }
      try { m += s2.split('.')[1].length; } catch (e) { m = 0; }
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / (10 ** m);
    },
  },
};
</script>
