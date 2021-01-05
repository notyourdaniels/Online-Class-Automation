//Notyourdaniels on github

const electron = require('electron');
const path = require('path');
const { runtime, calculateTime } = require('./engine.js');
const { app, BrowserWindow, ipcMain, dialog} = electron;
const engine = require('./engine.js')



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 680,
    icon: path.join(__dirname, './images/icons.ico'),
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

  let canExecute = true
  setInterval(() => {
    let runtime = engine.runtime()
    if (runtime[0] === "breaktime"){
      mainWindow.webContents.send('subName', "Break Time")
      mainWindow.webContents.send('subTime', `${runtime[1]} - ${runtime[2]}`)
      canExecute = true
     
    } else if (runtime[0] === "notyet"){

      canExecute = true
      mainWindow.webContents.send('subCount', "empty")
      mainWindow.webContents.send('subName', "Not yet started")
      mainWindow.webContents.send('subTime', "-")
      mainWindow.webContents.send('nsubName', "-")
      mainWindow.webContents.send('nsubTime', "-")
       //Future updates : add the info window

    } else if (runtime[0] === "running"){
      if (canExecute === true){
        engine.executor()
        canExecute = false
      }

      mainWindow.webContents.send('subCount', runtime[1])
      mainWindow.webContents.send('subName', runtime[2].subject)
      mainWindow.webContents.send('subTime', runtime[2].subjectTime)
      mainWindow.webContents.send('nsubName', runtime[3].subject)
      mainWindow.webContents.send('nsubTime', runtime[3].subjectTime)
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

//catch quitApp with msg box
ipcMain.on('quitApp', () => {
  dialog.showMessageBox({  
    type: 'warning',
      buttons: ['Yes', 'No'],
      noLink: true,
      defaultId: 1,
      title: 'Online Class Automation',
      message: 'Do you really want to quit ?',
      detail: 'If you quit, this automation will be cancelled.',
    }).then(res => {
      if (res.response === 0){
        app.quit()
      }
    }) 
})