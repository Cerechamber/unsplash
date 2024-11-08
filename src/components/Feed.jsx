/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Photo from './Photo';
import { actions } from "../reducers/photosReducer";
import photoLoader from '../unsplash.js';
import spinner from '../../assets/images/spinner.gif';

const Feed = () => {

    const feedRef = useRef();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.photosReducer);
    const { photos } = state;
    const { auth } = state;
/*
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

        const code = searchParams.get('code');
        if (code) {
            setSearchParams({});

            axios.post('https://unsplash.com/oauth/token', null, { params: {
                client_id: 'LqbZvFH2hpBOzvKmfgC3uQWQgQ4Im8w3z4pFgRNMWVE',
                client_secret: 'TwP_hMa5BCc-zf6YqJra09QfB9p5Ke9mmxa8YQn-5Fk',
                redirect_uri: 'http://brutal.oblivionmachine.ru/feed',
                code: code,
                grant_type: 'authorization_code'
              }})
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        } else {
            console.log('Аутентификация провалилась');
        }
        
    },[]);
    */
    
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

/*
const url = `https://api.unsplash.com/photos/${image.id}/like`;
            axios.post(url, {
                headers: {
                    Authorization: "Client-ID my_client_id_here"
                }
            }).then(photo => {
                console.log('like photo')
            }).catch(error => {
                console.error(error)
            })
*/