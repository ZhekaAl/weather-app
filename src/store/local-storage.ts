import { State } from './types';

export const saveState = (state: State, version: string): void => {
  try {
    const storageStateVersion = localStorage.getItem('version');
    if (storageStateVersion !== version)
      localStorage.setItem('version', version);
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

export const clearState = (): void => {
  localStorage.removeItem('state');
};

// It’s important that this piece of code is wrapped in a try/catch block because calls to localStorage.getItem can fail if the user privacy mode does not allow the use of localStorage.
export const loadState = (version: string): State | undefined => {
  try {
    const storageStateVersion = localStorage.getItem('version');
    if (storageStateVersion !== version) {
      clearState();
      return undefined;
    }

    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
