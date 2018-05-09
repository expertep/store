<template>
  <div class="shop">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://mms.businesswire.com/media/20150909006222/en/484928/5/2339464_travelleisure_logo.jpg" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" @click="clickAdd()">
              Add
          </a>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"  @click="clickDel()">
              Edit
          </a>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"  @click="clickCart()">
            <i class="fas fa-shopping-cart"></i>
            <span class="tag">{{carts.length}}</span>
          </a>
        </div>
      </div>
    </nav>

      <div class="card" v-for="(tour, key) in tours" :key="tour['.key']">
        <div class="card-image">
          <figure class="image is-256x256">
            <img :src="tour.url">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-1">
            “{{tour.name}}”<br>
          </p>
          <p class="subtitle">
            {{tour.desc}}<br> <b>{{tour.price}} บาท</b>
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
              <a href="#" @click="addCart(tour,key)">Booking now</a>
            </span>
          </p>
        </footer>
      </div>
      <div class="modal is-active" v-if="flag">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">เพิ่มสินค้า</p>
            <button class="delete" aria-label="close" @click="clickAdd()"></button>
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
            <button class="button" @click="clickAdd()">Cancel</button>
          </footer>
        </div>
      </div>
      <div class="modal is-active" v-if="flag1">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">แก้ไขสินค้า</p>
            <button class="delete" aria-label="close" @click="clickDel()"></button>
          </header>
          <section class="modal-card-body">
            <div class="box" v-for="(tour, key) in tours" :key="tour['.key']">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img :src="tour.url">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{tour.name}}</strong> <small>@{{key}}</small> <small>{{tour.price}}</small>
                      <br>
                      {{tour.desc}}
                    </p>
                    <div  v-if="editId===key">
                      <div class="field">
                        <div class="control">
                          <input class="input is-small" type="text" placeholder="Small input" v-model="name">
                        </div>
                      </div>
                      <div class="field">
                        <div class="control">
                          <input class="input is-small" type="text" placeholder="Small input" v-model="url">
                        </div>
                      </div>
                      <div class="field">
                        <div class="control">
                          <input class="input is-small" type="number" placeholder="Small input" v-model="price">
                        </div>
                      </div>
                      <div class="field">
                        <div class="control">
                          <input class="input is-small" type="text" placeholder="Small input" v-model="desc">
                        </div>
                      </div>
                    </div>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-left">
                      <a class="level-item" aria-label="like" @click="clickEdit(key, tour.name, tour.url, tour.price, tour.desc)">
                        <span class="icon is-small">
                          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                        </span>
                      </a>
                      <a class="level-item" aria-label="retweet" @click="deleteProduct(key)">
                        <span class="icon is-small">
                          <i class="far fa-trash-alt" aria-hidden="true" ></i>
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="editProduct()">Save changes</button>
            <button class="button" @click="clickDel()">Cancel</button>
          </footer>
        </div>
      </div>
      <div class="modal is-active" v-if="flag2&&carts.length>0">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Cart</p>
            <button class="delete" aria-label="close" @click="clickCart()"></button>
          </header>
          <section class="modal-card-body">
            <div class="box" v-for="(cart,key) in carts" :key="cart['.key']">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img :src="cart.url">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{cart.name}}</strong> <small>{{cart.price}} ฿</small>
                      <br>
                      {{cart.desc}}
                    </p>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-left">
                      <a class="level-item" aria-label="retweet" @click="deleteCart(key)">
                        <span class="icon is-small">
                          <i class="far fa-trash-alt" aria-hidden="true" ></i>
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
                <div class="media-right">
                    <input class="input count" type="number" placeholder="Large input" v-model="carts[key].amount">
                </div>
              </article>
            </div>
          </section>
          <footer class="modal-card-foot">
            <article class="media">
            <div class="media-left">
              <button class="button is-success" @click="booking()">Booking</button>
              <button class="button" @click="clickCart()">Cancel</button>
            </div>
            <div class="media-content">
              <h2 class="subtitle">total</h2>
            </div>
            <div class="media-right">
              <h1 class="title is-1">{{calPrice}} ฿</h1>
            </div>
            </article>
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
      flag1: false,
      flag2: false,
      editId: '',
      name: '',
      url: '',
      price: 0,
      desc: '',
      carts: [],
      total: 0
    }
  },
  methods: {
    ...mapActions([
      'getTour',
      'saveProductFi',
      'deleteProductFi',
      'editProductFi'
    ]),
    clickAdd () {
      this.flag = !this.flag
    },
    clickDel () {
      this.flag1 = !this.flag1
      this.editId = ''
    },
    clickCart () {
      this.flag2 = !this.flag2
    },
    clickEdit (key, name, url, price, desc) {
      this.name = name
      this.url = url
      this.price = price
      this.desc = desc
      this.editId = key
    },
    deleteCart (index) {
      this.carts.splice(index, 1)
    },
    deleteProduct (id) {
      this.clickDel()
      this.deleteProductFi(id)
      swal({
        title: 'Deleted',
        text: 'Remove a tour',
        icon: 'success',
        button: 'Ok'
      })
    },
    booking () {
      var str = ''
      for (var i = 0; i < this.carts.length; i++) {
        str += this.carts[i].name + '  จำนวน  ' + this.carts[i].amount + '\n'
      }
      swal({
        title: 'Booked',
        text: str + '\nTotal ' + this.cal() + ' ฿',
        icon: 'success',
        button: 'Ok'
      })
      this.carts = []
    },
    addCart (tour, key) {
      var index = -1
      for (var i = 0; i < this.carts.length; i++) {
        if (this.carts[i].id === key) {
          index = i
        }
      }
      if (index !== -1) {
        this.carts[index].amount++
      } else {
        var tmp = {
          id: key,
          name: tour.name,
          url: tour.url,
          price: tour.price,
          desc: tour.desc,
          amount: 1
        }
        this.carts.push(tmp)
      }
    },
    editProduct () {
      var tmp = {
        id: this.editId,
        name: this.name,
        url: this.url,
        price: this.price,
        desc: this.desc
      }
      this.clickDel()
      this.editProductFi(tmp)
      swal({
        title: 'Edited',
        text: 'Edit tour',
        icon: 'success',
        button: 'Ok'
      })
      this.name = ''
      this.url = ''
      this.price = 0
      this.desc = ''
    },
    saveProduct () {
      var tmp = {
        name: this.name,
        url: this.url,
        price: this.price,
        desc: this.desc
      }
      this.clickAdd()
      this.saveProductFi(tmp)
      swal({
        title: 'Saved',
        text: 'Add a new tour',
        icon: 'success',
        button: 'Ok'
      })
      this.name = ''
      this.url = ''
      this.price = 0
      this.desc = ''
    },
    cal () {
      var sum = 0
      for (var i = 0; i < this.carts.length; i++) {
        sum += this.carts[i].price * this.carts[i].amount
      }
      this.total = sum
      return sum
    }
  },
  computed: {
    ...mapGetters([
      'tours'
    ]),
    calPrice () {
      return this.cal()
    }
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
.count {width: 50%;}
</style>
