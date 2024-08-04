// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge } from 'electron';
import { IPC_CHANNELS } from '../constants';
import { buildRendererIpc } from '../ipcBuilder';
import { DirectoryResponse } from '../types';

const electronHandler = {
  filesystemIpc: buildRendererIpc<{ path: string }, DirectoryResponse>(IPC_CHANNELS.FILESYSTEM),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
