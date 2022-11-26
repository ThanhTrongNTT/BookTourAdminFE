import { Location } from '~/data/Interface';
import AxiosClient from './axiosClient/AxiosClient';

const locationApi = {
    getLocation: (pageNo: number) => {
        const url = `locations/paging?pageNo=${pageNo}&pageSize=10&sortBy=locationType`;
        return AxiosClient.get(url);
    },
    getLocationById: (id: string) => {
        const url = `location/${id}`;
        return AxiosClient.get(url);
    },
    getLocationByType: (typeName: string) => {
        const url = `locations/type?typeName=${typeName}`;
        return AxiosClient.get(url);
    },
    saveLocation: (location: Location) => {
        const url = `location/save`;
        return AxiosClient.post(url, location);
    },
    updateLocation: (id: string, location: Location) => {
        const url = `location/${id}`;
        return AxiosClient.put(url, location);
    },
    delete: (id: string) => {
        const url = `location/delete/${id}`;
        return AxiosClient.delete(url);
    },
};
export default locationApi;
