const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        sendNotification(message) {
            console.log(message)
            ipcRenderer.send('notify', message);
        }
    },
    batteryApi:{

    }
  });