const convertDate = (date: string) => {
  const year = date.slice(0, 4);
  const mo = date.slice(5, 7);
  const day = date.slice(8, 10);
  const hours = date.slice(11, 13);
  const minutes = date.slice(14, 16);

  const currentDate = new Date();

  let daysPassed = currentDate.getDate() - +day;
  let hoursPassed = currentDate.getHours() - +hours;
  let minutesPassed = currentDate.getMinutes() - +minutes;

  let timePassed: string;

  if (daysPassed <= 0) {
    if (hoursPassed <= 0) {
      timePassed = `${minutesPassed}m`;
    } else {
      if (minutesPassed < 0) {
        if (hoursPassed === 1) {
          timePassed = `${60 + minutesPassed}m`;
        } else {
          timePassed = `${hoursPassed - 1}h ${60 + minutesPassed}m`;
        }
      } else if (minutesPassed === 0) {
        timePassed = `${hoursPassed}h`;
      } else {
        timePassed = `${hoursPassed}h ${minutesPassed}m`;
      }
    }
  } else {
    if (hoursPassed <= 0) {
      timePassed = `${daysPassed}d ${60 + minutesPassed}m`;
    } else {
      if (minutesPassed < 0) {
        if (hoursPassed === 1) {
          timePassed = `${daysPassed}d ${60 + minutesPassed}m`;
        } else {
          timePassed = `${daysPassed}d ${hoursPassed - 1}h ${
            60 + minutesPassed
          }m`;
        }
      } else if (minutesPassed === 0) {
        timePassed = `${daysPassed}d ${hoursPassed}h`;
      } else {
        timePassed = `${daysPassed}d ${hoursPassed}h ${minutesPassed}m`;
      }
    }
  }

  let hour = +hours;
  let amPm = 'AM';

  if (+hours > 12) {
    hour = +hours % 12;
    amPm = 'PM';
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const formattedDate = `${months[+mo]} ${day}, ${year}`;
  const formattedTime = `${hour}:${minutes} ${amPm}`;

  return {
    hour,
    minutes,
    day,
    month: months[+mo],
    year,
    formattedDate,
    formattedTime,
    timePassed
  };
};

export default convertDate;
