import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { firebaseMutations } from 'vuexfire'

let config = {
  apiKey: 'AIzaSyBQRuWned_qzVHizQB278EQQK8ejTaAWGk',
  authDomain: 'todo-f746f.firebaseapp.com',
  databaseURL: 'https://todo-f746f.firebaseio.com',
  projectId: 'todo-f746f',
  storageBucket: 'todo-f746f.appspot.com',
  messagingSenderId: '434348701695'
}
var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()
var toursRef = db.ref('tours')
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    tours: {
      a1: {
        date: {
          end: '5/5/2018',
          start: '2/5/2018'
        },
        detail: '3วัน 5 คืน',
        img: 'http://www.vertierra.com/blog/wp-content/uploads/2015/05/shwedagon-pagoda-666763_640.jpg',
        name: 'พม่า',
        price: 5000
      }
    }
  },
  getters: {
    tours: state => state.tours
  },
  mutations: {
    setTours (state, tours) {
      state.tours = tours
    },
    ...firebaseMutations
  },
  actions: {
    getTour (context) {
      var tours = {}
      toursRef.on('value', function (snapshot) {
        tours = snapshot.val()
        context.commit('setTours', tours)
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    saveProductFi (context, data) {
      toursRef.push(data)
    },
    deleteProductFi (context, id) {
      toursRef.child(id).set(null)
    },
    editProductFi (context, data) {
      var tmp = {
        name: data.name,
        url: data.url,
        price: data.price,
        desc: data.desc
      }
      toursRef.child(data.editId).set(tmp)
    }
  }
})
