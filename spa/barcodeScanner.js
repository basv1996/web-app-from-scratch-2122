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

    // function checkIfScannerIsLoaded() {
    //   const vidElement = docuemnt.querySelector("video")

    //   if(!document.body.contains(vidElement)){
    //       console.log("no video")
    //   }
    // }

    // checkIfScannerIsLoaded()
  

    function render() {

      barcodeDetector
        .detect(video)
         loadingElement.classList.add("hidden")
        .then((barcodes) => {
          barcodes.forEach((barcode) => {
            if (!itemsFound.includes(barcode.rawValue)) {
              itemsFound.push(barcode.rawValue);
              const li = document.createElement("li");
              li.innerHTML = barcode.rawValue;
              const newBarcode = barcode.rawValue; 
              list.appendChild(li);
              const getURL = 'https://world.openfoodfacts.org/api/v0/product/' + newBarcode+ '.json'


              skeletonSection.innerHTML = `
              <section>
              <svg width='100%' height='90vh' class="skeletor">
                           <rect width='100%' height='30vh' />
                           <rect transform='translate(20, 375)' width='30%' height='2em' />
                           <rect transform='translate(20, 440)' width='30%' height='1.5em' />
                           <rect transform='translate(20, 470)' width='25%' height='1em' />
                           <rect transform='translate(20, 490)' width='25%' height='1em' />
                           <rect transform='translate(20, 510)' width='25%' height='1em' />
                           <rect transform='translate(20, 530)' width='25%' height='1em' />
              </svg>
              </section>
              `
              
              fetch(getURL)
              .then(response => response.json())
              //   {
              //   return response.status >= 200 && response.status <= 299 ? response.json() : console.log('error')
              // })
               .then(response => {
                  console.log(response.product)

                  //skeletonSection.innerHTML = ''
          
                  const product = {
                      name: response.product.product_name,
                      brand: response.product.brand_owner,
                      kcal100gram: response.product.nutriments['energy-kcal_100g'],
                      carbsPer100gram: response.product.nutriments['carbohydrates_100g'],
                      sugarspercarbs: response.product.nutriments['sugars_100g'],
                      fatPer100gram: response.product.nutriments['fat_100g'],
                      proteinsPer100gram: response.product.nutriments['proteins_100g'],
                                          
                      nutriments: response.product.nutriments,
                      img: response.product.image_front_url
                  }
          
                  const markup = `
                    <div class="product">
                      <img src=${product.img}>
                        <h2>
                           <b>Name:</b> ${product.name} 
                         </h2>
                          <h3> Nutriments: </h3>
                            <p>kcal per 100gr:  ${product.kcal100gram}</p>
                            <p>Total Carbohybrates per 100gr:  ${product.carbsPer100gram}</p>
                            <p class="toTheRight">sugars: ${product.sugarspercarbs}</p>
                            <p>Fat per 100gr:  ${product.fatPer100gram}</p> 
                            <p class="backToOriginal"><a href=".">Scan another code</a></p>      
                      </div>
                  `;
          
          document.querySelector("main section:nth-of-type(2)").innerHTML = markup;    
              })
              .catch(error => document.body.insertAdjacentHTML('beforebegin', error))
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
    // fillInYourselfSection.classList.toggle("hidden")
    barCodeScannerSection.classList.toggle("hidden")
  })

  fillInyourselfChose.addEventListener("click", () => {
    choseYourMethod.classList.toggle("hidden")
    fillInYourselfSection.classList.toggle("hidden")
    // barCodeScannerSection.classList.toggle("hidden")
  })

  backToOrigin.addEventListener("click", () => {
    choseYourMethod.classList.toggle("hidden")
    fillInYourselfSection.classList.toggle("hidden")
    // barCodeScannerSection.classList.toggle("hidden")
  })

form.addEventListener("submit", getInputValue)
