import { Address, Pagination } from '~/data/Interface';
import AxiosClient from './axiosClient/AxiosClient';

export interface userAuth {
    email: string;
    password: string;
}
export interface UserUpdateProfile {
    email: string;
    fullName: string;
    phoneNumber: string;
    address: Address;
    gender: string;
    birthDay: string;
    avatar: string;
}
const userApi = {
    login: (email: string, password: string) => {
        const url = 'auth/login';
        return AxiosClient.post(url, { email, password });
    },
    getMe: (email: string) => {
        const url = `user/${email}`;
        return AxiosClient.get(url);
    },
    getUsers: ({ pageNo, pageSize, sortBy, sortDir }: Pagination) => {
        const url = `users/paging?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
        return AxiosClient.get(url);
    },
    updateProfile: (userUpdateProfile: UserUpdateProfile) => {
        const url = `user/${userUpdateProfile.email}`;
        return AxiosClient.put(url, userUpdateProfile);
    },
    updateAvatar: (email: string, avatar: string) => {
        const url = `user/avt/${email}`;
        return AxiosClient.put(url, avatar);
    },
    deleteUser: (email: string) => {
        const url = `user/delete/${email}`;
        return AxiosClient.delete(url);
    },
    searchUser: (search: string) => {
        const url = `user/search?search=${search}`;
        return AxiosClient.get(url);
    },
};
export default userApi;
