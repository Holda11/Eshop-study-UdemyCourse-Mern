import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import cartService from '../Services/cartService'

const cartItems = JSON.parse(localStorage.getItem('cart'))
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))

const initialState = {
    cartItems: cartItems ? cartItems : [],
    shippingAddress: shippingAddress ? shippingAddress : []
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, action){
            const itemExist = state.cartItems.find(
                (item) => item._id === action.payload._id,
              )
        
              if (itemExist) {
                const qtyInx = state.cartItems.findIndex(
                  (item) => item._id === action.payload._id,
                )
        
                state.cartItems[qtyInx].qty = action.payload.qty
              } else {
                state.cartItems.push(action.payload)
              }
              localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem(
              'shippingAddress',
              JSON.stringify(state.shippingAddress),
            )
          }
    }
})

export const {
    removeFromCart,
    addToCart,
    saveShippingAddress,
  } = cartSlice.actions
  export default cartSlice.reducer