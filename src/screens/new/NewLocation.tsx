import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import locationApi from '~/api/location.api';
import WrapperField from '~/components/common/WrapperField';
import Dropdown from '~/components/dropdown/Dropdown';
import { IconTrash } from '~/components/icon/Icon';
import InputDefault from '~/components/input/InputDefault';
import classNames from '~/utils/classNames';

const NewLocation = () => {
    const [disable, setDisable] = useState(true);
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm();
    const handleCancel = () => {
        reset({
            locationName: '',
            locationType: 'Choose Role',
        });
        setDisable(true);
    };
    if (isSubmitSuccessful) handleCancel();

    const onSubmit = async (values: any) => {
        if (values.locationName === '')
            toast.error('Please fill Location Name!', {
                autoClose: 1000,
                delay: 50,
                draggable: false,
                pauseOnHover: false,
            });
        else if (values.locationType === 'Choose Role') {
            toast.error('Please choose Location Type!', {
                autoClose: 1000,
                delay: 50,
                draggable: false,
                pauseOnHover: false,
            });
        } else {
            const locationUpdate = {
                locationName: values.locationName,
                locationType: values.locationType,
            };
            // console.log(locationUpdate);

            await locationApi.saveLocation(locationUpdate).then((response) => {
                toast.success('Add success!', {
                    autoClose: 1000,
                    delay: 50,
                    draggable: false,
                    pauseOnHover: false,
                });
                window.location.reload();
            });
        }
    };

    return (
        <div className='w-full'>
            <div className='px-10 py-10 pb-5 mt-16 w-[800px] bg-white rounded-md'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=''
                    onChange={() => setDisable(false)}
                >
                    <h1 className='font-bold text-3xl mb-7 text-center'>Create A Location</h1>
                    <div className='flex flex-col gap-4'>
                        <WrapperField>
                            <label htmlFor='' className='font-bold text-left'>
                                Location Name:
                            </label>
                            <InputDefault
                                placeholder='Enter locataion'
                                control={control}
                                name='locationName'
                                className='col-span-3'
                            />
                        </WrapperField>
                        <WrapperField>
                            <label htmlFor='' className='font-bold flex-1 text-left col-span-1'>
                                Location Type:
                            </label>
                            <Dropdown
                                dropdownLabel='Choose Role'
                                control={control}
                                name='locationType'
                                setValue={setValue}
                                list={['BEGINNING', 'DESTINATION']}
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
                                Add location
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewLocation;
