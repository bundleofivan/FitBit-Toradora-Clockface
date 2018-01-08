'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var clock = _interopDefault(require('clock'));
var document = _interopDefault(require('document'));
var heartRate = require('heart-rate');

function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

clock.granularity = "seconds";
var myLabel = document.getElementById("myLabel");
var dayOfWeekLabel = document.getElementById("dayOfWeekLabel");
var dateLabel = document.getElementById("dateLabel");
var heartRateLabel = document.getElementById("heartRateLabel");
heartRateLabel.text = "--";
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function updateClock() {
    var today = new Date();
    var hours = today.getHours() % 12;
    if (hours == 0) {
        hours = 12;
    }
    var mins = zeroPad(today.getMinutes());
    var seconds = zeroPad(today.getSeconds());
    var dayOfWeek = today.getDay();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    myLabel.text = hours + ":" + mins + ":" + seconds;
    dayOfWeekLabel.text = days[dayOfWeek];
    dateLabel.text = month + "/" + day;
    if (!hrm.onactivate) {
        heartRateLabel.text = "--";
    }
}
clock.ontick = function () { return updateClock(); };
var hrm = new heartRate.HeartRateSensor();
hrm.onreading = function () {
    console.log("Current heart rate: " + hrm.heartRate);
    heartRateLabel.text = hrm.heartRate + " bpm";
    hrm.stop();
};
setInterval(updateHeartRate, 2000);
function updateHeartRate() {
    hrm.start();
}
