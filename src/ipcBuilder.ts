import { IPC_CHANNELS } from './constants';
import { ipcMain, IpcMainEvent, ipcRenderer } from 'electron';

/**
 *
 * @param channelName the name of the channel for which we want to get typed data
 */
export function buildRendererIpc<T>(channelName: IPC_CHANNELS) {
  return {
    sendMessage: (args: T) => {
      ipcRenderer.send(channelName, args);
    },
    on: (handler: (args: T) => void) => {
      ipcRenderer.on(channelName, (_e, args) => {
        handler(args);
      });
    },
    once: (handler: (args: T) => void) => {
      ipcRenderer.once(channelName, (_e, args) => {
        handler(args);
      });
    },
  };
}

/**
 *
 * @param channelName the name of the channel for which we want to get typed data
 */
export function buildMainIpc<T>(channelName: IPC_CHANNELS) {
  return {
    on: (
      listener: (
        event: IpcMainEvent,
        reply: (data: T) => void,
        args: T
      ) => void,
    ) => {
      ipcMain.on(channelName, (_e, args) => {
        const replyCb = (data: T) => {
          // bind reply to channel name to prevent sending response
          // on other channel
          _e.reply(channelName, data);
        };

        listener(_e, replyCb, args);
      });
    },
  };
}
