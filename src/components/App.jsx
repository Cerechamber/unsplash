import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const unsplashToken = localStorage.getItem('unsplash-token');

  useEffect(() => {
    if (unsplashToken) {
      const name = localStorage.getItem('unsplash-user');
      const getUser = async () => {
        const user = await userLoader(name);
        dispatch(actions.getUser(user));
      };
      getUser();
    }
  }, [unsplashToken]);

  return (
    <Routes>
      <Route path='/' element={<Layout user={state.user} />}>
        <Route index element={<Auth token={unsplashToken} />} />
        <Route path='feed' element={<Feed token={unsplashToken} />} />
        <Route
          path='feed/:id'
          element={<Popup photoId={state.currentPhoto} />}
        />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
