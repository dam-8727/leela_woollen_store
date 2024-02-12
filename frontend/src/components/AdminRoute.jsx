import{Outlet, Navigate} from 'react-router-dom';
import{useSelector} from 'react-redux';

const AdminRoute = () => {
    const {userInfo}=useSelector(state=> state.auth)
    // if userinfo then output the outlet else navigate to login
    // replace is used to store if any past history
  return userInfo && userInfo.isAdmin ?<Outlet />:<Navigate to='/login'replace></Navigate>
};

export default AdminRoute;
