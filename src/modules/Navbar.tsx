import Tippy from '@tippyjs/react/headless';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avt from '~/components/avt/Avt';
import { IconArrowDown, IconSearch, IconSignIn } from '~/components/icon/Icon';
import { RootState } from '~/redux/store';
import Menu from './menu/Menu';

const Navbar = () => {
    const { userInfo } = useSelector((state: RootState) => state.users);
    const admin = queryString.parse(sessionStorage.getItem('admin') ?? '');
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
                    {admin ? (
                        ''
                    ) : (
                        <Link to={'/login'} className='flex items-center p-2 cursor-pointer'>
                            <span>
                                <IconSignIn />
                            </span>
                            <span className='text-white p-1.5'>Sign-in</span>
                        </Link>
                    )}

                    <div className='flex items-center mx-5'>
                        <div className='flex items-center gap-2'>
                            <Avt
                                sx='default'
                                src={
                                    userInfo?.avatar.replaceAll('"', '') ||
                                    'https://images.unsplash.com/photo-1441123694162-e54a981ceba5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                                }
                            />
                            <div className='flex items-center'>
                                <p className='text-white'>{userInfo?.fullName}</p>
                                <Tippy
                                    interactive
                                    delay={[0, 200]}
                                    offset={[0, 10]}
                                    // visible
                                    render={(attrs) => (
                                        <div
                                            className='w-[238px] rounded-2xl'
                                            tabIndex={-1}
                                            {...attrs}
                                        >
                                            <Menu />
                                        </div>
                                    )}
                                >
                                    <span className='cursor-pointer px-2 py-4 text-white'>
                                        <IconArrowDown />
                                    </span>
                                </Tippy>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
