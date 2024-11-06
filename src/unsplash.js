import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: 'LqbZvFH2hpBOzvKmfgC3uQWQgQ4Im8w3z4pFgRNMWVE' });

export const userLoader = (name) => {
  return unsplash.users.get({ username: name }).then(result => {
    switch (result.type) {
        case 'error':
          console.log('error occurred: ', result.errors[0]);
          return false;
        case 'success':
          const user = result.response;
          return {
            name: user.name,
            place: user.location,
            photos: user.total_photos,
            likes: user.total_likes,
            avatar: user.profile_image.large,
            description: user.bio
          }
      }
  });
}

const photoLoader = (page) => {
        return unsplash.photos.list({ page: page, perPage: 30 }).then(result => {
            switch (result.type) {
              case 'error':
                console.log('error occurred: ', result.errors[0]);
                return false;
              case 'success':
                const photos = result.response.results;
                console.log(photos);
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
                return arr;
            }
          });
}

export default photoLoader;