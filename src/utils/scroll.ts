export const scrollToAnchor = (targetId: string) => {
  const headerElement = document.querySelector("#header");
  const stickyHeaderHeight = headerElement
    ? headerElement.getBoundingClientRect().height
    : 0;

  const target = document.getElementById(targetId);
  if (target) {
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.scrollY - stickyHeaderHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
