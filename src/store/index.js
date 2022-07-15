import { createStore } from 'vuex'

import agenda from '../modules/agenda/store/contactos'


const store = createStore({
    modules: {
        agenda
    }
})




export default store