import {app, BrowserWindow, screen, ipcMain, dialog, Menu, Tray} from 'electron';
const {shell} = require('electron');
import * as fs from 'fs';

let win: BrowserWindow | null
let folderPath: string
let tray;

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    minWidth: 600,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
      contextIsolation: true,
    },
  });

  win.loadURL('file://' + __dirname + '/talpabox-app/index.html');

  win.on('closed', () => {
    win = null;
  });

  win.webContents.openDevTools()

  return win;
}
  ipcMain.handle('getPath', handleFileOpen)

  async function handleFileOpen() {
    const {canceled, filePaths} = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (canceled) {
      return ''
    } else {
      return folderPath = filePaths[0]
    }
  }

  ipcMain.handle('addFile', (event, args) => {
    let path = args[0]
    let content = args[1]
      fs.writeFile(path, content, (err) => {
        if (err) {
          console.log('An error with creating the file ' + args[0])
        }
        console.log('The file has been successfully saved')
      })

})

ipcMain.handle('removeFile', (event, args) => {
  let path = args[0]
  fs.rm(path, (err) => {
    if (err) {
      console.log('An error with remove the file ' + args[0])
    }
    console.log('The file has been successfully removed')
  })
})

ipcMain.handle('execute', (event, args) => {
  let path: string = args[0]
  shell.openPath(path)
})

ipcMain.handle('hide', addTray)

async function addTray() {
  tray = new Tray(__dirname + '/talpabox-app/assets/images/img.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  contextMenu.items[1].checked = false
  tray.setToolTip('Talpabox')
  tray.setContextMenu(contextMenu)
}

ipcMain.handle('openWindow', () => {
  createWindow()
})

app.on('ready', () => setTimeout(createWindow, 400));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
