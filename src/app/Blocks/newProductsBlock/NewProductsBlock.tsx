"use client"
import React, { useState } from 'react'
import "./NewProductsBlock.scss"
import Swiper from 'swiper'
import { Autoplay, Navigation, } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import { style, tr } from 'framer-motion/client'
import { ArrowBack, ArrowUp, Filter_Arrow } from '@/app/imgs/imgIndex/imgIndex'
import Image from 'next/image'
import { Product } from '@/app/types/interface'
import axios from 'axios'
import Card from '@/app/components/Card/Card'

const NewProductsBlock = () => {


  const [products, setProducts] = useState<Product[]>([])
  const getProducts = async () => {
    const data: Product[] = await axios.get("https://localhost:4000/api/product/products/", {
      headers: {
        Authorization: localStorage.getItem('userToken') || "",
        email: localStorage.getItem('userEmail') || "",
        login: localStorage.getItem('userLogin') || "",
      }
    }).then(res => res.data)
    console.log(data)
    setProducts(data)
  }
  React.useEffect(() => {

    getProducts()
  }, []);

  const [all, setIsAll] = useState(true)
  const [male, setIsMale] = useState(false)
  const [female, setIsFemale] = useState(false)
  const [child, setIsChild] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const ChooseChild = () => {
    setIsChild(true)
    setIsMale(false)
    setIsFemale(false)
    setIsAll(false)
  }
  const ChooseMale = () => {
    setIsChild(false)
    setIsMale(true)
    setIsFemale(false)
    setIsAll(false)
  }
  const ChooseFemale = () => {
    setIsChild(false)
    setIsMale(false)
    setIsFemale(true)
    setIsAll(false)
  }

  const ChooseAll = () => {
    setIsChild(false)
    setIsMale(false)
    setIsFemale(false)
    setIsAll(true)
  }
  const [filtersOpen, setIsFiltersOpen] = useState(false)

  const [isColor, setIsColor] = useState(false)
  const [isSize, setIsSize] = useState(false)
  const [isType, setIsType] = useState(false)

  const ChooseColor = () => {
    setIsColor(true)
    setIsSize(false)
    setIsType(false)
  }

  const ChooseSize = () => {
    setIsColor(false)
    setIsSize(true)
    setIsType(false)
  }

  const ChooseType = () => {
    setIsColor(false)
    setIsSize(false)
    setIsType(true)
  }

  return (
    <div className='NewProductsBlock'>
      <div className="NewProductsBlock_header">
        <div className="NewProductsBlock_header_left">
          <div className={`NewProductsBlock_header_left_filters ${filtersOpen ? " clicked" : ""}`}><button onClick={() => setIsFiltersOpen(!filtersOpen)}>фильтры{filtersOpen ? <Image src={ArrowUp} alt=''></Image> : <Image src={ArrowBack} alt=''></Image>}</button>
            <div className={`NewProductsBlock_header_left_filters_filters ${filtersOpen ? "" : "off"}`}>
              <div className="NewProductsBlock_header_left_filters_filters_container">
                <div className="NewProductsBlock_header_left_filters_filters_top">Фильтры
                  <p className='NewProductsBlock_header_left_filters_filters_top_additional'>Сбросить все</p>
                </div>
                <div className="NewProductsBlock_header_left_filters_filters_type" onClick={() => ChooseType()}>тип товара
                  <Image src={Filter_Arrow} alt=""></Image>
                </div>
                <div className="NewProductsBlock_header_left_filters_filters_color" onClick={() => ChooseColor()}>цвет
                  <Image src={Filter_Arrow} alt=""></Image>
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_size" onClick={() => ChooseSize()}>размер
                  <Image src={Filter_Arrow} alt=""></Image>
                </div>
                <div className="NewProductsBlock_header_left_filters_filters_btn">
                  <button>применить</button>
                </div>
              </div>
            </div>


            <div className={`NewProductsBlock_header_left_filters_filters_additional_type ${filtersOpen && isType ? "" : "off"}`}>
              <div className="NewProductsBlock_header_left_filters_filters_additional_type_container">
                <div className="NewProductsBlock_header_left_filters_filters_additional_type_top"><div className="NewProductsBlock_header_left_filters_filters_additional_type_top_left">
                  <Image src={ArrowBack} alt='' onClick={() => setIsType(false)}></Image>
                  Тип товара</div>
                  <p className='NewProductsBlock_header_left_filters_filters_additional_type_top_additional'>Сбросить все</p>
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_el">
                  <label form='socks'>Носки</label>
                  <input type="checkbox" id='socks' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_el">
                  <label form='golfs'>Гольфы</label>
                  <input type="checkbox" id='golfs' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_el">

                  <label form='thigs'>Чулки</label>
                  <input type="checkbox" id='thighs' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_btn">
                  <button>применить</button>
                </div>
              </div>
            </div>

            <div className={`NewProductsBlock_header_left_filters_filters_additional_size ${filtersOpen && isSize ? "" : "off"}`}>
              <div className="NewProductsBlock_header_left_filters_filters_additional_size_container">
                <div className="NewProductsBlock_header_left_filters_filters_additional_size_top"><div className="NewProductsBlock_header_left_filters_filters_additional_type_top_left">
                  <Image src={ArrowBack} alt='' onClick={() => setIsSize(false)}></Image>
                  Размер</div>
                  <p className='NewProductsBlock_header_left_filters_filters_additional_size_top_additional'>Сбросить все</p>
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form='35-40'>35-40</label>
                  <input type="checkbox" id='35-40' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form='41-43'>41-43</label>
                  <input type="checkbox" id='41-43' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form='44-46'>44-46</label>
                  <input type="checkbox" id='45-46' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form='46-48'>41-43</label>
                  <input type="checkbox" id='46-48' />
                </div>



                <div className="NewProductsBlock_header_left_filters_filters_additional_size_btn">
                  <button>применить</button>
                </div>
              </div>
            </div>

            <div className={`NewProductsBlock_header_left_filters_filters_additional_color ${filtersOpen && isColor ? "" : "off"}`}>
              <div className="NewProductsBlock_header_left_filters_filters_additional_color_container">
                <div className="NewProductsBlock_header_left_filters_filters_additional_color_top"><div className="NewProductsBlock_header_left_filters_filters_additional_type_top_left">
                  <Image src={ArrowBack} alt='' onClick={() => setIsColor(false)}></Image>
                  Цвет</div>
                  <p className='NewProductsBlock_header_left_filters_filters_additional_color_top_additional'>Сбросить все</p>
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form='black'>Черный</label>
                  <input type="checkbox" id='black' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form='white'>Белый</label>
                  <input type="checkbox" id='white' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">

                  <label form='grey'>Серый</label>
                  <input type="checkbox" id='grey' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">

                  <label form='blue'>Синий</label>
                  <input type="checkbox" id='blue' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">

                  <label form='green'>Зеленый</label>
                  <input type="checkbox" id='green' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form='yarkiy'>Яркий</label>
                  <input type="checkbox" id='yarkiy' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form='symbols'>С узором</label>
                  <input type="checkbox" id='symbols' />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_btn">
                  <button>применить</button>
                </div>
              </div>
            </div>



          </div>



          <div className={`NewProductsBlock_header_left_allBtn ${all ? "active" : ""}`} onClick={() => ChooseAll()}>все</div>
        </div>
        <div className='NewProductsBlock_header_right'>
          <div className={`NewProductsBlock_header_right_male ${male ? "active" : ""}`} onClick={() => ChooseMale()}>женские</div>
          <div className={`NewProductsBlock_header_right_female ${female ? "active" : ""}`} onClick={() => ChooseFemale()}>мужские</div>
          <div className={`NewProductsBlock_header_right_child ${child ? "active" : ""}`} onClick={() => ChooseChild()}>детские</div>
        </div>
      </div>


      <div className="NewProductsBlock_container">


        {products.length > 0 ?
          products.map(
            item => (<Card id={item.id} ImgUrls={item.ImgUrls} title={item.title} article={item.article} priceDef={item.priceDef} key={item.id}></Card>)
          ) :

          <h1>Нет продуктов</h1>
        }
      </div>
      <div className="NewProductsBlock_buttonBlock">
        <div onClick={() => setShowMore(true)} className={showMore ? "NewProductsBlock_btn_off" : "NewProductsBlock_btn"} >
          Показать еще
        </div>
      </div>
    </div>
  )
}

export default NewProductsBlock