// Modules to control application life and create native browser window
const {app, BrowserWindow, screen} = require('electron')

if (app.isPackaged) {
  process.env.NODE_ENV = 'production'
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : `file://${__dirname}/build/index.html`

function createWindow () {
  // Create the browser window.
  const window_width = process.env.NODE_ENV === 'production' ? 400 : 1024
  const window_height = process.env.NODE_ENV === 'production' ? 60 : 600
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: window_width,
    height: window_height,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(winURL)

  // Open dev tools initially when in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus()
      })
      mainWindow.webContents.openDevTools()
    })
  }

  if (process.env.NODE_ENV === 'production') {
    // No menu bar in production
    mainWindow.removeMenu()

    // move to right upper corner
    const { width, height } = screen.getPrimaryDisplay().size
    mainWindow.setBounds({ x: width - window_width, y: 75 })
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
