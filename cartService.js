class CartService {
  constructor() {
    this.cart = {};
  }
  add(product) {
    const key = product.id;
    if (this.cart[key]) {
      this.cart[key].amount += 1;
      return;
    }
    this.cart[key] = {
      title: product.title,
      price: product.price,
      amount: 1,
    };
  }
  remove(productId) {
    const amount = this.cart[productId].amount;
    if (amount > 1) {
      this.cart[productId].amount--;
    } else {
      delete this.cart[productId];
    }
  }
  clear() {
    this.cart = {};
  }
  info() {
    const items = Object.keys(this.cart).map((id) => {
      return {
        id: id,
        title: this.cart[id].title,
        amount: this.cart[id].amount,
        price: this.cart[id].price,
      };
    });
    const totalPrice = items.reduce((sum, item) => {
      return (sum += item.amount * item.price);
    }, 0);
    return {
      items: items,
      totalPrice: totalPrice,
    };
  }
}
