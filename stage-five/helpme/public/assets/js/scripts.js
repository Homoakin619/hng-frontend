// document.addEventListener('DOMContentLoaded',function() {
//     console.log('I am running');
//     document.getElementById("start").addEventListener("click", (event) => {
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs))
//         const modal = document.getElementById('#modal__Cont');
//         modal.style.display = 'none';
//         document.body.innerHTML += recordScreen;
//     });
// })


const recordsScreen = `
<section class="recorder-container">
<img id="avatar" src=${chrome.runtime.getURL("public/assets/icons/rec-dot.svg")}avatar.svg" alt="avatar" />
<div class="recorder-board">
    <span class="timer white">00:03:45</span>
    <img id="rec" class="mr-3" src=${chrome.runtime.getURL("public/assets/icons/rec-dot.svg")} alt="rec" />
    <div class="recording-buttons">
        <div class="button-box">
            <div class="button-container"><img  src=${chrome.runtime.getURL("public/assets/icons/pause-btn.svg")} alt="rec" /></div>
            <span class="white">Pause</span>
        </div>
        <div class="button-box">
            <div class="button-container"><img  src=${chrome.runtime.getURL("public/assets/icons/stop.svg")} alt="rec" /></div>
            <span class="white">Stop</span>
        </div>
        <div class="button-box">
            <div class="button-container"><img  src=${chrome.runtime.getURL("public/assets/icons/camera.svg")} alt="rec" /></div>
            <span class="white">Camera</span>
            <img class="more" src=${chrome.runtime.getURL("public/assets/icons/more.svg")} alt="rec" />
        </div>
        <div class="button-box">
            <div class="button-container"><img src=${chrome.runtime.getURL("public/assets/icons/mic.svg")} alt="rec" /></div>
            <span class="white">Mic</span>
            <img class="more" src=${chrome.runtime.getURL("public/assets/icons/more.svg")} alt="rec" />
        </div>
        <div class="button-container mb-auto">
            <img src=${chrome.runtime.getURL("public/assets/icons/rec-trash_btn.svg")} alt="rec" />
        </div>
    </div>
</div>
</section>
`

// document.addEventListener('DOM', function() {
//     c
//     alert('loaded')
//     document.getElementById("start").addEventListener("click", (event) => {
//         const modal = document.getElementById('#modal__Cont');
//         modal.style.display = 'none';
//         document.body.innerHTML += recordScreen;
//     });
//   });
 