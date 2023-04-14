const checkRegExp = (roomInfo: { roomName: string; peopleNum: string }) => {
  const { roomName, peopleNum } = roomInfo;

  if (/^.{2,10}$/.test(roomName) && /^[2-5].{1}$/.test(peopleNum)) {
    return true;
  } else {
    return false;
  }
};

export default checkRegExp;
