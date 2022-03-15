import { product } from "./renderProduct.js";

export const markup = `
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
`