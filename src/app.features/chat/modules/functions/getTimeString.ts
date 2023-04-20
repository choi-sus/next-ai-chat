const getTimeString = () => {
  const isCreated = new Date();
  const hour = new Date(isCreated).getHours();
  const minute = new Date(isCreated).getMinutes();
  const hourValue = hour < 10 ? `0${hour}` : hour;
  const minuteValue = minute < 10 ? `0${minute}` : minute;
  const ampm = hour < 12 ? 'am' : 'pm';
  const timeValue = `${hourValue}:${minuteValue} ${ampm}`;

  return timeValue;
};

export default getTimeString;
