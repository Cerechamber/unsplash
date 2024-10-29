/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../reducers/photosReducer.js';
import { createApi } from 'unsplash-js';
import Layout from './Layout';
import Feed from './Feed';
import Popup from './Popup';
import Auth from './Auth';
import NotFound from './NotFound';

const App = ({ data }) => {
    const dispatch = useDispatch();

    const state = useSelector((state) => state.photosReducer);

    useEffect(() => {
        
        const unsplash = createApi({ accessKey: 'LqbZvFH2hpBOzvKmfgC3uQWQgQ4Im8w3z4pFgRNMWVE' });

        unsplash.photos.list({ page: 1, perPage: 10 }).then(result => {
        switch (result.type) {
          case 'error':
            console.log('error occurred: ', result.errors[0]);
          case 'success':
            const photos = result.response.results;
            console.log(photos);
            dispatch(actions.getUser(data.author));

            const arr = [];
            for (let i = 0; i < photos.length; i++) {
                arr.push({
                    name: photos[i].user.name,
                    avatar: photos[i].user.profile_image.large,
                    date: photos[i].created_at,
                    likes: photos[i].likes,
                    liked: photos[i].liked_by_user,
                    url: photos[i].urls.regular,
                    fullUrl: photos[i].urls.raw,
                    description: photos[i].alt_description,
                    href: photos[i].user.links.html,
                    id: photos[i].id
                })
            }

            dispatch(actions.getPhotos(arr));
        }
      });

       
    }, []);

    return (
            <Routes>
                <Route path="*" element={<NotFound />} />
                
                <Route path='/' element={ <Layout user={ state.user } /> }>
                    <Route index element={ <Auth /> } />
                    <Route path='feed' element={ <Feed photos={ state.photos } data={ data } /> } />
                </Route>

                <Route path='feed/:id' element={ <Popup photoId={ state.currentPhoto }  /> } />
                
            </Routes>
    )
}

export default App;
