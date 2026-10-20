const electronRemote = require('@electron/remote');
require('electron').remote = electronRemote;
const nativeDialog = electronRemote.dialog;
const showOpenDialog = nativeDialog.showOpenDialog.bind(nativeDialog);
const showSaveDialog = nativeDialog.showSaveDialog.bind(nativeDialog);
nativeDialog.showOpenDialog = (options, callback) => showOpenDialog(options).then(result => {
  if (callback) callback(result.canceled ? [] : result.filePaths);
  return result;
});
nativeDialog.showSaveDialog = (options, callback) => showSaveDialog(options).then(result => {
  if (callback) callback(result.canceled ? undefined : result.filePath);
  return result;
});

$(document).ready(function(){
  var isC = false;
  $(".menubtn").click(function(){
    if(isC == false)
    {
      $( "#sidebar" ).switchClass( "sidebar", "sidebarClose", 0, "easeInOutQuad" );
      $(".sidebart").hide(0);
      $( "#sideav" ).switchClass( "sideav", "sideavClose", 0, "easeInOutQuad" );
      $("#content").css({"position":"absolute"});
      $("#content").switchClass("content", "contentF", 0,"easeInOutQuad");
      isC = true;
    }else{
      $( "#sidebar" ).switchClass( "sidebarClose", "sidebar", 0, "easeInOutQuad" );
      $(".sidebart").show(0);
      $( "#sideav" ).switchClass( "sideavClose", "sideav", 0, "easeInOutQuad" );
      $("#content").css({"position":"absolute"});
      $("#content").switchClass("contentF", "content", 0,"easeInOutQuad");
      isC = false;
    }
  });
});

function editStudent(index){
  const app = require('electron');
  const { ipcRenderer } = require('electron')
  const BrowserWindow = require('@electron/remote').BrowserWindow;
    let editwindow;
    editwindow = new BrowserWindow({webPreferences: { nodeIntegration: true, contextIsolation: false }, width: 1000, height: 615,icon: __dirname + '/icon.ico',title: "iManager",transparent: true,frame: false});
    editwindow.loadURL('file://'+__dirname+'/editswindow.html');
    //editwindow.setAlwaysOnTop(true, "floating", 1);
    editwindow.setVisibleOnAllWorkspaces(false);
    editwindow.webContents.on('did-finish-load', () => {
    editwindow.webContents.send('ping', index)
  })
}
