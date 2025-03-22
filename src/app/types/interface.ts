export interface IHeader {
  imgChild: any;
  txtChild: string;
  txtChildAdditional: string;
}

export interface iCard {
  id: string;
  title: string;
  priceDef: number;
  article: string;
  ImgUrls: string;
}

export interface ICartRecord {
  id: string;
  title: string;
  priceDef: number;
  article: string;
  countProduct: number;
}

export interface IProduct {
  id: string;
  title: string;
  priceDef: number;
  article: string;
  inStock: number;
  ImgUrls: string;
}

export interface IOrder {
  Record: ICartRecord[];
  TotalCost: number;
}

export interface ICartStore {
  products: ICartRecord[];
  orders: IOrder[];
  addProduct: (product: ICartRecord) => void;
  removeProduct: (id: string) => void;
  updateQuantity: (id: string, countProduct: number) => void;
  clearCart: () => void;
  addOrder: (order: IOrder) => void;
}
