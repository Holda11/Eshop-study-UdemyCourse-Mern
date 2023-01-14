import express  from "express"
import AsyncHandler from "express-async-handler"
import Product from '../models/productModel.js'
const router = express.Router()


//Poslání všechn produktu
//@ GET = route
router.get('/', AsyncHandler(async  (req, res) =>{
    const products = await Product.find({})
    res.send(products)
}))

//Poslání jednoho produktu
//@ Put = route
router.get('/:id', AsyncHandler( async(req, res) =>{ 
    const product = await Product.findById(req.params.id)
    //nejspíše bude vráceno
    /*if(product){*/
        res.send(product)
    /*} else {
        res.status(404)
        throw new Error('Product not found')
    }*/

}))

export default router