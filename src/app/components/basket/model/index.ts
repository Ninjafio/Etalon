import { useCartStore } from "@/app/store/cartStore";

/**
 * Модель корзины.
 * Используется для реализации оплаты товаров
 */
export class BasketModel {
  selectors = {
    orderBtn: "[data-js-order-button]",
  };

  products: any;

  constructor() {
    this.products = useCartStore.getState();
    console.log(this.products.products);

    this.bindEvents();
  }

  private bindEvents() {
    const root = document.querySelector("#root");
    const orderBtnNode = document.querySelector(this.selectors.orderBtn);

    root?.addEventListener("click", (e: any) => {
      if (e.target === orderBtnNode) {
        /**
         * TODO: Сделать оплату товаров
         */
        console.log("***Заглушка*** Оплата прошла успешно");
        this.products.clearCart();
      }
    });
  }
}
