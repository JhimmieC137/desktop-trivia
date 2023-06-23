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

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});

contextBridge.exposeInMainWorld('electronApi', {
    categoryDataCheck: () => ipcRenderer.send("categoryDataCheck", {}),
    categoryDataCheckStatus: () => ipcRenderer.on("categoryDataCheckStatus", (res) => {return res}),
    endCategoryDataCheck: () => ipcRenderer.removeAllListeners("categoryDataCheck"),
    storeData: (data) => ipcRenderer.send('storeData', data),
    storeDataComplete: () => ipcRenderer.on('storeDataComplete', (res) => {return res}),
    endStoreData: () => ipcRenderer.removeAllListeners('storeData')
}

)