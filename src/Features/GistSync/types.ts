export enum GistSyncState {
  Idle = 'Idle',
  Initialized = 'Initialized',
  Syncing = 'Syncing',
  Paused = 'Paused',
  FailedToInitialize = 'FailedToInitialize',
  FailedToSync = 'FailedToSync',
}
export interface State {
  accessToken?: string;
  isActive: boolean;
  state: GistSyncState;
}
