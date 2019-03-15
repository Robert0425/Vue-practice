<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld/>
    <Order/>
    <Cards/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Order from '@/components/order.vue';
import HelloWorld from '@/components/HelloWorld.vue'; 
import Cards from '@/components/cards.vue';

@Component({
  components: {
    HelloWorld,
    Order,
    Cards,
  },
})
export default class Home extends Vue {}
</script>
