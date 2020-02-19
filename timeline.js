(function() {

  // Start
  window.addEventListener("load", tmInit);
  window.addEventListener("resize", tmInit);

  function tmInit() {
    const tm = document.querySelector(".tm");
    if (!tm) return;
    const tmRow = tm.querySelector(".tm-inner");
    const tmItems = tm.querySelectorAll(".tm-item");

    let requiredWidth = getTotalWidth(tmRow, tmItems);

    setView(tm, requiredWidth);
  }

  function setView(tm, requiredWidth) {
    if ( tm.offsetWidth < requiredWidth ) {

      // Change to mobile view
      if (tm.classList.contains('js-mobile')) return;

      tm.classList.add('js-mobile');
    } else {

      // Change to desktop view
      if (!tm.classList.contains('js-mobile')) return;

      tm.classList.remove('js-mobile');
    }
  }

  function getTotalWidth(row, items) {
    let totalWidth = 0;
    let offset = 0; // Offset between row & any item

    // Get margin left value (absolute, numeric)
    offset = Math.abs(parseInt(getComputedStyle(items[0]).marginLeft));

    // All items have equal width - important!
    totalWidth = (items[0].offsetWidth * 2) + (offset * 2);
    return totalWidth;
  }
  
})();