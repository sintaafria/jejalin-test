import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct} from '../../app/features/product/actions'
import { config } from '../../config'
import { Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { formatRupiah } from '../../app/utils'

export default function Home() {
    
    const dispatch = useDispatch();
    const products = useSelector(state => state.product) 
    const auth = useSelector(state => state.auth) 
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])

    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <h3>Hello <b>{!auth.user ? 'headsintheclouds' : auth.user.username}</b> !</h3>
                </Col>
                <Col className='text-end' >
                    <h5>{!auth.user ? <Link
                            to={{
                                pathname: "/login",
                                }}>
                            Login
                        </Link>
                        : <Link
                            to={{
                                pathname: "/logout",
                            }}>
                        Logout
                        </Link>
                        }                    
                    </h5>
                </Col>
            </Row>
            <Row xs={2} sm={2} md={4} lg={5} className="g-2 px-lg-5 my-5">
            {
                products.status === 'process' ?
                <div className="mx-auto">
                    <Spinner animation="grow" /> 
                </div> :
                products.data.length > 0 && products.data.map((product, idx) => {
                    return (
                    <div key={idx}>
                        <Col>
                            <Card>
                                <Card.Body  className='card' onClick={_ => {
                                            navigate(`/product/${product._id}`);
                                }}>
                                    <Image fluid src={`${config.api_host}/images/products/${product.image_url}`} className="image"/>
                                    <div className='text-center my-3'>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            IDR {formatRupiah(product.price)}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                    )
                })
            }
            </Row>
        </Container>
    )
}
