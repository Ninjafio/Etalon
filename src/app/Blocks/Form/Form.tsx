import "./Form.scss";
import React from "react";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

const Form = () => {
  return (
    <div className="f_container">
      <div className="form_container">
        <div className="fTitle">
          <p className="f_Title">Хотите оформить заказ?</p>
          <p className="txt">
            Оставьте заявку на сайте. Наш менеджер свяжется с вами и поможет
            оформить
          </p>
        </div>
        <div className="rform">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Form;
