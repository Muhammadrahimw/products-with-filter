let products = document.querySelector(".products");
let allBtn = document.getElementById("all");
let menBtn = document.getElementById("menCloths");
let womenBtn = document.getElementById("womenCloths");
let jeweleryBtn = document.getElementById("jewelery");
let electtricsBtn = document.getElementById("elctrics");
let btn = document.querySelectorAll(".btn");
let loader = document.querySelector(".loader");
let cloneData = null;

let createItem = (element, className, add) => {
  let newItem = document.createElement(element);
  newItem.classList.add(className);
  add.append(newItem);
  return newItem;
};

// star = createItem("i", "fa-solid", rating);
// star.classList.add("fa-star");
// shortStarFunc(star, "fa-solid", "fa-star");

// let shortStarFunc = (className, classNameTwo) => {
//   let starElement = createItem("i", className, rating);
//   starElement.classList.add(classNameTwo);
//   return starElement;
// };

let styling = (style, ...items) => {
  items.forEach((element) => {
    element.style.display = style;
  });
};

let filterCategories = (data, btnName, category) => {
  btnName.addEventListener("click", (e) => {
    products.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      btn[i].style.backgroundColor = "rgb(240, 240, 240)";
    }
    if (btnName.classList.contains("textHover")) {
      btn.forEach((item) => {
        if (item.textContent === category) {
          item.style.cssText = `background-color: rgba(128, 128, 128, 0.3); transition: 0.1s`;
        }
      });
    } else {
      btnName.style.cssText = `background-color: rgba(128, 128, 128, 0.3); transition: 0.1s`;
    }
    data.forEach((item) => {
      if (item.category === category || category === "All") {
        creatingCard(item);
      }
    });
  });
};

let creatingCard = (item) => {
  let card = createItem("div", "card", products);
  let img = createItem("div", "img", card);
  let info = createItem("div", "info", card);
  let title = createItem("p", "title", info);
  let price = createItem("p", "price", info);
  let priceSpan = createItem("p", "priceSpan", info);
  let rating = createItem("div", "rating", info);
  let category = createItem("div", "category", info);
  let categorySpan = createItem("span", "textHover", category);
  let showing = createItem("p", "textHover", info);
  let description = createItem("p", "description", info);
  img.style.cssText = `background-image: url("${item.image}");`;
  title.textContent =
    item.title.length > 60 ? item.title.slice(0, 60) + "..." : item.title;
  price.textContent = `price: `;
  price.appendChild(priceSpan);
  priceSpan.textContent = item.price + "$";
  category.textContent = `category: `;
  category.appendChild(categorySpan);
  categorySpan.textContent = item.category;
  showing.textContent = `show more`;
  description.textContent =
    item.description.length > 280
      ? item.description.slice(0, 280) + "..."
      : item.description;

  filterCategories(cloneData, categorySpan, item.category);
  showing.addEventListener("click", (e) => {
    if (description.style.display === "block") {
      description.style.display = "none";
      showing.textContent = `show more`;
      styling("block", title, price, rating, category);
      card.style.transition = `0.2s`;
    } else {
      description.style.display = "block";
      showing.textContent = `show other`;
      styling("none", title, price, rating, category);
      card.style.transition = `0.2s`;
    }
  });

  if (
    item.rating.rate - Math.floor(item.rating.rate) >= 0.25 &&
    item.rating.rate - Math.floor(item.rating.rate) <= 0.75
  ) {
    for (let i = 0; Math.floor(item.rating.rate) > i; i++) {
      star = createItem("i", "fa-solid", rating);
      star.classList.add("fa-star");
    }
    starHalf = createItem("i", "fa-solid", rating);
    star.classList.add("fa-star-half-stroke");
    for (let i = 0; 5 - Math.floor(item.rating.rate) > i; i++) {
      emptyStar = createItem("i", "fa-regular", rating);
      emptyStar.classList.add("fa-star");
    }
  } else if (item.rating.rate - Math.floor(item.rating.rate) < 0.25) {
    for (let i = 0; Math.floor(item.rating.rate) > i; i++) {
      star = createItem("i", "fa-solid", rating);
      star.classList.add("fa-star");
    }
    for (let i = 0; 5 - Math.floor(item.rating.rate) > i; i++) {
      emptyStar = createItem("i", "fa-regular", rating);
      emptyStar.classList.add("fa-star");
    }
  } else {
    for (let i = 0; Math.ceil(item.rating.rate) > i; i++) {
      star = createItem("i", "fa-solid", rating);
      star.classList.add("fa-star");
    }
    for (let i = 0; 5 - Math.ceil(item.rating.rate) > i; i++) {
      emptyStar = createItem("i", "fa-regular", rating);
      emptyStar.classList.add("fa-star");
    }
  }
};

fetch("https://fakestoreapi.com/products")
  .then((data) => {
    if (data.ok) {
      loader.style.display = "none";
      return data.json();
    }
  })
  .then((data) => {
    cloneData = data;
    data.forEach((item) => {
      creatingCard(item);
      filterCategories(data, allBtn, "All");
      filterCategories(data, menBtn, "men's clothing");
      filterCategories(data, womenBtn, "women's clothing");
      filterCategories(data, jeweleryBtn, "jewelery");
      filterCategories(data, electtricsBtn, "electronics");
    });
    allBtn.click();
  })
  .catch((error) => console.log(error + " :("));
