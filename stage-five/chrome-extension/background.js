function insert() {

document.body.innerHTML += `
<div id="modal__Cont" class="modal-container top-right" style="margin-top: 0; background-color: #fff;">
<div class="popup-title-container">
    <div class="title-left">
        <img src=${chrome.runtime.getURL("public/assets/icons/logo.svg")} alt="" srcset="">
        <span class="popup-title-text">
            HelpMeOut
        </span>
    </div>
    <div class="right-title">
        <img role="button" class="button" id="settings" src=${chrome.runtime.getURL("public/assets/icons/settings.svg")} alt="" srcset="">
        <img role="button" class="button" id="close" src=${chrome.runtime.getURL("public/assets/icons/close.svg")} alt="" srcset="">
    </div>
</div>
<div class="popup-desc">
    <span>This extension helps you record and share help videos with ease.</span>
</div>
<div class="popup-icons">
    <div>
        <img src=${chrome.runtime.getURL("public/assets/icons/monitor.svg")} alt="" srcset="">
        <span>Full Screen</span>
    </div>
    <div>
        <img src=${chrome.runtime.getURL("public/assets/icons/copy.svg")} alt="" srcset="">
        <span>Current Tab</span>
    </div>
</div>
<div class="popup-selection">
    <img src=${chrome.runtime.getURL("public/assets/icons/video.svg")} alt="" srcset="">
    <span>Camera</span>
    <div class="toggler">
        <img src=${chrome.runtime.getURL("public/assets/icons/toggle.svg")} alt="" srcset="">
    </div>
</div>
<div class="popup-selection">
    <img src=${chrome.runtime.getURL("public/assets/icons/video.svg")} alt="" srcset="">
    <span>Audio</span>
    <div class="toggler">
        <img src=${chrome.runtime.getURL("public/assets/icons/toggle.svg")} alt="" srcset="">
    </div>
</div>
<div class="popup-btn" id="start" role="button">
    <span>Start Recording</span>
</div>
</div>
`

// func: insert

}

chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["public/assets/js/popup.js"]
    })
})
