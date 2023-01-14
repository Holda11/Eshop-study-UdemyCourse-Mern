import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listProducts } from '../redux/Slices/productSlice'



const HomeScreen = () => {
  const { isLoading, isError, products, message } = useSelector(
    (state) => state.productList,
  )

  const dispatch = useDispatch()
  const effectRan = useRef(false)

  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(listProducts())
      console.log('effect ran')
      return () => {
        effectRan.current = true
        console.log(`unmounted`)
      }
    }
  }, [dispatch])

  return (
    <>
    <h1>Nejnovější Produkty</h1>
    {isLoading ? (<Loader/>):
      isError ?(<Message>{message}</Message>) : (
        <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
            </Col>
        ))}
    </Row>
        )}
    </>
  )
}

export default HomeScreen