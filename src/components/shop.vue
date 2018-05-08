<template>
  <div class="shop">
    <h1>Tour</h1>
      <div v-for="(tour, key) in tours" :key="tour['.key']">
        <img :src"tour.img" alt="">
        <button class="button is-primary" @click="console.log(key)">{{tour.name}}</button>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'shop',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ...mapActions([
      'getTour'
    ])
  },
  computed: {
    ...mapGetters([
      'tours'
    ])
  },
  created () {
    this.getTour()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
