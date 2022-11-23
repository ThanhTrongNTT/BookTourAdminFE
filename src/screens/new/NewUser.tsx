import { useState } from 'react';
import { useForm } from 'react-hook-form';
import WrapperField from '~/components/common/WrapperField';
import Dropdown from '~/components/dropdown/Dropdown';
import { IconTrash } from '~/components/icon/Icon';
import InputDefault from '~/components/input/InputDefault';
import classNames from '~/utils/classNames';

const NewUser = () => {
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm();
    const handleCancel = () => {
        reset({
            email: '',
            fullName: '',
            password: '',
            birthDay: '',
        });
        setDisable(true);
    };
    const [disable, setDisable] = useState(true);
    const onSubmit = (values: object) => {
        console.log(values);
    };
    if (isSubmitSuccessful) handleCancel();
    return (
        // <div className='max-w-5xl mx-auto'>
        <div className='max-w-5xl mx-auto h-screen'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=''
                onChange={() => setDisable(false)}
            >
                <div className='px-10 py-10 pb-5 mt-10 w-[800px] bg-white rounded-md'>
                    <h1 className='font-bold text-3xl mb-7 text-center'>
                        Create a New User
                    </h1>
                    <div className='flex flex-col gap-4'>
                        <WrapperField>
                            <label
                                htmlFor=''
                                className='font-bold flex-1 text-left col-span-1'
                            >
                                Email:
                            </label>
                            <InputDefault
                                placeholder='email@gmail.com'
                                control={control}
                                name='email'
                                className='col-span-3'
                            />
                        </WrapperField>
                        <WrapperField>
                            <label
                                htmlFor=''
                                className='font-bold flex-1 text-left col-span-1'
                            >
                                Full Name:
                            </label>
                            <InputDefault
                                placeholder='Enter full name'
                                control={control}
                                name='fullName'
                                className='col-span-3'
                            />
                        </WrapperField>
                        <WrapperField>
                            <label
                                htmlFor=''
                                className='font-bold flex-1 text-left col-span-1'
                            >
                                Password:
                            </label>
                            <InputDefault
                                type='password'
                                placeholder='Enter password'
                                control={control}
                                name='password'
                                className='col-span-3'
                            />
                        </WrapperField>
                        <WrapperField>
                            <label
                                htmlFor=''
                                className='font-bold flex-1 text-left col-span-1'
                            >
                                Brith Day:
                            </label>
                            <InputDefault
                                placeholder='07/02/2001'
                                control={control}
                                name='birthDay'
                                className='col-span-3'
                            />
                        </WrapperField>
                        <WrapperField>
                            <label
                                htmlFor=''
                                className='font-bold flex-1 text-left col-span-1'
                            >
                                Gender:
                            </label>
                            <Dropdown
                                dropdownLabel='Choose Gender'
                                control={control}
                                name='gender'
                                setValue={setValue}
                                list={['MALE', 'FEMALE', 'ANOTHER']}
                                className='col-span-3'
                            />
                        </WrapperField>
                        <WrapperField>
                            <label
                                htmlFor=''
                                className='font-bold flex-1 text-left col-span-1'
                            >
                                Address:
                            </label>
                            <InputDefault
                                placeholder='07/02/2001'
                                control={control}
                                name='address'
                                className='col-span-3'
                            />
                        </WrapperField>
                        <WrapperField>
                            <label
                                htmlFor=''
                                className='font-bold flex-1 text-left col-span-1'
                            >
                                Role:
                            </label>
                            <Dropdown
                                dropdownLabel='Choose Role'
                                control={control}
                                name='roleName'
                                setValue={setValue}
                                list={['ADMIN', 'TOURIST', 'TOUR_GUIDE']}
                                className='col-span-3'
                            />
                        </WrapperField>
                    </div>
                    <div className='text-right mt-5'>
                        <div className='flex items-center justify-end'>
                            <button
                                type='button'
                                onClick={handleCancel}
                                className={classNames(
                                    'text-lg font-semibold text-orange-400 mr-4 px-6 py-2 rounded-md  flex items-center justify-center gap-2  transition-all',
                                    disable
                                        ? 'bg-gray-100 !text-gray-c6 border !border-transparent cursor-no-drop pointer-events-none select-none'
                                        : 'hover:text-white hover:bg-gradient-to-br hover:from-orange-500  border border-orange-300 hover:to-pink-500',
                                )}
                            >
                                <span className='leading-none'>
                                    <IconTrash />
                                </span>
                                Cancle
                            </button>
                            <button
                                type='submit'
                                className='text-white px-5 py-2 bg-gradient-to-br from-orange-500 to-pink-500 text-lg font-semibold rounded-md hover:bg-gradient-to-br hover:from-orange-600 hover:to-pink-600'
                            >
                                Add user
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewUser;
