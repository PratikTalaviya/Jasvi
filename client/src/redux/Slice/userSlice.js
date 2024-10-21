import { createSlice } from "@reduxjs/toolkit"

// const initialState= [];

const userSlice = createSlice({
    name: 'userinfo',
    initialState: {
        isLoggedIn: false,
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogIn: (state, action) => {  
            state.isLoggedIn = action.payload
        }
    },
})

export const { setUser, setLogIn } = userSlice.actions;
export default userSlice.reducer;
