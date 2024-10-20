import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    return (
        <div className="auth">
            <button className="auth__btn" onClick={() => navigate('/feed', {replace: false})}>Авторизоваться</button>
        </div>
    )
}

export default Auth;