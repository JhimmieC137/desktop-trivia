const path =  require('path')
const os =  require('os')
const fs = require('fs')
const { writeFile, open } = require('fs/promises')

const { app, BrowserWindow, Menu, ipcMain, ipcRenderer, shell, Notification } = require('electron');

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

async function writeToFile(fileName, data){
    try {
        filehandle = await open(fileName, 'r')
        await writeFile(fileName, data);
        await filehandle.close();
        console.log(filehandle)
        
    }catch(err) {
        console.log(err.message)
    }
}

ipcMain.on('notify', (_, message) => {
    new Notification({
        title: 'Notification', 
        body: message
    }).show();
})
ipcMain.on('categoryDataCheck', (e, data) => {
    // console.log(e)
    var check = false
    var data = false
    const path = 'data.json'
    if (fs.existsSync(path)) {
        check = true;
        data = fs.readFileSync(path, 'utf-8')
        // console.log(data)
    }

    // ipcRenderer.removeAllListeners("categoryDataCheck")
    e.reply('categoryDataCheckStatus', {check, data})
    
    
})
ipcMain.on('storeData', (e, fileData) => {
    let status = "success"
    const path = 'data.json'
    const fileDesc = fs.openSync(path) 
    console.log(fileDesc)
    // fs.writeFile(path, fileData, (err) => {
    //     if(err) {
    //         status = err
    //         console.log(err)
    //     }
    //     fs.close(fileDesc, (err) => {
    //         if (err) console.log(err)
    //         else {
    //             console.log("File closed!")
    //         }
    //     })
    // });
    e.reply('storeDataComplete', status);
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