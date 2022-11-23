import { Avatar, Modal, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userApi from '~/api/user.api';
import NewUser from '../new/NewUser';

const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<any>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [response, setResponse] = useState<any>();
    const [isModal, setIsModal] = useState(false);
    const onPageChange = (page: number) => {
        userApi.getUsers(page - 1).then((users) => {
            setUsers(users.data);
        });
        setCurrentPage(page);
    };

    if (response) {
        if (response.totalPages !== totalPages) {
            setTotalPages(response.totalPages);
        }
    }
    const handleDelete = () =>
        toast.success('Delete Success!', {
            delay: 50,
            draggable: true,
            pauseOnHover: false,
        });

    const onEdit = () => {
        setIsModal(!isModal);
        // toast.success('Edit View!', {
        //     delay: 50,
        //     draggable: false,
        //     pauseOnHover: false,
        // });
    };
    useEffect(() => {
        const getData = async () => {
            await userApi.getUsers(currentPage - 1).then((users) => {
                setResponse(users);
                setUsers(users.data);
            });
        };
        getData();
    }, []);

    return (
        <>
            <div className='p-2'>
                {/* <div>
                    <button
                        className='flex items-center text-black bg-white p-1 mx-8 my-2 rounded-2xl border border-gray-c4'
                        onClick={() => {
                            setIsModal(true);
                        }}
                    >
                        <IconAdd />
                        <span className='flex items-center mr-2'>Add New</span>
                    </button>
                </div> */}
                <Modal show={isModal} size='lg' popup={true} onClose={onEdit}>
                    <Modal.Header />
                    <Modal.Body>
                        <NewUser />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={onEdit}>I accept</button>
                        <button color='gray' onClick={onEdit}>
                            Decline
                        </button>
                    </Modal.Footer>
                </Modal>
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
                        <tbody>
                            {users.map((user: any, index: number) => (
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
                                            onClick={onEdit}
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
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 ? (
                    <div className='flex items-center justify-center text-center'>
                        <Pagination
                            showIcons={true}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default List;
