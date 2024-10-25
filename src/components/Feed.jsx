/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Photo from './Photo';
import { actions } from "../reducers/photosReducer";

const Feed = ({ photos, data }) => {

    const feedRef = useRef();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(13);

    useEffect(() => {
        setQuantity(quantity + 6);
        if (photos.length) {
            const feedHeight = feedRef.current.scrollHeight;
            let loading = false;
            const lazyLoadPhotos = () => {
                if (feedHeight - 480 < window.scrollY && !loading && quantity <= data.photos.length) {
                   const img = document.createElement('img');
                   img.src = '../assets/images/spinner.gif';
                   img.classList.add('feed__spinner');
                   feedRef.current.append(img);
                   setTimeout(()=>{
                     dispatch(actions.getPhotos(data.photos.slice(0, quantity)));
                     img.remove();
                   },1000);

                   loading = true;
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