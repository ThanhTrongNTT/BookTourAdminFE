import { Link } from 'react-router-dom';
import { IconNotification, IconSearch, IconSetting, IconSignIn } from '~/components/icon/Icon';
import queryString from 'query-string';
import Avt from '~/components/avt/Avt';

const Navbar = () => {
    const user = queryString.parse(sessionStorage.getItem('user') ?? '');
    return (
        <>
            <div className='flex h-8 bg-transparent mt-3 justify-end'>
                <div className='flex'>
                    <div className='flex bg-white rounded-lg p-2 items-center'>
                        <span className='cursor-pointer px-2'>
                            <IconSearch />
                        </span>
                        <input type='text' className='outline-none' />
                    </div>
                    {user.admin ? (
                        <Link to={'/logout'} className='flex items-center p-2 cursor-pointer'>
                            <span>
                                <IconSignIn />
                            </span>
                            <span className='text-white p-1.5'>Logout</span>
                        </Link>
                    ) : (
                        <Link to={'/login'} className='flex items-center p-2 cursor-pointer'>
                            <span>
                                <IconSignIn />
                            </span>
                            <span className='text-white p-1.5'>Sign-in</span>
                        </Link>
                    )}

                    <div className='flex items-center'>
                        {/* <span className='p-2 cursor-pointer'>
                            <IconSetting />
                        </span>
                        <span className='p-2 cursor-pointer'>
                            <IconNotification />
                        </span> */}
                        <div className='flex items-center gap-3'>
                            <Avt
                                sx='default'
                                src='https://images.unsplash.com/photo-1441123694162-e54a981ceba5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                            />
                            <div className='flex items-center gap-4'>
                                <p className='font-semibold text-sm inline-block text-white'>
                                    Thanh Trong
                                </p>
                                <span className='text-c3'>"^"</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
