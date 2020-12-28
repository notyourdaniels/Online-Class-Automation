const opn = require("opn");
const sound = require("sound-play");
const path = require("path");
const { Console } = require("console");

let date = new Date();
let today = date.getDay();
let hours = []; //Total jam kelas

let workdays = [1, 2, 3, 4];
let weekends = [5];
let dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

if (workdays.includes(today)) {
  hours = [7, 8, 9, 10];
} else if (weekends.includes(today)) {
  hours = [7, 8, 11];
}

for (let x = 0; x < hours.length; x++) {
  if (hours[x] < date.getHours()) {
    let hoursIndex;
    while ((hoursIndex = hours.indexOf(hours[x])) > -1) {
      hours.splice(hoursIndex, 1);
    }
  }
}

setInterval(function () {
  date = new Date();

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Masih kurang ${hours.length} pelajaran`);

  if (hours.includes(date.getHours()) && date.getMinutes() == 20) {
    let hoursIndex;
    while ((hoursIndex = hours.indexOf(date.getHours())) > -1) {
      hours.splice(hoursIndex, 1);
    } //Kurangi "hours" kalau pelajaran yg dimaksud sudah dimulai
    sound.play(path.resolve(__dirname, "sound_alarm.wav")); //Setel suara
    opn("zoommtg://zoom.us/join?confno=2655082921&pwd=kelas1a"); //Buka zoom
  } else if (hours.length == 0) {
    process.exit(1);
  }
}, 1000);

console.log(`
======================
 Automated Zoom Felia
 Beta 0.1
======================

-----Hari ini------ 
      ${dayName[today]}
-------------------
`);
