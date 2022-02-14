

window.onload = () => {
    detect();
  };


  
  async function detect() {
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
  
    function render() {
      barcodeDetector
        .detect(video)
        .then((barcodes) => {
          barcodes.forEach((barcode) => {
            if (!itemsFound.includes(barcode.rawValue)) {
              itemsFound.push(barcode.rawValue);
              const li = document.createElement("li");
              li.innerHTML = barcode.rawValue;
              const newBarcode = barcode.rawValue; 
              list.appendChild(li);
            }
          });
        })
        .catch(console.error);
    }

// barcode getter

// const barcode = li.innerHTML;
// const API_url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json` 

// // fetch
// fetch(API_url)
//   .then(results => results.json())
//   .then(data => {
//       console.log(data)
//     //   document.querySelector('.links').insertAdjacentHTML('afterbegin',
//     //     `<a href="${API_url}"> </a>`)
//     }
      
// )
//   .catch(error => console.log(error))

  
    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      render();
    })();
  }
  
  