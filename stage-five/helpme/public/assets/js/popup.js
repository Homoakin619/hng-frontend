console.log("hellos");

const modalContent = `
<div id="modal__Cont" class="modal-container top-right" style="margin-top: 0; background-color: #fff;">
<div class="popup-title-container">
    <div class="title-left">
        <img src=${chrome.runtime.getURL(
          "public/assets/icons/logo.svg"
        )} alt="" srcset="">
        <span class="popup-title-text">
            HelpMeOut
        </span>
    </div>
    <div class="right-title">
        <img role="button" class="button" id="settings" src=${chrome.runtime.getURL(
          "public/assets/icons/settings.svg"
        )} alt="" srcset="">

        <img role="button" class="button" id="close" src=${chrome.runtime.getURL(
          "public/assets/icons/close.svg"
        )} alt="" srcset="">
    </div>
</div>
<div class="popup-desc">
    <span>This extension helps you record and share help videos with ease.</span>
</div>
<div class="popup-icons">
    <div>
        <img src=${chrome.runtime.getURL(
          "public/assets/icons/monitor.svg"
        )} alt="" srcset="">
        <span>Full Screen</span>
    </div>
    <div>
        <img src=${chrome.runtime.getURL(
          "public/assets/icons/copy.svg"
        )} alt="" srcset="">
        <span>Current Tab</span>
    </div>
</div>
<div class="popup-selection">
    <img src=${chrome.runtime.getURL(
      "public/assets/icons/video.svg"
    )} alt="" srcset="">
    <span>Camera</span>
    <div class="toggler">
        <img src=${chrome.runtime.getURL(
          "public/assets/icons/toggle.svg"
        )} alt="" srcset="">
    </div>
</div>
<div class="popup-selection">
    <img src=${chrome.runtime.getURL(
      "public/assets/icons/video.svg"
    )} alt="" srcset="">
    <span>Audio</span>
    <div class="toggler">
        <img src=${chrome.runtime.getURL(
          "public/assets/icons/toggle.svg"
        )} alt="" srcset="">
    </div>
</div>
<div class="popup-btn" id="start" role="button">
    <span>Start Recording</span>
</div>
</div>
`;

const recordScreen = `
 <video id="video" autoplay></video>
<section class="recorder-container" id="recordScreen">
<img id="avatar" src=${chrome.runtime.getURL(
  "public/assets/icons/avatar.svg"
)} alt="avatar" />
<div class="recorder-board">
    <span class="timer white" id="time-count">00:00:00</span>
    <img id="rec" class="mr-3" src=${chrome.runtime.getURL(
      "public/assets/icons/rec-dot.svg"
    )} alt="rec" />
    <div class="recording-buttons">
        <div class="button-box" id="pause-container">
            <div class="custom-button-container" role="button" id="pause"><img  src=${chrome.runtime.getURL(
              "public/assets/icons/pause-btn.svg"
            )} alt="rec" /></div>
            <span class="white">Pause</span>
        </div>
        <div class="button-box">
            <div class="custom-button-container" role="button" id="stop"><img  src=${chrome.runtime.getURL(
              "public/assets/icons/stop.svg"
            )} alt="rec" /></div>
            <span class="white">Stop</span>
        </div>
        <div class="button-box">
            <div class="custom-button-container" role="button" id="cameraOn"><img  src=${chrome.runtime.getURL(
              "public/assets/icons/camera.svg"
            )} alt="rec" /></div>
            <span class="white">Camera</span>
            <img class="more" src=${chrome.runtime.getURL(
              "public/assets/icons/more.svg"
            )} alt="rec" />
        </div>
        <div class="button-box">
            <div class="custom-button-container" role="button" id="micOn"><img src=${chrome.runtime.getURL(
              "public/assets/icons/mic.svg"
            )} alt="rec" /></div>
            <span class="white">Mic</span>
            <img class="more" src=${chrome.runtime.getURL(
              "public/assets/icons/more.svg"
            )} alt="rec" />
        </div>
        <div class="custom-button-container mb-auto">
            <img id="clear" src=${chrome.runtime.getURL(
              "public/assets/icons/trash_btn.svg"
            )} alt="trash" />
        </div>
    </div>
</div>
</section>
`;



const displayMediaOptions = {
    video: {
      displaySurface: "window",
    },
    audio: true,
  };
  const recordingOptions = {
    video: {
      displaySurface: "window",
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: false,
      sampleRate: 44100,
      suppressLocalAudioPlayback: false,
    },
    surfaceSwitching: "include",
    selfBrowserSurface: "exclude",
    systemAudio: "include",
  };

document.body.innerHTML += modalContent;
let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;


async function checkMicrophonePermission() {
    const permissionStatus = await navigator.permissions.query({
      name: "microphone",
    });

    console.log(permissionStatus.state);
  
    if (permissionStatus.state !== "granted") {
    console.log("microphone not available");
      const newPermissionStatus = await navigator.permissions.request({
        name: "microphone",
      });
  
      if (newPermissionStatus.state !== "granted") {
        console.log("mic not available");
        return false;
      }
    }
  console.log("Mic is micing");
  if (!MediaRecorder.isTypeSupported("video/mp4; codecs=vp8, vorbis")) {
    console.log("REcording not supported");
  }
    return true;
  }

function updateTimer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

  const timeString = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.getElementById("time-count").textContent = timeString;
}
document.getElementById("close").addEventListener("click", function (event) {
    console.log("clicked!!");
      const modal = document.getElementById("modal__Cont");
      modal.style.display = 'none'
    });

document.getElementById("start").addEventListener("click", (event) => {
  const modal = document.getElementById("modal__Cont");
  modal.style.display = "none";
  document.body.innerHTML += recordScreen;

  // checkMicrophonePermission()
  startCapture()
  
  

  const videoElem = document.getElementById("video");
  const startElem = document.getElementById("start");
  const stopElem = document.getElementById("stop");
  let chunks = [];
  let mediaRecorder;
  

  async function startCapture() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(
        {audio: true,video: true}
      );

      videoElem.srcObject = stream;

      let options;


      if (MediaRecorder.isTypeSupported("video/webm; codecs=vp8,opus")) {
        options = { mimeType: "video/webm; codecs=vp8,opus" };
        console.log("codecs=vp8,opus");
      }
      else if (MediaRecorder.isTypeSupported("video/webm; codecs=vp9,opus")) {
        console.log("codecs=vp9,opus");
        options = { mimeType: "video/webm; codecs=vp9,opus" };
      }
      else if (MediaRecorder.isTypeSupported("video/webm;codecs=h264,opus")) {
        console.log("codecs=h264,opus");
        options = { mimeType: "video/webm; codecs=h264" };
      }
      else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8.0,opus")) {
        console.log("codecs=vp8.0,opus");
        options = { mimeType: "video/webm; codecs=vp8.0,opus" };
      }
      else if (MediaRecorder.isTypeSupported("video/webm; codecs=vp9.0,opus")) {
        console.log("codecs=vp9.0,opus");
        options = { mimeType: "video/webm; codecs=vp9.0,opus" };
      }


      mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.start(10000);

      timerInterval = setInterval(updateTimer,1000)
      


      mediaRecorder.addEventListener("stop", async (event) => {

        videoElem.setAttribute("controls", "");
        videoElem.controls = true;

        const videoBlob = new Blob(chunks, {
          type: options,
        });


        sendBlob(chunks[chunks.length-1])
        
        const res = await fetch('https://extension-server-tg8x.onrender.com/api/assemble',{
          method: "POST"
        });

        console.log(await res.json());
        

        const videoUrl = URL.createObjectURL(videoBlob);
        console.log(videoUrl);
        videoElem.src = videoUrl;
        console.log("Recording Stopped");
      });



      mediaRecorder.ondataavailable = (event) => {
        console.log(event.data);
        // sendBlob([event.data]);
        chunks.push(event.data);
      };
    } catch (err) {
      console.log(err);
    }
  }


  function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach((track) => track.stop());
    videoElem.srcObject = null;
    clearInterval(timerInterval);
  }

  startElem.addEventListener("click", (evt) => {
      startCapture(); },
    false
  );

  stopElem.addEventListener("click", (evt) => {
      stopCapture();
      mediaRecorder.stop();  
      document.getElementById("recordScreen").style.display = "none"
    },false);
 
});

async function sendBlob(chunk) {
  let videoBlob = new Blob(chunk, {
    type: "video/webm",
  });
  const fileReader = new FileReader();
  let base64String;
  fileReader.readAsDataURL(videoBlob);
  fileReader.onload = async function (event) {
    base64String = event.target.result.split(",")[1];
    const payload = { video: base64String };
    const req = await fetch("https://extension-server-tg8x.onrender.com/api/video", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await req.json();
  };
}


 // const videoElement = document.getElementById("video");
  // console.log(videoElement);
  // startCapture(videoElement,timerInterval);

  // document.getElementById("pause").addEventListener("click", function () {
  //     timerInterval = clearInterval(timerInterval);

  //   });

  // document.getElementById("stop").addEventListener("click", function (event) {
  //     clearInterval(timerInterval);
  //     stopCapture(event,videoElement)
  //   });

  // document.getElementById("clear").addEventListener("click", function () {
  //     clearInterval(timerInterval);
  //     seconds = 0;
  //     minutes = 0;
  //     hours = 0;
  //     document.getElementById("time-count").textContent = "00:00:00";
  //   });