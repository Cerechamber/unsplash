/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Photo from './Photo';
import { actions } from "../reducers/photosReducer";

const Feed = ({ photos }) => {

    const feedRef = useRef();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(10);

    useEffect(() => {
        if (photos.length) {
            const feedHeight = feedRef.current.scrollHeight;
            let loading = false;
            const lazyLoadPhotos = () => {
                if (feedHeight - 480 < window.scrollY && !loading) {
                   console.log('yes');
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
                {photos.map((photo, i) => {
                    if (i < quantity) {
                        return (
                            <Photo key={ photo.id }
                                item={ photo } 
                                checkPhoto={ actions.checkPhoto } 
                                currentPhoto={ actions.getCurrentPhoto } 
                                dispatch={ dispatch }
                            />
                        )
                    }
                } )}
            </div>
        </div>
        <img src="../assets/images/spinner.gif" alt="spinner" className="feed__spinner" />
       </section>
    )
}

export default Feed;