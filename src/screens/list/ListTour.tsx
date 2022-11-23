import { Modal, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import tourApi from '~/api/tour.api';
import { IconAdd } from '~/components/icon/Icon';
import NewTour from '../new/NewTour';

const ListTour = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tours, setTours] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [response, setResponse] = useState<any>();
    const [isModal, setIsModal] = useState(false);
    const onClose = () => {
        setIsModal(!isModal);
    };
    const onPageChange = (page: number) => {
        console.log(page);

        tourApi.getTours(page - 1).then((reponse) => {
            setTours(reponse.data);
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

    const handleEdit = async () => {
        setIsModal(!isModal);
        toast.success('Edit View!', {
            delay: 50,
            draggable: false,
            pauseOnHover: false,
        });
    };
    useEffect(() => {
        const getData = async () => {
            await tourApi.getTours(currentPage - 1).then((reponse) => {
                setResponse(reponse);
                setTours(reponse.data);
            });
        };
        getData();
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
                        <NewTour />
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={onClose}>I accept</button>
                        <button color='gray' onClick={onClose}>
                            Decline
                        </button>
                    </Modal.Footer>
                </Modal>
                <div className='overflow-x-auto rounded-2xl mx-8 border border-gray-c4'>
                    <table className='bg-white  w-[100%] text-sm text-left text-gray-400 '>
                        <thead className='text-xs uppercase bg-white text-gray-c6  border-b border-secondary'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>
                                    Image
                                </th>
                                <th scope='col' className='py-3 px-6 w-[300px]'>
                                    Tour Name
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Price
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Beginning Location
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Destination Location
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Start Day
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    End Day
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Tour Type
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tours.map((tour: any, index: number) => (
                                <tr className='bg-white hover:bg-gray-c2 cursor-pointer'>
                                    <th
                                        scope='row'
                                        className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                    >
                                        <img
                                            src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                            alt=''
                                        />
                                    </th>
                                    <th
                                        scope='row'
                                        className='py-4 px-6 font-medium text-black whitespace-wrap w-[380px]'
                                    >
                                        {tour.tourDetail.tourName}
                                    </th>
                                    <th
                                        scope='row'
                                        className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                    >
                                        {tour.tourDetail.price.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </th>
                                    <th
                                        scope='row'
                                        className='py-4 px-6 font-medium text-black whitespace-nowrap'
                                    >
                                        {tour.tourDetail.beginningLocation.locationName}
                                    </th>
                                    <td className='py-4 px-6 font-medium text-black'>
                                        {tour.tourDetail.destinationLocation.locationName}
                                    </td>
                                    <td className='py-4 px-6 text-gray-c8'>
                                        {tour.tourDetail.startDay}
                                    </td>
                                    <td className='py-4 px-6 text-gray-c8'>
                                        {tour.tourDetail.endDay}
                                    </td>
                                    <td className='py-4 px-6 text-gray-c8'>{tour.type}</td>
                                    <td className='py-4 px-6 text-gray-c8'>
                                        <div className='flex flex-col'>
                                            <button
                                                className='text-green-500 font-semibold uppercase my-2'
                                                onClick={handleEdit}
                                            >
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                className='ml-2 text-red-500 font-semibold uppercase'
                                                onClick={handleDelete}
                                            >
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* {totalPages > 1 ? ( */}
                <div className='flex items-center justify-center text-center'>
                    <Pagination
                        showIcons={true}
                        currentPage={currentPage}
                        totalPages={totalPages}
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

export default ListTour;
