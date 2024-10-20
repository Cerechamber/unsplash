import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
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

    const { user } = useSelector((state) => state.photosReducer);

    return (
            <Routes>
                <Route path='/' element={ <Main user={user} /> }>
                    <Route index element={ <Auth /> } />
                    <Route path='feed' element={ <Feed /> } />
                    <Route path='feed/:id' element={ <Popup /> } />
                </Route>
            </Routes>
    )
}

export default App;
