import "./vendor/routie.min.js";

export function handleRoutes() {
    routie({
            '': () => {
                console.log("chose method");

            }
        },
        {
            'barcodeScanner': () => {
                console.log("barcode scanner section");

            }
        },
        {
            'barcodeScanner/:id': () => {
                console.log("fill in yourself");
            }
        },
        {
            'fillInYourselfSection': () => {
                console.log("fill in yourself");
            }
        },

    )
}