import moment from 'moment';

export const transformDateFormat = (date: Date | string) => {
  const momentDate = moment(date);

  if (!date || !momentDate) return date;

  const day = momentDate.date();
  const month = momentDate.month();
  const year = momentDate.year();

  if (day && month && year) return day + '/' + month + '/' + year;
  return date;
};
