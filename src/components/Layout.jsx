/* eslint-disable react/prop-types */
import React from 'react';
import { Outlet } from 'react-router-dom';
import back from '../../assets/images/head.jpg';

const Layout = ({ user }) => {
  const logOut = () => {
    localStorage.removeItem('unsplash-token');
    localStorage.removeItem('unsplash-user');
    location.href = '/';
  };
  return (
    <>
      <header className='header'>
        <img src={back} alt='background' className='background' />
        <div className='container'>
          <div className='header__flex'>
            <div className='header__auth'>
              <div className='header__auth-photo photo-container'>
                <img src={user.avatar} alt='photo user' />
              </div>
              <div className='header__texts'>
                {user.name ? (
                  <div className='header__auth-text header__auth-name'>
                    {user.name}
                  </div>
                ) : null}

                {user.place ? (
                  <div className='header__auth-text header__auth-mail'>
                    {user.place}
                  </div>
                ) : null}

                {user.photos ? (
                  <div className='header__auth-text header__auth-photos'>
                    Photos: {user.photos}
                  </div>
                ) : null}

                {user.likes ? (
                  <div className='header__auth-text header__auth-likes'>
                    Likes: {user.likes}
                  </div>
                ) : null}
              </div>
            </div>

            <div className='header__auth header__auth-center'>
              <p className='header__auth-text'>This is Oblivion App</p>
              <p className='header__auth-text'>Used some Api</p>
              <p className='header__auth-text'>watch and like</p>
            </div>

            <div className='header__auth'>
              {user.description ? (
                <p className='header__auth-text header__auth-bio'>
                  {user.description}
                </p>
              ) : null}

              {user.name ? (
                <button className='header__auth-out' onClick={logOut}>
                  Разлогиниться
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className='footer'>
        <img src={back} alt='background' className='background' />
        <div className='container'>
          <p className='footer__links'>
            By the way, check out Oblivion Machine music on&nbsp;
            <a
              href='http://oblivionmachine.ru/'
              target='_blank'
              rel='nofollow noreferrer'
            >
              our official website!
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
