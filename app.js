/* const productService = new ProductService(data); */
const cartService = new CartService();
const HTMLservice = new HTMLService();

const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const inputFilter = document.getElementById("filter");

inputFilter.addEventListener("input", (event) => {
  const value = event.target.value;
  const filtredProducts = productService.filterBy(value);
  renderProducts(filtredProducts);
});
function renderProducts(products) {
  productsContainer.innerHTML = HTMLservice.paintProducts(products);
}

cartContainer.addEventListener("click", (event) => {
  const type = event.target?.dataset.type;
  const id = event.target?.dataset.id;
  switch (type) {
    case "clear":
      cartService.clear();
      renderCart();
      break;
    case "remove":
      cartService.remove(id);
      renderCart();
      break;
  }
});
productsContainer.addEventListener("click", (event) => {
  const id = event.target.dataset.id
    ? event.target.dataset.id
    : event.target.closest("li")?.dataset.id;
  if (id) {
    cartService.add(productService.getById(+id));
  }
  renderCart();
});

function renderCart() {
  cartContainer.innerHTML = HTMLservice.paintCart(cartService.info());
}
/* renderCart();
renderProducts(productService.products); */

async function startApplication() {
  renderCart();
  const responce = await fetch("https://fakestoreapi.com/products");
  const data = await responce.json();
  productService = new ProductService(data);
  renderProducts(productService.products);
}
startApplication();
