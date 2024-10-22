import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Photo from './Photo';
import { actions } from "../reducers/photosReducer";

const Feed = ({ photos }) => {

    useEffect(() => {
        if (photos.length) {
        window.addEventListener('scroll', () => {
            
                const feedHeight = document.getElementById('feed').scrollHeight;
                if (feedHeight - 300 < window.scrollY) {
                    alert(111);
                }
           
        });
    }
    },[photos.length]);

    

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(10);

    return (
       <section id="feed" className="feed">
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