import { useCartStore } from "@/app/store/cartStore";
import { getAttr } from "@/app/utils/getAttr";

export class CardModel {
  selectors = {
    cartBtn: "[data-js-cart-button]",
    cartId: "[data-js-card-id]",
  };

  cartInfo: any;

  constructor() {
    this.bindEvents();
  }

  private addInfoToCartStore() {
    const { products, addProduct, removeProduct, updateQuantity, clearCart } =
      useCartStore.getState();
    console.log(this.cartInfo)
    if (this.cartInfo) addProduct(this.cartInfo);
  }

  private bindEvents() {
    const root = document.getElementById("root");

    root?.addEventListener("click", (e: any) => {
      const attr = getAttr(this.selectors.cartBtn);
      this.cartInfo = JSON.parse(e.target?.getAttribute(attr));
      this.addInfoToCartStore();
    });
  }
}
