/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Photo from './Photo';
import { actions } from "../reducers/photosReducer";
import photoLoader from '../unsplash.js';
import spinner from '../../assets/images/spinner.gif';

const Feed = () => {

    const feedRef = useRef();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.photosReducer);
    const { photos } = state;
    
    useEffect(() => {
        const { page } = state;

        const loadAndSpinner = () => {
            const img = document.createElement('img');
            img.src = spinner;
            img.classList.add('feed__spinner');
            feedRef.current.append(img);
            setTimeout(() => {
            getPhoto();
            img.remove();
          }, 1000);
        }

        const getPhoto = async () => {
            const data = await photoLoader(page);
            dispatch(actions.getPhotos(data));
        }

        if (!photos.length) {
            loadAndSpinner();
        }

        if (photos.length) {
            const feedHeight = feedRef.current.scrollHeight;
            let loading = false;
            const lazyLoadPhotos = () => {
                if (feedHeight - 480 < window.scrollY && !loading) {
                   loading = true;
                   loadAndSpinner();
                }
            }
            window.addEventListener('scroll', lazyLoadPhotos, true);
            return () => {
                window.removeEventListener('scroll', lazyLoadPhotos, true);
            }
        }
    
    },[photos.length]);
    

    return (
       <section className="feed" ref={feedRef}>
        <div className="container">
            <h1 className="feed__title">Photo Feed</h1>
            <div className="feed__wrapper">
                {photos.map((photo) => {
                        return (
                            <Photo key={ photo.id }
                                item={ photo } 
                                checkPhoto={ actions.checkPhoto } 
                                currentPhoto={ actions.getCurrentPhoto } 
                                dispatch={ dispatch }
                            />
                        )
                } )}
            </div>
        </div>
       </section>
    )
}

export default Feed;