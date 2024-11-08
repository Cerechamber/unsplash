import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const client_id = 'LqbZvFH2hpBOzvKmfgC3uQWQgQ4Im8w3z4pFgRNMWVE';
    const redirect_uri = 'http://brutal.oblivionmachine.ru/feed';
    const scope = 'public+write_likes';
    return (
        <div className="auth">
            <button className="auth__btn"
             onClick={() =>
                //location.href = `https://unsplash.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`}>
               navigate('/feed')}>
                Авторизоваться
            </button>
        </div>
    )
}

export default Auth;