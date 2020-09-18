const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const url = require('url')
const path = require('path')



let win

function createWindow() {
   win = new BrowserWindow({
      width: 1040, height: 780,
      webPreferences: { 
         nodeIntegration: true,
         // devTools: false
         devTools: true
      }
   })
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

const template = [
   {

      label: 'File',
      
   },
   {
      label: 'Edit',
      submenu: [
         {
            role: 'undo'
         },
         {
            role: 'redo'
         },
         {
            type: 'separator'
         },
         {
            role: 'cut'
         },
         {
            role: 'copy'
         },
         {
            role: 'paste'
         }
      ]
   },
   {
      label: 'Debug',
      submenu: [
         {
            role: 'reload'
         },
         {
            role: 'forceReload'
         },
         {
            role: 'toggleDevTools'
         }
      ]
   }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('ready', createWindow)
