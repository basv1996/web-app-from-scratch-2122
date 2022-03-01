export const barCodeDetect = () => {}

const barcodeDetector = new BarcodeDetector();
const list = document.getElementById("barcode-list");
let itemsFound = [];
const mediaStream = await navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
});

const video = document.createElement("video");
video.srcObject = mediaStream;
video.autoplay = true;

list.before(video);

}