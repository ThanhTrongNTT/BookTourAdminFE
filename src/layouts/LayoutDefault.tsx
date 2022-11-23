import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import userApi from '~/api/user.api';
import { JWTType } from '~/data/Interface';
import { Navbar, SideBar } from '~/modules';
import { AppDispatch } from '~/redux/store';
import { update, userGetMe } from '~/redux/userSlice';

const LayoutDefault = () => {
    const dispatch = useDispatch();
    const accessToken = sessionStorage.getItem('accessToken');
    const decode: JWTType = jwtDecode(accessToken ?? '');
    useEffect(() => {
        userApi.getMe(decode.sub).then((response) => {
            dispatch(update(response));
        });
    }, []);

    // const userProfile = userApi.getMe(decode.sub);

    // dispatch(update(userProfile));
    return (
        <div className='flex bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-repeat'>
            <div className='flex-initial w-[25%]'>
                <SideBar />
            </div>
            <div className='flex flex-col w-full'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutDefault;
