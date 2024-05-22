{
  // Animations
  const kpFadein = [
    { opacity: 0 },
    { color: "#5497fa", offset: 0.9 },
    { opacity: 1, color: "#c7c7c7" },
  ];
  const kpFadeinLeft = [
    { opacity: 0, translate: "-5rem 0rem" },
    { opacity: 1, translate: "0rem 0rem" },
  ];
  const kpFadeout = [{ opacity: 0 }];
  // Animation options
  const kpInOptions = {
    duration: 1000,
    delay: 0,
    fill: "forwards",
    easing: "cubic-bezier(0.215, 0.610, 0.01, 1.000)",
  };
  const kpOutOptions = { duration: 0, fill: "forwards" };

  // Animation functions
  function animateFadeinEl(el) {
    animateFadeout(el);
    // Animate the element in left
    el.animate(kpFadeinLeft, kpInOptions);
  }
  function animateFadeinChildren(el) {
    animateFadeout(el);
    // If there are children, animate the element stationary
    el.animate(kpFadein, kpInOptions);
    // Then animate thethe children in left
    el.querySelectorAll(":scope > *").forEach((child, i) => {
      animateFadeout(child);
      // Animate the children in left
      child.animate(kpFadeinLeft, {
        ...kpInOptions,
        delay: i * 100,
      });
    });
  }
  function animateFadeinTable(el) {
    animateFadeout(el);
    // If there are children, animate the element stationary
    el.animate(kpFadein, kpInOptions);
    // Animate the headers in first
    const thLs = el.querySelectorAll("th");
    thLs.forEach((child, i) => {
      animateFadeout(child);
      // Animate the children in left
      child.animate(kpFadein, {
        ...kpInOptions,
        delay: i * 100,
      });
    });
    // Then animate the cells in random order
    let tdLs = Array.from(el.querySelectorAll("td"));
    tdLs = tdLs.sort(() => Math.random() - 0.5);
    tdLs.forEach((child, i) => {
      animateFadeout(child);
      // Animate the children in left
      child.animate(kpFadein, {
        ...kpInOptions,
        delay: (i + thLs.length) * 100,
      });
    });
  }
  function animateFadeout(el) {
    // Make both the element disappear
    el.animate(kpFadeout, kpOutOptions);
  }

  // Observer Factory
  function observerFactory(animateInFunc) {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.intersectionRatio > 0.3) {
            // Is coming INTO view
            animateInFunc(entry.target);
          } else if (entry.intersectionRatio == 0) {
            // Is going OUT of view
            animateFadeout(entry.target);
          }
        });
      },
      { threshold: [0, 0.3] }
    );
  }
  // Observers
  const obsFadinEl = observerFactory(animateFadeinEl);
  const obsFadinChildren = observerFactory(animateFadeinChildren);
  const obsFadinTable = observerFactory(animateFadeinTable);
  // Observing
  document
    .querySelectorAll(".fadein-el")
    .forEach((el) => obsFadinEl.observe(el));
  document
    .querySelectorAll(".fadein-children")
    .forEach((el) => obsFadinChildren.observe(el));
  document
    .querySelectorAll(".fadein-table")
    .forEach((el) => obsFadinTable.observe(el));
}
