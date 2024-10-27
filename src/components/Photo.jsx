/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import heart from '../../assets/images/heart.png';

const Photo = ({ item, checkPhoto, currentPhoto, dispatch }) => {

      return (
        <div className="feed__card">
      <div className="feed__left">
         <div className="feed__avatar photo-container">
            <img src={ item.avatar } alt="avatar" />
         </div>
         <div className="feed__texts">
            <div className="feed__author">
            Photo by
            <div>
            <a href="https://unsplash.com/@anniespratt?utm_source=react_photo_app&utm_medium=referral"
             target="_blank" rel="nofollow noreferrer">Annie Spratt</a>
             </div>
             <div>
             on <br /> <a href="https://unsplash.com/?utm_source=react_photo_app&utm_medium=referral"
             target="_blank" rel="nofollow noreferrer">Unsplash</a>
             </div>
            </div>
            <div className="feed__date">{ item.date }</div>
         </div>
      </div>
      <div className="feed__right">
        <Link to={`/feed/${item.id}`} className="feed__photo photo-container" onClick={() => dispatch(currentPhoto(item.id))}>
            <img src={ item.url } alt={ item.name } />
        </Link>
        <a href={ item.url } target="_blank" rel="nofollow noreferrer" className="feed__originalUrl">Original photo</a>
         <div className="feed__likes">
            <button className="feed__like photo-container" onClick={() => dispatch(checkPhoto(item.id))}>
               <img src={ heart } alt="heart"
                className={ !item.liked ? 'getTransp' : null } 
               />
            </button>
            <div className="feed__likes-q">{ item.likes }</div>
         </div>
      </div>
   </div>
    )
}

export default Photo;