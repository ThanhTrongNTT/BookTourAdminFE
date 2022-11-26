export interface User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: Address;
    gender: string;
    birthDay: string;
    avatar: string;
    role: Role[];
}

export interface Role {
    id: string;
    roleName: string;
}

export interface Address {
    street: string;
    district: string;
    city: string;
}

export interface Tour {
    id?: string;
    hotelRoom?: number;
    flightClass?: number;
    tourDetail?: TourDetail;
    type?: string;
}
export interface TourDetail {
    tourName?: string;
    tourDes?: string;
    price?: number;
    images?: string[];
    startDay?: string;
    endDay?: string;
    beginningLocation?: {
        locationName: string;
        locationType: 'BEGINNING';
    };
    destinationLocation?: {
        locationName: string;
        locationType: 'DESTINATION';
    };
}
export interface Location {
    id?: string;
    locationName: string;
    locationType: string;
}
export interface Booking {
    id: string;
    user: User;
    tour: Tour;
    enable: boolean;
}

export interface Pagination {
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
}

export interface JWTType {
    admin: boolean;
    sub: string;
    exp: number;
    iat: number;
}
