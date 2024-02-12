import {useState,useEffect} from 'react';
// useEffect is used to check if i come on login page and then checjk if user info on local storage
import{Link, useLocation, useNavigate} from 'react-router-dom';
//usedispatch is used to dispatch actions such as login in slice and set the credentials
// use selector- is used to get stuff from state such as user
import{useDispatch, useSelector} from 'react-redux';
import{Form ,Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';
// we login by calling login from user api slice and set credentials from our auth slice
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  //Bring login and isloading from useLoginMutation
    const [login, {isLoading}] = useLoginMutation();
    // to get userInfo from state use useSelector hook
    const { userInfo } = useSelector((state) => state.auth);
  // for redirection use search property from  useLocation hook
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    // means if sp.get(redirect)is falsy then value assigned to redirect will be'/'
    const redirect = sp.get('redirect') || '/';
  
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await login({ email, password }).unwrap();
  
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    // Sign in form
  return (
   <FormContainer>
    <h1>Sign In</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='email' className='my-3'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        type='email'
        placeHolder= 'Enter email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>

    </Form.Group>
    <Form.Group controlId='password' className='my-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
        type='password'
        placeHolder= 'Enter password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>

    </Form.Group>
    <Button type="submit" variant='primary' className='mt-2'  disabled={ isLoading}>Sign In</Button>
   
    {/* if its loading show submit button disabled */}
    {/* if is loading then show loader */}
    { isLoading && <Loader/>}
    </Form>
    <Row className='py-3'>
        {/* if it is redirect then go to whatever in redirect else go to register */}
        <Col>New Customer?{' '} 
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
    </Row>
   </FormContainer>
  )
}

export default LoginScreen
