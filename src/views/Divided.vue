<template>
    <div class="divided">
        <input type="text" v-model="num1"> / <input type="text" v-model="num2">
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
      let t1 = 0;
      let t2 = 0;
      const arg1 = this.num1;
      const arg2 = this.num2;
      try { t1 = arg1.toString().split('.')[1].length; } catch (e) { t1 = 0; }
      try { t2 = arg2.toString().split('.')[1].length; } catch (e) { t2 = 0; }
      const r1 = Number(arg1.toString().replace('.', ''));
      const r2 = Number(arg2.toString().replace('.', ''));
      return (r1 / r2) * (10 ** (t2 - t1));
    },
  },
};
</script>
