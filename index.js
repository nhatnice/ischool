const {app, BrowserWindow, ipcMain } = require('electron');
const ewc = require('ewc');

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
width: 1280, height: 720,transparent: true,frame: false,webPreferences:{experimentalFeatures:true},backgroundColor: '#00000000',show: false,
    });

    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.webContents.openDevTools({mode: 'detach'})
    ewc.setAcrylic(mainWindow, 0x14800020);
    //ewc.setBlurBehind(mainWindow, 0x14800020);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
});
