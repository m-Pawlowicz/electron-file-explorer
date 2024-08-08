import { IPC_CHANNELS } from './constants';
import { buildMainIpc, buildRendererIpc } from './ipcBuilder';
import { DirectoryResponse } from './types';

const rendererIPCs = {
  filesystem: buildRendererIpc<{ path: string }, DirectoryResponse>(
    IPC_CHANNELS.FILESYSTEM,
  ),
  fileOpener: buildRendererIpc<{ path: string }, void>(
    IPC_CHANNELS.FILE_OPENER,
  ),
};

const mainIPCs = {
  filesystem: buildMainIpc<{ path: string }, DirectoryResponse>(
    IPC_CHANNELS.FILESYSTEM,
  ),
  fileOpener: buildMainIpc<{ path: string }, void>(IPC_CHANNELS.FILE_OPENER),
};

const ipcs = {
  renderer: rendererIPCs,
  main: mainIPCs,
};

/**
 * importing rendererIpcs in renderer part will result in an undefined thus
 * we create an utility function to prevent any confusion
 * @returns createdIpcs for main and renderer processes
 */
export function getIpcs<T extends 'renderer' | 'main'>(
  type: T,
): (typeof ipcs)[T] {
  if (type === 'renderer') {
    return ipcs[type];
  }

  return ipcs[type];
}
