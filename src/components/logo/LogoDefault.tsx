import { Link } from 'react-router-dom';

import classNames from '~/utils/classNames';

const LogoDefault = ({ className = '' }) => {
    return (
        <Link to='/' tabIndex={-1}>
            <div
                className={classNames(
                    'header-left flex cursor-pointer select-none items-center gap-[10px]',
                    className,
                )}
            >
                <img
                    srcSet='/logo.png 2x'
                    alt='logo'
                    className='logo h-7 w-7 lg:h-[38px] lg:w-10'
                />
                <div className='name-page font-OpenSans text-sm font-bold text-c2  lg:text-xl'>
                    TripGuide
                </div>
            </div>
        </Link>
    );
};

export default LogoDefault;
