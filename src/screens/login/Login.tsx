import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '~/components/input/Input';
import userApi from '~/api/user.api';
import { IconUser } from '~/components/icon/Icon';
import { JWTType } from '~/data/Interface';
import { update } from '~/redux/userSlice';
import * as Yup from 'yup';
import useToggleValue from '~/hooks/useToggleValue';
import { yupResolver } from '@hookform/resolvers/yup';
import FormGroup from '~/components/common/FormGroup';
import TogglePassword from '~/components/toogle/TogglePassword';

const schame = Yup.object({
    email: Yup.string()
        .required('Please enter your emaill address!')
        .matches(
            // eslint-disable-next-line no-control-regex
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            { message: 'Please enter valid email address' },
        ),
    password: Yup.string()
        .required('Please enter your password')
        .min(8, 'Password must be 8 characters'),
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const handlerChangeEmail = (e: any) => {
    //     setEmail(e.target.value);
    // };
    // const handlerChangePassword = (e: any) => {
    //     setPassword(e.target.value);
    // };
    const loginHandler = async (values: any) => {
        const { email, password } = values;

        const data: any = await userApi.login(email, password);
        // if (data.response?.status === 400) {
        //     toast.error(data.response?.data.message, {
        //         autoClose: 500,
        //         delay: 10,
        //         draggable: true,
        //         pauseOnHover: false,
        //     });
        // } else
        if (data.response?.status === 404) {
            toast.error(`User does not esited!`, {
                autoClose: 500,
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

    const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
    const {
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(schame),
        mode: 'onSubmit',
    });
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            if (arrErrors[0]?.message) {
                const message = arrErrors[0]?.message;
                toast.error(message.toString(), {
                    autoClose: 1000,
                    pauseOnHover: false,
                    draggable: true,
                    delay: 50,
                });
            }
        }
    }, [errors]);
    return (
        <div className='flex bg-transparent w-full h-full'>
            <div className='flex flex-col items-center m-auto p-5 bg-white rounded-2xl shadow-lg w-[40%]'>
                <IconUser />
                <Link to={'/admin'}>
                    <h1 className='text-black text-3xl font-bold'>Trip Guide</h1>
                </Link>
                <form className='text-center w-[70%] mx-auto' onSubmit={handleSubmit(loginHandler)}>
                    <div className='flex flex-col'>
                        <FormGroup>
                            <label htmlFor='' className='text-lg font-semibold text-left'>
                                Email
                            </label>
                            <Input
                                variant={'outlined'}
                                control={control}
                                name='email'
                                type='email'
                                placeholder='Tên đăng nhập'
                                error={errors.email?.message ?? ''}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor='' className='text-lg font-semibold text-left'>
                                Password
                            </label>
                            <Input
                                variant={'outlined'}
                                control={control}
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Mật khẩu'
                                error={errors.email?.message ?? ''}
                            >
                                <TogglePassword
                                    open={showPassword}
                                    onClick={handleTogglePassword}
                                />
                            </Input>
                        </FormGroup>
                    </div>
                    <button
                        className='mb-4 transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-110 border border-gray-c3 p-2 rounded-xl bg-warning text-white text-lg font-semibold'
                        type='submit'
                    >
                        Đăng nhập
                    </button>
                </form>
                <Link to={'/forgot'}>
                    <span className='text-lg font-semibold text-center my-5'>Quên mật khẩu ?</span>
                </Link>
                <span className='text-sm font-thin w-[70%] text-center pt-2'>
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
