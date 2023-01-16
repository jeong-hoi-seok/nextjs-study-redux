import { createSlice } from '@reduxjs/toolkit';

const modalSlide = createSlice({
    name: 'modal',
    initialState: {
        active: false,
        id: null,
    },
    reducers: {
        open: (state, action) => {
            state.active = true;
            state.id = action.payload.id;
        },
        close: (state, action) => {
            state.active = false;
            state.id = null;
        }
    }
});

export const { open, close } = modalSlide.actions;
export default modalSlide.reducer;