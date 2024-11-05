/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../reducers/photosReducer.js';
import { userLoader } from '../unsplash.js';
import Layout from './Layout';
import Feed from './Feed';
import Popup from './Popup';
import Auth from './Auth';
import NotFound from './NotFound';

const App = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.photosReducer);

    useEffect(() => {
        const getUser = async () => {
          const user = await userLoader('Cerechamber');
          dispatch(actions.getUser(user));
        };
        getUser();
    }, []);

    return (
            <Routes>
                <Route path="*" element={<NotFound />} />
                
                <Route path='/' element={ <Layout user={ state.user } /> }>
                    <Route index element={ <Auth /> } />
                    <Route path='feed' element={ <Feed /> } />
                </Route>

                <Route path='feed/:id' element={ <Popup photoId={ state.currentPhoto }  /> } />
                
            </Routes>
    )
}

export default App;
