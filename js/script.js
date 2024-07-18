window.handleLinkClick = (event, listClassName, linkClassName) => {
  const links = document.querySelectorAll(listClassName);
  const targetLink = event.target;

  for (const link of links) {
    if (link.classList[1] === linkClassName) {
      link.classList.remove(linkClassName);
    }
  }

  targetLink.classList.add(linkClassName);
}

window.handleDropdownClick = (menuClassName, iconClassName, menuActiveClassName, iconActiveClassName) => {
  const menu = document.querySelector(menuClassName);
  const icon = document.querySelector(`${iconClassName} svg`);

  menu.classList.toggle(menuActiveClassName);
  icon.classList.toggle(iconActiveClassName);
}
