import * as React from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Spinner } from 'react-bootstrap';
import { logoutUser } from '../../app/api/auth';
import { userLogout } from '../../app/features/auth/actions';

export default function Logout(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    logoutUser()
    .then(_ => {
      dispatch(userLogout());
    })
    .then(_ => navigate('/'))
  }, [dispatch, navigate])

  return (
      <Container>
        <Row className="justify-content-center">
          <Spinner animation="grow" /> 
            <br/>
        </Row>
        <Row className="justify-content-center">
            Logging out ...
        </Row>
      </Container>
  )
}