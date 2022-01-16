import moment from "moment";

export const transformDateFormat = (date: Date | string) => {
  const momentDate = moment(date);

  if (!date || !momentDate) return date;

  const day = momentDate.date();
  const month = momentDate.month();
  const year = momentDate.year();

  if (day && year) return day + "/" + (month + 1) + "/" + year;
  return date;
};

export const transformDatetimeFormat = (date: Date | string) => {
  const momentDate = moment(date);

  if (!date || !momentDate) return date;

  const hour = momentDate.hour();
  const minute = momentDate.minutes();
  const day = momentDate.date();
  const month = momentDate.month();
  const year = momentDate.year();

  if (day && year)
    return hour + ":" + minute + " " + day + "/" + (month + 1) + "/" + year;
  return date;
};
