let products = document.querySelector(".products");
let allBtn = document.getElementById("all");
let menBtn = document.getElementById("menCloths");
let womenBtn = document.getElementById("womenCloths");
let jeweleryBtn = document.getElementById("jewelery");
let electtricsBtn = document.getElementById("elctrics");

let createItem = (element, className, add) => {
  let newItem = document.createElement(element);
  newItem.classList.add(className);
  add.append(newItem);
  return newItem;
};

let styling = (style, ...items) => {
  items.forEach((element) => {
    element.style.display = style;
  });
};

let filterCategories = (data, btnName, category) => {
  btnName.addEventListener("click", (e) => {
    products.innerHTML = "";
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
  let rating = createItem("div", "rating", info);
  let category = createItem("div", "category", info);
  let showing = createItem("p", "showing", info);
  let description = createItem("p", "description", info);
  img.style.cssText = `background-image: url("${item.image}");`;
  title.textContent = item.title;
  price.textContent = `price: ` + item.price + `$`;
  category.textContent = `category: ` + item.category;
  showing.textContent = `show more`;
  description.textContent = item.description;

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
  } else if (item.rating.rate - Math.floor(item.rating.rate) < 0.25) {
    for (let i = 0; Math.floor(item.rating.rate) > i; i++) {
      star = createItem("i", "fa-solid", rating);
      star.classList.add("fa-star");
    }
  } else {
    for (let i = 0; Math.ceil(item.rating.rate) > i; i++) {
      star = createItem("i", "fa-solid", rating);
      star.classList.add("fa-star");
    }
  }
};

fetch("https://fakestoreapi.com/products")
  .then((data) => data.json())
  .then((data) => {
    data.forEach((item) => {
      creatingCard(item);
      filterCategories(data, allBtn, "All");
      filterCategories(data, menBtn, "men's clothing");
      filterCategories(data, womenBtn, "women's clothing");
      filterCategories(data, jeweleryBtn, "jewelery");
      filterCategories(data, electtricsBtn, "electronics");
    });
  })
  .catch((error) => console.log(error + " :("));
