import axios from 'axios'

const API_URL = '/api/products/'

const addToCart = async (id) =>{
    const response = await axios.get(API_URL + id)
    const qty = JSON.parse(localStorage.getItem('qty'))

    if(response.data){
        localStorage.setItem('cart', JSON.stringify(response.data))
    }
    return response.data
}

const cartService = {
    addToCart
}

export default cartService