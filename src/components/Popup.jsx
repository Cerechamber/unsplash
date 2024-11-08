/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../reducers/photosReducer";
import heart from '../../assets/images/heart.png';

const Popup = ({ photoId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popup = useRef();

    const currentPhoto = useSelector(state => {
        const popupPhoto = state.photosReducer.photos.find(({ id }) => id === photoId);
        return popupPhoto;
    });

    const closePopup = (ev) => {
        if (!ev.target.closest('.popup__self') || ev.target.classList.contains('.popup__close')) {
           popup.current.classList.add('fadeOut');
           setTimeout(()=>{
            navigate(-1, { replace: true });
           },100);
        }
    }

    return (
      <>
      { photoId ?
        <div className="popup" onClick={ closePopup  } ref={popup}>
        <div className="popup__close" title="Закрыть">X</div>
   <div className="popup__self" >
      <div className="popup__flex">
         <div className="popup__img photo-container">
            <img src={ currentPhoto.fullUrl } alt={ currentPhoto.name } />
            <a href={ currentPhoto.url } target="_blank" rel="nofollow noreferrer" className="popup__originalUrl">Original photo</a>
         </div>
         <div className="popup__author">
            <div className="popup__author-img photo-container">
               <img src={ currentPhoto.avatar } alt="avatar" />
            </div>
            <div className="popup__texts">
               <div className="popup__texts1">
            <div className="popup__author-link">
            Photo by
            <div>
            <a href={ currentPhoto.href + '?utm_source=react_photo_app&utm_medium=referral'}
             target="_blank" rel="nofollow noreferrer">{ currentPhoto.name }</a>
             </div>
             <div>
             on <a href="https://unsplash.com/?utm_source=react_photo_app&utm_medium=referral"
             target="_blank" rel="nofollow noreferrer">Unsplash</a>
             </div>
            </div>
            <div className="popup__date">{ currentPhoto.date.split('T')[0] }</div>
         </div>
            { currentPhoto.description ?
            <p className="popup__descr">{ currentPhoto.description }</p> : null
            }
            
            </div>
         </div>
      </div>
      <div className="popup__bottom">
         <div className="popup__likes">
            <button className="popup__unlike photo-container" onClick={() => dispatch(actions.checkPhoto(currentPhoto.id))}>
               <img src={ heart } alt="heart"
                className={ !currentPhoto.liked ? 'getTransp' : null }
               />
            </button>
            <div className="popup__likes-q">{ currentPhoto.likes }</div>
         </div>
      </div>
   </div>
</div> : 
   navigate('/feed', {replace: true})   }
</>
    )
}

export default Popup;