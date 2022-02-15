window.onload = () => {
    detect();
  };

  const barcodeBlock = document.querySelector(".scanCode")
  const firstSection = document.querySelector("main section:nth-of-type(1)")
  const scanOtherBar = document.querySelector(".scanOtherCode")


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
              const getURL = 'https://world.openfoodfacts.org/api/v0/product/' + newBarcode+ '.json'
              
              fetch(getURL).then(response => response.json())
              .then(response => {
                  console.log(response.product)
          
                  const product = {
                      name: response.product.product_name,
                      brand: response.product.brand_owner,
                      // nutriscore_fat: response.product.nutrient_levels.fat,
                      // nutriscore_salt: response.product.nutrient_levels.salt,
                      // nutriscore_sugars: response.product.nutrient_levels.sugars,
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
              <p class="scanOtherCode"> Scan another code</p>      
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

// const barcode = "li.innerHTML";

    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      render();
    })();
  }

  console.log(barcodeBlock)
  console.log(firstSection)
  barcodeBlock.addEventListener("click", () => {
    firstSection.style.display = "none"
  })

  scanOtherBar.addEventListener("click", () => {
    firstSection.style.display = "block"
  })