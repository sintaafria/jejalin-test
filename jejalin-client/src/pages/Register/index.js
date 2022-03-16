import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { registerUser } from '../../app/api/auth';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

export default function RegisterUser() {
  
    const [status, setStatus] = useState(statusList.idle);
    const { register, handleSubmit, formState: {errors}, setError} = useForm();
    const navigate = useNavigate();
  
    const onSubmit = async (formData) => {
      const { password, password_confirmation } = formData;
      if(password !== password_confirmation) {
        return setError('password_confirmation', {type: 'equality', message: 'Password konfirmasi tidak sama'})
      }
  
      setStatus(statusList.process);
      const {data} = await registerUser(formData);
      if(data.error) {
        let fields = Object.keys(data.fields);
        fields.forEach(field => {
          setError(field, {type: 'server', message: data.fields[field]?.properties?.message})
        })
        setStatus(statusList.error)
        return
      }
      setStatus(statusList.success);
      navigate('/login')
  }
  return (
    <Container className="justify-content-md-center">
        <Row lg={3} md={1} sm={1} xs={1} className="justify-content-center">
            <Col className="my-5">
                <Card className="card justify-content-center">
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Control {...register('username', rules.username)} placeholder="username" />
                                <p style={{color: 'red'}}>{errors.username?.message}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control {...register('email', rules.email)} type="email" placeholder="Email" />
                                <p style={{color: 'red'}}>{errors.email?.message}</p>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control {...register('first_name', rules.first_name)} placeholder="first name" />
                                <p style={{color: 'red'}}>{errors.first_name?.message}</p>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control {...register('last_name', rules.last_name)} placeholder="last name" />
                                <p style={{color: 'red'}}>{errors.last_name?.message}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control {...register('password', rules.password)} type="password" placeholder="Password" />
                                <p style={{color: 'red'}}>{errors.password?.message}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control {...register('password_confirmation', rules.password_confirmation)}  type="password"  placeholder="Password Confirmation" />
                                <p style={{color: 'red'}}>{errors.password_confirmation?.message}</p>
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" >
                                    Register
                                </Button>
                            </div>
                            </Form>
                            <p className='mt-2'>Already have an account? <a href='/login'>login</a></p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}
