export const getMyData = (video, getURL, loadingElement) =>{

fetch(getURL)
              .then(response => response.json())
              //   {
              //   return response.status >= 200 && response.status <= 299 ? response.json() : console.log('error')
              // })
               .then(response => {
                  console.log(response.product)

                  skeletonSection.innerHTML = ''
          
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
                            <p>Carbs per 100gr:  ${product.carbsPer100gram}</p>
                            <p class="toTheRight">sugars: ${product.sugarspercarbs}</p>
                            <p>Fat per 100gr:  ${product.fatPer100gram}</p> 
                            <p class="backToOriginal"><a href=".">Scan another code</a></p>      
                      </div>
                  `;
          
          document.querySelector("main section:nth-of-type(2)").innerHTML = markup;    
              })
              .catch(error => document.querySelector(".product").insertAdjacentHTML('beforebegin', error))
            
}