<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/lobby">Home</router-link></li>|
        <li><router-link to="/about">About</router-link></li>|
        <li><router-link to="/computed" id="computed">Computed</router-link></li>|
        <li><router-link to="/timer" id="timer">Timer</router-link></li>
      </ul>
      <br>
      <input type="text" v-model="link" id="link">
      <router-link :to="{ name:'panel', params:{id:link} }" id="go">Go</router-link>
    </div>
    <router-view></router-view>
    <p>{{ count }}</p>
    <button name="btn" @click="increment">increment</button>
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
