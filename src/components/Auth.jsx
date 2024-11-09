import React from "react";
import { useNavigate } from "react-router-dom";
import { unsplashParams } from "../unsplash";

const Auth = () => {
    const navigate = useNavigate();
    const unsplashToken = localStorage.getItem('unsplash-token');
    if (unsplashToken) {
        navigate('/feed', { replace: true });
    }
    let url = 'https://unsplash.com/oauth/authorize?';
    url += `client_id=${unsplashParams.client_id}`;
    url += `&redirect_uri=${unsplashParams.redirect_uri}`;
    url += `&response_type=code&scope=${unsplashParams.scope}`;

    return (
        <>
        {!unsplashToken ? 
        <div className="auth">
            <button className="auth__btn"
             onClick={() =>
                location.href = url}>
                Авторизоваться
            </button>
        </div> :
        null
        }
        </>
    )
}

export default Auth;