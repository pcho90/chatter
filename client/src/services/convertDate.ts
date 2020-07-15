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

  if (hoursPassed < 0) {
    hoursPassed += 24;
  }

  if (minutesPassed < 0) {
    minutesPassed += 60;
  }

  if (daysPassed <= 1) {
    if (hoursPassed === 0) {
      timePassed = `${minutesPassed}m`;
    } else {
      timePassed = `${hoursPassed}h`;
    }
  } else {
    timePassed = `${daysPassed - 1}d`;
  }

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
    timePassed
  };
};

export default convertDate;
