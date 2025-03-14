"use client"
import React, { useState } from 'react'
import "./Card.scss"
import Image from 'next/image'
import { CardBasket,SockImg } from '@/app/imgs/imgIndex/imgIndex'

//import { article } from 'framer-motion/client'
import { Cart, CartRecord, iCard } from '@/app/types/interface'

const Card = ({ id, ImgUrls, article, title, priceDef }: iCard) => {
  const [isShown, setIsShown] = useState(false)

  const setCart = () => {
   // let cart: Cart={Record:[]};
    let json=localStorage.getItem("cart") || "{Record:[]}"
    let cart: Cart= JSON.parse(json)
    if (json!="") {
      if (cart.Record.length > 0 && cart.Record.find(x => x.id == id) != null) {
        const cartLenght = cart.Record.length
        for (let index = 0; index < cartLenght; index++) {
          if (cart.Record[index].id == id) {
            cart.Record[index].countProduct++;
          }

        }

      } else {
        const record: CartRecord = {
          article: article,
          countProduct: 1,
          id: id,
          priceDef: priceDef,
          title: title,
  
        }
        cart.Record.push(record)
      }
    }else {
      const record: CartRecord = {
        article: article,
        countProduct: 1,
        id: id,
        priceDef: priceDef,
        title: title,

      }
      cart.Record.push(record)
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
  }
  const url='http://localhost:4000/'+ImgUrls;
  //console.log(ImgUrls)
  return (
    <div className='Card_container'>
      <Image src={url} alt=''></Image>
      <div className='Card_container_main'>
        <div className="Card_container_main_name">{title}</div>
        <div className="Card_container_main_bottom">
          <div className="Card_container_main_bottom_left">
            <div className="Card_container_main_bottom_left_id">Арт {article}</div>
            <div className="Card_container_main_bottom_left_price">{priceDef} ₽</div>
          </div>

          <Image className='Card_container_main_bottom_left_price_btn' src={url} alt='' onClick={() => {
            setIsShown(true)
            setCart()
          }
          } ></Image>

        </div>
      </div>
    </div>
  )
}

export default Card
