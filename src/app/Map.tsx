import "./Map.scss";

const Map = () => {
  return (
    <div className="map__block">
      <div className="map__title">Где мы находимся</div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginTop: "30px",
        }}
      >
        <a
          href="https://yandex.ru/maps/org/chelyabinskaya_nosochnaya_fabrika_etalon/160857517847/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "0px",
          }}
        >
          Челябинская носочная фабрика Эталон
        </a>
        <a
          href="https://yandex.ru/maps/56/chelyabinsk/category/stockings_and_tights_shop/184107963/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "14px",
          }}
        >
          Магазин чулок и колготок в Челябинске
        </a>
        <a
          href="https://yandex.ru/maps/56/chelyabinsk/category/hosiery_production/52170281376/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "28px",
          }}
        >
          Производство чулочно-носочной продукции в Челябинске
        </a>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=61.370973%2C55.182065&mode=search&oid=160857517847&ol=biz&z=18.52"
          className="map"
          style={{ position: "relative" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
