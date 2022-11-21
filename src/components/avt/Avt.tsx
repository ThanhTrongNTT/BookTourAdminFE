import classNames from '~/utils/classNames';

type Avtprops = {
    src: string;
    sx: string;
};

const Avt = ({ src, sx }: Avtprops) => {
    switch (sx) {
        case 'default':
            sx = 'w-8 h-8';
            break;
        default:
            break;
    }

    return (
        <img
            src={src}
            alt='avt'
            loading='lazy'
            className={classNames('rounded-full object-cover border border-black', sx)}
        />
    );
};

export default Avt;
