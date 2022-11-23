import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import locationApi from '~/api/location.api';
import { IconAdd } from '~/components/icon/Icon';

const ListLocation = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [locations, setLocations] = useState<any>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [response, setResponse] = useState<any>();
    const onPageChange = (page: number) => {
        console.log(page);

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
    useEffect(() => {
        const getData = async () => {
            await locationApi.getLocation(currentPage - 1).then((reponse) => {
                setResponse(reponse);
                setLocations(reponse.data);
            });
        };
        getData();
    }, []);

    return (
        <>
            <div className='p-2'>
                <div className='px-10 mx-10 w-full flex justify-end'>
                    <Link to={'new'}>
                        <button className='flex items-center text-black bg-white p-1 mx-8 my-2 rounded-2xl border border-gray-c4'>
                            <IconAdd />
                            <span className='flex items-center mr-2'>
                                Add New
                            </span>
                        </button>
                    </Link>
                </div>
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
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* {totalPages > 1 ? ( */}
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
