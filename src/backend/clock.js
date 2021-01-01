// Code By Webdevtrick ( https://webdevtrick.com )
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

if (thisTime() === '19.55'){
    console.log("yay")
}