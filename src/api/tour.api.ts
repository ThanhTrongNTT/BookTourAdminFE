import { Pagination, Tour } from '~/data/Interface';
import AxiosClient from './axiosClient/AxiosClient';

const tourApi = {
    getTours: ({ pageNo, pageSize, sortBy, sortDir }: Pagination) => {
        const url = `tours/paging?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    getTourById: (id: string) => {
        const url = `tour/${id}`;
        return AxiosClient.get(url);
    },
    saveTour: (tour: Tour) => {
        const url = `tour/save`;
        return AxiosClient.post(url, tour);
    },
    updateTour: (tour: Tour, id: string) => {
        const url = `tour/${id}`;
        return AxiosClient.put(url, tour);
    },
    deleteTour: (id: string) => {
        const url = `tour/delete/${id}`;
        return AxiosClient.delete(url);
    },
};
export default tourApi;
