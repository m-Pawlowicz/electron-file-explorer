import { FileOpen } from '@mui/icons-material';
import { IPC_CHANNELS } from './constants';
import { buildMainIpc, buildRendererIpc } from './ipcBuilder';
import { DirectoryResponse } from './types';

export const rendererIPCs = {
  filesystem: buildRendererIpc<{ path: string }, DirectoryResponse>(
    IPC_CHANNELS.FILESYSTEM,
  ),
  FileOpener: buildRendererIpc<{ path: string }, void>(
    IPC_CHANNELS.FILE_OPENER,
  ),
};

export const mainIPCs = {
  filesystem: buildMainIpc<{ path: string }, DirectoryResponse>(
    IPC_CHANNELS.FILESYSTEM,
  ),
  fileOpener: buildMainIpc<{ path: string }, void>(IPC_CHANNELS.FILE_OPENER),
};
