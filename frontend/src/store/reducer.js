import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
}

export const appSlice = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        loginUser: (state, { payload }) => {
            state.user = payload
            state.isLoggedIn = true
        },
        logOutUser: (state) => {
            state.user = null
            state.isLoggedIn = false
        },
    },
})

export const { loginUser } = appSlice.actions

export default appSlice.reducer