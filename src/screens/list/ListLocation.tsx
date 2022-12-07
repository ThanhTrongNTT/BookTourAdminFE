import { Modal, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import locationApi from '~/api/location.api';
import { IconAdd } from '~/components/icon/Icon';
import NewLocation from '../new/NewLocation';

const ListLocation = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [locations, setLocations] = useState<any>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [response, setResponse] = useState<any>();
    const [isModal, setIsModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const navigate = useNavigate();

    const getData = async (page: number) => {
        await locationApi.getLocation(page - 1).then((reponse) => {
            setResponse(reponse);
            setLocations(reponse.data);
        });
    };
    const onClose = () => {
        setIsModal(!isModal);
    };
    const deleteClose = () => {
        setIsDelete(!isDelete);
    };
    const onPageChange = (page: number) => {
        locationApi.getLocation(page - 1).then((reponse) => {
            setLocations(reponse.data);
        });
        setCurrentPage(page);
    };
    if (response) {
        if (response.totalPages !== totalPages) {
            setTotalPages(response.totalPages);
        }
    }
    const handleDelete = (id: string) => {
        setIsDelete(!isDelete);
        setIdDelete(id);
    };
    const handleDeleteSuccess = async (id: string) => {
        await locationApi.delete(id).then((response) => {
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

    const handleEdit = async (id: string) => {
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
                <div>
                    <button
                        className='flex items-center text-black bg-white p-1 mx-8 my-2 rounded-2xl border border-gray-c4'
                        onClick={() => {
                            setIsModal(true);
                        }}
                    >
                        <IconAdd />
                        <span className='flex items-center mr-2'>Add New</span>
                    </button>
                </div>
                <Modal show={isModal} size='lg' popup={true} onClose={onClose}>
                    <Modal.Header />
                    <Modal.Body>
                        <NewLocation />
                    </Modal.Body>
                </Modal>
                <Modal show={isDelete} size='lg' popup={true} onClose={deleteClose}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className='text-center'>
                            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                                Are you sure you want to delete this location?
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
                                    Location Name
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Location Type
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location: any, index: number) => (
                                <>
                                    <tr className='bg-white hover:bg-gray-c2 cursor-pointer'>
                                        <th
                                            scope='row'
                                            className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                        >
                                            {location.locationName}
                                        </th>

                                        <th
                                            scope='row'
                                            className='py-4 px-6 font-medium text-success whitespace-nowrap'
                                        >
                                            {location.locationType}
                                        </th>
                                        <td className='py-4 px-6 text-gray-c8'>
                                            <button
                                                className='text-green-500 font-semibold uppercase'
                                                onClick={() => handleEdit(location.id)}
                                            >
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                className='ml-2 text-red-500 font-semibold uppercase'
                                                onClick={() => handleDelete(location.id)}
                                            >
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex items-center justify-center text-center'>
                    <Pagination
                        showIcons={true}
                        layout='pagination'
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default ListLocation;
