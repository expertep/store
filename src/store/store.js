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
        img: 'https://www.google.co.th/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiGqKTYhOfaAhXHRo8KHVG4BfAQjRx6BAgBEAU&url=https%3A%2F%2Fsites.google.com%2Fa%2Femail.nu.ac.th%2Fwathnthrrm-meiy-nmar%2Fkhwam-ru-thawpi-keiyw-kab-phma&psig=AOvVaw0CixH7hl9lXPRV2ho9h_wp&ust=1525350786840043',
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
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
      // context.commit('setTours', tours)
      console.log(tours)
    }
  }
})
