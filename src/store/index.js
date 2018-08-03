import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import drawStore from './modules/drawStore.js'

export default new Vuex.Store({
    modules:{
        drawStore,
    }
})
