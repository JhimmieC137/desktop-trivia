const path =  require('path')
const os =  require('os')
const fs = require('fs')

const { app, BrowserWindow, Menu, ipcMain, shell, Notification } = require('electron');

// process.env.NODE_ENV = 'production'

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform == 'darwin';

var mainWindow;

// // Create the window
function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Trivia',
        width: isDev ? 1000 : 500,
        height: 600,
        webPreferences: {
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, 'preload.js')
        }

    }); 

    // Open devtools is in dev env 
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    
    mainWindow.loadFile('./public/index.html'); 
}
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

ipcMain.on('notify', (_, message) => {
    new Notification({
        title: 'Notification', 
        body: message
    }).show();
})

app.whenReady().then(() => {
    createMainWindow();

    // Remove mainWindow from memory on close
    mainWindow.on('closed', () => (mainWindow = null));


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
        }
    })

});


app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
})