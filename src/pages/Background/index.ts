import { setStorageSync, getStorageSync } from '@common/storage';
let blockList: any = [];
let blockedUrl = '';

const onBeforeNavigate = (tab) => {
  for (const item of blockList) {
    if (tab.url.includes(item)) {
      chrome.tabs.update(tab.id, { url: blockedUrl });
    }
  }
};

const onClicked = () => {
  chrome.runtime.openOptionsPage();
};

const updateBlockList = async () => {
  const _blockList = await getStorageSync('blockList');
  blockList = _blockList || [];
};

const onStorageChanged = () => {
  updateBlockList();
};

const onInstalled = () => {
  const createProperties = {
    id: 'block_1',
    title: '拦截网站',
    documentUrlPatterns: ['https://*/*', 'http://*/*'],
  };
  updateBlockList();
  chrome.contextMenus.create(createProperties);
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    const { url } = tab;
    const reg = /^http(s)?:\/\/(.*?)\//;
    const hostName = url.match(reg)[2];
    blockList = [...blockList, hostName];
    setStorageSync('blockList', blockList);
  });
  blockedUrl = chrome.runtime.getURL('blocked.html');
};

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate);
chrome.action.onClicked.addListener(onClicked);
chrome.storage.onChanged.addListener(onStorageChanged);
