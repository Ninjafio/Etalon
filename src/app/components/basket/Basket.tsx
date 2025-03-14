"use client"

import React, { useState } from 'react'
import "./Basket.scss"
import Image from 'next/image'
import { BasketI, CloseIcon } from '@/app/imgs/imgIndex/imgIndex'
import { Cart, CartRecord, UserLocal } from '@/app/types/interface'
import axios from 'axios'

const Basket = () => {
  const [cart, setCart] = useState<Cart>()
  const [userLoc, setUser] = useState<UserLocal>()
  const [isShown, setIsShown] = useState(false)
  const [sum, setSum] = useState(0)

  const saveCart = async () => {

    if (userLoc != null && cart != null) {
      console.log({
        Record: cart.Record,
        TotalCost: sum
      })
      console.log({
        Authorization: userLoc.userToken,
        email: userLoc.userEmail,
        login: userLoc.userLogin
      })
      await axios.post("https://localhost:4000/api/story/create", {
        Record: cart.Record,
        TotalCost: sum
      },
        {
          headers: {
            Authorization: userLoc.userToken,
            email: userLoc.userEmail,
            login: userLoc.userLogin
          }
        }
      )
    }

  }

  React.useEffect(() => {

    let summ = 0
    var json=localStorage.getItem("cart") || ""
    if (json != "") {
      let cartLocal: Cart = JSON.parse(json)
      setCart(cartLocal)
      if (cartLocal.Record.length > 0) {
        cartLocal.Record.forEach((el) => {
          summ += el.countProduct * el.priceDef
        })
      }
      setSum(summ)
    }
    const userStr = localStorage.getItem("user") || ""

    if (userStr != "") {
      let user: UserLocal = JSON.parse(userStr)
      if (user.userToken != "") {
        setUser(user)
      }
    }

  })
  return (
    <div style={{
      height: "100%",
      width: "100%"
    }}>
      <div className={isShown ? "basket_background_active" : "basket_background_unactive"}></div>
      <Image src={BasketI} alt='' onClick={() => setIsShown(true)}></Image>
      <div className={`Basket ${isShown ? "active" : "unactive"}`}>
        <div className='Basket_elements'>
          <div className="Basket_close">
            <Image src={CloseIcon} alt='' onClick={() => setIsShown(false)}></Image>
          </div>
          <div className="Basket_Title">Корзина</div>
          {cart != null ?
            (
              <>
                <table >
                  <thead>
                    <tr>
                      <td >
                        Наименование
                      </td>
                      <td >
                        Количество
                      </td>
                      <td >
                        Цена
                      </td>
                      <td >
                        Сумма
                      </td>

                    </tr>
                  </thead>

                  <tbody>

                    {cart.Record.map(el => (

                      <tr>
                        <td >
                          {el.title}
                        </td>
                        <td >

                          {el.countProduct}
                        </td>
                        <td >

                          {el.priceDef}
                        </td>
                        <td >

                          {el.priceDef * el.countProduct}
                        </td>

                      </tr>
                    ))}
                    <tr>
                      <td>
                      </td>
                      <td>
                      </td>
                      <td>

                      </td>
                      <td >
                        Итого:
                        {sum}
                      </td>

                    </tr>
                  </tbody>
                </table>
                {userLoc != null && <button onClick={()=>{
                  saveCart()
                }}>Оформить заявку</button>}

              </>)
            :

            (<div className="Basket_txt">Сформируйте заказ и оставьте контактные данные.
              Мы свяжемся с вами в ближайшее время. </div>)
          }


        </div>
      </div>

    </div>
  )
}

export default Basket