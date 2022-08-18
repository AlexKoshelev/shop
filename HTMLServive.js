function ellipsis(string = "") {
  if (string.length > 30) {
    return string.substring(0, 30) + "...";
  }
  return string;
}

class HTMLService {
  paintProduct(product) {
    return `<li data-id="${product.id}">
        <img src="${product.image}" title="${product.title}"/>
        <small>${ellipsis(product.title)}</small>
        <small><strong>$${product.price}</strong></small>
  
    </li>`;
  }
  paintCartInfo(item) {
    return `
        <li data-type="remove" data-id="${item.id}">
            (${item.amount})
            ${item.title}
            <strong>$${item.price}</strong>
        </li>
           `;
  }
  paintProducts(products = []) {
    return products.map(this.paintProduct).join("");
  }
  paintCart({ items, totalPrice }) {
    if (items.length === 0) {
      return `<p>Добавьте товар в корзину</p>`;
    }
    return `
    <ul class="cart-list">
        ${items.map(this.paintCartInfo).join("")}
    </ul>
    <hr />
    <p class="info">
    <span>Общая цена: <strong>$${totalPrice.toFixed(2)}</strong></span>
    <button class="clear" data-type="clear" >Очистить корзину</button>
    </p>

    `;
  }
}
