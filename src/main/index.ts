import { app, App, BrowserWindow, clipboard, Event, ipcMain, IpcMainEvent, Menu, nativeImage, screen, shell, Tray, WebContents } from "electron";
import * as ytdl from "ytdl-core";
import { ipcEvents } from "../common/definition";

class YTPIP {
  private mainWindow = null as BrowserWindow;
  private tray = null as Tray;

  constructor(private app:App){
    this.app.disableHardwareAcceleration();
    this.app
      .on("window-all-closed", this.onWindowAllClosed.bind(this))
      .on("ready", this.onReady.bind(this))
      .once("activate", this.onReady.bind(this))
    ;
  }

  private onWindowAllClosed(){
    this.app.quit();
  }

  private onReady(){
    if(!this.mainWindow){
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width, height } = primaryDisplay.workAreaSize;
      const formWidth = 320;
      const minWidth = 80;
      this.mainWindow = new BrowserWindow({
        width: formWidth,
        height: formWidth * 9 / 16 + 10,
        minWidth: minWidth,
        minHeight: minWidth * 9 / 16 + 10,
        x: width - formWidth - 20,
        y: height - (formWidth * 9 / 16) - 30,
        acceptFirstMouse: true,
        titleBarStyle: "hidden",
        autoHideMenuBar: true,
        resizable: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webviewTag: true,
          autoplayPolicy: "no-user-gesture-required",
        },
      });
      this.mainWindow.loadURL("file:///" + __dirname + "/index.html");
      this.mainWindow.once("closed", () => {
        this.mainWindow = null;
      });
      this.mainWindow.webContents.on("did-attach-webview", this.onDidAttatchWebView.bind(this));
      this.tray = new Tray(nativeImage.createFromPath(__dirname + "/favicon.ico"));
      const contextMenu = Menu.buildFromTemplate([
        {label: "終了", type: "normal", click: () => {
          this.mainWindow.close();
        }}
      ]);
      this.tray.addListener("click", this.onTrayIconClick.bind(this));
      this.tray.setToolTip("ytpip");
      this.tray.setContextMenu(contextMenu);
    }
  }

  private onDidAttatchWebView(ev:Event, content:WebContents){
    if(content.getType() === "webview"){
      content.setWindowOpenHandler(detail => {
        shell.openExternal(detail.url);
        return {action: "deny"};
      });
    }
  }

  private onTrayIconClick(){
    const txt = clipboard.readText();
    try{
      new URL(txt);
      if(ytdl.validateURL(txt)){
        this.mainWindow.webContents.send(ipcEvents.navigate, `https://www.youtube.com/embed/${ytdl.getURLVideoID(txt)}?autoplay=1`);
      }
    }
    catch(e){
      // something to handle error
    }
  }
}

new YTPIP(app);