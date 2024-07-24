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

window.handleShowCloseListClick = (
  containerClassName,
  containerActiveClassName,
  textClassName,
  iconClassName,
  iconActiveClassName
) => {
  const container = document.querySelector(containerClassName);
  const icon = document.querySelector(`${iconClassName} svg`);
  const text = document.querySelector(textClassName);

  container.classList.toggle(containerActiveClassName);
  icon.classList.toggle(iconActiveClassName);
  
  container.classList.contains(containerActiveClassName)
    ? text.textContent = "Показать список машин"
    : text.textContent = "Свернуть список машин"

}

window.handleShowMoreClick = (
  mainContainerClassName, 
  buttonClassName, 
  containerClassName, 
  elementsClassName, 
  elementsClassNameInactive
) => {
  const mainContainer = document.querySelector(mainContainerClassName);
  const container = document.querySelector(containerClassName);
  const button = document.querySelector(buttonClassName);
  const list = document.querySelectorAll(elementsClassName);
  const listArray = [...list];

  listArray.forEach((item) => 
    item.classList.remove(elementsClassNameInactive)
  );

  mainContainer.removeChild(button);
  container.innerHTML = "";
  container.append(...listArray);
}

window.handleScreenResizeOnload = (elementsClassName, elementsClassNameInactive) => {
  const screenWidth = window.innerWidth;
  const list = document.querySelectorAll(elementsClassName);
  const totalElements = list.length;
  const numVisible = getNumVisibleElements(screenWidth, totalElements);
  
  updateElementVisibility(elementsClassName, elementsClassNameInactive, numVisible);
};

function getNumVisibleElements(screenWidth, totalElements) {
  const MOBILE_SCREEN_AMOUNT = 3;
  const TABLET_SCREEN_AMOUNT = 6;
  
  if (screenWidth < 768) {
    return MOBILE_SCREEN_AMOUNT;
  } else if (screenWidth < 1440) {
    return TABLET_SCREEN_AMOUNT;
  } else {
    return totalElements;
  }
}

function updateElementVisibility(elementsClassName, elementsClassNameInactive, numVisible) {
  const list = document.querySelectorAll(elementsClassName);
  const listArray = [...list];

  listArray.forEach((item, index) => {
    if (index < numVisible) {
      item.classList.remove(elementsClassNameInactive);
    } else {
      item.classList.add(elementsClassNameInactive);
    }
  });
};

let currentRenaultImageIndex = 0;
let currentVolkswagenImageIndex = 0;
let currentBMWImageIndex = 0;

function defineSliderType(type) {
  switch (type) {
    case "Renault":
      return {
        index: currentRenaultImageIndex,
        setIndex: (value) => currentRenaultImageIndex = value
      };
    case "Volkswagen":
      return {
        index: currentVolkswagenImageIndex,
        setIndex: (value) => currentVolkswagenImageIndex = value
      };
    case "BMW":
      return {
        index: currentBMWImageIndex,
        setIndex: (value) => currentBMWImageIndex = value
      };
  }
}

function showImage(type, index) {
  const images = document.querySelectorAll(`.main__content__top-cars__slide--${type}`);
  
  images.forEach((image, i) => {
    image.classList.toggle('main__content__top-cars__slide--active', i === index);
  });
}

window.handlePrevImageClick = (type) => {
  let slider = defineSliderType(type);

  slider.index = (slider.index > 0) ? slider.index - 1 : document.querySelectorAll(`.main__content__top-cars__slide--${type}`).length - 1;
  slider.setIndex(slider.index);
  showImage(type, slider.index);
}

window.handleNextImageClick = (type) => {
  let slider = defineSliderType(type);

  slider.index = (slider.index < document.querySelectorAll(`.main__content__top-cars__slide--${type}`).length - 1) ? slider.index + 1 : 0;
  slider.setIndex(slider.index);
  showImage(type, slider.index);
}
