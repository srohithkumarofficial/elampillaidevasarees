'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SareeProduct, OrderRecord, UserAddress, ResellerDetails } from '../types';
import { DEMO_PRODUCTS, INITIAL_DEMO_ORDER } from '../data/products';

interface ToastState {
  visible: boolean;
  title: string;
  price: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: SareeProduct, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, color: string, delta: number) => void;
  updateProductQuantity: (product: SareeProduct, delta: number, color?: string) => void;
  getItemQuantity: (productId: string, color?: string) => number;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedPromo: string | null;
  promoDiscount: number;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  promoError: string | null;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toast: ToastState;
  showToast: (title: string, price: string) => void;
  dismissToast: () => void;
  orders: OrderRecord[];
  currentOrder: OrderRecord | null;
  createOrder: (
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    shippingAddress: UserAddress,
    orderType?: 'direct_customer' | 'reseller',
    resellerDetails?: ResellerDetails
  ) => OrderRecord;
  getOrderById: (orderId: string) => OrderRecord | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      product: DEMO_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Crimson Burgundy',
    },
  ]);

  const [appliedPromo, setAppliedPromo] = useState<string | null>('HERITAGE10');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    title: '',
    price: '',
  });

  const [orders, setOrders] = useState<OrderRecord[]>([INITIAL_DEMO_ORDER]);
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(INITIAL_DEMO_ORDER);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('deva_sarees_cart');
      if (savedCart) setItems(JSON.parse(savedCart));
    } catch {
      // ignore
    }

    try {
      const savedOrders = localStorage.getItem('deva_sarees_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // ignore
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('deva_sarees_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('deva_sarees_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders, isLoaded]);

  const showToast = (title: string, price: string) => {
    setToast({ visible: true, title, price });
  };

  const dismissToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const addToCart = (product: SareeProduct, quantity = 1, color?: string) => {
    const chosenColor = color || product.colorName;
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: chosenColor }];
      }
    });

    showToast(product.name, `₹${product.price.toLocaleString('en-IN')}`);
  };

  const removeFromCart = (productId: string, color?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (!color || item.selectedColor === color))
      )
    );
  };

  const updateQuantity = (productId: string, color: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const getItemQuantity = (productId: string, color?: string): number => {
    return items
      .filter((item) => item.product.id === productId && (!color || item.selectedColor === color))
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const updateProductQuantity = (product: SareeProduct, delta: number, color?: string) => {
    const chosenColor = color || product.colorName;
    const existing = items.find(
      (item) => item.product.id === product.id && item.selectedColor === chosenColor
    );
    if (!existing && delta > 0) {
      addToCart(product, delta, chosenColor);
      return;
    }
    if (existing) {
      updateQuantity(product.id, chosenColor, delta);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let promoDiscount = 0;
  if (appliedPromo === 'HERITAGE10') {
    promoDiscount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'SILK20') {
    promoDiscount = Math.round(subtotal * 0.2);
  }

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HERITAGE10' || clean === 'SILK20') {
      setAppliedPromo(clean);
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid coupon code. Try HERITAGE10 for 10% off.');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 150;
  const total = Math.max(0, subtotal - promoDiscount + shipping);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const createOrder = (
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    shippingAddress: UserAddress,
    orderType: 'direct_customer' | 'reseller' = 'direct_customer',
    resellerDetails?: ResellerDetails
  ): OrderRecord => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `EDS-${randomSuffix}`;

    const newOrder: OrderRecord = {
      id: `ord-${randomSuffix}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      orderType,
      resellerDetails,
      items: [...items],
      subtotal,
      discount: promoDiscount,
      promoCode: appliedPromo || undefined,
      shipping,
      tax: 0,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending Verification' : 'Paid',
      shippingAddress,
      status: 'Placed',
      awbNumber: `BD-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: 'In 2-4 Business Days',
      masterWeaver: INITIAL_DEMO_ORDER.masterWeaver,
      timeline: [
        {
          title: orderType === 'reseller' ? 'Reseller Order Escrowed' : 'Order Placed & Funds Escrowed',
          timestamp: 'Just Now',
          description: orderType === 'reseller' 
            ? `Reseller dropship dispatch queued on behalf of ${resellerDetails?.businessName || 'Reseller Partner'}.`
            : `Authorization token generated via ${paymentMethod.toUpperCase()} Gateway.`,
          status: 'completed',
        },
        {
          title: 'Confirmed by Deva Sarees Loom Atelier',
          timestamp: 'Today, Next Step',
          description: 'Master weaver allocated the selected heirloom handloom cut.',
          status: 'in_progress',
        },
        {
          title: 'Quality Check & Customized Packaging',
          timestamp: 'Pending',
          description: orderType === 'reseller'
            ? `Verified warp integrity with plain packaging & customer invoice in name of ${resellerDetails?.businessName || 'Reseller'}.`
            : 'Verifying warp integrity, zari luster, tassel edging, and applying cedar casing.',
          status: 'pending',
        },
        {
          title: 'Shipped via BlueDart Express',
          timestamp: 'Pending',
          description: 'Insured parcel dispatched with priority express tracking.',
          status: 'pending',
        },
        {
          title: 'Delivered to Customer',
          timestamp: 'Pending',
          description: `Doorstep delivery to ${shippingAddress.fullName} at ${shippingAddress.city}, ${shippingAddress.state}.`,
          status: 'pending',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateProductQuantity,
        getItemQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount: promoDiscount,
        shipping,
        total,
        appliedPromo,
        promoDiscount,
        applyPromo,
        removePromo,
        promoError,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toast,
        showToast,
        dismissToast,
        orders,
        currentOrder,
        createOrder,
        getOrderById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
