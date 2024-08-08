// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge } from 'electron';
import { getIpcs } from '../ipcs';

const { filesystem } = getIpcs('renderer');

const electronHandler = {
  filesystemIpc: filesystem,
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
