let idNum = 0;
export class Product {
  id?: string;
  name: string;
  price: number;
  desc: string;
  date: Date;
  company: string;
  category: number;
  reviews: Review[];
  img: string[];

  constructor(
    company: string,
    name: string,
    price: number,
    desc: string,
    category: number,
    img: string[],
  ) {
    this.category = category;
    this.date = new Date();
    this.name = name;
    this.company = company;
    this.desc = desc;
    this.price = price;
    this.img = img;
    this.reviews = [];
  }
}

export class Review {
  productId: string;
  name: string;
  date: Date;
  content: string;
  point: number;

  constructor(id: string, name: string, content: string, point: number) {
    this.name = name;
    this.date = new Date();
    this.productId = id;
    this.content = content;
    this.point = point;
  }
}

export class CartItem {
  productId: string;
  productName: string;
  quantity: number;
  productCompany: string;
  productPrice: number;
  img: string;

  constructor(
    id: string,
    name: string,
    quantity: number,
    company: string,
    price: number,
    img: string,
  ) {
    this.productId = id;
    this.productName = name;
    this.quantity = quantity;
    this.productCompany = company;
    this.productPrice = price;
    this.img = img;
  }
}
