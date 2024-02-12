import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {/* if  not sign in*/}
            {step1 ?(
                <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
                // else
            ):(
                <Nav.Link disabled>Sign In</Nav.Link>
            )}
        </Nav.Item>
       <Nav.Item>
            {/* if  step 2 else disabled*/}
            {step2 ?(
                <LinkContainer to='/shipping'>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
                // else
            ):(
                <Nav.Link disabled>Shipping</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {/* if step 3 else disabled */}
            {step3 ?(
                <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
                // else
            ):(
                <Nav.Link disabled>Payment</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {/* if step 4 else disabled*/}
            {step4 ?(
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
                // else
            ):(
                <Nav.Link disabled>Place Order</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
