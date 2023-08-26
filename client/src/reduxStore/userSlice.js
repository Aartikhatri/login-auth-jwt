import { createSlice } from  '@reduxjs/toolkit'

const userSlice = createSlice({
 name : "userDEtails" ,
 initialState : [],
 reducers : {
    addUser : (state , action)=> {
        state.push(action.payload)
        if(state.length > 1) {
            state.shift()
        }
    }
 }
});

export default userSlice.reducer
export const { addUser } = userSlice.actions