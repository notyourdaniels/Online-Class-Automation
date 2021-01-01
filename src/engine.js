//Online Class Automation Main Engine
//By notyourdaniels 
//Please credit me if you want to use this source code
//2021 dnyworks (notyourdaniels)

const opn = require("better-opn");  //For opening links
const sound = require("sound-play");  //For playing sounds
const path = require("path");  //Reading file path ?
const exec = require('child_process').exec; //Executor for process checker

//Parsing JSON from .json files
const schedule = require('./json/schedule.json', 'utf8'); //Schedules
const userConfig = require('./json/config.json', 'utf8'); //User config

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


//generate current time with hh:mm format
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

//checking it's time to run this app or not
let runtime = () =>{
  let subject = dayChecker()
  let totalSubject = subject.length
  //Validate schedule time.
  if (subject[0].subjectStart <= thisTime() && subject[totalSubject - 1].subjectEnd > thisTime()){
    //Validate schedule time between subject
    for (let counter = 0; counter < schedule.length; counter++){
      //If statement for detecting which subject the program should execute
      if (subject[counter].subjectStart <= thisTime() && subject[counter].subjectEnd > thisTime()){
        
        //Statement for clearing next subject in the last subject
        let nextSub
        let nextSubTime
        if (counter === totalSubject - 1){
          nextSub = "nothing"
          nextSubTime = null
        } else if (counter != totalSubject){
          nextSub = subject[counter + 1].subjectName
          nextSubTime = `${subject[counter + 1].subjectStart} - ${subject[counter + 1].subjectEnd}`
        }
        
        //return statement
        return [totalSubject - subject[counter].subjectNumber, //subject left
        { //Subject in progress
          subject: subject[counter].subjectName,
          subjectTime: `${subject[counter].subjectStart} - ${subject[counter].subjectEnd}`
        },
        { //Next Subject
          subject: nextSub,
          subjectTime: nextSubTime
        },
        ];
      } else if (subject[counter].subjectEnd <= thisTime() && subject[counter + 1].subjectStart > thisTime()) {
        //giving information about breaktime 
        return "breaktime"
      }
    } 
    //if the schedule is not yet started / has already ended.
  } else{
    return "notyet";
  }
}



//Open your apps of choice via link (zoom / google meet) and play some alarm
let executor = () =>{
  //Checking about silentMode is turned on or not on config.json
  if (userConfig[0].silentMode === false){
    sound.play(path.resolve(__dirname, userConfig[0].alarmSound)); //playing alarm
  }
  opn(userConfig[0].meetingLink); //Open app link
}

//Exporting modules so it can used on index.js or whatever where you want to using it
module.exports = {
  thisTime: thisTime,
  dayChecker: dayChecker,
  runtime: runtime,
  executor: executor
}