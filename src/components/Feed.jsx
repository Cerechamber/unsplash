import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Photo from './Photo';
import { actions } from "../reducers/photosReducer";

const Feed = ({ photos }) => {
    const dispatch = useDispatch();
    return (
       <section id="feed" className="feed">
        <div className="container">
            <h1 className="feed__title">Photo Feed</h1>
            <div className="feed__wrapper">
                {photos.map(photo => (
                    <Photo key={ photo.id } item={ photo } checkPhoto={ actions.checkPhoto } currentPhoto={ actions.getCurrentPhoto } dispatch={ dispatch }  />
                ))}
            </div>
        </div>
       </section>
    )
}

export default Feed;