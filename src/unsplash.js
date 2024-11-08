import { createApi } from 'unsplash-js';

export const unsplashParams = {
  client_id: 'LqbZvFH2hpBOzvKmfgC3uQWQgQ4Im8w3z4pFgRNMWVE',
  client_secret: 'TwP_hMa5BCc-zf6YqJra09QfB9p5Ke9mmxa8YQn-5Fk',
  redirect_uri: 'http://brutal.oblivionmachine.ru/feed',
  grant_type: 'authorization_code',
  scope: 'public+write_likes'
}

const unsplashLoader = (key, name, page) => {
 
  if (!key) return;
  
  const unsplash = createApi({ accessKey: key });
  const unsplashData = {};
  
      unsplash.users.get({ username: name }).then(result => {
      switch (result.type) {
          case 'error':
            console.log('error occurred: ', result.errors[0]);
            return false;
          case 'success':
            const user = result.response;
            unsplashData[user] = {
              name: user.name,
              place: user.location,
              photos: user.total_photos,
              likes: user.total_likes,
              avatar: user.profile_image.large,
              description: user.bio
            }
        }
    });

      unsplash.photos.list({ page: page, perPage: 30 }).then(result => {
      switch (result.type) {
        case 'error':
          console.log('error occurred: ', result.errors[0]);
          return false;
        case 'success':
          const photos = result.response.results;
          const arr = [];
          for (let i = 0; i < photos.length; i++) {
              arr.push({
                  name: photos[i].user.name,
                  avatar: photos[i].user.profile_image.large,
                  date: photos[i].created_at,
                  likes: photos[i].likes,
                  liked: photos[i].liked_by_user,
                  url: photos[i].urls.regular,
                  fullUrl: photos[i].urls.raw,
                  description: photos[i].alt_description,
                  href: photos[i].user.links.html,
                  id: photos[i].id + page
              })
          }
          unsplashData[photos] = arr;
      }
    });

    return unsplashData;


}


export default unsplashLoader;