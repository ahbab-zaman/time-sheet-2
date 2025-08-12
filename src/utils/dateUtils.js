// const isWeekend =(date)=> {
//   const day = date.getDay();
//   return day === 0 || day === 6; // Sunday = 0, Saturday = 6
// }

// module.exports = isWeekend;

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday=0, Saturday=6
}

module.exports = {
  isWeekend,
};