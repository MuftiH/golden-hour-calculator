import SunCalc from "suncalc";
import "./index.css";

//declare function which creates a promise using geolocation API
const getPosition = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      // On Success
      position => {
        //Values that will be resolved by the promise, latitude and
        // latitude in an object
        let coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        // return coordinates;

        resolve(coordinates);
      },

      // On Error
      error => {
        reject(error);
      },

      options
    );
  });
};

//Note to self: make sure its not the precise location later
getPosition({ maximumAge: 5 * 60 * 1000, timeout: 5000 })
  // Position right here should be an object with latitude
  //and longitude of the user, the function handles this position
  .then(position => {
    const morningTimes = document.querySelector(".morning");
    const nightTimes = document.querySelector(".night");

    let today = new Date();

    //Get SunCalc times from today's date
    let times = findTimes(today, position.latitude, position.longitude);

    //Object which has raw dates and time for each sun position
    let timesObject = {
      sunriseEndData: times.sunriseEnd,
      goldenHourEndData: times.goldenHourEnd,
      goldenHourData: times.goldenHour,
      sunsetStartData: times.sunsetStart
    };

    //Map date object to an array of values
    const timesObjectArray = Object.keys(timesObject).map(
      key => timesObject[key]
    );

    //Format and map each date from
    //timesObjectArray using formatAMPM function
    const timesArray = timesObjectArray.map(formatAMPM);

    //  timesArray.forEach(displayTimes)

    //Slice array into morning times and night times
    let morningArray = timesArray.slice(0, 2);
    let nightArray = timesArray.slice(2, 4);

    //Display morning times
    morningArray.forEach(displayTimesMorning);

    //Dispaly night times
    nightArray.forEach(displayTimesNight);
  })

  .catch(err => {
    console.error(err.message);
  });

// let today = new Date();

//Function that returns SunCalc sunlight times for given parameters
let findTimes = (date, latitude, longitude) => {
  return SunCalc.getTimes(date, latitude, longitude);
};

//Functions which formats time into 12 hour and AM/PM
const formatAMPM = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

//Function which creates and displays html element given
//text and parent element to be displayed under
const displayTimesMorning = text => {
  let parent = document.querySelector(".morning");
  let element = document.createElement("h2");
  let elementText = document.createTextNode(text);
  element.appendChild(elementText);
  parent.appendChild(element);
};

const displayTimesNight = text => {
  let parent = document.querySelector(".night");
  let element = document.createElement("h2");
  let elementText = document.createTextNode(text);
  element.appendChild(elementText);
  parent.appendChild(element);
};
