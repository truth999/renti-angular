import { Injectable } from '@angular/core';

@Injectable()
export class DateSelectService {

  constructor() { }

  getDays(maxDay = 31) {
    const days = [];

    for (let day = 1; day <= maxDay; day++) {
      let fullday = day.toString();

      if (day < 10) {
        fullday = '0' + fullday;
      }

      days.push(fullday);
    }

    return days;
  }

  getMonths() {
    const months = [];

    for (let month = 1; month <= 12; month++) {
      let fullmonth = month.toString();

      if (month < 10) {
        fullmonth = '0' + fullmonth;
      }

      months.push(fullmonth);
    }

    return months;
  }

  getYears() {
    const years = [];
    const now = new Date();
    const minYear = now.getFullYear() - 100;
    const maxYear = now.getFullYear();

    for (let year = maxYear; year >= minYear; year--) {
      years.push(year);
    }

    return years;
  }
}
