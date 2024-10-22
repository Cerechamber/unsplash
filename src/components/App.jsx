import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../reducers/photosReducer.js';
import Main from './Main';
import Feed from './Feed';
import Popup from './Popup';
import Auth from './Auth';

const App = ({ data }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getUser(data.author));
        dispatch(actions.getPhotos(data.photos));
    }, []);

    const state = useSelector((state) => state.photosReducer);

    return (
            <Routes>
                <Route path='/' element={ <Main user={ state.user } /> }>
                    <Route index element={ <Auth /> } />
                    <Route path='feed' element={ <Feed photos={ state.photos } /> } />
                    <Route path='feed/:id' element={ <Popup photoId={ state.currentPhoto } /> } />
                </Route>
            </Routes>
    )
}

export default App;
