const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const GascoigneApp = require('./nodeApp/app.js');

const path = require('path')
const url = require('url')
const fs = require('fs');
const net = require('net');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let homePage = "./dist.html";
//let homePage = "./dist.html";
let isDevTools = false;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.setMenu(null);

  ensureSingleInstance("Keyboard Assemble", mainWindow);
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, homePage),//出包时候，传入变量替换
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //if( isDevTools ){
  mainWindow.webContents.openDevTools()
  //}
  //mainWindow.webContents.openDevTools(false);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  GascoigneAppMysql = new GascoigneApp(mainWindow);
  GascoigneAppMysql.init()
    .then(() => {

    })
    .catch((error) => {
      console.log(error);
    });

}
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})
if (shouldQuit) {
  app.quit()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function ensureSingleInstance(appName, mainWindow) {
  //OS X doesn't have a single instance issue
  if (process.platform === 'darwin') {
    return;
  }

  var socket = (process.platform === 'win32') ?
    '\\\\.\\pipe\\' + appName + '-sock' :
    pipe.join(os.tempdir(), appName + '.sock');

  net.connect({ path: socket }, function () {
    if (mainWindow) {
      mainWindow.focus();
    }
    app.exit();
  }).on('error', function (err) {
    if (process.platform === 'win32') {
      try {
        fs.unlinkSync(socket);
      } catch (e) {
        if (e.code === 'EPERM') {
          socket += '-' + process.env.USERNAME;
        }
        else if (e.code !== 'ENOENT') {
          throw e;
        }
      }
    }

    net.createServer(function (connection) { }).listen(socket);
  });
};