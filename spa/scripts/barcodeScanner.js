import { getMyData } from "./modules/getData.js"

  const barcodeBlock = document.querySelector(".scanCode")
  const fillInyourselfChose = document.querySelector(".fillInYourself")
  const choseYourMethod = document.querySelector(".choseYourMethod")
  const barCodeScannerSection = document.querySelector(".barCodeScannerSection")
  const fillInYourselfSection = document.querySelector(".fillInYourselfSection")
  const scanOtherBar = document.querySelector(".scanOtherCode")
  const backToOrigin = document.querySelector(".backToOriginal")
  const searchBtn = document.querySelector("form input[type=submit]")
  const form = document.querySelector("form")
  const skeletonSection = document.querySelector("section:first-of-type")
  const loadingElement = document.querySelector(".LoaderContainer")


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
      loadingElement.classList.add("hidden")
      barcodeDetector
        .detect(video)
        .then((barcodes) => {
          barcodes.forEach((barcode) => {
            if (!itemsFound.includes(barcode.rawValue)) {
              itemsFound.push(barcode.rawValue);
              const newBarcode = barcode.rawValue; 
              const getURL = 'https://world.openfoodfacts.org/api/v0/product/' + newBarcode + '.json'


              // skeletonSection.innerHTML = `
              // <section>
              // <svg width='100%' height='90vh' class="skeletor">
              //              <rect width='100%' height='30vh' />
              //              <rect transform='translate(20, 375)' width='30%' height='2em' />
              //              <rect transform='translate(20, 440)' width='30%' height='1.5em' />
              //              <rect transform='translate(20, 470)' width='25%' height='1em' />
              //              <rect transform='translate(20, 490)' width='25%' height='1em' />
              //              <rect transform='translate(20, 510)' width='25%' height='1em' />
              //              <rect transform='translate(20, 530)' width='25%' height='1em' />
              // </svg>
              // </section>
              // `
              
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
  })

  fillInyourselfChose.addEventListener("click", () => {
    choseYourMethod.classList.toggle("hidden")
    fillInYourselfSection.classList.toggle("hidden")
  })

  backToOrigin.addEventListener("click", () => {
    choseYourMethod.classList.toggle("hidden")
    fillInYourselfSection.classList.toggle("hidden")
  })

form.addEventListener("submit", getInputValue)
