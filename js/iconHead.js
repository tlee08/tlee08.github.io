{
  const elIcon = document.querySelector(".icon-head");
  const scrollThreshold = 5;

  const iconData = { pageIsTop: true };

  const animatePageTop_1 = [
    { translate: "-40vw -2rem" },
    { translate: "0vw 0vh" },
  ];
  const animatePageTop_2 = [
    { backgroundColor: "var(--tertiary-bg-color)" },
    { backgroundColor: "transparent" },
  ];
  const animatePageDown_1 = animatePageTop_1.slice().reverse();
  const animatePageDown_2 = animatePageTop_2.slice().reverse();
  const animateOptions = {
    duration: 300,
    fill: "forwards",
    easing: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  };

  // For icon movement and background
  function scrollMoveElement() {
    // Getting the scroll position
    const scroll = window.scrollY;
    // Getting the viewport height
    const scrollvh = (scroll / window.innerHeight) * 100;
    // Getting whether the page is at the top
    const pageIsTop = scrollvh < scrollThreshold;
    // If the icon needs to be moved (i.e. pageIsTop has changed)
    if (iconData.pageIsTop != pageIsTop) {
      iconData.pageIsTop = pageIsTop;
      elIcon.animate(
        pageIsTop ? animatePageTop_1 : animatePageDown_1,
        animateOptions
      ).onfinish = () => {
        elIcon.animate(
          pageIsTop ? animatePageTop_2 : animatePageDown_2,
          animateOptions
        );
      };
    }
  }

  document.addEventListener("scroll", scrollMoveElement);
}
