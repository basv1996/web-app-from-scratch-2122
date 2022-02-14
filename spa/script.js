barcode = "8715600243949"
API_url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`


// check compatibility
if (!('BarcodeDetector' in window)) {
    console.log('Barcode Detector is not supported by this browser.');
    document.querySelector('.support').insertAdjacentHTML('afterbegin',
        'Barcode Detector is not supported by this browser.')
  } else {
    console.log('Barcode Detector supported!');
    document.querySelector('.support').insertAdjacentHTML('afterbegin',
        'Barcode Detector supported!')
  
    // create new detector
    var barcodeDetector = new BarcodeDetector({formats: ['code_39', 'codabar', 'ean_13']});
  }

// get barcode
fetch(API_url)
  .then(results => results.json())
  .then(data => {
      console.log(data)
    })
  .catch(error => console.log(error))

  