<template>
  <div id="app">
    <div id="nav">
      <router-link to="/lobby">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/computed">Computed</router-link>|
      <router-link to="/timer">Timer</router-link>
      <br>
      <input type="text" v-model="link">
      <router-link :to="{ name:'panel', params:{id:link} }">Go</router-link>
    </div>
    <router-view></router-view>
    <p>{{ count }}</p>
    <button @click="increment">increment</button>
    <br>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script >
export default {
  data() {
    return {
      count: 0,
      link: '',
    };
  },
  methods: {
    increment() {
      this.count += 1;
    },
  },
};
</script>
