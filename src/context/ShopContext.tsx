import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Appointment,
  Review,
  JournalArticle,
  DiscountCode,
  AdminUser,
  OrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_APPOINTMENTS,
  INITIAL_REVIEWS,
  INITIAL_ARTICLES,
  INITIAL_DISCOUNTS,
  INITIAL_ADMIN_USERS,
  createRingPerspectives,
} from '../data/mockData';

export const TELEGRAM_ORDER_URL = 'https://t.me/dexco36';
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_DE,
  VAT_RATE,
} from '../utils/formatters';

export type PageRoute =
  | 'home'
  | 'shop'
  | 'product'
  | 'verlobungsringe'
  | 'eheringe'
  | 'configurator'
  | 'size-guide'
  | 'manufaktur'
  | 'journal'
  | 'journal-article'
  | 'faq'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'legal-impressum'
  | 'legal-datenschutz'
  | 'legal-agb'
  | 'legal-widerruf'
  | 'legal-versand'
  | 'admin';

interface CookieSettings {
  accepted: boolean;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ShopContextType {
  // Navigation
  currentPage: PageRoute;
  navigateTo: (page: PageRoute, paramId?: string) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  selectedArticleId: string;
  setSelectedArticleId: (id: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedDiscount: DiscountCode | null;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  cartTotals: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    itemsCount: number;
  };

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, tracking?: string) => void;
  lastOrder: Order | null;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (id: string, status: Review['status']) => void;

  // Journal Articles
  articles: JournalArticle[];

  // Toast
  toast: { message: string; type: 'info' | 'success' | 'error' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'error') => void;

  // Cookie banner
  cookieSettings: CookieSettings | null;
  saveCookieSettings: (settings: CookieSettings) => void;

  // Admin
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  adminActiveTab: string;
  setAdminActiveTab: (tab: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('aur-001');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('art-01');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aurelia_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => ({
          ...p,
          perspectives:
            p.perspectives && p.perspectives.length === 5
              ? p.perspectives
              : createRingPerspectives(p.images[0], p.name),
        }));
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aurelia_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aurelia_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aurelia_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('aurelia_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('aurelia_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Journal Articles
  const [articles] = useState<JournalArticle[]>(INITIAL_ARTICLES);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(
    null
  );

  // Cookie Settings (DSGVO)
  const [cookieSettings, setCookieSettings] = useState<CookieSettings | null>(() => {
    const saved = localStorage.getItem('aurelia_cookies');
    return saved ? JSON.parse(saved) : null;
  });

  // Admin state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('aurelia_admin_auth') === 'true';
  });
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    return sessionStorage.getItem('aurelia_admin_auth') === 'true' ? INITIAL_ADMIN_USERS[0] : null;
  });
  const [adminActiveTab, setAdminActiveTab] = useState('dashboard');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('aurelia_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aurelia_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aurelia_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aurelia_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('aurelia_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Toast timeout
  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4200);
  };

  const navigateTo = (page: PageRoute, paramId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (paramId) {
      if (page === 'product') {
        setSelectedProductId(paramId);
      } else if (page === 'journal-article') {
        setSelectedArticleId(paramId);
      }
    }
    setCurrentPage(page);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  // Product CRUD
  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Ring "${product.name}" wurde erfolgreich hinzugefügt`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Ring "${updated.name}" aktualisiert`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Produkt wurde entfernt', 'info');
  };

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.metal}-${item.size}-${item.stoneType}-${item.engraving || ''}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, { ...item, id }];
    });
    setIsCartOpen(true);
    showToast(`${item.productName} in Ihren Warenkorb gelegt`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(null);
  };

  const applyDiscountCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = INITIAL_DISCOUNTS.find((d) => d.code === trimmed && d.active);
    if (!found) {
      return { success: false, message: 'Dieser Gutscheincode ist ungültig oder abgelaufen.' };
    }
    const currentSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    if (currentSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Mindestbestellwert von ${found.minOrderValue},00 € nicht erreicht.`,
      };
    }
    setAppliedDiscount(found);
    return { success: true, message: `Gutschein "${found.code}" erfolgreich angewendet.` };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    showToast('Gutschein entfernt', 'info');
  };

  // Cart totals calculation
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = (subtotal * appliedDiscount.value) / 100;
    } else {
      discountAmount = appliedDiscount.value;
    }
  }
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingCost = taxableSubtotal === 0 || taxableSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_DE;
  const total = taxableSubtotal + shippingCost;
  const taxAmount = (taxableSubtotal / (1 + VAT_RATE)) * VAT_RATE;
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotals = {
    subtotal,
    discount: discountAmount,
    shipping: shippingCost,
    tax: taxAmount,
    total,
    itemsCount,
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Aus der Wunschliste entfernt', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Zur Wunschliste hinzugefügt', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `AUR-2026-${randomSuffix}`,
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, tracking?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              ...(tracking ? { trackingNumber: tracking, carrier: 'DHL Express Valoren' } : {}),
            }
          : o
      )
    );
    showToast(`Bestellstatus aktualisiert: ${status}`, 'success');
  };

  // Appointments
  const bookAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newApp: Appointment = {
      ...appointment,
      id: `app-${Date.now()}`,
      status: 'Bestätigt',
    };
    setAppointments((prev) => [newApp, ...prev]);
    showToast('Beratungstermin verbindlich vorgemerkt. Wir freuen uns auf Sie.', 'success');
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    showToast(`Terminstatus: ${status}`, 'info');
  };

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Veröffentlicht',
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Vielen Dank für Ihre persönliche Bewertung.', 'success');
  };

  const updateReviewStatus = (id: string, status: Review['status']) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  // Cookies
  const saveCookieSettings = (settings: CookieSettings) => {
    setCookieSettings(settings);
    localStorage.setItem('aurelia_cookies', JSON.stringify(settings));
    showToast('Ihre Datenschutzeinstellungen wurden gespeichert.', 'info');
  };

  // Admin Auth (demo password: "aurelia-meister")
  const adminLogin = (password: string) => {
    if (password === 'aurelia-meister' || password === 'admin' || password === 'Aurelia2026') {
      setIsAdminAuthenticated(true);
      setAdminUser(INITIAL_ADMIN_USERS[0]);
      sessionStorage.setItem('aurelia_admin_auth', 'true');
      showToast('Erfolgreich im Administrationsbereich angemeldet.', 'success');
      return true;
    }
    showToast('Das eingegebene Passwort ist nicht korrekt.', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem('aurelia_admin_auth');
    showToast('Abgemeldet.', 'info');
    navigateTo('home');
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        selectedArticleId,
        setSelectedArticleId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedDiscount,
        applyDiscountCode,
        removeDiscountCode,
        cartTotals,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        orders,
        createOrder,
        updateOrderStatus,
        lastOrder,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        reviews,
        addReview,
        updateReviewStatus,
        articles,
        toast,
        showToast,
        cookieSettings,
        saveCookieSettings,
        isAdminAuthenticated,
        adminUser,
        adminLogin,
        adminLogout,
        adminActiveTab,
        setAdminActiveTab,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
