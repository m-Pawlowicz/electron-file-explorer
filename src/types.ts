import { IPC_CHANNELS } from './constants';

export type Channels = `${IPC_CHANNELS}`;

export type DirectoryItem = { name: string; isDirectory: boolean, path: string };

export type DirectoryResponse = { path: string; contents: DirectoryItem[] }
