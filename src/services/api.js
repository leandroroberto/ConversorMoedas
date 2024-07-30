import axios from 'axios'

//https://economia.awesomeapi.com.br/last/USD-BRL

//Rota para buscar EUR > BRL:  

const api = axios.create({
    baseURL: 'http://economia.awesomeapi.com.br/json'
})

export default api