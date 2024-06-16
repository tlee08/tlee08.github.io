{
  // Animations
  const kpFi = [
    { opacity: 0 },
    { color: "#5497fa", offset: 0.9 },
    { opacity: 1, color: "#c7c7c7" },
  ];
  const kpFiLeft = [
    { opacity: 0, translate: "-5rem 0rem" },
    { opacity: 1, translate: "0rem 0rem" },
  ];
  const kpFo = [{ opacity: 0 }];
  // Animation options
  const kpFiOptions = {
    duration: 1000,
    delay: 0,
    fill: "forwards",
    easing: "cubic-bezier(0.215, 0.610, 0.01, 1.000)",
  };
  const kpFoOptions = { duration: 0, fill: "forwards" };

  // Animation functions
  function animateFiEl(el) {
    // Reset the element's animation
    animateFo(el);
    // Animate the element in left
    el.animate(kpFiLeft, kpFiOptions);
  }
  function animateFiElSoft(el) {
    // Reset the element's animation
    animateFo(el);
    // Animate the element in left
    el.animate(kpFi, {
      ...kpFiOptions,
      delay: 500,
      easing: "cubic-bezier(0.820, 0.085, 0.680, 0.600)", // Make the easing slower at the very end
    });
  }
  function animateFiChildren(el) {
    // Reset the element's animation
    animateFo(el);
    // If there are children, animate the element stationary
    el.animate(kpFi, kpFoOptions);
    // Then animate thethe children in left
    el.querySelectorAll(":scope > *").forEach((child, i) => {
      // Reset the child's animation
      animateFo(child);
      // Animate the children in left
      child.animate(kpFiLeft, {
        ...kpFiOptions,
        delay: i * 100,
      });
    });
  }
  function animateFiTable(el) {
    animateFo(el);
    // If there are children, animate the element stationary
    el.animate(kpFi, kpFiOptions);
    // Animate the headers in first
    const thLs = el.querySelectorAll("th");
    thLs.forEach((child, i) => {
      animateFo(child);
      // Animate the children in left
      child.animate(kpFi, {
        ...kpFiOptions,
        delay: i * 100,
      });
    });
    // Then animate the cells in random order
    let tdLs = Array.from(el.querySelectorAll("td"));
    tdLs = tdLs.sort(() => Math.random() - 0.5);
    tdLs.forEach((child, i) => {
      animateFo(child);
      // Animate the children in left
      child.animate(kpFi, {
        ...kpFiOptions,
        delay: (i + thLs.length) * 100,
      });
    });
  }
  function animateFo(el) {
    // Make both the element disappear
    el.animate(kpFo, kpFoOptions);
  }

  // Observer Factory
  function observerFactory(animateInFunc, el_ls) {
    // Make a new observer
    const intObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.intersectionRatio > 0.3) {
            // Is coming INTO view
            animateInFunc(entry.target);
          } else if (entry.intersectionRatio == 0) {
            // Is going OUT of view
            animateFo(entry.target);
          }
        });
      },
      { threshold: [0, 0.3] }
    );
    // Observing the given elements
    el_ls.forEach((el) => intObs.observe(el));
    // Return the observer
    return intObs;
  }
  // Making Observers
  const obsFadinEl = observerFactory(
    animateFiEl,
    document.querySelectorAll(".fi-el")
  );
  const obsFadinElSoft = observerFactory(
    animateFiElSoft,
    document.querySelectorAll(".fi-el-soft")
  );
  const obsFadinChildren = observerFactory(
    animateFiChildren,
    document.querySelectorAll(".fi-children")
  );
  const obsFadinTable = observerFactory(
    animateFiTable,
    document.querySelectorAll(".fi-table")
  );
}
