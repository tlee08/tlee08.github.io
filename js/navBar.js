{
  const navBarData = { currentSection: null };

  // Making the nav bar elements (from the sections)
  const sections = Array.from(document.querySelectorAll("section:not(.intro)"));
  sections.forEach((element) => {
    const navLink = document.createElement("a");
    navLink.id = `${element.id}.nav`;
    navLink.href = `#${element.id}`;
    navLink.textContent = element.querySelector("header").textContent;
    document.querySelector("nav").appendChild(navLink);
  });

  // Making a helper func to get the corresponding nav el of a section
  const getSectionNavLink = (section) => {
    return document.getElementById(`${section.id}.nav`);
  };
  // The function that updates the nav bar based on the currently viewed section.
  // It first removes all current classes from the nav bar elements
  // Then finds the nearest section to the top of the page and sets it as the current section
  const updateNavBar = () => {
    // Resetting the current section
    if (navBarData.currentSection) {
      const elNav = getSectionNavLink(navBarData.currentSection);
      elNav.classList.remove("current");
      navBarData.currentSection = null;
    }
    // Setting vals
    let distance = Infinity;
    // For each section, getting the nearest section to the top of the page
    // which is equal to or after the top of the page
    sections.forEach((section) => {
      // Getting the section's distance from the top of the page
      const sectDistance = window.scrollY + 1 - section.offsetTop;
      // If the section is equal to or after the top of the page
      if (sectDistance >= 0) {
        // If the section is nearer to the top of the page
        if (sectDistance < distance) {
          navBarData.currentSection = section;
          distance = sectDistance;
        }
      }
    });
    // Setting the current section's nav to be highlighted as current
    if (navBarData.currentSection) {
      const elNav = getSectionNavLink(navBarData.currentSection);
      elNav.classList.add("current");
    }
  };

  window.addEventListener("scroll", updateNavBar);
}
