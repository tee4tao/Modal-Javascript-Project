let items = [
  {
    id: 1,
    img: `./img/sweets-1.jpeg`,
    itemName: `Sweet Item`,
    itemPrice: `$5`,
  },
  {
    id: 2,
    img: `./img/cupcake-1.jpeg`,
    itemName: `Cupcake Item`,
    itemPrice: `$5`,
  },
  {
    id: 3,
    img: `./img/cake-1.jpeg`,
    itemName: `Cake Item`,
    itemPrice: `$5`,
  },
  {
    id: 4,
    img: `./img/doughnut-1.jpeg`,
    itemName: `Doughnut Item`,
    itemPrice: `$5`,
  },
  {
    id: 5,
    img: `./img/sweets-2.jpeg`,
    itemName: `Sweet Item`,
    itemPrice: `$10`,
  },
  {
    id: 6,
    img: `./img/cupcake-2.jpeg`,
    itemName: `Cupcake Item`,
    itemPrice: `$10`,
  },
  {
    id: 7,
    img: `./img/cake-2.jpeg`,
    itemName: `Cake Item`,
    itemPrice: `$10`,
  },
  {
    id: 8,
    img: `./img/doughnut-2.jpeg`,
    itemName: `Doughnut Item`,
    itemPrice: `$10`,
  },
  {
    id: 9,
    img: `./img/sweets-3.jpeg`,
    itemName: `Sweet Item`,
    itemPrice: `$15`,
  },
  {
    id: 10,
    img: `./img/cupcake-3.jpeg`,
    itemName: `Cupcake Item`,
    itemPrice: `$15`,
  },
  {
    id: 11,
    img: `./img/cake-3.jpeg`,
    itemName: `Cake Item`,
    itemPrice: `$15`,
  },
  {
    id: 12,
    img: `./img/doughnut-3.jpeg`,
    itemName: `Doughnut Item`,
    itemPrice: `$15`,
  },
];
let toggleBtn = document.querySelector(`.toggle-btn`);
let navLinks = document.querySelector(`.nav-links`);
let navContainer = document.querySelector(`.nav-container`);
toggleBtn.addEventListener(`click`, function () {
  let containerHeight = navContainer.getBoundingClientRect().height;
  let linksHeight = navLinks.getBoundingClientRect().height;
  console.log(linksHeight);
  if (containerHeight === 0) {
    navContainer.style.height = `${linksHeight}px`;
  } else {
    navContainer.style.height = 0;
  }
});

let storeItems = document.querySelector(`.store-items`);
window.addEventListener(`DOMContentLoaded`, function () {
  showItem(items);
});

function showItem(junksItems) {
  let displayView = junksItems.map(function (item) {
    return `<article class="single-item">
              <div class="item-photos">
              
              <span><a href="#"><img src=${item.img} alt=${item.name} class="item-photo"></a><a href="#"><i class="fa-solid fa-cart-shopping shopping-cart"></i></a></span>
              </div>
              <div class="header-info">
              <h4 class="item-name">${item.itemName}</h4>
              <h4 class="item-price">${item.itemPrice}</h4>
              </div>
              </article>`;
  });
  let displayViews = displayView.join(``);
  storeItems.innerHTML = displayViews;
}

setTimeout(function () {
  let itemPhoto = document.querySelectorAll(`.item-photo`);
  let itemPhotos = document.querySelectorAll(`.item-photos`);
  let modalOverlay = document.querySelector(`.modal-overlay`);
  let modalImg = document.querySelector(`.modal-img`);
  let previewImg = document.querySelector(`.preview-img`);
  let closeBtn = document.querySelector(`.close-btn`);
  let rightBtn = document.querySelector(`.right-btn`);
  let leftBtn = document.querySelector(`.left-btn`);
  let shoppingCart = document.querySelectorAll(`.shopping-cart`);
  let imgs = items.map(function (item) {
    return item.img;
  });
  function showItems(eachImg) {
    previewImg.src = imgs[eachImg];
  }
  itemPhotos.forEach(function (item) {
    item.addEventListener(`mouseenter`, function () {
      let photos = item.children[0].children[0].children[0];
      photos.classList.add(`photo-active`);
      let cart = item.children[0].children[1].children[0];
      cart.classList.add(`cart-active`);
    });
    item.addEventListener(`mouseleave`, function () {
      let photos = item.children[0].children[0].children[0];
      photos.classList.remove(`photo-active`);
      let cart = item.children[0].children[1].children[0];
      cart.classList.remove(`cart-active`);
    });
  });
  itemPhoto.forEach(function (photo) {
    photo.addEventListener(`click`, function (e) {
      e.preventDefault();
      modalOverlay.style.visibility = `visible`;
      let imgSrc = e.target.getAttribute(`src`);
      previewImg.src = imgSrc;
      console.log(e.target.getAttribute(`src`));
      console.log(imgs.indexOf(imgSrc));
      let currentItem = imgs.indexOf(imgSrc);

      rightBtn.addEventListener(`click`, function () {
        currentItem++;
        if (currentItem > imgs.length - 1) {
          currentItem = 0;
        }
        showItems(currentItem);
      });
      leftBtn.addEventListener(`click`, function () {
        currentItem--;
        if (currentItem < 0) {
          currentItem = imgs.length - 1;
        }
        showItems(currentItem);
      });

      closeBtn.addEventListener(`click`, function () {
        modalOverlay.style.visibility = `hidden`;
      });
    });
  });
  shoppingCart.forEach(function (carts) {
    carts.addEventListener(`click`, function (e) {
      e.preventDefault();
      modalOverlay.style.visibility = `visible`;
      previewImg.style.display = `none`;
      let currentItem = 0;
      rightBtn.addEventListener(`click`, function () {
        previewImg.style.display = `block`;
        if (currentItem > imgs.length - 1) {
          currentItem = 0;
        }
        showItems(currentItem);
        currentItem++;
      });
      leftBtn.addEventListener(`click`, function () {
        previewImg.style.display = `block`;
        currentItem--;
        if (currentItem < 0) {
          currentItem = imgs.length - 1;
        }
        showItems(currentItem);
      });
    });
  });
  closeBtn.addEventListener(`click`, function () {
    modalOverlay.style.visibility = `hidden`;
  });
}, 100);
