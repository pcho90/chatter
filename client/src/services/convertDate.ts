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

  if (daysPassed <= 1 && hoursPassed < 0) {
    if (hoursPassed === 0) {
      timePassed = `${minutesPassed + 60}m`;
    } else {
      timePassed = `${hoursPassed + 24}h`;
    }
  } else {
    timePassed = `${daysPassed}d`;
  }

  let secondsPassed =
    daysPassed * 86400 + hoursPassed * 3600 + minutesPassed * 60;

  let hour = +hours;
  let amPm = 'AM';

  if (+hours > 12) {
    hour = +hours % 12;
    amPm = 'PM';
  } else if (hour === 0) {
    hour = 12;
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

  const formattedDate = `${months[+mo - 1]} ${day}, ${year}`;
  const formattedTime = `${hour}:${minutes} ${amPm}`;

  return {
    hour,
    minutes,
    day,
    month: months[+mo - 1],
    year,
    formattedDate,
    formattedTime,
    timePassed,
    secondsPassed
  };
};

export default convertDate;
