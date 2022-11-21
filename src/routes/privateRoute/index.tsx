import { Navigate, Outlet } from 'react-router-dom';
import queryString from 'query-string';
const useAuth = () => {
    const user = queryString.parse(sessionStorage.getItem('user') ?? '');
    // return true;
    return user.admin;
};

const PrivateRoute = (children: any) => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
    // return isAuth ? <Outlet /> : <Login />;
};

export default PrivateRoute;

// export type ProtectedRouteProps = {
//     isAuthenticated: boolean;
//     outlet: JSX.Element;
// };

// export default function ProtectedRoute({ isAuthenticated, outlet }: ProtectedRouteProps) {
//     if (isAuthenticated) {
//         return outlet;
//     } else {
//         return <Navigate to={{ pathname: '/login' }} />;
//     }
// }
