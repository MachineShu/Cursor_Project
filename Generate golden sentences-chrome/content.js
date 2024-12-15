// 监听来自background的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelection") {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            chrome.runtime.sendMessage({
                action: "saveSelection",
                text: selectedText
            });
        }
    }
});

// 添加快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+Y (Windows) or Command+Shift+Y (Mac)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'y') {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            chrome.runtime.sendMessage({
                action: "saveSelection",
                text: selectedText
            });
        }
    }
}); 