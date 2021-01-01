const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('../json/schedule.json', 'utf8'));

console.log(`Hari ${obj[0].day}, pelajaran ${obj[0].listSubject[0].subjectName}`)
console.log(obj.length)

let dayName = "Wednesday"
let thisDay

let dayChecker = () => {
    for (let counter = 0; counter < obj.length; counter++){
      if (obj[counter].day === dayName){
        thisDay = obj[counter]
        console.log("who")
      }
    }
  }

  dayChecker()
  console.log(thisDay)

  date = new Date();
  console.log(`${date.getHours()}.${date.getMinutes()}`)

  let x = 4
  if (0 < x <3){
      console.log("it's working")
  }





//check apps is running or not
const exec = require('child_process').exec;

const isRunning = (query, cb) => {
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

isRunning('chrome.exe', (status) => {
    console.log(status); // true|false
})
