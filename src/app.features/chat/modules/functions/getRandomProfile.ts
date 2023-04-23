import { PROFIL_LIST } from '../constants';

const getRandomProfile = () => {
  const index = Math.floor(Math.random() * PROFIL_LIST.length);

  return PROFIL_LIST[index];
};

export default getRandomProfile;
