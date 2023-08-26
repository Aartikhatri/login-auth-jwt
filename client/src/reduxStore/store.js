import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
    reducer : {
        userDetails  : userSlice 
    }
});

export default store;