import { Link, useNavigate } from 'react-router-dom';
import userApi from '~/api/user.api';
import { IconUser } from '~/components/icon/Icon';
import { toast } from 'react-toastify';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';

type JWTType = {
    admin: boolean;
    sub: string;
    exp: number;
    iat: number;
};

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handlerChangeEmail = (e: any) => {
        setEmail(e.target.value);
    };
    const handlerChangePassword = (e: any) => {
        setPassword(e.target.value);
    };
    const loginHandler = async (email: string, password: string) => {
        const data: any = await userApi.login(email, password);
        console.log(data);

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
            sessionStorage.setItem('token', data.accessToken);
            const decode: JWTType = jwtDecode(data.accessToken);
            console.log(decode);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            sessionStorage.setItem('user', queryString.stringify(decode));
            navigate('/admin');
            toast.success('Login Success!', {
                delay: 10,
                draggable: true,
                pauseOnHover: false,
            });
        }
    };
    return (
        <div className='flex bg-transparent w-full h-full'>
            <div className='flex flex-col items-center m-auto p-5 bg-white rounded-2xl shadow-lg w-[40%]'>
                <IconUser />
                <Link to={'/admin'}>
                    <h1 className='text-black text-3xl font-bold'>Teaching Me</h1>
                </Link>

                <div className='flex flex-col m-4 w-[70%]'>
                    <input
                        type='text'
                        name='email'
                        onChange={handlerChangeEmail}
                        placeholder='Tên đăng nhập'
                        className='border border-gray-c3 px-2 py-3 m-2 rounded-lg'
                    />
                    <input
                        type='password'
                        name='password'
                        onChange={handlerChangePassword}
                        placeholder='Mật khẩu'
                        className='border border-gray-c3 px-2 py-3 m-2 rounded-lg'
                    />
                </div>
                <button
                    className='transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110 border border-gray-c3 p-2 rounded-xl bg-warning text-white text-lg font-semibold'
                    // type='submit'
                    onClick={() => loginHandler(email, password)}
                >
                    Đăng nhập
                </button>
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
