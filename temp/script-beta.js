(function () {
    if (
      !"mediaDevices" in navigator ||
      !"getUserMedia" in navigator.mediaDevices
    ) {
      alert("Camera API is not available in your browser");
      return;
    }
  
    // Store elements
    const video = document.querySelector("#video-stream");
    const takeScreenshot = document.querySelector("#takeScreenshot");
    const switchCamera = document.querySelector("#switchCamera");
    const pictures = document.querySelector("#pictures");
    const canvasImageStore = document.querySelector("#canvasImageStore");
  
    // Use selfie
    let isSelfie = true;
  
    // current video stream
    let videoStream;
    
  
    // Video config
    const constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
      },
    };
  
  
  
    // Capture Image
    takeScreenshot.addEventListener("click", function () {
      const img = document.createElement("img");
      canvasImageStore.width = video.videoWidth;
      canvasImageStore.height = video.videoHeight;
      canvasImageStore.getContext("2d").drawImage(video, 0, 0);
      img.src = canvasImageStore.toDataURL("image/png");
      pictures.prepend(img);
    });
  
    // Switch camera
    switchCamera.addEventListener("click", function () {
      isSelfie = !isSelfie;
  
      initCamera();
    });
  
    // stop video stream
    function stopVideoStream() {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  
    // initialize
    async function initCamera() {
      // stopVideoStream();
      constraints.video.facingMode = isSelfie ? "user" : "environment";
  
      try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;
      } catch (err) {
        alert("Could not access the camera");
      }
    }
  
    initCamera();
  })();