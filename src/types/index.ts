export interface SareeProduct {
  id: string;
  name: string;
  category: 'Kanchipuram Silk' | 'Soft Silk' | 'Traditional Cotton' | 'Bridal Pattu' | 'Organza Tussar' | 'Festive Edit';
  fabric: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  galleryImages: string[];
  description: string;
  colorName: string;
  colorHex: string;
  availableColors: { name: string; hex: string; image?: string }[];
  occasion: 'Bridal' | 'Festive' | 'Casual Grace' | 'Reception' | 'Puja';
  inStock: boolean;
  sku: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  dimensions: {
    sareeLength: string;
    blousePiece: string;
    sareeWidth: string;
    weight: string;
  };
  weaveHeritage: {
    technique: string;
    zariQuality: string;
    originLoom: string;
    description: string;
  };
  careGuide: string[];
}

export interface EnsembleItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: SareeProduct;
  quantity: number;
  selectedColor: string;
}

export interface UserAddress {
  id: string;
  fullName: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: UserAddress[];
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Quality Check' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface TrackingEvent {
  title: string;
  timestamp: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
}

export interface ResellerDetails {
  resellerName: string;
  businessName: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  resellerPrice?: number;
  customNote?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  orderDate?: string;
  orderType?: 'direct_customer' | 'reseller';
  resellerDetails?: ResellerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'Paid' | 'Pending Verification';
  shippingAddress: UserAddress;
  status: OrderStatus;
  awbNumber: string;
  estimatedDelivery: string;
  masterWeaver: {
    name: string;
    experience: string;
    collective: string;
    atelierNumber: string;
    zariPurity: string;
    certificationCode: string;
    image: string;
  };
  timeline: TrackingEvent[];
}
