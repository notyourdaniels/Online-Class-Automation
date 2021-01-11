// const fs = require("fs")
const path = require ("path")
const sound = require("sound-play");  //For playing sounds
const fs = require("fs")

// //Parsing JSON from .json files
const schedule = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'json/schedule.json'))); //Schedules
const userConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'json/config.json'))); //User config

// console.log(userConfig[0].alarmSound)
sound.play(path.resolve(__dirname, userConfig[0].alarmSound), 100); //playing alarm
