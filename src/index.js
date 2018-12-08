import SunCalc from "suncalc";
import "./index.css";
import moment from "moment";
import "moment-timezone";
//window.onload = goldenTimes.startingTime();

let today = new Date();
let times = SunCalc.getTimes(today, 47.6062, 122.3321);

//sunriseEnd --> goldenHourEnd  for morning, convert from 24 hour gmt to 12 hour pst
//goldenHour --> sunsetStart for evening, convert from 24 hour gmt to 12 hour pst

let morningStartRaw = String(times.sunriseEnd);
let morningEndRaw = String(times.goldenHourEnd);
let eveningStartRaw = String(times.goldenHour);
let eveningEndRaw = String(times.sunsetStart);

let morningStart = moment
  .tz(morningStartRaw, "America/Los_Angeles")
  .format("h:mm a");

let morningEnd = moment
  .tz(morningEndRaw, "America/Los_Angeles")
  .format("h:mm a");

let eveningStart = moment
  .tz(eveningStartRaw, "America/Los_Angeles")
  .format("h:mm a");

let eveningEnd = moment
  .tz(eveningEndRaw, "America/Los_Angeles")
  .format("h:mm a");

console.log(morningStart, 1);
console.log(morningEnd, 2);
console.log(eveningStart, 3);
console.log(eveningEnd, 4);

let myDiv = document.querySelector("div");

function makeStartElement() {
  let startH = document.createElement("h1");
  let text = document.createTextNode(morningStart);
  startH.appendChild(text);
  myDiv.appendChild(startH);
}

function makeEndElement() {
  let endH = document.createElement("h1");
  let text = document.createTextNode(morningEnd);
  endH.appendChild(text);
  myDiv.appendChild(endH);
}

function makeEveElement() {
  let eveH = document.createElement("h1");
  let text = document.createTextNode(eveningStart);
  eveH.appendChild(text);
  myDiv.appendChild(eveH);
}

function makeEveEnd() {
  let eveEnd = document.createElement("h1");
  let text = document.createTextNode(eveningEnd);
  eveEnd.appendChild(text);
  myDiv.appendChild(eveEnd);
}

makeStartElement();
makeEndElement();
makeEveElement();
makeEveEnd();
