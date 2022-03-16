import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { config } from '../../config'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { formatRupiah } from '../../app/utils'
import { getProductDetail } from '../../app/api/product'
import ModalBoxPayment from '../../components/ModalBoxPayment'
import ModalBoxDetailPayment from '../../components/ModalBoxDetailPayment'
import ModalBoxSuccess from '../../components/ModalBoxSuccess'

export default function ProductDetail() {

    const [product, setProduct] = useState('');
    const auth = useSelector(state => state.auth)
    const params = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [modalShowDetail, setModalShowDetail] = useState(false);
    const [modalShowSuccess, setModalShowSuccess] = useState(false);

    const fetchData = useCallback(
        async function(){
            const data = await getProductDetail(params.id);
            setProduct(data.data);
         }, [params.id]
    )

    useEffect(() => {
        fetchData()
    }, [fetchData])

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
            {!product ? 
                <div className="mx-auto">
                    <Spinner animation="grow" /> 
                </div> : 
                <Row className="g-5 px-lg-5 my-5">
                    <Col>
                            <Image fluid src={`${config.api_host}/images/products/${product.image_url}`} className="image"/>
                    </Col>
                    <Col>
                            <Row>
                                <Col>
                                    <h2>{product.name}</h2>
                                </Col>
                                <Col>
                                    <Button onClick={() => setModalShow(true)}>Buy Now</Button>
                                </Col>
                            </Row>
                            <h4 className='price'>IDR {formatRupiah(product.price)}</h4>
                            <p>
                                <hr/>
                                Detail: <br/>
                                {product.description}
                            </p>
                    </Col>
                </Row>
            }
            <ModalBoxPayment
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    setModalShowDetail(true)
                }}
            />
            <ModalBoxDetailPayment
                show={modalShowDetail}
                onHide={() => {
                    setModalShowDetail(false);
                    setModalShowSuccess(true);
                }}
            />
            <ModalBoxSuccess
                show={modalShowSuccess}
                onHide={() => {
                    setModalShowSuccess(false);
                }}
            />
        </Container>
    )
}
