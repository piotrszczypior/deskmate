import moment from 'moment/moment';


export const getTimeFromDate = (date: Date): string => {
  return moment(date).format('hh:mm');
}

export const getDateFromDate = (date: Date): string => {
  return moment(date).format('DD/MM/YYYY');
}
