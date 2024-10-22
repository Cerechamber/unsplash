import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../reducers/photosReducer";

const Popup = ({ photoId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentPhoto = useSelector(state => {
        const popupPhoto = state.photosReducer.photos.find(({ id }) => id === photoId);
        return popupPhoto;
    });

    const closePopup = (ev) => {
        if (!ev.target.closest('.popup__self') || ev.target.classList.contains('.popup__close')) {
            navigate(-1);
        }
    }

    return (
        <div className="popup" onClick={ closePopup }>
        <div className="popup__close" title="Закрыть">X</div>
   <div className="popup__self">
      <div className="popup__flex">
         <div className="popup__img photo-container">
            <img src={'/' + currentPhoto.url } alt={ currentPhoto.name } />
         </div>
         <div className="popup__author">
            <div className="popup__author-img photo-container">
               <img src={'/' + currentPhoto.avatar } alt="avatar" />
            </div>
            <div className="popup__texts">
               <div className="popup__texts1">
            <div className="popup__author-link">
               <a href={ currentPhoto.href } target="_blank" rel="nofollow">{ currentPhoto.name }</a>
            </div>
            <div className="popup__date">{ currentPhoto.date }</div>
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
               <img src="../assets/images/heart.png" alt="heart"
                className={ !currentPhoto.liked ? 'getTransp' : null }
               />
            </button>
            <div className="popup__likes-q">{ currentPhoto.likes }</div>
         </div>
      </div>
   </div>
</div>
    )
}

export default Popup;