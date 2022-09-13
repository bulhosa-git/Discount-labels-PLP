//Init
//Wait for DOM content to be ready
if( document.readyState !== 'loading' ) {
    //console.log("Document is already ready");
    //Run script
    beginLabels();
    
} else {
    //console.log("Document was not ready");
    window.addEventListener("load", function () {
        //console.log("Document is now ready");
        //Run script
        beginLabels();
    });
}

function beginLabels() {
    //console.log("Begin script");   
    var hasPromo =  document.querySelectorAll(".product-info-price__old");

    if(hasPromo.length > 0) {
        //console.log("PROMO found ;-)");
        var hasGrid = document.querySelectorAll(".plp__grid");
        var hasProductCol = document.querySelectorAll(".product-info-main");

        //Ativa %% PRODUCT labels
        if(hasGrid.length == 0 && hasProductCol.length > 0) {
            //console.log("Ativa labels PRODUCT PAGE");
            //This will add a special price label to the product details page
            addLabelsProductPage(); 
        }

        //Ativa %% GRID labels
        if(hasGrid.length > 0) {
            //console.log("Ativa labels GRID");
            //Add labels on PLP
            addLabelsGrid();

            //Look for product GRID
            //addEventListener to it's container
            var gridContainer = document.querySelectorAll(".product-items");

            if(gridContainer.length > 0) {
                //console.log("Ativa addEventListener");
                var nUls = document.querySelectorAll(".plp__grid-item").length;
                //console.log("Current nUls: " + nUls);

                //Re-run the script everytime new items are added to the grid (scroll based load)
                gridContainer[0].addEventListener('DOMNodeInserted', function () {
                        newUls = document.querySelectorAll(".plp__grid-item").length;
                        if(newUls > nUls) { //new UL was added
                            nUls = newUls;
                            addLabelsGrid(); 
                            //console.log("A node was inserted into .product-items ;-) [newUls: " + newUls + "]");
                        }
                }); //end [container.addEventListener]
            }
        }

    } else {
        //console.log("No PROMO found ;-(");
    } //end [hasPromo.length > 0]
}
  
function addLabelsGrid() {
    var cImages = document.querySelectorAll(".plp__grid-item");
    //console.log("Inícia rotina % LABELS GRID (" + cImages.length + ")");
    //console.log("--");

    for (var i = 0; i < cImages.length; i++) {
        //console.log("Image: " + i + " of " + cImages.length);
      
        if(!cImages[i].classList.contains("hasLabel")) {
            cImages[i].classList.add("hasLabel");
            //console.log("Img " + i + " > added hasLabel");
          
            var priceO =  cImages[i].querySelector(".product-info-price__old");
          
            if (typeof(priceO) != 'undefined' && priceO != null) { //Safety first
                priceO = priceO.querySelector("span span.price").innerHTML;
                var priceF = cImages[i].querySelector(".product-info-price__final span span.price").innerHTML;

                priceO = Number(priceO.slice(0, priceO.indexOf("&")).replace(",", "."));
                priceF = Number(priceF.slice(0, priceF.indexOf("&")).replace(",", "."));
                
                //console.log("P Old Number: " + priceO);
                //console.log("P Final Number: " + priceF);

                //Calculate the discount % based on both values
                var percDiff = Math.abs( 100 - ((priceF*100)/priceO) );
                //console.log("percDiff: " + percDiff);
                percDiff = Math.floor(percDiff);
                //console.log("percDiff Floor: " + percDiff);

                //Inject label
                if(!isNaN(percDiff)) {
                var dLabel = '<dLabel><p>-' + percDiff +'%</p></dLabel>';
                cImages[i].querySelector(".product-item-photo-wrapper").insertAdjacentHTML("beforeend", dLabel);
                //console.log("Added label to image " + i + " with discount of " + percDiff + "%");
                }
            } else {
              //console.log("Skip image w/ no promo");
            } //end [if price != null]
        } else {
            //console.log("Skip image w/ hasLabel");
        }
    }  //end for loop
}

function addLabelsProductPage() {
  var cProduct =  document.querySelectorAll(".product-info-price__old");

  //console.log("Inícia rotina % LABELS PRODUCT (" + nPromo + ")");
  for (var i = 0; i < cProduct.length; i++) {
    var priceO = cProduct[i].querySelector("span span.price").innerHTML;
    var priceF = cProduct[i].closest(".pdp-info-price").querySelector(".product-info-price__final span span.price").innerHTML;
                  
    priceO = Number(priceO.slice(0, priceO.indexOf("&")).replace(",", "."));
    priceF = Number(priceF.slice(0, priceF.indexOf("&")).replace(",", "."));

    var percDiff = Math.abs( 100 - ((priceF*100)/priceO) );
    percDiff = Math.floor(percDiff);

    if(!isNaN(percDiff)) {
      var dLabel = '&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;-' + percDiff +'%';
      cProduct[i].closest(".pdp-info-price").querySelector(".product-info-price__final span span.price").insertAdjacentHTML("beforeend", dLabel);
      //console.log("Added label to page with discount of " + percDiff + "%");
    }   
  }
}