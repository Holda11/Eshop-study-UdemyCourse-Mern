import mongoose from "mongoose"
import dotenv from 'dotenv'
import users from './data/users.js'
import products from "./data/data.js"
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDb from './config/db.js'

dotenv.config()

connectDb()

const importData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data vloženy')
        process.exit()
    } catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

const deleteData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data odstraněni')
        process.exit()
    } catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}
if(process.argv[2] === '-d'){
    deleteData()
} else {
    importData()
}