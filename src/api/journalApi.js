
import axios from 'axios'


const journalApi = axios.create({
    baseURL: 'https://vue-demo-be34b-default-rtdb.firebaseio.com/'
})


export default journalApi


