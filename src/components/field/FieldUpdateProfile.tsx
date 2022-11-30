import classNames from '~/utils/classNames';
import InputProfile from '../input/InputProfile';
import Label from '../label/Label';

const FieldUpdateProfile = ({ children, icon, hasDisable, color, ...rest }: any) => {
    return (
        <div className='flex flex-col gap-3'>
            <Label
                htmlFor={rest.id}
                className={classNames(
                    'font-DMSans !font-bold leading-none !text-c4',
                    hasDisable && 'pointer-events-none select-none bg-gray-100',
                    color,
                )}
            >
                {children}
            </Label>
            <InputProfile hasIcon icon={icon} hasDisable={hasDisable} {...rest} />
        </div>
    );
};
export default FieldUpdateProfile;
