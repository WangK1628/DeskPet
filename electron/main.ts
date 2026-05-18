import { BrowserWindow, app, ipcMain, screen } from 'electron';
import path from 'node:path';

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  const area = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 480,
    height: 620,
    x: area.width - 500,
    y: area.height - 650,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? (!app.isPackaged ? 'http://localhost:5173' : undefined);

  if (devServerUrl) {
    await mainWindow.loadURL(devServerUrl);
  } else {
    await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

app.whenReady().then(createWindow);

ipcMain.on('pet:drag', (_event, deltaX: number, deltaY: number) => {
  if (!mainWindow) return;
  const [x, y] = mainWindow.getPosition();
  mainWindow.setPosition(x + deltaX, y + deltaY);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
