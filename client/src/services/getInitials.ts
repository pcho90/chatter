export const getInitials = (name: string) => {
  const initialSplit = name.split(' ');
  let initials;
  if (initialSplit[1] && initialSplit[1][0]) {
    initials = initialSplit[0][0] + initialSplit[1][0];
  } else {
    initials = initialSplit[0][0];
  }

  return initials;
};
