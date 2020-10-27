// var localStorage = require('localStorage')

/*saveStateToLocalStorage = () => {
    console.log(
      "saveStateToLocalStorage ResultViewState smallTable",
      this.state.smallTable
    );
    localStorage.setItem(
      "ResultViewState",
      JSON.stringify({
        smallTable: this.state.smallTable
      })
    );
  };*/

export const saveState = (state, version) => {
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

export const clearState = () => {
  localStorage.removeItem('state');
};

// It’s important that this piece of code is wrapped in a try/catch block because calls to localStorage.getItem can fail if the user privacy mode does not allow the use of localStorage.
export const loadState = (version) => {
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
