/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../reducers/photosReducer.js';
import Layout from './Layout';
import Feed from './Feed';
import Popup from './Popup';
import Auth from './Auth';

const App = ({ data }) => {
    const dispatch = useDispatch();

    const state = useSelector((state) => state.photosReducer);

    useEffect(() => {
        dispatch(actions.getUser(data.author));
        dispatch(actions.getPhotos(data.photos.slice(0, state.currentQuantityPhotos)));
    }, []);

    return (
            <Routes>
                <Route path='/' element={ <Layout user={ state.user } /> }>
                    <Route index element={ <Auth /> } />
                    <Route path='feed' element={ <Feed photos={ state.photos } data={ data } /> } />
                </Route>
                <Route path='feed/:id' element={ <Popup photoId={ state.currentPhoto }  /> } />
            </Routes>
    )
}

export default App;
