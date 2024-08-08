import {
  ipcMain,
  IpcMainEvent,
  IpcMainInvokeEvent,
  ipcRenderer,
  IpcRendererEvent,
} from 'electron';
import { IPC_CHANNELS } from './constants';

/**
 *
 * @param channelName the name of the channel for which we want to get typed data
 */
export function buildRendererIpc<TSend, TReceive>(channelName: IPC_CHANNELS) {
  return {
    sendMessage: (args: TSend) => {
      ipcRenderer.send(channelName, args);
    },
    on: (handler: (args: TReceive) => void) => {
      const subscription = (_e: IpcRendererEvent, args: TReceive) => {
        handler(args);
      };

      ipcRenderer.on(channelName, subscription);

      return () => {
        ipcRenderer.removeListener(channelName, subscription);
      };
    },
    once: (handler: (args: TReceive) => void) => {
      ipcRenderer.once(channelName, (_e, args) => {
        handler(args);
      });
    },
    invoke: (args: TSend): Promise<TReceive> => {
      return ipcRenderer.invoke(channelName, args);
    },
  };
}

/**
 *
 * @param channelName the name of the channel for which we want to get typed data
 */
export function buildMainIpc<TReceive, TSend>(channelName: IPC_CHANNELS) {
  return {
    on: (
      listener: (
        event: IpcMainEvent,
        reply: (data: TSend) => void,
        args: TReceive,
      ) => void,
    ) => {
      ipcMain.on(channelName, (_e, args) => {
        const replyCb = (data: TSend) => {
          // bind reply to channel name to prevent sending response
          // on other channel
          _e.reply(channelName, data);
        };

        listener(_e, replyCb, args);
      });
    },
    handle: (
      listener: (event: IpcMainInvokeEvent, args: TReceive) => Promise<TSend>,
    ) => {
      ipcMain.handle(channelName, listener);
    },
  };
}
