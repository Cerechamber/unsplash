import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    photos: [],
    currentPhoto: null,
    currentQuantityPhotos: 7,
}

const slice = createSlice(
    {  
        name: 'photos',
        initialState,
        reducers: {
            getPhotos(state, { payload }) {
                state.photos = payload;
                state.currentQuantityPhotos += 6;
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