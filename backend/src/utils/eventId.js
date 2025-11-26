const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
function genEventId(date = new Date()){
  const m = MONTHS[date.getMonth()];
  const y = date.getFullYear();
  const random3 = Math.random().toString(36).substring(2,5).toUpperCase();
  return `EVT-${m}${y}-${random3}`;
}
module.exports = genEventId;
