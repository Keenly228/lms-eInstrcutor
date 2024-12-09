import { Navigate } from "react-router-dom";
import {useAuthStore} from "../store/auth.js";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)();
    return loggedIn ? <>{children}</> : <Navigate to='/login/' />;
};

export default PrivateRoute;