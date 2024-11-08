import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    photos: [],
    currentPhoto: null,
    page: 1,
    accessKey: ''
}

const slice = createSlice(
    {  
        name: 'photos',
        initialState,
        reducers: {
            getPhotos(state, { payload }) {   
                const photos = state.photos;
                const newPhotos = photos.concat(payload);
                state.photos = newPhotos;
                state.page += 1;
            },
            getUser(state, { payload }) {
                state.user = payload;
            },
            getCurrentPhoto(state, { payload }) {
                state.currentPhoto = payload;
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