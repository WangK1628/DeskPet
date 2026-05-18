import { BrowserWindow, app, ipcMain, screen } from 'electron';
import path from 'node:path';

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  const area = screen.getPrimaryDisplay().workAreaSize;

  const startX = Math.max(area.width - 500, 0);
  const startY = Math.max(area.height - 650, 0);

  mainWindow = new BrowserWindow({
    width: 480,
    height: 620,
    x: startX,
    y: startY,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';

  const distHtml = path.join(__dirname, '../dist/index.html');

  if (!app.isPackaged) {
    try {
      await mainWindow.loadURL(devUrl);
    } catch {
      await mainWindow.loadFile(distHtml);
    }
  } else {
    await mainWindow.loadFile(distHtml);
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
