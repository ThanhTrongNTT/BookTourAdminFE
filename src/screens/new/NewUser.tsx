const NewUser = () => {
    // const { handleSubmit, control, setValue } = useForm();
    return (
        <div className='max-w-5xl mx-auto'>
            <form className='mt-10'>
                <h1 className='font-bold text-lg'>New User</h1>
                {/* <div className='grid grid-cols-2 gap-10'>
                    <Field
                        control={control}
                        name='tourName'
                        id='tour-name'
                        placeholder='Enter tour name...'
                    >
                        Tour Name
                    </Field>
                </div> */}
                <input type='text' className='border border-gray-c3 m-4 px-5 rounded-lg' />
            </form>
        </div>
    );
};

export default NewUser;
