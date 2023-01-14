import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk' // I still add this for my reference so I know thunk middleware is added
import  productListReducer  from './redux/Slices/productSlice.js'
import productDetailsReducer from './redux/Slices/productDetailSlice.js'
 
const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer
    },
    preloadedState: {},
    middleware: [thunk],
})
 
export default store