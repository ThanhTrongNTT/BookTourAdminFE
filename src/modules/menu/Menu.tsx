import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconMyProfile, IconSigout } from '~/components/icon/Icon';
import WrapperMenu from '~/components/wrapper/WrapperMenu';
import { update } from '~/redux/userSlice';

const Menu = () => {
    const dispatch = useDispatch();
    const handlerLogout = () => {
        sessionStorage.clear();
        toast.success(`Logout success!`, {
            autoClose: 500,
            delay: 10,
            draggable: true,
            pauseOnHover: false,
        });
        dispatch(
            update({
                userInfo: null,
            }),
        );

        window.location.reload();
    };
    return (
        <WrapperMenu>
            <Link to={'/profile'}>
                <div className='flex cursor-pointer items-center gap-5 px-5 py-4 text-[#23262F] transition-all hover:bg-[#16182308] dark:text-c7'>
                    <span className='text-[#777E90] dark:text-c5'>
                        <IconMyProfile />
                    </span>
                    <span className='p-1.5'>User Profile</span>
                </div>
            </Link>
            <div
                className='flex cursor-pointer items-center gap-5 px-5 py-4 text-[#23262F] transition-all hover:bg-[#16182308] dark:text-c7'
                onClick={handlerLogout}
            >
                <span className='text-[#777E90] dark:text-c5'>
                    <IconSigout />
                </span>
                <span className='p-1.5'>Logout</span>
            </div>
        </WrapperMenu>
    );
};

export default Menu;
