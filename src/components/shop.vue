<template>
  <div class="shop">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://mms.businesswire.com/media/20150909006222/en/484928/5/2339464_travelleisure_logo.jpg" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" @click="addProduct()">
              Add
          </a>
        </div>
      </div>
    </nav>
      <!--<div v-for="(tour, key) in tours" :key="tour['.key']">
        <figure class="image is-256x256">
          <img :src="tour.img">
        </figure>
        <button class="button is-primary" @click="console.log(key)">{{tour.name}}</button>
      </div>
-->
      <div class="card" v-for="(tour, key) in tours" :key="tour['.key']">
        <div class="card-image">
          <figure class="image is-256x256">
            <img :src="tour.img">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-1">
            “{{tour.name}}”<br>
          </p>
          <p class="subtitle">
            {{tour.detail}} <b>{{tour.price}}</b>
          </p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              <a href="#">{{tour.name}}</a>
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              <a href="#" @click="console.log(key)">Booking now</a>
            </span>
          </p>
        </footer>
      </div>
      <div :class="changeClass ()">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">เพิ่มสินค้า</p>
            <button class="delete" aria-label="close" @click="addProduct()"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="name" placeholder="ชื่อทริป">
              </div>
            </div>
            <img :src="url">
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="url" placeholder="รูป">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="number" v-model="price" placeholder="ราคา">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="desc" placeholder="รายละเอียด">
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="saveProduct()">Save changes</button>
            <button class="button" @click="addProduct()">Cancel</button>
          </footer>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import swal from 'sweetalert'

export default {
  name: 'shop',
  data () {
    return {
      flag: false,
      name: '',
      url: '',
      price: 0,
      desc: ''
    }
  },
  methods: {
    ...mapActions([
      'getTour',
      'saveProductFi'
    ]),
    addProduct () {
      this.flag = !this.flag
    },
    saveProduct () {
      var tmp = {
        name: this.name,
        img: this.url,
        price: this.price,
        detail: this.desc
      }
      this.addProduct()
      this.saveProductFi(tmp)
      swal({
        title: 'Saved',
        text: 'new tour',
        icon: 'success',
        button: 'Ok'
      })
      this.name = ''
      this.url = ''
      this.price = 0
      this.desc = ''
    },
    changeClass () {
      console.log(this.flag)
      if (this.flag === false) {
        return 'modal'
      } else {
        return 'modal is-active'
      }
    }
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
  margin: 0 0px;
}
a {
  color: #42b983;
}
.card-content {
  /* height: 30rem !important; */
}
.card {margin-bottom: 2rem;}
</style>
