import clock from "clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";

import * as util from "../common/utils";


// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
let myLabel = document.getElementById("myLabel");
let dayOfWeekLabel = document.getElementById("dayOfWeekLabel");
let dateLabel = document.getElementById("dateLabel");
let heartRateLabel = document.getElementById("heartRateLabel");
heartRateLabel.text = "--";

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Create a new instance of the HeartRateSensor object

// Begin monitoring the sensor


var tick = 0;

// Update the <text> element with the current time
function updateClock() {

  let today = new Date();
  
  var hours = today.getHours() % 12;
  
  if (hours == 0) {
    hours = 12;
  }
  
  let mins = util.zeroPad(today.getMinutes());
  let seconds = util.zeroPad(today.getSeconds());

  let dayOfWeek = today.getDay();

  let month = today.getMonth() + 1;
  let day = today.getDate();
  
  myLabel.text = `${hours}:${mins}:${seconds}`;

  dayOfWeekLabel.text = days[dayOfWeek];
  dateLabel.text = `${month}/${day}`;
  
}


// Update the clock every tick event
clock.ontick = () => updateClock();

var hrm = new HeartRateSensor();

hrm.onreading = function() {

  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  heartRateLabel.text = hrm.heartRate + " bpm";
  // Stop monitoring the sensor
  hrm.stop();
}

// updates heart rate every 2 seconds
setInterval(updateHeartRate, 2000);

function updateHeartRate() {
  hrm.start();
}

