import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '~/api/user.api';
import { IconUser } from '~/components/icon/Icon';
import { JWTType } from '~/data/Interface';
import { update } from '~/redux/userSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handlerChangeEmail = (e: any) => {
        setEmail(e.target.value);
    };
    const handlerChangePassword = (e: any) => {
        setPassword(e.target.value);
    };
    const loginHandler = async () => {
        const data: any = await userApi.login(email, password);
        if (data.response?.status === 400) {
            toast.error(data.response?.data.message, {
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        } else if (data.response?.status === 404) {
            toast.error(`User does not esited!`, {
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        } else {
            const decode: JWTType = jwtDecode(data.accessToken);
            if (decode.admin) {
                sessionStorage.setItem('accessToken', data.accessToken);
                sessionStorage.setItem('refreshToken', data.refreshToken);
                sessionStorage.setItem('admin', 'true');
                const userProfile = await userApi.getMe(decode.sub);
                dispatch(update(userProfile));
                navigate('/admin');
                toast.success('Login Success!', {
                    autoClose: 500,
                    delay: 10,
                    draggable: true,
                    pauseOnHover: false,
                });
            } else {
                toast.warning(`You don't have permission`, {
                    autoClose: 500,
                    delay: 10,
                    draggable: true,
                    pauseOnHover: false,
                });
            }
        }
    };
    const { handleSubmit } = useForm();
    return (
        <div className='flex bg-transparent w-full h-full'>
            <div className='flex flex-col items-center m-auto p-5 bg-white rounded-2xl shadow-lg w-[40%]'>
                <IconUser />
                <Link to={'/admin'}>
                    <h1 className='text-black text-3xl font-bold'>Teaching Me</h1>
                </Link>
                <form className='text-center w-[70%] mx-auto' onSubmit={handleSubmit(loginHandler)}>
                    <div className='flex flex-col'>
                        <input
                            type='text'
                            name='email'
                            onChange={handlerChangeEmail}
                            placeholder='Tên đăng nhập'
                            className='border border-gray-c3 px-3 py-3 m-2 rounded-lg focus:border-gray-c6 transition-all'
                        />
                        <input
                            type='password'
                            name='password'
                            onChange={handlerChangePassword}
                            placeholder='Mật khẩu'
                            className='border border-gray-c3 px-3 py-3 m-2 rounded-lg  focus:border-gray-c6 transition-all'
                        />
                    </div>
                    <button
                        className='transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110 border border-gray-c3 p-2 rounded-xl bg-warning text-white text-lg font-semibold'
                        type='submit'
                    >
                        Đăng nhập
                    </button>
                </form>
                <span className='text-sm font-thin w-[70%] text-center pt-6'>
                    Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
                    <Link to={'/home'}>
                        <p className='font-bold cursor-pointer'>
                            Điều khoản sử dụng của chúng tôi.
                        </p>
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
