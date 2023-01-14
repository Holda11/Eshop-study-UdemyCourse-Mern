import React, {useState, useEffect, useRef} from 'react'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating.js' 
import Message from '../components/Message.js' 
import Loader from '../components/Loader.js'
import { productDetails } from '../redux/Slices/productDetailSlice' 
import { useDispatch, useSelector } from 'react-redux'


const ProductScreen = () => {
    const { product, isLoading, isError, message } = useSelector(
        (state) => state.productDetails
      )
    
    const [qty, setQty] = useState(0)
    
    const { id } = useParams()
    const effectRan = useRef(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (effectRan.current === false) {
            dispatch(productDetails(id))
      
            return () => {
              effectRan.current = true
            }
          }
        }, [id, dispatch])

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`)
    }

  return (
    <>
    <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>{message}</Message>
      ) :
        (<Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} hodnocení`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Cena: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Popis: ${product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Cena: 
                            </Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Status: 
                            </Col>
                            <Col>
                            {product.countInStock > 0 ? 'Na Skladě' : 'Není na skladě'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>QTY</Col>
                                <Col>
                                <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x +1} value={x +1}>{x+1}</option>
                                    ))}
                                </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                            Dát do košíku
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
        </Row>)}
    </>
  )
}

export default ProductScreen