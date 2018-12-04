import SunCalc from "suncalc";
import "./index.css";
//window.onload = goldenTimes.startingTime();

// const goldenTimes = {
//   startingTime: () => {
//     let times = SunCalc.getTimes(new Date(), 47.6, 122.3);
//     let goldenHourStr =
//       times.goldenHour.getHours() + ":" + times.goldenHour.getMinutes();
//   }
// };

function startGold(latitude, longitude) {
  let newElement = document.createElement("h1");
  let today = new Date();
  console.log(SunCalc.getTimes(today, 47.6062, 122.3321));
  console.log(SunCalc.times.goldenHourEnd, SunCalc.times.goldenHour);
  // let goldenHourString = document.createTextNode(times);

  // newElement.appendChild(goldenHourString);
  // document.body.appendChild(newElement);
}

startGold(47.6062, 122.3321);
//sunriseEnd --> goldenHourEnd  for morning, convert from 24 hour gmt to 12 hour pst
//goldenHour --> sunsetStart for evening, convert from 24 hour gmt to 12 hour pst
