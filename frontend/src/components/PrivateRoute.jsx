// private route components are created to not show pages when we are logout like shipping page
// if we are login outlet is used to reload page, if not logged in navigate is used
import{Outlet, Navigate} from 'react-router-dom';
import{useSelector} from 'react-redux';

const PrivateRoute = () => {
    const {userInfo}=useSelector(state=> state.auth)
    // if userinfo then output the outlet else navigate to login
    // replace is used to store if any past history
  return userInfo?<Outlet />:<Navigate to='/login'replace></Navigate>
};

export default PrivateRoute
