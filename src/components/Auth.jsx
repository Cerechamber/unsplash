import React from "react";
import { unsplashParams } from "../unsplash";

const Auth = () => {
    let url = 'https://unsplash.com/oauth/authorize?';
    url += `client_id=${unsplashParams.client_id}`;
    url += `&redirect_uri=${unsplashParams.redirect_uri}`;
    url += `&response_type=code&scope=${unsplashParams.scope}`;
    return (
        <div className="auth">
            <button className="auth__btn"
             onClick={() =>
                location.href = url}>
                Авторизоваться
            </button>
        </div>
    )
}

export default Auth;