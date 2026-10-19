import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Send, ExternalLink } from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL } from '../context/ShopContext';
import { formatEuro, FREE_SHIPPING_THRESHOLD } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotals,
    navigateTo,
    applyDiscountCode,
    appliedDiscount,
    removeDiscountCode,
    showToast,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotals.subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((cartTotals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    const res = applyDiscountCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F2A24]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[460px] bg-[#FBF8F3] border-l border-[#E3DAC9] flex flex-col justify-between shadow-2xl animate-fadeIn">
          {/* 1. Header */}
          <div className="p-6 border-b border-[#E3DAC9] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
                Ihre Auswahl
              </span>
              <h2 className="font-serif text-[24px] text-[#1C1917] font-normal">
                Warenkorb ({cartTotals.itemsCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6B635A] hover:text-[#1C1917] transition-colors"
              aria-label="Warenkorb schließen"
            >
              <X className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>

          {/* 2. Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-[#F5F0E8] border-b border-[#E3DAC9]">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-[12px] text-[#6B635A] mb-1.5">
                  Noch{' '}
                  <span className="font-medium text-[#1C1917]">
                    {formatEuro(remainingForFreeShipping)}
                  </span>{' '}
                  bis zum <span className="text-[#3F5B46] font-medium">kostenlosen Wertversand</span>
                </p>
                <div className="w-full bg-[#E3DAC9] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#B08D57] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-[12px] text-[#3F5B46] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3F5B46]" />
                <span>Ihre Bestellung qualifiziert sich für den kostenlosen Wertversand.</span>
              </p>
            )}
          </div>

          {/* 3. Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-[#6B635A]">
                <p className="font-serif text-[22px] text-[#1C1917] mb-2">
                  Ihr Warenkorb ist leer
                </p>
                <p className="text-[13px] leading-relaxed max-w-xs mx-auto mb-6">
                  Entdecken Sie unsere Meisterstücke oder konfigurieren Sie Ihren individuellen Ring.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="py-2.5 px-6 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-[0.14em] font-medium hover:bg-[#B08D57] transition-colors"
                >
                  Kollektionen entdecken
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-[#E3DAC9]/60 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover border border-[#E3DAC9] bg-[#F5F0E8] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-[18px] text-[#1C1917] leading-snug">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B635A] hover:text-[#8E3B2F] transition-colors p-0.5"
                          title="Entfernen"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.25]" />
                        </button>
                      </div>

                      <div className="text-[12px] text-[#6B635A] space-y-0.5 mt-1">
                        <p>{item.metal}</p>
                        <p>Ringgröße: {item.size} mm</p>
                        {item.stoneType !== 'Ohne Stein' && <p>Besatz: {item.stoneType}</p>}
                        {item.engraving && (
                          <p className="italic text-[#B08D57]">Gravur: „{item.engraving}“</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E3DAC9] bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-sm text-[#6B635A] hover:text-[#1C1917]"
                        >
                          -
                        </button>
                        <span className="px-2 text-[12px] font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-sm text-[#6B635A] hover:text-[#1C1917]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-[14px] font-medium text-[#1C1917] tabular-nums">
                        {formatEuro(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Footer & Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F5F0E8] border-t border-[#E3DAC9] space-y-4">
              {/* Discount Code Box */}
              {appliedDiscount ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FBF8F3] border border-[#B08D57]/40 text-[12px]">
                  <div className="flex items-center gap-2 text-[#3F5B46]">
                    <Tag className="w-4 h-4" />
                    <span>Gutschein {appliedDiscount.code} aktiv</span>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-[#8E3B2F] hover:underline text-[11px]"
                  >
                    Entfernen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Gutscheincode eingeben"
                      className="flex-1 bg-white border border-[#E3DAC9] px-3 py-1.5 text-[12px] focus:outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#1F2A24] text-[#FBF8F3] text-[11px] uppercase tracking-wider font-medium hover:bg-[#B08D57] transition-colors"
                    >
                      Einlösen
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-[#8E3B2F]">{couponError}</p>}
                </form>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-[13px] text-[#6B635A]">
                <div className="flex justify-between">
                  <span>Zwischensumme</span>
                  <span className="tabular-nums text-[#1C1917]">
                    {formatEuro(cartTotals.subtotal)}
                  </span>
                </div>

                {cartTotals.discount > 0 && (
                  <div className="flex justify-between text-[#3F5B46]">
                    <span>Rabatt</span>
                    <span className="tabular-nums">-{formatEuro(cartTotals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Versicherter Wertversand</span>
                  <span className="tabular-nums">
                    {cartTotals.shipping === 0 ? 'Kostenlos' : formatEuro(cartTotals.shipping)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#E3DAC9] text-[16px] font-medium text-[#1C1917]">
                  <span>Gesamtsumme</span>
                  <span className="tabular-nums font-semibold text-[17px]">
                    {formatEuro(cartTotals.total)}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C877D] text-right">
                  inkl. 19 % MwSt. ({formatEuro(cartTotals.tax)})
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full py-3.5 bg-[#1F2A24] text-[#FBF8F3] hover:bg-[#B08D57] text-[13px] font-medium tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Zur Kasse gehen</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </button>

                {/* Direct Telegram Order Option */}
                <a
                  href={TELEGRAM_ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    const cartSummary = `AURELIA Warenkorb-Bestellung:\n${cart
                      .map(
                        (i) =>
                          `- ${i.productName} | ${i.metal} | Größe ${i.size} mm | ${formatEuro(
                            i.unitPrice
                          )} x ${i.quantity}${i.engraving ? ` | Gravur: ${i.engraving}` : ''}`
                      )
                      .join('\n')}\nGesamtbetrag: ${formatEuro(cartTotals.total)}`;
                    try {
                      if (navigator.clipboard) navigator.clipboard.writeText(cartSummary);
                    } catch {}
                    showToast(
                      'Bestelldetails für Meister @dexco36 kopiert! Telegram wird geöffnet...',
                      'info'
                    );
                  }}
                  className="w-full py-2.5 px-3 bg-[#F5F0E8] hover:bg-[#B08D57] border border-[#B08D57] text-[#1F2A24] hover:text-white text-[11px] font-medium tracking-[0.12em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Send className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Meister via Telegram kontaktieren (t.me/dexco36)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('cart');
                  }}
                  className="w-full py-1.5 text-[12px] text-[#6B635A] hover:text-[#1C1917] text-center transition-colors underline"
                >
                  Warenkorb im Detail anzeigen
                </button>
              </div>

              {/* Guarantee trust note */}
              <p className="text-[11px] text-[#6B635A] text-center pt-1">
                Kostenlose Ringgrößen-Änderung innerhalb von 30 Tagen inklusive.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
