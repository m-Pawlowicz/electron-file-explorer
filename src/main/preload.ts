// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge } from 'electron';
import { rendererIPCs } from '../ipcs';

const { filesystem } = rendererIPCs;

const electronHandler = {
  filesystemIpc: filesystem,
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
