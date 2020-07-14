const convertDate = (date: string) => {
  const year = date.slice(0, 4);
  const mo = date.slice(5, 7);
  const day = date.slice(8, 10);
  const hours = date.slice(11, 13);
  const minutes = date.slice(14, 16);

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
    formattedTime
  };
};

export default convertDate;
