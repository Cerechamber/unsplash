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
               <a href={ item.href } target="_blank" rel="nofollow noreferrer">{ item.name }</a>
            </div>
            <div className="feed__date">{ item.date }</div>
         </div>
      </div>
      <div className="feed__right">
        <Link to={`/feed/${item.id}`} className="feed__photo photo-container" onClick={() => dispatch(currentPhoto(item.id))}>
            <img src={ item.url } alt={ item.name } />
        </Link>
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