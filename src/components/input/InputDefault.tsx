import { useController } from 'react-hook-form';

const InputDefault = ({ name, control, className, ...props }: any) => {
    const { field } = useController({
        name,
        control,
        defaultValue: '',
    });
    return (
        <div className={className}>
            <input className='px-5 rounded-md py-3 border border-c6 w-full' {...field} {...props} />
        </div>
    );
};

export default InputDefault;
