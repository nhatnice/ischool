const { app, BrowserWindow } = require('electron');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();
app.on('browser-window-created', (_event, window) => {
    remoteMain.enable(window.webContents);
});

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
width: 1280,
        height: 720,
        transparent: true,
        frame: false,
        backgroundColor: '#00000000',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });


    mainWindow.loadFile('main.html');


    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
