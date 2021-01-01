const opn = require("better-opn");  //For opening links
const sound = require("sound-play");  //For playing sounds
const path = require("path");  //Reading file path ?
const fs = require('fs');  //JSON Reader
const exec = require('child_process').exec; //Executor for process checker

//Parsing JSON from .json files
const schedule = JSON.parse(fs.readFileSync('json/schedule.json', 'utf8')); //Schedules
const userConfig = JSON.parse(fs.readFileSync('json/config.json', 'utf8')); //User config

let date = new Date(); //Generating new date
let today = date.getDay(); //Generating "today" day, numeric styles
let dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] //Array containing alphabet styles day


//Checking process running
let isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}


//Checking which day should be implemented into the schedules
let dayChecker = () => {
  for (let counter = 0; counter < schedule.length; counter++){
      if (dayName[today].includes(schedule[counter].day)){
      return schedule[counter].listSubject
      } 
  }
}


//generate current time
let thisTime = () =>{
  var date = new Date();
    var h = date.getHours(); 
    var m = date.getMinutes(); 
    var s = date.getSeconds(); 
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    return `${h}.${m}`
}

let subjectCountdown = () =>{
  let subject = dayChecker()
  if (subject[0].subjectStart <= thisTime() && subject[subject.length - 1].subjectEnd > thisTime()){
    console.log("it works")
  }
}

//Open zoom app via browser link and giving alarm.
let executor = () =>{
  if (userConfig[0].silentMode === false){
    sound.play(path.resolve(__dirname, userConfig[0].alarmSound)); //Giving alarm
  }
  opn(userConfig[0].meetingLink); //Open apps link
}

//Exporting modules so it can used on index.js or whatever where you want to using it
module.exports = {
  thisTime: thisTime,
  dayChecker: dayChecker,
  subjectCountdown: subjectCountdown,
  executor: executor
}