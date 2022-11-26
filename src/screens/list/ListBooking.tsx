import { Pagination } from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconAdd } from '~/components/icon/Icon';

const ListBooking = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <>
            <div className='p-2'>
                <div className='overflow-x-auto rounded-2xl mx-8 border border-gray-c4'>
                    <table className='bg-white  w-[100%] text-sm text-left text-gray-400 '>
                        <thead className='text-xs uppercase bg-white text-gray-c6  border-b border-secondary'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>
                                    Avatar
                                </th>
                                <th scope='col' className='py-3 px-6 w-[300px]'>
                                    Email
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Full Name
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Phone Number
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Gender
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {tours.map((user: any, index: number) => (
                                <tr className='bg-white border-b border-gray-c4 hover:bg-gray-c2 cursor-pointer'>
                                    <th
                                        scope='row'
                                        className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                    >
                                        <Avatar
                                            img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                            rounded={true}
                                        />
                                    </th>
                                    <th
                                        scope='row'
                                        className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                    >
                                        {user.email}
                                    </th>
                                    <td className='py-4 px-6 text-gray-c8'>{user.fullName}</td>
                                    <td className='py-4 px-6 text-gray-c8'>{user.phoneNumber}</td>
                                    <td className='py-4 px-6 text-gray-c8'>{user.gender}</td>
                                    <td className='py-4 px-6 text-gray-c8'>
                                        <button
                                            className='text-green-500 font-semibold uppercase'
                                            // onClick={() => toastMessage()}
                                        >
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className='ml-2 text-red-500 font-semibold uppercase'
                                            // onClick={() => handleDelete()}
                                        >
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody> */}
                    </table>
                </div>
                {/* {totalPages > 1 ? ( */}
                <div className='ml-10'>
                    <Pagination
                        showIcons={true}
                        currentPage={1}
                        totalPages={1}
                        onPageChange={onPageChange}
                    />
                </div>
                {/* ) : (
                    ''
                )} */}
            </div>
        </>
    );
};

export default ListBooking;
