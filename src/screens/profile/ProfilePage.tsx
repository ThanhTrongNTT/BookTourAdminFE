import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonCancel from '~/components/button/ButtonCancel';
import ButtonSubmit from '~/components/button/ButtonSubmit';
import DropdownIcon from '~/components/dropdown/DropdownIcon';
import FieldUpdateProfile from '~/components/field/FieldUpdateProfile';
import {
    IconCake,
    IconEmail,
    IconGender,
    IconHouse,
    IconName,
    IconPenUnderline,
} from '~/components/icon/Icon';
import CardAvt from '~/modules/card/CardAvt';
import classNames from '~/utils/classNames';

const ProfilePage = () => {
    const { handleSubmit, control, setValue, setFocus } = useForm({
        mode: 'onChange',
    });
    const [disable, setDisable] = useState(true);
    const [disableBtnSubmit, setDisableBtnSubmit] = useState(true);
    const [disableBtnEdit, setDisableBtnEdit] = useState(false);

    // useEffect(() => {
    //     document.title = 'Profile';
    //     if (user.address) {
    //         setValue('street', user.address.street);
    //         setValue('district', user.address.district);
    //         setValue('city', user.address.city);
    //     }
    //     setValue('birthDay', user?.birthDay ? user.birthDay : '');
    //     setValue('fullName', user.fullName);
    //     setValue('email', user.email);
    //     setValue('gender', user?.gender ? user.gender : '');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //   async function getUser() {
    //     try {
    //       const response = await axiosPrivate.get(`user/${user.email}`);
    //       console.log("getUser ~ response", response);
    //     } catch (error) {
    //       console.log("getUser ~ error", error);
    //     }
    //   }
    //   getUser();
    // }, []);

    const handleEditProfile = () => {
        setDisableBtnEdit(!disableBtnEdit);
        setDisable(false);
        setFocus('street');
    };

    const handleCancelEdit = () => {
        // const watchFields = watch(["address", "email", "gender"]);
        // if (user?.address) {
        //   if (user.address !== watchFields[0]) alert("vinh");
        // }
        // if (user?.gender?.genderType) {
        //   if (user.gender.genderType !== watchFields[2]) alert("vinh");
        // }
        setDisableBtnEdit(!disableBtnEdit);
        setDisableBtnSubmit(!disableBtnSubmit);
        setDisable(true);
    };

    // const handleUpdateInfo = async ({ street, district, city, ...values }) => {
    //     const request = {
    //         address: {
    //             street,
    //             district,
    //             city,
    //         },
    //         ...values,
    //     };

    //     console.log('address', request);
    //     const response = await axiosPrivate.put(`/user/${user.email}`, request);
    //     const responseUser = await axiosPrivate.get(`user/${user.email}`);
    //     console.log(responseUser);
    //     if (!response.data) return null;
    //     if (response.status !== 202) {
    //         toast.success(response.data.message, {
    //             autoClose: 500,
    //         });
    //         return new Promise((resolve) => {
    //             setTimeout(async () => {
    //                 resolve();
    //                 window.location.reload(true);
    //             }, 1000);
    //         });
    //     } else {
    //         toast.error(response.data.message, {
    //             autoClose: 500,
    //         });
    //     }
    // };

    const handleUpdateInfo = (values: object) => console.log(values);

    return (
        <div>
            {/* <div className='my-10 flex items-center gap-3'>
                <BreadCrumbs />
            </div> */}
            <div className='max-w-7xl flex flex-col gap-[30px] lg:flex-row lg:gap-[33px] mx-auto py-10 px-5'>
                <CardAvt />
                <div className='flex-1 px-5 lg:px-0'>
                    <h1 className='border-gray-c3 mt-5 hidden border-b pb-8 lg:block text-3xl text-white font-semibold'>
                        My Profile
                    </h1>
                    <div className='mt-20 font-DMSans'>
                        <div className='mb-12 flex justify-between'>
                            <p className='text-grayScale-c2 text-xl font-medium dark:text-white lg:text-2xl'>
                                {/* Hi, I'm {user.fullName} */}
                                Hi, I'm Nguyen Thanh Trong
                            </p>
                            {/* <ButtonEdit hasIconPen onClick={handleEditProfile}>
                                      Edit your profile
                                  </ButtonEdit> */}
                            <button
                                disabled={disableBtnEdit}
                                type='button'
                                className={classNames(
                                    'text-white text-semibold px-3 py-1 rounded-full border hover:bg-slate-100 hover:text-black transition-all border-gray-c4',
                                    disableBtnEdit
                                        ? 'bg-gray-c4'
                                        : 'bg-transparent',
                                )}
                                onClick={handleEditProfile}
                            >
                                <div className='flex items-center justify-center gap-2'>
                                    <span>
                                        <IconPenUnderline />
                                    </span>
                                    <span>Edit your profile</span>
                                </div>
                            </button>
                        </div>
                        <form
                            onChange={() => setDisableBtnSubmit(false)}
                            onSubmit={handleSubmit(handleUpdateInfo)}
                            className='mt-10'
                        >
                            <div className='grid grid-rows-3 gap-8'>
                                <div className='grid grid-cols-3 grid-rows-1 gap-8'>
                                    <FieldUpdateProfile
                                        name='street'
                                        id='street'
                                        placeholder='Enter your street'
                                        control={control}
                                        icon={<IconHouse />}
                                        hasDisable={disable}
                                        color='text-white'
                                    >
                                        Street
                                    </FieldUpdateProfile>
                                    <FieldUpdateProfile
                                        name='district'
                                        id='district'
                                        placeholder='Enter your district'
                                        control={control}
                                        icon={<IconHouse />}
                                        hasDisable={disable}
                                        color='text-white'
                                    >
                                        District
                                    </FieldUpdateProfile>
                                    <FieldUpdateProfile
                                        name='city'
                                        id='city'
                                        placeholder='Enter your city'
                                        control={control}
                                        icon={<IconHouse />}
                                        hasDisable={disable}
                                        color='text-white'
                                    >
                                        City
                                    </FieldUpdateProfile>
                                </div>
                                <div className='grid grid-cols-2 gap-8'>
                                    <FieldUpdateProfile
                                        name='fullName'
                                        id='fullName'
                                        placeholder='Enter your full name'
                                        control={control}
                                        icon={<IconName />}
                                        hasDisable={disable}
                                        color='text-white'
                                    >
                                        Full Name
                                    </FieldUpdateProfile>
                                    <FieldUpdateProfile
                                        name='email'
                                        id='email'
                                        placeholder='Enter your email'
                                        control={control}
                                        icon={<IconEmail />}
                                        tabIndex={-1}
                                        hasDisable
                                        color='text-white'
                                    >
                                        Email
                                    </FieldUpdateProfile>
                                </div>
                                <div className='grid grid-cols-2 gap-9'>
                                    <FieldUpdateProfile
                                        type='text'
                                        name='birthDay'
                                        id='birthDay'
                                        placeholder='dd/mm/yyyy'
                                        control={control}
                                        icon={<IconCake />}
                                        hasDisable={disable}
                                        color='text-white'
                                    >
                                        Date Of Birth
                                    </FieldUpdateProfile>
                                    <div className='flex flex-col gap-4'>
                                        <label
                                            htmlFor='genderType'
                                            className='font-DMSans text-sm font-bold text-c4 text-white'
                                        >
                                            Gender
                                        </label>
                                        <DropdownIcon
                                            setValue={setValue}
                                            control={control}
                                            name='gender'
                                            disable={disable}
                                            list={['MALE', 'FEMALE', 'ANOTHER']}
                                            icon={<IconGender />}
                                            color='text-white'
                                            // dropdownLabel={user.gender}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 inline-block w-full text-right'>
                                <div className='inline-block'>
                                    <div className='flex items-center'>
                                        <ButtonCancel
                                            onClick={handleCancelEdit}
                                            disable={disableBtnSubmit}
                                        />
                                        <ButtonSubmit
                                            disable={disableBtnSubmit}
                                        >
                                            Update Profile
                                        </ButtonSubmit>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
