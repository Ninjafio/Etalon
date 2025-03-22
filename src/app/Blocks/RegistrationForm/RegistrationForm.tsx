import "./RegistrationForm.scss";

export default function Example() {
  return (
    <>
      <div className="back_form">
        <div className="def_form">
          <form action="#" method="POST" className="space-y-2">
            <div>
              <div className="mt-2">
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
              <div className="mt-2">
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
              <div className="mt-2">
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

            <div className="checkbox">
              <input type="checkbox" id="consentCheckbox" required />
              <p>Я согласен на обработку персональных данных</p>
            </div>

            <div>
              <button type="submit" className="button">
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
