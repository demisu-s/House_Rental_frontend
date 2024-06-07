import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import roleService from './roleService';

export const fetchRole = createAsyncThunk(
    'role/fetchRole',
    async (_, {getState}) => {
        const {auth} = getState();
        const response = await roleService.fetchRole(auth.user.id);
        const data = await response.json();
        //return response.role
        return data.role;
    }
);

const roleSlice = createSlice({
    name: 'role',
    initialState: {
        role: '',
        status: 'idle',
        error: null,
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRole.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRole.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.role = action.payload;
            })
            .addCase(fetchRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
})

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;