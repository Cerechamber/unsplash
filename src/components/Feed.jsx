/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Photo from './Photo';
import { actions } from '../reducers/photosReducer';
import { authUser } from '../unsplash';
import photoLoader from '../unsplash';
import spinner from '../../assets/images/spinner.gif';

const Feed = ({ token }) => {
  const feedRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.photosReducer);
  const { page } = state;
  const { photos } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const code = searchParams.get('code');
      if (code && !photos.length) {
        setSearchParams({});
        const fetchUser = async () => {
          const res = await authUser(code);
          if (res) {
            localStorage.setItem('unsplash-token', res.data.access_token);
            localStorage.setItem('unsplash-user', res.data.username);
          }
        };
        fetchUser();
      } else if (!photos.length) {
        navigate('/', { replace: true });
      }
    }

    const getPhoto = async () => {
      const img = document.createElement('img');
      img.src = spinner;
      img.classList.add('feed__spinner');
      feedRef.current.append(img);
      const data = await photoLoader(page, img);
      dispatch(actions.getPhotos(data));
    };

    if (!photos.length) {
      getPhoto();
    }

    if (photos.length) {
      const feedHeight = feedRef.current.scrollHeight;
      let loading = false;
      const lazyLoadPhotos = () => {
        if (feedHeight - 480 < window.scrollY && !loading) {
          loading = true;
          getPhoto();
        }
      };
      window.addEventListener('scroll', lazyLoadPhotos, true);
      return () => {
        window.removeEventListener('scroll', lazyLoadPhotos, true);
      };
    }
  }, [photos.length]);

  return (
    <section className='feed' ref={feedRef}>
      <div className='container'>
        <h1 className='feed__title'>Photo Feed</h1>
        <div className='feed__wrapper'>
          {photos.map((photo) => {
            return (
              <Photo
                key={photo.id}
                item={photo}
                currentPhoto={actions.getCurrentPhoto}
                dispatch={dispatch}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Feed;
