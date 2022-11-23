import InputDefault from '../input/InputDefault';
import Label from '../lable/Label';

const Field = ({ children, ...props }: any) => {
    return (
        <div className='text-left flex items-left flex-col gap-2'>
            <Label className='leading-none' htmlFor={props.id}>
                {children}
            </Label>
            <InputDefault {...props} />
        </div>
    );
};

export default Field;
