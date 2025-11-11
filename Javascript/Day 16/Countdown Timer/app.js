// setInterval(() => {
//   let presentDate = new Date();
//   let targetDate = new Date(2026, 2, 4, 0, 0, 0, 0);
//   let timeDifference = targetDate - presentDate;

//   let year = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30 * 12));
//   document.getElementById("year").textContent = year;

//   let month = Math.floor((timeDifference / (1000 * 60 * 60 * 24 * 30)) % 12);
//   document.getElementById("month").textContent = month;

//   let day = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 30);
//   document.getElementById("day").textContent = day;

//   let hour = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
//   document.getElementById("hour").textContent = hour;

//   let minute = Math.floor((timeDifference / (1000 * 60)) % 60);
//   document.getElementById("minute").textContent = minute;

//   let second = Math.floor((timeDifference / 1000) % 60);
//   document.getElementById("second").textContent = second;

//   let millisecond = Math.floor(timeDifference % 1000);
//   document.getElementById("millisecond").textContent = millisecond;
// }, 1);

// 4 March 2026

setInterval(() => {
  const startDate = new Date();
  const endDate = new Date(2028, 6, 14);
  let ansObj = calculateTimeDifference(startDate, endDate);
  document.getElementById("year").textContent = ansObj.years;
  document.getElementById("month").textContent = ansObj.months;
  document.getElementById("day").textContent = ansObj.days;
  document.getElementById("hour").textContent = ansObj.hours;
  document.getElementById("minute").textContent = ansObj.minutes;
  document.getElementById("second").textContent = ansObj.seconds;
  document.getElementById("millisecond").textContent = ansObj.milliseconds;

  function calculateTimeDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();
    let milliseconds = end.getMilliseconds() - start.getMilliseconds();

    // Handle negative values by borrowing from higher units
    if (milliseconds < 0) {
      milliseconds += 1000;
      seconds--;
    }
    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds, milliseconds };
  }
}, 1);
