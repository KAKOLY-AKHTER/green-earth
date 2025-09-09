const categoryContainer = document.getElementById("category-section");
const treeSection = document.getElementById("tree-section");
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");
const treeDetailsModal = document.getElementById("trees-details-modal");
//  console.log(treeDetailsModal);
const modalContainer = document.getElementById("modalContainer");

let cart = [];
let total = 0;

const loadCategory = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      // console.log(categories)
      showCategory(categories);
      manageSpinner(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

//  Show Category Buttons
const showCategory = (categories) => {
  categoryContainer.innerHTML = "";

  const allBtn = document.createElement("li");
  allBtn.textContent = "All Trees";
  allBtn.className = "px-3 py-2 rounded hover:bg-green-200 cursor-pointer ";
  allBtn.onclick = () => {
    loadAllTrees();
    setActiveCategory(allBtn);
  };
  categoryContainer.appendChild(allBtn);

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat.category_name;
    li.className = "px-3 py-2 rounded hover:bg-green-200 cursor-pointer";
    li.setAttribute("data-id", cat.id);
    li.onclick = () => {
      loadTreesCategory(cat.id);
      setActiveCategory(li);
    };
    categoryContainer.appendChild(li);
  });
};

const setActiveCategory = (active) => {
  const items = categoryContainer.querySelectorAll("li");
  items.forEach((li) => li.classList.remove("bg-green-600", "text-white"));
  active.classList.add("bg-green-600", "text-white");
};

const loadAllTrees = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      const tree = data.plants;
      showTrees(tree);
      manageSpinner(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

//  Load Trees by Category
const loadTreesCategory = (treesId) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${treesId}`)
    .then((res) => res.json())
    .then((data) => {
      showTrees(data.plants);
      manageSpinner(false);
    })
    .catch((err) => {
      console.log(err);
    });
};
//   Show Tree Cards
const showTrees = (plants) => {
  treeSection.innerHTML = "";
  plants.forEach((tree) => {
    const card = document.createElement("div");
    card.className = "bg-white card shadow-md p-4 rounded-lg h-fit";
    card.setAttribute("id", tree.id);
    card.innerHTML = `
         <img src="${tree.image}" class="rounded mb-2 h-40 w-full object-cover" />
      <h3 class="text-lg font-bold  cursor-pointer">${tree.name}</h3>
      <small class="">${tree.description.slice(0, 60)}...</small>
      <div class="flex justify-between mt-2"><p class="text-sm text-green-700 font-semibold px-4 py-1 rounded-xl bg-sky-100 ">${
        tree.category
      }</p>
      <p class="font-bold">৳${tree.price}</p></div>
      <button class="btn rounded-xl text-white bg-[#13af4f] mt-2 w-full">Add to Cart</button>

    `;
    treeSection.appendChild(card);
  });
};

treeSection.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleCartAdd(e);
  }

  if (e.target.tagName === "H3") {

    const parent = e.target.closest(".card");
    // console.log(parent);

    const id = parent.id;
    console.log(id);
    if (id) {
      manageSpinner(true);
      fetch(`https://openapi.programming-hero.com/api/category/${id}`)
      // fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const plant = data.plants[0]; 
                // showDetails(data.plant);
          showDetails(plant);
          manageSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

const handleCartAdd = (e) => {
  const id = e.target.parentNode.id;
  const title = e.target.parentNode.children[1].innerText;
  const priceText = e.target.parentNode.children[3].children[1].innerText;
  const price = parseInt(priceText.replace("৳", ""));

  cart.push({
    title: title,
    price: price,
    id: id,
  });
  total += price;

  showCartItems(cart);
};

const showCartItems = (cartItems) => {
  cartList.innerHTML = "";
  cartItems.forEach((item) => {
    cartList.innerHTML += `
    <li class=" my-2 p-2 flex justify-between items-center shadow-lg bg-slate-100 rounded-lg">
      <div class="">

      <h1 class="">${item.title}</h1>
      <p class="">${item.price}  × 1</p>
      </div>
      <button onclick="handleCartDelete('${item.id}')" class="btn btn-xs">❌</button>
    </li>
  `;
  });
  totalPrice.innerText = total;
};

const showDetails = (data) => {
  
  modalContainer.innerHTML = `

  <div class="bg-white card shadow-md p-4 rounded-lg h-fit">
  
  <img src=${data.image} class="w-full h-60 object-cover rounded mb-3" />
    <h3 class="text-lg font-bold mb-2 cursor-pointer hover:underline">${data.name}</h3>
    <p class="text-gray-700">${data.description}</p>
    <div class="mt-2 flex justify-between">
      <span class="bg-green-100 text-green-800 px-3 py-1 rounded">${data.category}</span>
      <span class="font-bold text-lg">৳${data.price}</span>
    </div>
  </div>
 
    
    
  `;
  treeDetailsModal.showModal();
};

const handleCartDelete = (itemId) => {

  cart = cart.filter((item) => item.id !== itemId);

 total = cart.reduce((acc, item) => acc + item.price, 0);
  showCartItems(cart);

  showCartItems(cart);
};

const manageSpinner = (state) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  const contentElement = document.getElementById("tree-section");
  if (state) {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex", "justify-center", "items-center");
    contentElement.classList.add("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
    contentElement.classList.remove("hidden");
  }
};

loadCategory();
loadAllTrees();