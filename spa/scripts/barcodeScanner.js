import { getMyData } from "./modules/getData.js"
import { loader } from "./modules/loading.js"
import "./modules/vendor/routie.min.js";
import { skeletor } from "./modules/skeleton.js";
import { handleRoutes } from "./modules/router.js";

  const barcodeBlock = document.querySelector(".scanCode")
  const fillInyourselfChose = document.querySelector(".fillInYourself")
  const choseYourMethod = document.querySelector(".choseYourMethod")
  const barCodeScannerSection = document.querySelector(".barCodeScannerSection")
  const fillInYourselfSection = document.querySelector(".fillInYourselfSection")
  // const scanOtherBar = document.querySelector(".scanOtherCode")
  const backToOrigin = document.querySelector(".backToOriginal")
  // const searchBtn = document.querySelector("form input[type=submit]")
  const form = document.querySelector("form")
  const skeletonSection = document.querySelector("section:first-of-type")
  const loadingElement = document.querySelector(".LoaderContainer")


  // window.addEventListener('hashchange', function() {
  //   if(window.location.hash == '#barcodeScanner') {
  //     console.log("helo there nummero 1")
  //   } else if(window.location.hash == '#formBarcode') {
  //     console.log("hello there formuliertje")
  //   }  else if(window.location.hash == '') {
  //     console.log("hello there no hash")
  //   }
  //   else {
  //     console.log("nothing to see here");
  //   }
  // });

  // window.addEventListener('hashchange', handleRoutes())

  
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
      //loader
      loadingElement.classList.add("hidden")
      barcodeDetector
        .detect(video)
        .then((barcodes) => {
          barcodes.forEach((barcode) => {
            if (!itemsFound.includes(barcode.rawValue)) {
              itemsFound.push(barcode.rawValue);
              const newBarcode = barcode.rawValue; 
              const getURL = 'https://world.openfoodfacts.org/api/v0/product/' + newBarcode + '.json';
              
              skeletonSection.insertAdjacentHTML("afterbegin", skeletor);

              getMyData(video, getURL, loadingElement)
           
            }
          });
        })
        .catch(console.error);
    }

// barcode getter

    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      render();
      // checkIfScannerIsLoaded()
    })();
  }

  function getInputValue(event) {
    //debugger;
    event.preventDefault();
    const userInput = document.querySelector(".inputSearch").value; 
    console.log("user input: ", userInput);
    return userInput;
  }

  barcodeBlock.addEventListener("click", () => {
    detect();
    choseYourMethod.classList.toggle("hidden")
    barCodeScannerSection.classList.toggle("hidden")
    window.location.hash = '#barcodeScanner';
  })

  fillInyourselfChose.addEventListener("click", () => {
    choseYourMethod.classList.toggle("hidden")
    fillInYourselfSection.classList.toggle("hidden")
    window.location.hash = '#formBarcode';
  })

  backToOrigin.addEventListener("click", () => {
    choseYourMethod.classList.toggle("hidden")
    fillInYourselfSection.classList.toggle("hidden")
  })

form.addEventListener("submit", getInputValue)
