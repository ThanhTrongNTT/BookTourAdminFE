import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi, { userAuth } from '~/api/user.api';

export const userLogin = createAsyncThunk('user/login', async (user: userAuth) => {
    //thunkAPI.dispatch();
    try {
        const result = await userApi.login(user.email, user.password);
        return result.data;
    } catch (err) {
        console.log(err);
    }
});

export const userGetMe = createAsyncThunk('user/getMe', async (email: any) => {
    try {
        const result = await userApi.getMe(email);
        if (result.data) return result.data;
        return result;
    } catch (err) {
        console.log('getMe error$', err);
    }
});

interface UserSlice {
    accessToken: string;
    refreshToken: string;
    userInfo: {
        id: string;
        email: string;
        fullName: string;
        phoneNumber: string;
        gender: string;
        role: [
            {
                id: string;
                roleName: string;
            },
        ];
        avatar: string;
    } | null;
    error: string;
    message: string;
}
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const initialState: UserSlice = {
    accessToken: accessToken || '',
    refreshToken: refreshToken || '',
    userInfo: null,
    error: '',
    message: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        update: (state, action) => {
            state.userInfo = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        resetUserState: (state) => {
            console.log('resetState');
            state.message = '';
            state.error = '';
        },
    },
});

// const { reducer, actions } = userSlice;
// export const { setMessage, resetUserState, update } = actions;
export default userSlice.reducer;
export const { update, setMessage, resetUserState } = userSlice.actions;
