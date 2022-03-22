import * as errorMsg from "./error.js";
import { product } from "./renderData.js";
import { markup } from "./markup.js";

export const getMyData = (video, getURL, loadingElement) =>{
   

fetch(getURL)
            .then(response => response.json())
            .then(response => {
                  console.log("response . product: ", response.product)
                     //skeletonSection.innerHTML = ''
                  product(response);
                  //markup();
                  // const theMain = document.querySelector("main section:nth-of-type(2)");
                  //const videoEL = document.querySelector("main section:nth-of-type(2) video")
                  //theMain.insertAdjacentHTML("afterbegin", markup);
                  video.remove()
            })
            .catch(error => document.querySelector("main").insertAdjacentHTML('afterbegin', error))
  }