import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosReducer";

export default configureStore({
    reducer: {
        photosReducer,
    }
});