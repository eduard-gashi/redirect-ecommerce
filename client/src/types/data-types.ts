export interface Review {
  _id?: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  upper_price_limit: number;
  image_paths: string[];
  countInStock: number;
  reviews: Review[];
  rating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

export interface OrderHistory {
  orderId: string;
  date: string;
  item: Product;
  totalAmount: number;
}

export interface UserInfo {
  _id: string;
  email: string;
  isAdmin: boolean;
  token: string;
  orderHistory: OrderHistory[];
}

export interface AuthState {
  userInfo: UserInfo | null;
}