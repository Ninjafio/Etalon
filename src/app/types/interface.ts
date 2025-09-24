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
  ImgUrls: string;          // ← добавили поле
}

export interface IProduct {
  id: string;
  title: string;
  priceDef: number;
  article: string;
  inStock: number;
  ImgUrls: string;
  category: ICategory;
  colorsocks: IColor;
  typesocks: IType;
  min: number;
  max: number;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IColor {
  id: string;
  name: string;
}

export interface IType {
  id: string;
  name: string;
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
