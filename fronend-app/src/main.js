// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import meetupApi from "./api/meetupApi";

Vue.config.productionTip = false;

Vue.use(Vuex);

let {store} = require('./store/store');

/* eslint-disable no-new */
new Vue({
    el: '#app',
    provide:{
        meetupApi: meetupApi
    },
    router,
    store,
    template: '<App/>',
    components: {App}
});
