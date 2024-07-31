// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { IPC_CHANNELS } from '../constants';
import { contextBridge } from 'electron';
import { buildRendererIpc } from '../ipcBuilder';

const electronHandler = {
  filesystemIpc: buildRendererIpc<{ path: string }>(IPC_CHANNELS.FILESYSTEM),
  generalIpc: buildRendererIpc<{ data: unknown[] }>(IPC_CHANNELS.GENERAL),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
