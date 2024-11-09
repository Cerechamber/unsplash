/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../reducers/photosReducer.js';
import unsplashLoader from '../unsplash.js';
import { unsplashParams } from '../unsplash.js';
import Layout from './Layout';
import Feed from './Feed';
import Popup from './Popup';
import Auth from './Auth';
import NotFound from './NotFound';

const App = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.photosReducer);
    const { accessKey } = state;

    useEffect(() => {
        if (accessKey) {
        const { name } = state.user;
        const { page } = state;

        const unsplashData = unsplashLoader(unsplashParams.client_id);
    
        const getUser = async () => {
          const user = await unsplashData.userLoader(name);
          dispatch(actions.getUser(user));
        };

        const getPhoto = async () => {
            const data = await unsplashData.photoLoader(page);
            dispatch(actions.getPhotos(data));
        }
        
        getUser();
        getPhoto();

        }
    }, [accessKey]);

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
