/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../reducers/photosReducer.js';
import { userLoader } from '../unsplash.js';
import photoLoader from '../unsplash.js';
import Layout from './Layout';
import Feed from './Feed';
import Popup from './Popup';
import Auth from './Auth';
import NotFound from './NotFound';

const App = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.photosReducer);
    const unsplashToken = localStorage.getItem('unsplash-token');

    useEffect(() => {
        if (unsplashToken) {
        const { name } = state.user;
        const { page } = state;

        dispatch(actions.setAccessKey(unsplashToken));
    
            const getUser = async () => {
            const user = await userLoader(name);
            return user;
        };

        const getPhoto = async () => {
        const data = await photoLoader(page);
        dispatch(actions.getPhotos(data));
     }
        
        getUser();
        getPhoto();

        }
    }, [unsplashToken]);

    return (
            <Routes>
                <Route path='/' element={ <Layout user={ state.user } /> }>
                    <Route index element={ <Auth /> } />
                    <Route path='feed' element={ <Feed photos={ state.photos } /> } />
                    <Route path='feed/:id' element={ <Popup photoId={ state.currentPhoto }  /> } />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
    )
}

export default App;
