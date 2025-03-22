"use client"

import React, { useState } from 'react'
import "./Account.scss"
import Image from 'next/image'
import { User, Basket2 } from '@/app/imgs/imgIndex/imgIndex'


    const Account = () => {
        const [isShown, setIsShown] = useState(false)
        return (
          <div style={{
            height: "100%",
            width: "100%"
          }}>
            <div className={isShown? "Enter_background_active" : "Enter_background_unactive"}></div>
              <Image src={User} alt='' onClick={()=> setIsShown(true)}></Image>
              <div className={`Enter ${isShown? "active" : "unactive"}`}>
                  <div className='Enter_elements'>
                    <div className="Enter_close">
                      <Image src={Basket2} alt='' onClick={()=> setIsShown(false)}></Image>
                    </div>
                    <div className="Enter_Title">Сергеев Сергей Сергеевич</div>
      
      
                    <div className="def_form">
      
                <form action="#" method="POST" className="space-y-2">
      
                  <div>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        required
                        autoComplete="name"
                        className="input_"
                        placeholder="ФИО"
                      />
                    </div>
                  </div>
      
                  <div>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="input_"
                        placeholder="Электронная почта"
                        
                      />
                    </div>
                  </div>
      
                  <div>
                    
                    <div className="mt-1">
                      <input
                        id="tel"
                        name="tel"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="input_"
                        placeholder="+7"
                      />
                    </div>
                  </div>

                  <div>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  autoComplete="name"
                  className="input_"
                  placeholder="Оптовый / розничный покупатель"
                />
              </div>
            </div>

    
                  <div className='but_cont'>
                    <button
                      type="submit"
                      className="button">
                      Выйти
                    </button>
                  </div>
      
                  
      
                </form>
      
                   </div>
            
                  </div>
              </div>
              
          </div>
        )
      }
      
      export default Account;