import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    photos: [],
    currentPhoto: null
}

const slice = createSlice(
    {  
        name: 'photos',
        initialState,
        reducers: {
            getPhotos(state, { payload }) {
                state.photos = payload;
            },
            getUser(state, { payload }) {
                console.log(payload);
                state.user = payload;
            },
            getCurrentPhoto({ currentPhoto }, { payload }) {
                currentPhoto = payload;
            },
            checkPhoto({ photos }, { payload }) {
                photos.forEach(item => {
                    if (item.id === payload) {
                        item.liked = !item.liked;
                    }
                })
            }
        }
    }
);

export const { actions } = slice;
export default slice.reducer;