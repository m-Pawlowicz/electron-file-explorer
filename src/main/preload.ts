// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { IPC_CHANNELS } from '../constants';
import { contextBridge } from 'electron';
import { buildRendererIpc } from '../ipcBuilder';
import { DirectoryItem } from '../types';

const electronHandler = {
  filesystemIpc: buildRendererIpc<{ path: string }, DirectoryItem[]>(IPC_CHANNELS.FILESYSTEM),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
