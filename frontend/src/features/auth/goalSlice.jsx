import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";


const initialState = {
    goal: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

export const createGoal = createAsyncThunk("goals/createGoal",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService(goalData, token)
        } catch(error) {
            const message = (error.response && error.response.data && 
                error.response.data.message ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const goalSlice = createSlice(
    {
        name: 'goal',
        initialState,
        reducers: {
            reset: (state) => initialState
        },
        extraReducers : (builder) => {
            builder
                .addCase(createGoal.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(createGoal.fulfilled, (state, actions) => {
                    state.isSuccess = true
                    state.isLoading = false
                    state.goal.push(actions.payload)
                })
                .addCase(createGoal.rejected, (state, actions) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = actions.payload
                })
        }
    }
)

export const {reset} = goalSlice.actions
export default goalSlice.reducer