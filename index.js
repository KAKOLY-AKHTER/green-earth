const categoryContainer=document.getElementById('category-section');
const treeSection=document.getElementById('tree-section');
const cartList=document.getElementById('cart-list');
const totalPrice=document.getElementById('total-price');

const cart=[];
let total=0;

//  Load Categories from API
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
        // console.log(categories)
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

//  Show Category Buttons
const showCategory = (categories) => {
categoryContainer.innerHTML="";

 const allBtn = document.createElement('li');
allBtn.textContent = 'All Trees';
allBtn.className = 'px-3 py-2 rounded hover:bg-green-200 ';
allBtn.onclick = () => {
  loadAllTrees(); 
  setActiveCategory(allBtn);
};
categoryContainer.appendChild(allBtn);


   categories.forEach((cat) => {
    const li = document.createElement('li');
    li.textContent = cat.category_name;
    li.className = 'px-3 py-2 rounded hover:bg-green-200 ';
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
  items.forEach(li => li.classList.remove("bg-green-600", "text-white"));
  active.classList.add("bg-green-600", "text-white");
};


  
const loadAllTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
    const tree = data.plants;
    showTrees(tree)

    })
    .catch(err => console.log(err));
};

//  Load Trees by Category
const loadTreesCategory = (treesId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${treesId}`)
    .then(res => res.json())
    .then(data => {
      showTrees(data.plants);
    })
    .catch(err => {
      console.log(err);
    });
};
//   Show Tree Cards
const showTrees = (plants) => {
  treeSection.innerHTML = '';
 plants.forEach(tree => {
    const card = document.createElement('div');
    card.className = 'card bg-white shadow-md p-4 rounded-lg w-full max-w-sm mx-auto';
    card.innerHTML = `
         <img src="${tree.image}" class="rounded mb-2 h-40 w-full object-cover" />
      <h3 class="text-lg font-bold">${tree.name}</h3>
      <small>${tree.description}</small>
      <div class="flex justify-between"><p class="text-sm text-green-700 font-semibold px-4 py-1 rounded-xl bg-sky-100 ">${tree.category}</p>
      <p class="font-bold">৳${tree.price}</p></div>
      <button class="btn rounded-xl text-white bg-[#13af4f] mt-2">Add to Cart</button>

    `;
  treeSection.appendChild(card);
  });


};


 treeSection.addEventListener("click", (e) => {
  // console.log(e.target)
  // console.log(e.target.innerText)
  if (e.target.innerText === "Add to Cart") {
    handleCarts(e);
  }
})

const handleCarts = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;
  console.log(id);
  
  console.log(title);
  

//  cart.push({ title, price, id });
//   total += price;
//   showCarts(cart);

//  showCarts(cart);
  
};


const showCarts = (cartItems) => {
    // console.log(cartItems)
    cartList.innerHTML = "";
       total=0;
    cartItems.forEach(list => {
        cartList.innerHTML += `
       <li class="border my-2 p-1 flex flex-between items-center shadow">
            <h1>${list.title}</h1>
            <button onclick="deleteItem('${item.id}', ${item.price})" class="btn btn-xs">❌</button>
        </li>
        `;
        
    })

  totalPrice.innerText = total;
};




const deleteItem = (itemId,itemPrice) => {
   cart=cart.filter(item=> item.id !== itemId);
     total -= itemPrice;
   showCarts(cart)

} 


loadCategory();
loadAllTrees();
