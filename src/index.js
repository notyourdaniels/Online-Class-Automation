//Online Class Automation
//By notyourdaniels 
//Please credit me if you want to use this source code
//2021 dnyworks (notyourdaniels)

//Electron code

const electron = require('electron');
const path = require('path');
const { runtime } = require('./engine.js');
const { app, BrowserWindow, ipcMain} = electron;
const engine = require('./engine.js')



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  //dummy subjectCount
  
  setInterval(() => {
    let runtime = engine.runtime()
    if (runtime === "breaktime"){
      mainWindow.webContents.send('subName', "Break Time")
      mainWindow.webContents.send('subTime', " ")
    } else if (runtime === "notyet"){
      app.exit() //Future updates : add the info window
    } else if (Array.isArray(runtime)){
      let runtimeInfo = runtime
      mainWindow.webContents.send('subCount', runtimeInfo[0])
      mainWindow.webContents.send('subName', runtimeInfo[1].subject)
      mainWindow.webContents.send('subTime', runtimeInfo[1].subjectTime)
      mainWindow.webContents.send('nsubName', runtimeInfo[2].subject)
      mainWindow.webContents.send('nsubTime', runtimeInfo[2].subjectTime)
    }
  }, 1000)


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//catch quitApp
ipcMain.on('quitApp', () => {
  app.exit()
})
