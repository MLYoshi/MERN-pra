import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    goal: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

export const goalSlice = createSlice(
    {
        name: 'goal',
        initialState,
        reducers: {
            reset: (state) => initialState
        }
    }
)

export const {reset} = goalSlice.actions
export default goalSlice.reducer