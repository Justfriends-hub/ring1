import React, { useState } from 'react';
import {
  Package,
  Heart,
  Compass,
  MapPin,
  LogOut,
  User,
  Star,
  Trash2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatEuro, formatGermanDate } from '../utils/formatters';

export const AccountPage: React.FC = () => {
  const {
    orders,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    navigateTo,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'bestellungen' | 'wunschliste' | 'groessen' | 'adressen'>('bestellungen');

  // Customer profile info (simulated for German luxury buyer)
  const [customerName] = useState('Maximilian von Berg');
  const [customerEmail] = useState('m.vonberg@example.de');

  // Saved ring sizes in account
  const [savedSizes, setSavedSizes] = useState([
    { label: 'Mein Ringfinger (rechts)', size: 54, diameter: '17,2 mm' },
    { label: 'Partnerin (Ringfinger links)', size: 50, diameter: '15,9 mm' },
  ]);

  const [newLabel, setNewLabel] = useState('');
  const [newSize, setNewSize] = useState<number>(52);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddSize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel) return;
    setSavedSizes([
      ...savedSizes,
      {
        label: newLabel,
        size: newSize,
        diameter: `${(newSize / Math.PI).toFixed(1).replace('.', ',')} mm`,
      },
    ]);
    setNewLabel('');
    showToast('Ringgröße in Ihrem Profil gespeichert.', 'success');
  };

  const handleDeleteSize = (idx: number) => {
    setSavedSizes(savedSizes.filter((_, i) => i !== idx));
    showToast('Größeneintrag entfernt.', 'info');
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E3DAC9] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
            AURELIA Kundenportal
          </span>
          <h1 className="font-serif text-[34px] sm:text-[40px] text-[#1C1917] font-normal leading-tight">
            Willkommen, {customerName}
          </h1>
          <p className="text-[13px] text-[#6B635A]">{customerEmail}</p>
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="text-[12px] uppercase tracking-[0.14em] text-[#6B635A] hover:text-[#1C1917] underline"
        >
          Abmelden
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3DAC9] gap-6 text-[13px] uppercase tracking-[0.12em]">
        <button
          onClick={() => setActiveTab('bestellungen')}
          className={`pb-3 font-medium cursor-pointer transition-colors ${
            activeTab === 'bestellungen'
              ? 'border-b-2 border-[#B08D57] text-[#1C1917]'
              : 'text-[#6B635A] hover:text-[#1C1917]'
          }`}
        >
          Meine Bestellungen ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('wunschliste')}
          className={`pb-3 font-medium cursor-pointer transition-colors ${
            activeTab === 'wunschliste'
              ? 'border-b-2 border-[#B08D57] text-[#1C1917]'
              : 'text-[#6B635A] hover:text-[#1C1917]'
          }`}
        >
          Wunschliste ({wishlist.length})
        </button>

        <button
          onClick={() => setActiveTab('groessen')}
          className={`pb-3 font-medium cursor-pointer transition-colors ${
            activeTab === 'groessen'
              ? 'border-b-2 border-[#B08D57] text-[#1C1917]'
              : 'text-[#6B635A] hover:text-[#1C1917]'
          }`}
        >
          Gespeicherte Ringgrößen
        </button>

        <button
          onClick={() => setActiveTab('adressen')}
          className={`pb-3 font-medium cursor-pointer transition-colors ${
            activeTab === 'adressen'
              ? 'border-b-2 border-[#B08D57] text-[#1C1917]'
              : 'text-[#6B635A] hover:text-[#1C1917]'
          }`}
        >
          Adressbuch
        </button>
      </div>

      {/* TAB 1: BESTELLUNGEN */}
      {activeTab === 'bestellungen' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#FBF8F3] border border-[#E3DAC9] text-[#6B635A]">
              <p className="font-serif text-[22px] text-[#1C1917] mb-2">
                Noch keine Bestellungen aufgegeben
              </p>
              <p className="text-[13px] mb-4">
                Entdecken Sie unsere handgefertigten Ringe aus Pforzheim.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-2.5 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-wider hover:bg-[#B08D57]"
              >
                Kollektionen ansehen
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E3DAC9] gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A] block">
                      Bestellnummer
                    </span>
                    <h3 className="font-serif text-[20px] text-[#1C1917]">{order.orderNumber}</h3>
                    <p className="text-[12px] text-[#6B635A]">
                      Bestellt am {formatGermanDate(order.date)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-[11px] font-medium uppercase tracking-wider border ${
                        order.status === 'Zugestellt'
                          ? 'bg-[#3F5B46]/10 text-[#3F5B46] border-[#3F5B46]/30'
                          : order.status === 'Versandt'
                          ? 'bg-[#B08D57]/15 text-[#B08D57] border-[#B08D57]/40'
                          : 'bg-[#F5F0E8] text-[#1C1917] border-[#E3DAC9]'
                      }`}
                    >
                      Status: {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#E3DAC9]/60">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-cover border border-[#E3DAC9] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-[18px] text-[#1C1917] leading-snug">
                          {item.productName}
                        </h4>
                        <p className="text-[12px] text-[#6B635A]">
                          {item.metal} · Gr. {item.size} mm
                        </p>
                        {item.engraving && (
                          <p className="text-[12px] text-[#B08D57] italic">
                            Gravur: {item.engraving}
                          </p>
                        )}
                        <p className="text-[12px] text-[#1C1917] font-medium tabular-nums mt-1">
                          {item.quantity} × {formatEuro(item.unitPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Total Footer */}
                <div className="pt-4 border-t border-[#E3DAC9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px]">
                  <div>
                    {order.trackingNumber ? (
                      <span className="text-[#3F5B46] font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {order.carrier || 'DHL Express Valoren'}:{' '}
                          <span className="underline font-mono">{order.trackingNumber}</span>
                        </span>
                      </span>
                    ) : (
                      <span className="text-[#6B635A]">Wird für den Versand vorbereitet</span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[#6B635A] mr-2">Gesamt:</span>
                    <span className="font-serif text-[20px] font-medium text-[#1C1917] tabular-nums">
                      {formatEuro(order.total)}
                    </span>
                    <span className="text-[10px] text-[#8C877D] block">inkl. 19 % MwSt.</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: WUNSCHLISTE */}
      {activeTab === 'wunschliste' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="p-12 text-center bg-[#FBF8F3] border border-[#E3DAC9] text-[#6B635A]">
              <p className="font-serif text-[22px] text-[#1C1917] mb-2">
                Ihre Wunschliste ist leer
              </p>
              <p className="text-[13px] mb-4">
                Markieren Sie Ringe mit dem Stern-Symbol, um sie hier dauerhaft zu speichern.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-2.5 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-wider hover:bg-[#B08D57]"
              >
                Kollektionen ansehen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="bg-[#FBF8F3] border border-[#E3DAC9] p-5 space-y-4">
                  <div className="aspect-4/5 bg-[#F5F0E8] overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-[20px] text-[#1C1917]">{p.name}</h4>
                    <p className="text-[12px] text-[#6B635A]">{p.subtitle}</p>
                    <span className="font-serif text-[18px] text-[#1C1917] block mt-1 tabular-nums">
                      {formatEuro(p.basePrice)}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[#E3DAC9]">
                    <button
                      onClick={() => navigateTo('product', p.id)}
                      className="flex-1 py-2 bg-[#1F2A24] text-[#FBF8F3] text-[11px] uppercase tracking-wider font-medium hover:bg-[#B08D57] transition-colors"
                    >
                      Konfigurieren
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 border border-[#E3DAC9] text-[#8E3B2F] hover:bg-[#8E3B2F]/10"
                      title="Entfernen"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.25]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GESPEICHERTE RINGGRÖSSEN */}
      {activeTab === 'groessen' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-4">
            <h3 className="font-serif text-[22px] text-[#1C1917]">
              Hinterlegte Ringgrößen
            </h3>
            <p className="text-[13px] text-[#6B635A]">
              Praktisch für Überraschungen oder die Konfiguration zukünftiger Geschenke.
            </p>

            <div className="divide-y divide-[#E3DAC9]">
              {savedSizes.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-[13px]">
                  <div>
                    <span className="font-medium text-[#1C1917] block">{item.label}</span>
                    <span className="text-[11px] text-[#6B635A]">
                      Größe {item.size} mm ({item.diameter})
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSize(idx)}
                    className="text-[#6B635A] hover:text-[#8E3B2F]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-4">
            <h3 className="font-serif text-[22px] text-[#1C1917]">Neue Größe speichern</h3>
            <form onSubmit={handleAddSize} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                  Bezeichnung
                </label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="z. B. Verlobungsfinger Partnerin"
                  className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                  Ringgröße in mm (48–66)
                </label>
                <select
                  value={newSize}
                  onChange={(e) => setNewSize(Number(e.target.value))}
                  className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                >
                  {[48, 50, 52, 54, 56, 58, 60, 62, 64, 66].map((s) => (
                    <option key={s} value={s}>
                      Größe {s} mm
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-wider font-medium hover:bg-[#B08D57] transition-colors"
              >
                Größe speichern
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: ADRESSBUCH */}
      {activeTab === 'adressen' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-3 text-[13px]">
            <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold">
              Standard-Lieferadresse
            </span>
            <h4 className="font-serif text-[20px] text-[#1C1917]">Maximilian von Berg</h4>
            <p className="text-[#6B635A]">
              Königinstraße 14b<br />
              80539 München<br />
              Deutschland
            </p>
            <p className="text-[#6B635A]">Telefon: +49 89 2149021</p>
          </div>
        </div>
      )}
    </div>
  );
};
