import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";


const initialState = {
    goal: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

// create goal
export const createGoals = createAsyncThunk("goals/createGoal",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.createGoal(goalData, token)
        } catch(error) {
            const message = (error.response && error.response.data && 
                error.response.data.message ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// get goal
export const getGoals = createAsyncThunk("goals/getGoal",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.getGoal(token)
        } catch(error) {
            const message = (error.response && error.response.data && 
                error.response.data.message ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete goal
export const deleteGoals = createAsyncThunk("goals/deleteGoals",
    async (goalId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.deleteGoal(goalId ,token)
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
                .addCase(createGoals.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(createGoals.fulfilled, (state, actions) => {
                    state.isSuccess = true
                    state.isLoading = false
                    state.goal.push(actions.payload)
                })
                .addCase(createGoals.rejected, (state, actions) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = actions.payload
                })

                .addCase(getGoals.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getGoals.fulfilled, (state, actions) => {
                    state.isSuccess = true
                    state.isLoading = false
                    state.goal = actions.payload
                })
                .addCase(getGoals.rejected, (state, actions) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = actions.payload
                })

                .addCase(deleteGoals.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(deleteGoals.fulfilled, (state, actions) => {
                    state.isSuccess = true
                    state.isLoading = false
                    state.goal = state.goal.filter((goal)=>(goal._id !== actions.payload._id))
                })
                .addCase(deleteGoals.rejected, (state, actions) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = actions.payload
                })

        }
    }
)

export const {reset} = goalSlice.actions
export default goalSlice.reducer