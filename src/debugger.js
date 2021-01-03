//For Debugging only !
// const engine = require('./engine.js')


// setInterval(() =>{
//     console.log(engine.runtime())
// }, 1000)

// const exec = require('child_process').exec;

// const isRunning = (query, cb) => {
//     let platform = process.platform;
//     let cmd = '';
//     switch (platform) {
//         case 'win32' : cmd = `tasklist`; break;
//         case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
//         case 'linux' : cmd = `ps -A`; break;
//         default: break;
//     }
//     exec(cmd, (err, stdout, stderr) => {
//         cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
//     });
// }

// isRunning('chrome.exe', (status) => {
//     console.log(status); // true|false
// })



//Timer 

setInterval(()=>{
    console.log("hello")
    setTimeout(() => {
       console.log("sfdasdsadsadsadsa") 
    }, 2000);
    console.log("ping")
    
},1000)
