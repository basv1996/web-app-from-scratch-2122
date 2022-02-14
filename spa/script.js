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
  