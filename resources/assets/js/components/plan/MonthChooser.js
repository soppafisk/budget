import React from 'react'
import { Link } from 'react-router'

const MonthChooser = (props) => {
  let { planId, year, month } = props.params;

  const months = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December'
  ];

  month = parseInt(month);

  var prevMonth = {
    month: month - 1,
    year: year,
  }
  var nextMonth = {
    month: month + 1,
    year: year,
  };

  if (month === 12) {
    nextMonth.year = parseInt(year) + 1;
    nextMonth.month = 1;
  } else if (month === 1) {
    prevMonth.year = parseInt(year) - 1;
    prevMonth.month = 12;
  }

  const currentMonth = months[month-1];

  let prevMonthUrl = `/plan/${planId}/y/${prevMonth.year}/m/${prevMonth.month}`;
  let nextMonthUrl = `/plan/${planId}/y/${nextMonth.year}/m/${nextMonth.month}`;

  return (
      <div className="col-xs-6">
        <div className="month-chooser row">
          <div className="col-xs-2">
            <Link to={prevMonthUrl}><i className="fa fa-angle-double-left" aria-hidden="true"></i></Link>
          </div>
          <div className="col-xs-8 text-center">
              { currentMonth }
          </div>
          <div className="col-xs-2 text-right">
            <Link to={nextMonthUrl}><i className="fa fa-angle-double-right" aria-hidden="true"></i></Link>
          </div>
        </div>
      </div>

  );
}

export default MonthChooser
