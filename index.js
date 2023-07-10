const { app, BrowserWindow } = require("electron");
const path = require("path");

const server = require("./server/index");

function createWindow(port) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL(`http://127.0.0.1:${port}`);
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  server.start(8000).then((port) => {
    console.log("服务开启端口:", port);
    createWindow(port);
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow(port);
      }
    });
    app.on("window-all-closed", () => {
      app.quit();
    });
  });
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.commandLine.appendSwitch('no-sandbox');

