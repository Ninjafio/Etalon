import "./HistoryBlock.scss";

const HistoryBlock = () => {
  return (
    <div className="History_bl">
      <div className="Title_h">
        <p>Наша история</p>
      </div>

      <div className="Txt_h">
        <div className="First">
          <div className="txtInto1">
            <p>
              Главная ценность нашей фабрики — это люди. Наши сотрудники
              посвятили много лет работе и стали настоящими профессионалами
              своего дела.
            </p>
          </div>
        </div>

        <div className="Second">
          <div className="txtInto">
            <p>
              История нашей носочной фабрики началась в далеком 2010 году. В тот
              памятный год наш владелец, Андрей Григорьевич Задорожный, решил
              осуществить свою мечту и приобрел современные корейские станки
              производства «Сюзанна», положив начало нашему делу.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBlock;
