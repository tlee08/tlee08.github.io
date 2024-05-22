{
  const el_wlcm_msg = document.querySelector(".intro header");
  const scrollThreshold = 1;

  // For welcome message
  function welcomeFadeFunc() {
    // Getting the scroll position
    const scroll = window.scrollY;
    // Getting the viewport height
    const vh = window.innerHeight;
    // Getting the scroll position in vh
    const scrollvh = (scroll / vh) * 100;
    // Getting the total height of the document
    const totalHeight = document.documentElement.scrollHeight;
    // Getting the scroll position in total document height
    const scrollTotal = scroll / totalHeight;
    // Fading in/out the welcome message if the scroll position is greater than 5vh
    el_wlcm_msg.style.opacity = scrollvh > scrollThreshold ? 0 : 1;
  }

  document.addEventListener("scroll", welcomeFadeFunc);
  welcomeFadeFunc();
}
