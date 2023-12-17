const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

export const DateUtils = {
  format(date: string, format: string) {
    const year: string = date.length >= 3 ? date.substring(0, 4) : '';
    const month: string = date.length >= 7 ? date.substring(5, 7) : '';
    const day: string = date.length >= 10 ? date.substring(8, 10) : '';
    const hour: string = date.length >= 13 ? date.substring(11, 13) : '';
    const minute: string = date.length >= 16 ? date.substring(14, 16) : '';
    const second: string = date.length >= 19 ? date.substring(17, 19) : '';

    let dateFormat: string = format;
    dateFormat = dateFormat.replace('YYYY', year);
    dateFormat = dateFormat.replace('MMM', MONTHS[parseInt(month) - 1]);
    dateFormat = dateFormat.replace('MM', month);
    dateFormat = dateFormat.replace('DD', day);
    dateFormat = dateFormat.replace('hh', hour);
    dateFormat = dateFormat.replace('mm', minute);
    dateFormat = dateFormat.replace('ss', second);

    return dateFormat;
  },
};
