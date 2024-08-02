import { IPC_CHANNELS } from './constants';

export type Channels = `${IPC_CHANNELS}`;

export type DirectoryItem = { name: string; isDirectory: boolean };
