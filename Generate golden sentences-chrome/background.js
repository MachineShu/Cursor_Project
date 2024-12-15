// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "createCard",
        title: "生成金句卡片",
        contexts: ["selection"]
    });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "createCard") {
        // 保存选中的文本
        chrome.storage.local.set({
            selectedText: info.selectionText
        }, () => {
            // 打开编辑器
            chrome.action.openPopup();
        });
    }
});

// 监听快捷键
chrome.commands.onCommand.addListener((command) => {
    if (command === "_execute_action") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "getSelection"});
        });
    }
});

// 处理来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveSelection") {
        chrome.storage.local.set({
            selectedText: request.text
        }, () => {
            chrome.action.openPopup();
        });
    }
}); 