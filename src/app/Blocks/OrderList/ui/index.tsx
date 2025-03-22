import React, { useState } from "react";
import "../style.scss";
import { useCartStore } from "@/app/store/cartStore";

export const OrderList = () => {
  const [isOpen, setIsOpen] = useState(false); // Состояние модального окна
  const { orders } = useCartStore();

  return (
    //#region
    // <div className="orderList">
    //   <h2 className="orderList__title" onClick={() => setIsOpen(true)}>
    //     Мои заявки
    //   </h2>

    //   {/* Затемнение фона при открытом модальном окне */}
    //   {isOpen && (
    //     <div className="modal__overlay" onClick={() => setIsOpen(false)}></div>
    //   )}

    //   {/* Модальное окно */}
    //   <div className={`modal ${isOpen ? "modal--open" : ""}`}>
    //     <button className="modal__close" onClick={() => setIsOpen(false)}>
    //       ✖
    //     </button>
    //     <div className="orderList__items">
    //       {orders.map((order, key) => {
    //         return (
    //           <div className="orderList__items__item" key={key}>
    //             <div className="orderList__items__item__products">
    //               {order.products.map((product, key) => {
    //                 return (
    //                   <div className="orderList__items__item__products__product">
    //                     <p className="orderList__items__item__products__product__productName">
    //                       Наименование: {product.name}
    //                     </p>
    //                     <p className="orderList__items__item__products__product__quantity">
    //                       Количество: {product.quantity}
    //                     </p>
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //             <p className="orderList__items__item__totalPrice">
    //               Итого: {order.totalPrice} руб.
    //             </p>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
    //#endregion

    <div className="orderList">
      <h2 className="orderList__title" onClick={() => setIsOpen(true)}>
        Мои заявки
      </h2>

      {/* Затемнение фона при открытом модальном окне */}
      {isOpen && (
        <div className="modal__overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Модальное окно */}
      <div className={`modal ${isOpen ? "modal--open" : ""}`}>
        <button className="modal__close" onClick={() => setIsOpen(false)}>
          ✖
        </button>

        <table className="orderList__items orderList__table">
          <thead className="orderList__items__head">
            <tr className="orderList__items__head__row">
              <th className="orderList__items__head__row__item">Артикул</th>
              <th className="orderList__items__head__row__item">
                Наименование
              </th>
              <th className="orderList__items__head__row__item">Цена</th>
              <th className="orderList__items__head__row__item">Количество</th>
              <th className="orderList__items__head__row__item">Итого</th>
            </tr>
          </thead>
          <tbody className="orderList__items__body">
            {orders.map((order, orderIndex) =>
              order.Record.map((product, productIndex) => (
                <tr
                  className="orderList__items__body__row"
                  key={`${orderIndex}-${productIndex}`}
                >
                  <td className="orderList__items__body__row__item">
                    {product.article}
                  </td>
                  <td className="orderList__items__body__row__item">
                    {product.title}
                  </td>
                  <td className="orderList__items__body__row__item">
                    {product.priceDef} руб.
                  </td>
                  <td className="orderList__items__body__row__item">
                    {product.countProduct}
                  </td>

                  {productIndex === 0 && (
                    <td
                      className="orderList__items__body__row__item"
                      rowSpan={order.Record.length}
                    >
                      {order.TotalCost} руб.
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
