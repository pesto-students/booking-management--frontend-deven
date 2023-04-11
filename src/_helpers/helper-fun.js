export const parseDate = (date, time = true) => {
  return  time ? new Date(date).toLocaleString() : new Date(date).toLocaleDateString();
};
export const parseBoolean = (val) => {
  // console.log({ val });
  return val === "false" ? false : true;
};
