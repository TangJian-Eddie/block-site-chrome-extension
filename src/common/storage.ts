export const getStorageSync = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (data) => {
      resolve(data[key]);
    });
  });
};

export const setStorageSync = (key, data) => {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set({ [key]: data }, () => {
      resolve();
    });
  });
};
