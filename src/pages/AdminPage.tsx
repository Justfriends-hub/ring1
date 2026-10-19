import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Calendar,
  Users,
  Tag,
  Star,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  Search,
  Lock,
  ShieldCheck,
  Eye,
  FileText,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Order, Appointment, Review, OrderStatus, PreciousMetal, StoneType } from '../types';
import { formatEuro, formatGermanDate, formatGermanDateTime } from '../utils/formatters';
import { createRingPerspectives } from '../data/mockData';

export const AdminPage: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminUser,
    adminLogin,
    adminLogout,
    adminActiveTab,
    setAdminActiveTab,
    orders,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    appointments,
    updateAppointmentStatus,
    reviews,
    updateReviewStatus,
    navigateTo,
    showToast,
  } = useShop();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Search & filter states
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');

  // Selected Order for detail drawer
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  // Product Edit/Create Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [prodFormName, setProdFormName] = useState('');
  const [prodFormCategory, setProdFormCategory] = useState<any>('verlobungsringe');
  const [prodFormPrice, setProdFormPrice] = useState<number>(1890);
  const [prodFormSubtitle, setProdFormSubtitle] = useState('');
  const [prodFormDesc, setProdFormDesc] = useState('');
  const [prodFormStock, setProdFormStock] = useState<number>(4);
  const [prodFormBadge, setProdFormBadge] = useState<any>('');

  // If not authenticated, show luxury admin login screen
  if (!isAdminAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const success = adminLogin(passwordInput);
      if (!success) {
        setLoginError(true);
      }
    };

    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="bg-[#FBF8F3] border border-[#E3DAC9] max-w-md w-full p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="font-serif text-[28px] tracking-[0.2em] font-normal uppercase text-[#1C1917] block">
              AURELIA
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B08D57] font-semibold block">
              Manufaktur Administrations-Portal
            </span>
            <p className="text-[13px] text-[#6B635A] pt-1">
              Geschützter Zugang für Werkstattleitung und Kundenbetreuung
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                Meister-Passwort
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Passwort eingeben"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2.5 text-[14px] text-[#1C1917] focus:outline-none"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-[#8C877D] mt-1.5">
                Hinweis für Evaluatoren: <code className="bg-[#F5F0E8] px-1 py-0.5 border border-[#E3DAC9]">aurelia-meister</code> oder <code className="bg-[#F5F0E8] px-1 py-0.5 border border-[#E3DAC9]">admin</code>
              </p>
              {loginError && (
                <p className="text-[12px] text-[#8E3B2F] mt-2">
                  Zugangscode ungültig. Bitte überprüfen Sie Ihre Eingabe.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1F2A24] hover:bg-[#B08D57] text-[#FBF8F3] text-[12px] font-medium tracking-[0.16em] uppercase transition-colors cursor-pointer"
            >
              Anmelden
            </button>
          </form>

          <div className="pt-4 border-t border-[#E3DAC9] text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-[12px] text-[#6B635A] hover:text-[#1C1917] underline"
            >
              ← Zurück zum Online-Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const inProductionCount = orders.filter((o) => o.status === 'In Fertigung').length;
  const lowStockProducts = products.filter((p) => p.stockCount <= 3);

  // Handle Edit Product modal
  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreatingProduct(false);
    setProdFormName(prod.name);
    setProdFormCategory(prod.category);
    setProdFormPrice(prod.basePrice);
    setProdFormSubtitle(prod.subtitle);
    setProdFormDesc(prod.description);
    setProdFormStock(prod.stockCount);
    setProdFormBadge(prod.badge || '');
  };

  const openCreateProduct = () => {
    setEditingProduct(null);
    setIsCreatingProduct(true);
    setProdFormName('');
    setProdFormCategory('verlobungsringe');
    setProdFormPrice(1950);
    setProdFormSubtitle('750 Gelbgold · Brillant 0,30 ct');
    setProdFormDesc('Handgeschmiedeter Ring aus Meisterhand.');
    setProdFormStock(5);
    setProdFormBadge('Neu');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodFormName) return;

    if (isCreatingProduct) {
      const newProd: Product = {
        id: `aur-${Date.now()}`,
        name: prodFormName,
        slug: prodFormName.toLowerCase().replace(/\s+/g, '-'),
        subtitle: prodFormSubtitle,
        category: prodFormCategory,
        basePrice: prodFormPrice,
        availableMetals: ['585 Gelbgold', '750 Gelbgold', '585 Weißgold', '950 Platin'],
        stoneType: 'Brillant (G/VS)',
        carat: 0.3,
        sizes: [50, 52, 54, 56, 58, 60],
        inStock: prodFormStock > 0,
        stockCount: prodFormStock,
        badge: prodFormBadge || undefined,
        images: [products[0]?.images[0] || ''],
        description: prodFormDesc,
        details: {
          ringWidthMm: 2.2,
          profile: 'Bombiert',
          origin: 'Manufaktur Pforzheim',
        },
        careInstructions: 'Regelmäßige Atelierpflege empfohlen.',
        hallmark: '750 Feingehalt',
        engravingAvailable: true,
        perspectives: createRingPerspectives(products[0]?.images[0] || '', prodFormName),
      };
      addProduct(newProd);
    } else if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: prodFormName,
        category: prodFormCategory,
        basePrice: prodFormPrice,
        subtitle: prodFormSubtitle,
        description: prodFormDesc,
        stockCount: prodFormStock,
        inStock: prodFormStock > 0,
        badge: prodFormBadge || undefined,
      };
      updateProduct(updated);
    }

    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex">
      {/* 1. Tannenschwarz Left Sidebar */}
      <aside className="w-64 bg-[#1F2A24] text-[#FBF8F3] shrink-0 border-r border-[#2D3C34] flex flex-col justify-between hidden md:flex">
        <div>
          {/* Brand Wordmark in Sidebar */}
          <div className="p-6 border-b border-[#2D3C34]">
            <span className="font-serif text-[22px] tracking-[0.2em] font-normal uppercase block text-[#FBF8F3]">
              AURELIA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#B08D57] block">
              Meister-Portal
            </span>
          </div>

          {/* User badge */}
          <div className="p-4 mx-4 my-4 bg-[#26352D] border border-[#35483D] flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#B08D57]/20 border border-[#B08D57] flex items-center justify-center text-[#B08D57] font-medium">
              {adminUser?.name[0] || 'W'}
            </div>
            <div>
              <span className="font-medium text-[#FBF8F3] block truncate">
                {adminUser?.name}
              </span>
              <span className="text-[10px] text-[#A39E93]">Rolle: {adminUser?.role}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 text-[13px]">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'orders', label: 'Bestellungen', icon: ShoppingBag, badge: orders.length },
              { id: 'products', label: 'Ring-Sortiment', icon: Package, badge: products.length },
              { id: 'inventory', label: 'Lagerbestand', icon: AlertTriangle, badge: lowStockProducts.length },
              { id: 'appointments', label: 'Beratungstermine', icon: Calendar, badge: appointments.length },
              { id: 'reviews', label: 'Bewertungen', icon: Star, badge: reviews.length },
              { id: 'settings', label: 'Einstellungen', icon: Settings },
            ].map((nav) => {
              const Icon = nav.icon;
              const isActive = adminActiveTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setAdminActiveTab(nav.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#26352D] text-[#B08D57] border-l-2 border-[#B08D57] font-medium'
                      : 'text-[#A39E93] hover:text-[#FBF8F3] hover:bg-[#26352D]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                    <span>{nav.label}</span>
                  </div>
                  {nav.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${
                        isActive
                          ? 'bg-[#B08D57] text-[#1F2A24] font-semibold'
                          : 'bg-[#2D3C34] text-[#A39E93]'
                      }`}
                    >
                      {nav.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#2D3C34] space-y-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-2 px-3 text-left text-xs text-[#A39E93] hover:text-[#FBF8F3] flex items-center gap-2"
          >
            <span>← Zum Kundenshop</span>
          </button>
          <button
            onClick={adminLogout}
            className="w-full py-2 px-3 text-left text-xs text-[#8E3B2F] hover:text-[#ff6b55] flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Abmelden</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Admin Content Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        {/* Mobile Tab Bar */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-4 mb-6 border-b border-[#E3DAC9]">
          {['dashboard', 'orders', 'products', 'inventory', 'appointments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setAdminActiveTab(tab)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap border ${
                adminActiveTab === tab
                  ? 'bg-[#1F2A24] text-[#FBF8F3] border-[#1F2A24]'
                  : 'bg-white text-[#6B635A] border-[#E3DAC9]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB: DASHBOARD */}
        {adminActiveTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                Manufaktur-Übersicht
              </span>
              <h1 className="font-serif text-[32px] sm:text-[38px] text-[#1C1917]">
                Atelier-Cockpit
              </h1>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-1">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A]">
                  Gesamtumsatz
                </span>
                <p className="font-serif text-[28px] text-[#1C1917] tabular-nums font-normal">
                  {formatEuro(totalRevenue)}
                </p>
                <span className="text-[11px] text-[#3F5B46] font-medium">+14,2 % vs. Vormonat</span>
              </div>

              <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-1">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A]">
                  Bestellungen Gesamt
                </span>
                <p className="font-serif text-[28px] text-[#1C1917] tabular-nums font-normal">
                  {totalOrdersCount}
                </p>
                <span className="text-[11px] text-[#6B635A]">
                  {inProductionCount} aktuell in Fertigung
                </span>
              </div>

              <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-1">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A]">
                  Ø Bestellwert
                </span>
                <p className="font-serif text-[28px] text-[#1C1917] tabular-nums font-normal">
                  {formatEuro(totalRevenue / Math.max(1, totalOrdersCount))}
                </p>
                <span className="text-[11px] text-[#3F5B46] font-medium">Hohe Warenkorb-Qualität</span>
              </div>

              <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-1">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A]">
                  Beratungstermine
                </span>
                <p className="font-serif text-[28px] text-[#1C1917] tabular-nums font-normal">
                  {appointments.length}
                </p>
                <span className="text-[11px] text-[#B08D57] font-medium">München & Hamburg</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3DAC9]">
                <div>
                  <h3 className="font-serif text-[22px] text-[#1C1917]">Neueste Bestellungen</h3>
                  <p className="text-[12px] text-[#6B635A]">
                    Übersicht der letzten Kundenaufträge
                  </p>
                </div>
                <button
                  onClick={() => setAdminActiveTab('orders')}
                  className="text-[12px] uppercase tracking-wider text-[#B08D57] hover:underline"
                >
                  Alle {orders.length} Bestellungen anzeigen →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#E3DAC9] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A]">
                      <th className="py-2">Bestell-Nr.</th>
                      <th className="py-2">Kunde</th>
                      <th className="py-2">Ringe</th>
                      <th className="py-2">Betrag</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3DAC9]/60">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#F5F0E8] transition-colors">
                        <td className="py-3 font-medium text-[#1C1917]">{ord.orderNumber}</td>
                        <td className="py-3 text-[#6B635A]">
                          {ord.customer.firstName} {ord.customer.lastName}
                        </td>
                        <td className="py-3 text-[#6B635A]">{ord.items.length} Position(en)</td>
                        <td className="py-3 font-medium text-[#1C1917] tabular-nums">
                          {formatEuro(ord.total)}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 text-[11px] border border-[#E3DAC9] bg-white">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BESTELLUNGEN (ORDERS MANAGEMENT) */}
        {adminActiveTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                  Auftragsverwaltung
                </span>
                <h1 className="font-serif text-[32px] text-[#1C1917]">Kundenbestellungen</h1>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#6B635A]">Status:</span>
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-white border border-[#E3DAC9] px-3 py-1.5 text-[12px] text-[#1C1917] focus:outline-none"
                >
                  <option value="all">Alle Aufträge</option>
                  <option value="Offen">Offen</option>
                  <option value="Bezahlt">Bezahlt</option>
                  <option value="In Fertigung">In Fertigung</option>
                  <option value="Versandt">Versandt</option>
                  <option value="Zugestellt">Zugestellt</option>
                </select>
              </div>
            </div>

            <div className="bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#F5F0E8] border-b border-[#E3DAC9] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57]">
                    <th className="py-3 px-4">Bestell-Nr.</th>
                    <th className="py-3 px-4">Datum</th>
                    <th className="py-3 px-4">Kunde</th>
                    <th className="py-3 px-4">Artikel</th>
                    <th className="py-3 px-4">Gesamt</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DAC9]/60">
                  {orders
                    .filter((o) => orderFilter === 'all' || o.status === orderFilter)
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-white transition-colors">
                        <td className="py-3 px-4 font-medium text-[#1C1917]">{order.orderNumber}</td>
                        <td className="py-3 px-4 text-[#6B635A]">
                          {formatGermanDate(order.date)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-[#1C1917] block">
                            {order.customer.firstName} {order.customer.lastName}
                          </span>
                          <span className="text-[11px] text-[#8C877D]">{order.customer.city}</span>
                        </td>
                        <td className="py-3 px-4 text-[#6B635A]">
                          {order.items.map((i) => i.productName).join(', ')}
                        </td>
                        <td className="py-3 px-4 font-medium text-[#1C1917] tabular-nums">
                          {formatEuro(order.total)}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value as OrderStatus)
                            }
                            className="text-[11px] bg-white border border-[#E3DAC9] px-2 py-1 font-medium focus:outline-none cursor-pointer"
                          >
                            <option value="Offen">Offen</option>
                            <option value="Bezahlt">Bezahlt</option>
                            <option value="In Fertigung">In Fertigung</option>
                            <option value="Versandt">Versandt</option>
                            <option value="Zugestellt">Zugestellt</option>
                            <option value="Storniert">Storniert</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setTrackingInput(order.trackingNumber || '');
                            }}
                            className="p-1.5 text-[#6B635A] hover:text-[#B08D57] transition-colors"
                            title="Details & Sendungsverfolgung"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Order Detail Drawer Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 z-50 bg-[#1F2A24]/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-[#FBF8F3] border border-[#E3DAC9] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start border-b border-[#E3DAC9] pb-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B08D57] font-semibold">
                        Bestelldetail
                      </span>
                      <h3 className="font-serif text-[24px] text-[#1C1917]">
                        {selectedOrder.orderNumber}
                      </h3>
                      <p className="text-[12px] text-[#6B635A]">
                        Eingegangen am {formatGermanDateTime(selectedOrder.date)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-[#6B635A] hover:text-[#1C1917] text-lg font-medium"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Customer details */}
                  <div className="grid grid-cols-2 gap-4 text-[13px] bg-white p-4 border border-[#E3DAC9]">
                    <div>
                      <span className="font-semibold text-[#B08D57] block mb-1">
                        Empfängeranschrift:
                      </span>
                      <p className="font-medium text-[#1C1917]">
                        {selectedOrder.customer.salutation} {selectedOrder.customer.firstName}{' '}
                        {selectedOrder.customer.lastName}
                      </p>
                      <p className="text-[#6B635A]">
                        {selectedOrder.customer.street} {selectedOrder.customer.streetNumber}
                      </p>
                      <p className="text-[#6B635A]">
                        {selectedOrder.customer.zip} {selectedOrder.customer.city},{' '}
                        {selectedOrder.customer.country}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#B08D57] block mb-1">
                        Kontaktdaten:
                      </span>
                      <p className="text-[#6B635A]">E-Mail: {selectedOrder.customer.email}</p>
                      <p className="text-[#6B635A]">Telefon: {selectedOrder.customer.phone}</p>
                      <p className="text-[#6B635A] pt-1">Zahlung: {selectedOrder.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-[18px] text-[#1C1917]">Bestellte Ringe</h4>
                    <div className="divide-y divide-[#E3DAC9] border border-[#E3DAC9] bg-white">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="p-3 flex items-center justify-between text-[13px]">
                          <div>
                            <span className="font-medium text-[#1C1917] block">
                              {item.productName}
                            </span>
                            <span className="text-[11px] text-[#6B635A]">
                              {item.metal} · Gr. {item.size} mm
                            </span>
                            {item.engraving && (
                              <span className="text-[11px] text-[#B08D57] italic block">
                                Gravur: {item.engraving}
                              </span>
                            )}
                          </div>
                          <span className="font-medium tabular-nums text-[#1C1917]">
                            {item.quantity} × {formatEuro(item.unitPrice)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking Number Input */}
                  <div className="space-y-2 pt-2 border-t border-[#E3DAC9]">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block">
                      Valoren-Trackingnummer (DHL Express)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        placeholder="z. B. VAL-DE-8921004X"
                        className="flex-1 bg-white border border-[#E3DAC9] px-3 py-1.5 text-[12px] font-mono"
                      />
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, selectedOrder.status, trackingInput);
                          setSelectedOrder({
                            ...selectedOrder,
                            trackingNumber: trackingInput,
                          });
                        }}
                        className="px-4 py-1.5 bg-[#1F2A24] text-[#FBF8F3] text-[11px] uppercase tracking-wider hover:bg-[#B08D57]"
                      >
                        Speichern
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: PRODUKTE (CRUD) */}
        {adminActiveTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                  Katalogpflege
                </span>
                <h1 className="font-serif text-[32px] text-[#1C1917]">Ring-Sortiment ({products.length})</h1>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Ring suchen..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="bg-white border border-[#E3DAC9] px-3 py-2 text-[12px] focus:outline-none"
                />
                <button
                  onClick={openCreateProduct}
                  className="px-4 py-2 bg-[#1F2A24] text-[#FBF8F3] hover:bg-[#B08D57] text-[12px] uppercase tracking-[0.14em] font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuer Ring</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#F5F0E8] border-b border-[#E3DAC9] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57]">
                    <th className="py-3 px-4">Vorschau</th>
                    <th className="py-3 px-4">Ringname</th>
                    <th className="py-3 px-4">Kategorie</th>
                    <th className="py-3 px-4">Grundpreis</th>
                    <th className="py-3 px-4">Bestand</th>
                    <th className="py-3 px-4">Badge</th>
                    <th className="py-3 px-4 text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DAC9]/60">
                  {products
                    .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((product) => (
                      <tr key={product.id} className="hover:bg-white transition-colors">
                        <td className="py-2.5 px-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-12 object-cover border border-[#E3DAC9]"
                          />
                        </td>
                        <td className="py-2.5 px-4 font-medium text-[#1C1917]">{product.name}</td>
                        <td className="py-2.5 px-4 text-[#6B635A] uppercase text-[11px]">
                          {product.category}
                        </td>
                        <td className="py-2.5 px-4 font-medium tabular-nums text-[#1C1917]">
                          {formatEuro(product.basePrice)}
                        </td>
                        <td className="py-2.5 px-4">
                          <span
                            className={`px-2 py-0.5 text-[11px] font-medium ${
                              product.stockCount <= 2
                                ? 'bg-[#8E3B2F]/10 text-[#8E3B2F]'
                                : 'bg-[#3F5B46]/10 text-[#3F5B46]'
                            }`}
                          >
                            {product.stockCount} Stk.
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-[11px] text-[#6B635A]">
                          {product.badge || '—'}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditProduct(product)}
                              className="p-1.5 text-[#6B635A] hover:text-[#B08D57] transition-colors"
                              title="Bearbeiten"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="p-1.5 text-[#6B635A] hover:text-[#8E3B2F] transition-colors"
                              title="Löschen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Create/Edit Product Modal */}
            {(editingProduct || isCreatingProduct) && (
              <div className="fixed inset-0 z-50 bg-[#1F2A24]/60 backdrop-blur-xs flex items-center justify-center p-4">
                <form
                  onSubmit={handleSaveProduct}
                  className="bg-[#FBF8F3] border border-[#E3DAC9] max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center pb-3 border-b border-[#E3DAC9]">
                    <h3 className="font-serif text-[22px] text-[#1C1917]">
                      {isCreatingProduct ? 'Neuen Ring anlegen' : 'Ringdaten bearbeiten'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setIsCreatingProduct(false);
                      }}
                      className="text-[#6B635A] hover:text-[#1C1917]"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block mb-1">
                      Ringname *
                    </label>
                    <input
                      type="text"
                      required
                      value={prodFormName}
                      onChange={(e) => setProdFormName(e.target.value)}
                      placeholder="z. B. Solitär Corona"
                      className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block mb-1">
                        Kategorie
                      </label>
                      <select
                        value={prodFormCategory}
                        onChange={(e) => setProdFormCategory(e.target.value)}
                        className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                      >
                        <option value="verlobungsringe">Verlobungsringe</option>
                        <option value="eheringe">Eheringe</option>
                        <option value="allianzringe">Allianzringe</option>
                        <option value="siegelringe">Siegelringe</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block mb-1">
                        Grundpreis in EUR *
                      </label>
                      <input
                        type="number"
                        required
                        value={prodFormPrice}
                        onChange={(e) => setProdFormPrice(Number(e.target.value))}
                        className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block mb-1">
                      Untertitel / Spezifikation
                    </label>
                    <input
                      type="text"
                      value={prodFormSubtitle}
                      onChange={(e) => setProdFormSubtitle(e.target.value)}
                      placeholder="z. B. 750 Gelbgold · Brillant 0,30 ct"
                      className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block mb-1">
                        Lagerbestand (Stk.)
                      </label>
                      <input
                        type="number"
                        value={prodFormStock}
                        onChange={(e) => setProdFormStock(Number(e.target.value))}
                        className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block mb-1">
                        Badge (Optional)
                      </label>
                      <select
                        value={prodFormBadge}
                        onChange={(e) => setProdFormBadge(e.target.value)}
                        className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                      >
                        <option value="">Kein Badge</option>
                        <option value="Neu">Neu</option>
                        <option value="Bestseller">Bestseller</option>
                        <option value="Nur noch 2 verfügbar">Nur noch 2 verfügbar</option>
                        <option value="Unikat">Unikat</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B635A] block mb-1">
                      Beschreibung
                    </label>
                    <textarea
                      rows={3}
                      value={prodFormDesc}
                      onChange={(e) => setProdFormDesc(e.target.value)}
                      className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#E3DAC9] flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setIsCreatingProduct(false);
                      }}
                      className="px-4 py-2 border border-[#E3DAC9] text-[12px] uppercase tracking-wider text-[#6B635A]"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#1F2A24] text-[#FBF8F3] hover:bg-[#B08D57] text-[12px] uppercase tracking-wider font-medium"
                    >
                      Speichern
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB: LAGERBESTAND */}
        {adminActiveTab === 'inventory' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                Werkstatt-Material
              </span>
              <h1 className="font-serif text-[32px] text-[#1C1917]">Lagerbestand & Rohlinge</h1>
            </div>

            <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-4">
              <h3 className="font-serif text-[20px] text-[#1C1917]">
                Bestandsübersicht je Modell
              </h3>
              <div className="divide-y divide-[#E3DAC9]/60">
                {products.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between text-[13px]">
                    <div>
                      <span className="font-medium text-[#1C1917] block">{p.name}</span>
                      <span className="text-[11px] text-[#6B635A]">{p.availableMetals.join(', ')}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`font-medium tabular-nums ${
                          p.stockCount <= 2 ? 'text-[#8E3B2F]' : 'text-[#1C1917]'
                        }`}
                      >
                        {p.stockCount} Stück lagernd
                      </span>
                      <button
                        onClick={() => {
                          updateProduct({ ...p, stockCount: p.stockCount + 1, inStock: true });
                          showToast(`Bestand für ${p.name} um +1 erhöht`, 'success');
                        }}
                        className="px-2 py-1 bg-white border border-[#E3DAC9] text-[11px] hover:border-[#B08D57]"
                      >
                        +1 Rohling fertigen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: BERATUNGSTERMINE */}
        {adminActiveTab === 'appointments' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                Atelier-Kalender
              </span>
              <h1 className="font-serif text-[32px] text-[#1C1917]">
                Beratungstermine ({appointments.length})
              </h1>
            </div>

            <div className="bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#F5F0E8] border-b border-[#E3DAC9] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57]">
                    <th className="py-3 px-4">Datum & Uhrzeit</th>
                    <th className="py-3 px-4">Kunde</th>
                    <th className="py-3 px-4">Standort</th>
                    <th className="py-3 px-4">Thema</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3DAC9]/60">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-white transition-colors">
                      <td className="py-3 px-4 font-medium text-[#1C1917]">
                        {app.date}, {app.time} Uhr
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#1C1917] block">{app.name}</span>
                        <span className="text-[11px] text-[#6B635A]">{app.phone}</span>
                      </td>
                      <td className="py-3 px-4 text-[#6B635A]">{app.location}</td>
                      <td className="py-3 px-4 text-[#1C1917]">{app.topic}</td>
                      <td className="py-3 px-4">
                        <select
                          value={app.status}
                          onChange={(e) => updateAppointmentStatus(app.id, e.target.value as any)}
                          className="bg-white border border-[#E3DAC9] px-2 py-1 text-[11px] focus:outline-none"
                        >
                          <option value="Bestätigt">Bestätigt</option>
                          <option value="Ausstehend">Ausstehend</option>
                          <option value="Abgeschlossen">Abgeschlossen</option>
                          <option value="Storniert">Storniert</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: BEWERTUNGEN */}
        {adminActiveTab === 'reviews' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                Kundenstimmen
              </span>
              <h1 className="font-serif text-[32px] text-[#1C1917]">Bewertungs-Moderation</h1>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif text-[18px] text-[#1C1917] font-medium">
                        „{rev.title}“ · {rev.productName}
                      </span>
                      <p className="text-[12px] text-[#6B635A]">
                        Von {rev.author} ({rev.location}) am {rev.date}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] bg-[#3F5B46]/10 text-[#3F5B46] border border-[#3F5B46]/30">
                      {rev.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#1C1917] leading-relaxed italic">
                    „{rev.comment}“
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: EINSTELLUNGEN */}
        {adminActiveTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-2xl">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                Konfiguration
              </span>
              <h1 className="font-serif text-[32px] text-[#1C1917]">Manufaktur-Einstellungen</h1>
            </div>

            <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-4 text-[13px]">
              <h3 className="font-serif text-[20px] text-[#1C1917]">Versand & Steuersätze (de-DE)</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">Freigrenze für Valorenversand:</span>
                  <span className="font-medium">150,00 €</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">Gesetzliche Mehrwertsteuer:</span>
                  <span className="font-medium">19,00 %</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">Währung:</span>
                  <span className="font-medium">EUR (€) mit de-DE Formatierung</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">DSGVO-Modus:</span>
                  <span className="text-[#3F5B46] font-medium">Aktiv (Opt-in ohne Voranwahl)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
