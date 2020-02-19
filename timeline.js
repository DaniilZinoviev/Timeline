(function() {

  // Start
  window.addEventListener("load", tmInit);
  window.addEventListener("resize", tmInit);  

  function tmInit() {

    // Vars
    const tm = document.querySelector(".tm"),
          row = tm.querySelector(".tm-inner"),
          tmItems = tm.querySelectorAll(".tm-item");

    if ( window.innerWidth > 768 ) {   // On Desktop version
      setRowWidth(row, tmItems);
      setRowPadding(tm, tmItems);
      arrangeItems(tmItems);
    } else {   // On Mobile version
      clearStyles(tm, row, tmItems);
    }
  }


  // Set width for .tm-inner based on width of items
  function setRowWidth(row, items) {

    let offset = 10,   // Offset between items and row (.tm-inner)
        summaryWidth = 0;   // Width of all items in top row

    // Is items number odd or even
    let parity = 0;   

    // If even - parity = 1, if odd - parity = 0
    items.length % 2 ? parity = 0 : parity = 1;   

    // Calculate summary width of top items (parity = 0) or of bottom items (parity = 1)
    for (let i = parity; i < items.length; i+=2) {
      summaryWidth += items[i].offsetWidth + offset;
    }

    // Remove last offset
    summaryWidth -= offset; 

    // Set width for row (.tm-inner)
    row.style.width = summaryWidth + "px";
  }


  // Set padding for .tm elem based on height of items & offset
  function setRowPadding(tm, items) {

    let offset = 16, // Offset between line & items
        paddingTop = 0,
        paddingBottom = 0,
        highest; // Index of highest element

    // Get highest item between top items (odd .tm-items)
    highest = 0;
    for (let i = 0; i < items.length; i+=2) {  
      if (items[highest].offsetHeight < items[i].offsetHeight) {
        highest = i;
      }
    }
    paddingTop = items[highest].offsetHeight + offset;

    // Get highest item between bottom items (even .tm-items)
    highest = 1;
    for (let i = 1; i < items.length; i+=2) {  
      if (items[highest].offsetHeight < items[i].offsetHeight) {
        highest = i;
      }
    }
    paddingBottom = items[highest].offsetHeight + offset;

    // Set styles for .tm
    tm.style.paddingTop = paddingTop + "px";
    tm.style.paddingBottom = paddingBottom + "px";
  }

  // Arrange items
  function arrangeItems(elems) {

    let elemWidth = elems[0].offsetWidth,         // Elem width (all elems have equal width)
        offset = 10,                              // Offset between items
        coefficient = (elemWidth + offset) / 2;   // Value to increase left property

    // For each element ...
    for (let i = 0; i < elems.length; i++) {

      // Set left offset for each element, based on its index
      elems[i].style.left = (i * coefficient) + 'px';
    }
  }

  // Clear styles written with js ( For mobile version )
  function clearStyles(tm, row, items) {

    // Clear style attribute for .tm
    tm.setAttribute("style", "");

    // Clear style attribute for .tm-inner
    row.setAttribute("style", "");

    // Clear style for each item
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute("style", "");
    }

  }
  
})();