/*
  
  NVIS425 DAQ - Electron Main Process

  This JavaScript file serves as the main process for the NVIS425 Lead-Acid Battery Characteristics Training System Data Acquisition System using Electron framework.

  It includes:
  - Creation of the main Electron window for the user interface
  - Configuration of window properties such as dimensions, web preferences, and icon
  - Initialization of serial port communication for data acquisition
  - Event handling for refreshing available ports and starting data acquisition
  - Sending and receiving data to/from Arduino via serial port
  - Error handling and logging for port operations

  Author: Kishore Gunalan

*/

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const path = require('path');

let openPort = null;

function createWindow () {
  const win = new BrowserWindow({
    width: 1180,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    },
    icon: path.join(__dirname, 'assets/icon.ico')
  });

  // win.setMenu(null);

  win.loadFile(path.join(__dirname, 'index.html')).catch(err => {
    console.error('Failed to load index.html:', err);
  });
  
  // Function to refresh available serial ports and send them to the renderer process (renderer.js)
  function refreshPorts() {
    SerialPort.list().then(ports => {
        win.webContents.send('list-ports', ports);
    }).catch(err => {
        console.error("Error listing ports:", err);
    });
  }
  // Event listener for 'refresh-ports' message from renderer process
  ipcMain.on('refresh-ports', (event) => {
    refreshPorts();
  })

  ipcMain.on('closeApp', () => {
    win.close();
  });
    
  ipcMain.on('minimizeApp', () => {
    win.minimize();
  });

  ipcMain.on('maximizeApp', () => {
    if(win.isMaximized()){
      win.restore();
    } else {
      win.maximize();
    };
  });
  
  // Event listener for 'start-daq' message from renderer process. On event, this starts reading the data.
  ipcMain.on('start-daq', (event, selectedPort) => {
    if (openPort) {
      openPort.close(err => {
          if (err) {
              console.log("Error closing port:", err.message);
          } else {
              console.log("Port closed successfully");
              openPort = null;
              win.webContents.send('port-closed');
          }
      });
  } else if (selectedPort) {
      const port = new SerialPort(selectedPort, { baudRate: 9600 });
      const parser = port.pipe(new Readline({ delimiter: '\n' }));

      parser.on('data', (data) => {
        // console.log('Received data:', data);
        win.webContents.send('serial-data', data);
      });
      openPort = port;
    } else {
      console.log("No port selected. Make sure to select a port.");
    }
  });
}

app.whenReady().then(createWindow);
