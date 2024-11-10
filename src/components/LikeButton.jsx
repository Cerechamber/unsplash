/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../reducers/photosReducer';
import { actionPhoto } from '../unsplash';
import heart from '../../assets/images/heart.png';

const LikeButton = ({ id, liked }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('unsplash-token');

  const handleClickHeart = async (id) => {
    const doneLike = await actionPhoto(id.split('--')[0], token);
    console.log(doneLike);
    doneLike
      ? dispatch(actions.checkPhoto(id))
      : console.log('Не удалось совершить действие');
  };

  return (
    <button
      className='feed__like photo-container'
      onClick={() => handleClickHeart(id)}
    >
      <img src={heart} alt='heart' className={!liked ? 'getTransp' : null} />
    </button>
  );
};

export default LikeButton;
