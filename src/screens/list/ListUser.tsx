import { useState } from 'react';
import { Pagination, Avatar } from 'flowbite-react';
import { toast } from 'react-toastify';
import { IconAdd } from '~/components/icon/Icon';
import AxiosClient from '~/api/axiosClient/AxiosClient';
import { Link } from 'react-router-dom';

const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        AxiosClient.get(`/locations/paging?pageNo=${page - 1}`).then((reponse) => {
            console.log(reponse);
        });
        setCurrentPage(page);
    };

    const handleDelete = () =>
        toast.success('Delete Success!', {
            delay: 50,
            draggable: true,
            pauseOnHover: false,
        });

    const toastMessage = async () => {
        toast.success('Edit View!', {
            delay: 50,
            draggable: false,
            pauseOnHover: false,
        });
    };

    return (
        <>
            <div className='p-5'>
                <div className='px-10 mx-10 w-full flex justify-end'>
                    <Link to={'new'}>
                        <button className='flex items-center text-black bg-white p-1 mx-8 my-2 rounded-2xl border border-gray-c4'>
                            <IconAdd />

                            <span className='flex items-center mr-2'>Add New</span>
                        </button>
                    </Link>
                </div>
                <div className='overflow-x-auto rounded-2xl mx-8 border border-gray-c4'>
                    <table className='bg-white  w-[100%] text-sm text-left text-gray-400 '>
                        <thead className='text-xs uppercase bg-white text-gray-c6  border-b border-secondary'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>
                                    Avatar
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Product name
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Color
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Category
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Price
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
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
                                    Apple MacBook Pro 17"
                                </th>
                                <td className='py-4 px-6 text-gray-c8'>Sliver</td>
                                <td className='py-4 px-6 text-gray-c8'>Laptop</td>
                                <td className='py-4 px-6 text-gray-c8'>$2999</td>
                                <td className='py-4 px-6 text-gray-c8'>
                                    <button
                                        className='text-green-500 font-semibold uppercase'
                                        onClick={() => toastMessage()}
                                    >
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        className='ml-2 text-red-500 font-semibold uppercase'
                                        onClick={() => handleDelete()}
                                    >
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className='bg-white border-b border-gray-c4 hover:bg-gray-c2 cursor-pointer'>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                >
                                    <Avatar
                                        img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                        rounded={true}
                                        bordered={true}
                                    />
                                </th>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium text-black whitespace-nowrap '
                                >
                                    Microsoft Surface Pro
                                </th>
                                <td className='py-4 px-6 text-gray-c8'>White</td>
                                <td className='py-4 px-6 text-gray-c8'>Laptop PC</td>
                                <td className='py-4 px-6 text-gray-c8'>$1999</td>
                                <td className='py-4 px-6 text-gray-c8'>
                                    <button className='text-green-500 font-semibold uppercase'>
                                        <span>Edit</span>
                                    </button>
                                    <button className='ml-2 text-red-500 font-semibold uppercase'>
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className='bg-white border-b border-gray-c4 hover:bg-gray-c2 cursor-pointer'>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                >
                                    <Avatar
                                        img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                        rounded={true}
                                        bordered={true}
                                    />
                                </th>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium whitespace-nowrap text-black'
                                >
                                    Microsoft Surface Pro
                                </th>
                                <td className='py-4 px-6 text-gray-c8'>White</td>
                                <td className='py-4 px-6 text-gray-c8'>Laptop PC</td>
                                <td className='py-4 px-6 text-gray-c8'>$1999</td>
                                <td className='py-4 px-6 text-gray-c8'>
                                    <button className='text-green-500 font-semibold uppercase'>
                                        <span>Edit</span>
                                    </button>
                                    <button className='ml-2 text-red-500 font-semibold uppercase'>
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className='bg-white border-b border-gray-c4 hover:bg-gray-c2 cursor-pointer'>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                >
                                    <Avatar
                                        img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                        rounded={true}
                                        bordered={true}
                                    />
                                </th>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium whitespace-nowrap text-black'
                                >
                                    Microsoft Surface Pro
                                </th>
                                <td className='py-4 px-6 text-gray-c8'>White</td>
                                <td className='py-4 px-6 text-gray-c8'>Laptop PC</td>
                                <td className='py-4 px-6 text-gray-c8'>$1999</td>
                                <td className='py-4 px-6 text-gray-c8'>
                                    <button className='text-green-500 font-semibold uppercase'>
                                        <span>Edit</span>
                                    </button>
                                    <button className='ml-2 text-red-500 font-semibold uppercase'>
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className='bg-white hover:bg-gray-c2 cursor-pointer'>
                                <th scope='row' className='py-4 px-6 text-black whitespace-nowrap'>
                                    <Avatar
                                        img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                        rounded={true}
                                        bordered={true}
                                    />
                                </th>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium  whitespace-nowrap text-black'
                                >
                                    Magic Mouse 2
                                </th>
                                <td className='py-4 px-6 text-gray-c8'>Black</td>
                                <td className='py-4 px-6 text-gray-c8'>Accessories</td>
                                <td className='py-4 px-6 text-gray-c8'>$99</td>
                                <td className='py-4 px-6 text-gray-c8'>
                                    <button className='text-green-500 font-semibold uppercase'>
                                        <span>Edit</span>
                                    </button>
                                    <button className='ml-2 text-red-500 font-semibold uppercase'>
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-end mr-8'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default List;