import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from '@utils/create-window';
import { main } from './main';
import { unpackData } from './utils/unpack-data';
import { initI18n } from './utils/i18n';

if (IS_PRODUCTION) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();
  await unpackData();
  initI18n();

  const mainWindow = createWindow('main', {
    title: `${PACKAGE_NAME}-${PACKAGE_VERSION}`,
    width: 1000,
    height: 600,
  });
  mainWindow.removeMenu();

  if (IS_PRODUCTION) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on(IPC_ACTIONS_CHANNEL, (event, msg) => {
    // tslint:disable:no-console
    console.log(`IPC received [${IPC_ACTIONS_CHANNEL}] ${msg}`);
    if (msg === 'ready') {
      main({ mainWindow });
    }
  });
})();

app.on('window-all-closed', () => {
  app.quit();
});
