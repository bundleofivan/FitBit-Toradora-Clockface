import clock from "clock";
import document from "document";

import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
let myLabel = document.getElementById("myLabel");
let dayOfWeekLabel = document.getElementById("dayOfWeekLabel");
let dateLabel = document.getElementById("dateLabel");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var tick = 0;

// Update the <text> element with the current time
function updateClock() {
  let today = new Date();
  
  var hours = today.getHours() % 12;
  
  if (hours == 0) {
    hours = 12;
  }
  
  let mins = util.zeroPad(today.getMinutes());

  let dayOfWeek = today.getDay();

  let month = today.getMonth() + 1;
  let day = today.getDate();
  
  myLabel.text = `${hours}:${mins}`;
  dayOfWeekLabel.text = days[dayOfWeek];
  dateLabel.text = `${month}/${day}`;
  
  
}


// Update the clock every tick event
clock.ontick = () => updateClock();

// Next: update clock per second for colon
