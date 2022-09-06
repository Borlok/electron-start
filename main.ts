import {app, BrowserWindow, screen, ipcMain, dialog} from 'electron';
const {shell} = require('electron');
import * as fs from 'fs';

let win: BrowserWindow | null
let folderPath: string

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
      nodeIntegration: true,
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
      return
    } else {
      return folderPath = filePaths[0]
    }
  }

  ipcMain.handle('addFile', (event, args) => {
    let currentPath = (folderPath.at(folderPath.length - 1) !== '/') ?
      (folderPath + '/') : folderPath
    let path: string = currentPath + args[0]
    let content: string = args[1]

      fs.writeFile(path, content, (err) => {
        if (err) {
          console.log('An error with creating the file ' + args[0])
        }
        console.log('The file has been successfully saved')
      })

})

ipcMain.handle('removeFile', (event, args) => {
  let currentPath = (folderPath.at(folderPath.length - 1) !== '/') ?
    (folderPath + '/') : folderPath
  let path: string = currentPath + args[0]

  fs.rm(path, (err) => {
    if (err) {
      console.log('An error with remove the file ' + args[0])
    }
    console.log('The file has been successfully removed')
  })
})

ipcMain.handle('execute', (event, args) => {
  let currentPath = (folderPath.at(folderPath.length - 1) !== '/') ?
    (folderPath + '/') : folderPath
  let path: string = currentPath + args[0]
  console.log(path)
  shell.openPath(path)
})

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
