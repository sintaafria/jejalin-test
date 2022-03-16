import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { userLogin } from '../../app/features/auth/actions';
import { loginUser } from '../../app/api/auth';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

export default function Login() {

  const [status, setStatus] = useState('');
  const { register, handleSubmit, formState: {errors}, setError} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setStatus(statusList.idle)
  }, [])

  const onSubmit = async (formData) => {
    setStatus(statusList.process);
    const {data} = await loginUser(formData);
    if(data.error) {
      setError('password', {type: 'invalidCredential', message: data.message});
      setStatus(statusList.error)
    }else {
      const {user, token} = data;
      dispatch(userLogin({user, token}));
      if(user.role === "user"){
        navigate('/');
      }
      if(user.role === "admin"){
        navigate('/admin');
      }
    }
    setStatus(statusList.success);
  }
  return (
    <Container className="justify-content-md-center">
        <Row xl={4} lg={3} md={2} sm={2} xs={1} className="justify-content-center">
            <Col className="my-5">
                <div className='text-center my-3'>
                    <Image src='jejalin-logo.jpg' className='logo'/>
                </div>
                <Card className="card justify-content-center">
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control {...register('email', rules.email)} type="email" placeholder="Enter email" />
                                <p style={{color: 'red'}}>{errors.email?.message}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control {...register('password', rules.password)} type="password" placeholder="Password" />
                                <p style={{color: 'red'}}>{errors.password?.message}</p>
                            </Form.Group>
                            <div className="d-grid gap-2 d-grid">
                                <Button disabled={status === statusList.process} variant="primary" type="submit" >
                                    Login
                                </Button>
                                <h5 className='text-center'>Or</h5>
                                <Button onClick={_ => navigate('/register')}>
                                    Register
                                </Button>
                            </div>
                            </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}
