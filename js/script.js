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
  const BrowserWindow = app.remote.BrowserWindow;
    let editwindow;
    editwindow = new BrowserWindow({width: 1000, height: 615,icon: __dirname + '/icon.ico',title: "iManager",experimentalFeatures: true,transparent: true,frame: false});
    editwindow.loadURL('file://'+__dirname+'/editswindow.html');
    //editwindow.setAlwaysOnTop(true, "floating", 1);
    editwindow.setVisibleOnAllWorkspaces(false);
    editwindow.webContents.on('did-finish-load', () => {
    editwindow.webContents.send('ping', index)
  })
}
