import PROFILS from '../constants/profiles';

const getRandomProfile = () => {
  const index = Math.floor(Math.random() * PROFILS.length);

  return PROFILS[index];
};

export default getRandomProfile;
