import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutDefault from '~/layouts/LayoutDefault';
import PrivateRoute from '~/routes/privateRoute';
import {
    DetailCategory,
    DetailPost,
    DetailUser,
    Home,
    ListUser,
    Login,
    ListLocation,
    ListBooking,
    ListTour,
    NewPost,
    NewUser,
} from '~/screens';
import NewCategory from '~/screens/new/NewCategory';
import NotFound from '~/screens/notFound/NotFound';
const DeclareRouter = () => {
    return (
        <div className='bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-repeat h-screen'>
            <Routes>
                <Route path='/' element={<Navigate to='/admin' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<PrivateRoute />}>
                    <Route element={<LayoutDefault />}>
                        <Route path='' element={<Home />} />
                        <Route path='users'>
                            <Route index element={<ListUser />} />
                            <Route path=':userId' element={<DetailUser />} />
                            <Route path='new' element={<NewUser />} />
                        </Route>
                        <Route path='locations'>
                            <Route index element={<ListLocation />} />
                            <Route path=':locationId' element={<DetailCategory />} />
                            <Route path='new' element={<NewCategory />} />
                        </Route>
                        <Route path='tours'>
                            <Route index element={<ListTour />} />
                            <Route path=':tourId' element={<DetailPost />} />
                            <Route path='new' element={<NewPost />} />
                        </Route>
                        <Route path='bookings'>
                            <Route index element={<ListBooking />} />
                            <Route path=':bookingId' element={<DetailPost />} />
                            <Route path='new' element={<NewPost />} />
                        </Route>
                        <Route path='analysis'>
                            <Route index element={<NotFound />} />
                            <Route path='user' element={<NotFound />} />
                            <Route path='post' element={<NotFound />} />
                            <Route path='comment' element={<NotFound />} />
                        </Route>
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default DeclareRouter;
