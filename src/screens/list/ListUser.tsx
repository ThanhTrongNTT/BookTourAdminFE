import { Avatar, Modal, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '~/api/user.api';

const List = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<any>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [response, setResponse] = useState<any>();
    const [isModal, setIsModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const navigate = useNavigate();

    const getData = async (page: number) => {
        await userApi.getUsers(page - 1).then((users) => {
            setResponse(users);
            setUsers(users.data);
        });
    };
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

    const onClose = () => {
        setIsModal(!isModal);
    };
    const deleteClose = () => {
        setIsDelete(!isDelete);
    };
    const handleDelete = (id: string) => {
        setIsDelete(!isDelete);
        setIdDelete(id);
    };
    const handleDeleteSuccess = async (id: string) => {
        await userApi.deleteUser(id).then((response) => {
            if (response.status === 200)
                toast.success('Delete Success!', {
                    autoClose: 500,
                    delay: 50,
                    draggable: true,
                    pauseOnHover: false,
                });
        });
        setIsDelete(!isDelete);
        getData(currentPage);
    };
    const handleEdit = (id: string) => {
        navigate(`${id}`);
        toast.success('Edit View!', {
            delay: 50,
            draggable: false,
            pauseOnHover: false,
        });
    };
    useEffect(() => {
        getData(currentPage);
    }, []);

    return (
        <>
            <div className='p-2'>
                <Modal show={isDelete} size='lg' popup={true} onClose={deleteClose}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className='text-center'>
                            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                                Are you sure you want to delete this user?
                            </h3>
                            <div className='flex justify-center gap-4 text-warning'>
                                <button
                                    color='failure'
                                    onClick={() => handleDeleteSuccess(idDelete)}
                                >
                                    Yes, I'm sure
                                </button>
                                <button color='gray' onClick={deleteClose}>
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
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
                                            onClick={() => handleEdit(user.id)}
                                        >
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            className='ml-2 text-red-500 font-semibold uppercase'
                                            onClick={() => handleDelete(user.id)}
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
