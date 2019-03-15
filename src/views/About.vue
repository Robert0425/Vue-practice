<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>{{$store.state.count}}</h3>
    <button @click='increment'>+++</button>
  </div>
</template>

<script>
import store from '../store.ts';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      increment='increment',
    ])
  }
}
</script>

