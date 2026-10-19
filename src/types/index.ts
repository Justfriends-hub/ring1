export type ProductCategory = 'verlobungsringe' | 'eheringe' | 'solitaer' | 'trauringe' | 'allianzringe' | 'siegelringe';

export type PreciousMetal =
  | '585 Gelbgold'
  | '750 Gelbgold'
  | '585 Weißgold'
  | '750 Weißgold'
  | '585 Roségold'
  | '750 Roségold'
  | '950 Platin'
  | '925 Silber';

export type StoneType =
  | 'Brillant (G/VS)'
  | 'Brillant (F/VVS)'
  | 'Ceylon-Saphir'
  | 'Smaragd'
  | 'Rubin'
  | 'Ohne Stein';

export interface ProductVariant {
  metal: PreciousMetal;
  priceDelta: number; // in EUR
}

export interface RingDesignPerspective {
  id: 'frontal' | 'profile' | 'crown' | 'hand' | 'hallmark';
  label: string;
  detailTitle: string;
  shortDesc: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: ProductCategory;
  basePrice: number;
  availableMetals: PreciousMetal[];
  stoneType: StoneType;
  carat?: number;
  sizes: number[]; // 48 to 66
  inStock: boolean;
  stockCount: number;
  badge?: 'Neu' | 'Bestseller' | 'Nur noch 2 verfügbar' | 'Unikat';
  images: string[];
  perspectives: RingDesignPerspective[];
  description: string;
  details: {
    ringWidthMm: number;
    profile: string;
    diamondCut?: string;
    diamondColor?: string;
    diamondClarity?: string;
    origin: string;
  };
  careInstructions: string;
  hallmark: string;
  engravingAvailable: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id
  productId: string;
  productName: string;
  image: string;
  metal: PreciousMetal;
  size: number;
  stoneType: StoneType;
  engraving?: string;
  unitPrice: number;
  quantity: number;
}

export type OrderStatus =
  | 'Offen'
  | 'Bezahlt'
  | 'In Fertigung'
  | 'Versandt'
  | 'Zugestellt'
  | 'Storniert';

export type PaymentMethod =
  | 'Kreditkarte'
  | 'PayPal'
  | 'Klarna'
  | 'SEPA-Lastschrift'
  | 'Apple Pay'
  | 'Vorkasse / Rechnung';

export interface CustomerAddress {
  salutation: 'Frau' | 'Herr' | 'Divers';
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  streetNumber: string;
  zip: string;
  city: string;
  country: 'Deutschland' | 'Österreich' | 'Schweiz';
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string; // ISO string
  customer: CustomerAddress;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  taxAmount: number; // 19%
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Bezahlt' | 'Ausstehend' | 'Erstattet';
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: 'DHL Express Valoren' | 'UPS Pro Secure';
  internalNotes?: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: 'Showroom München' | 'Showroom Hamburg' | 'Virtuelle Videoberatung';
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  topic: 'Verlobungsringe' | 'Eheringe' | 'Individuelle Anfertigung' | 'Ringgrößen-Bestimmung';
  notes?: string;
  status: 'Bestätigt' | 'Ausstehend' | 'Abgeschlossen' | 'Storniert';
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  location: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'Veröffentlicht' | 'In Prüfung';
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Handwerkskunst' | 'Ratgeber' | 'Diamantenkunde' | 'Inspiration';
  date: string;
  readTime: string;
  image: string;
  author: string;
  excerpt: string;
  content: string[];
}

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10% or 100 for 100 EUR
  minOrderValue: number;
  expiresAt: string;
  active: boolean;
}

export type AdminRole = 'Inhaber' | 'Manager' | 'Support' | 'Redakteur';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  lastLogin: string;
}
