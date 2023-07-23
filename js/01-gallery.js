import { galleryItems } from './gallery-items.js';

const imageCardsMarkup = createImageCards(galleryItems);
const imageCardContainer = document.querySelector('.gallery');
let modal; // Variable that is used to create a lightbox element, no idea how to make it acessible in onEscapeKeyPress otherwise
insertMarkup(imageCardsMarkup, imageCardContainer)

imageCardContainer.addEventListener('click', onImageClick);
window.addEventListener('keydown', onImageClick);


function createImageCards(images) {

    return images.map(({ preview, original, description }) => 
      `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`
    ).join('\n\n');
  
};

function insertMarkup(markup, location) {

  location.insertAdjacentHTML('beforeend', markup)
  
}

function onImageClick(event) {

  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  };
  
   modal = basicLightbox.create(
    `<img src="${event.target.dataset.source}" 
      alt="${event.target.dataset.description}">`,
    {
      onShow: onEscapeKeyPress,
      onClose: onEscapeKeyPress,
      closable: true,
    });
  
  modal.show();

  window.addEventListener('keydown', onEscapeKeyPress);
}

function onEscapeKeyPress(event) {
  if (event.code === "Escape") {
    modal.close();
  }
}



/*<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li>*/