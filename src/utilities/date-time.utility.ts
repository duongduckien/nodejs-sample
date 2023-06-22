import moment from 'moment';

export default class DateTimeUtility {
  static getCurrentTimeStamp() {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }
}
