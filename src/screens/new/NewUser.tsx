import { useForm } from 'react-hook-form';
import Field from '~/components/field/Field';

const NewUser = () => {
    const { handleSubmit, control, setValue } = useForm();
    return (
        <div className='max-w-5xl mx-auto'>
            <form>
                <h1 className='font-bold text-lg'>Add New User</h1>
                <div className='grid grid-cols-2 gap-10'>
                    <Field
                        control={control}
                        name='tourName'
                        id='tour-name'
                        placeholder='Enter tour name...'
                    >
                        Tour Name
                    </Field>
                </div>
            </form>
        </div>
    );
};

export default NewUser;
