import React from 'react';
import{useNavigate} from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown,Badge} from 'react-bootstrap';
import { FaShoppingCart,FaUser} from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import leela_woollen_logo from '../assets/leela_woollen_logo.png'
import{LinkContainer} from 'react-router-bootstrap';
import{useLogoutMutation} from'../slices/usersApiSlice';
import{logout} from'../slices/authSlice';
import SearchBox from './SearchBox';
import '../assets/index.css'
// use dispatch used to dispatch action such as Add to cart
// use selector is used to select something from state
const Header = () => {
  //state.cart & state.auth are in store.js
  const{cartItems}= useSelector((state)=>state.cart)
  const {userInfo}=useSelector((state)=> state.auth)
  const dispatch= useDispatch();
  const navigate= useNavigate();
const [logoutApiCall]=useLogoutMutation();
  const logoutHandler= async() => {
    try {
     await logoutApiCall().unwrap();
     dispatch(logout());
     navigate('/login');

    } catch (err) {
      console.log(err);
      
    }
  }
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
            <img className="woollen_logo p-2 fst-italic" src={leela_woollen_logo} alt="WoollenStore" />
            <strong className='text-light fst-italic fw-normal fs-3'>Leela Woollen Store</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {/* a is accumulator c is current item c.qty is get curritem qty */}
                      {/* by default 0 accumulator is given */}
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
          {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
          ): (
            <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
          )}
          {/* if user is admin we gonna have another dropdown */}
          {userInfo && userInfo.isAdmin &&(
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/productList'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/userList'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderList'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>



            </NavDropdown>
          )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
         
}

export default Header
