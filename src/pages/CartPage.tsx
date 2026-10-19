import React, { useState } from 'react';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL } from '../context/ShopContext';
import { formatEuro, FREE_SHIPPING_THRESHOLD } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const {
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

  if (cart.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-24 text-center space-y-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
          AURELIA Warenkorb
        </span>
        <h1 className="font-serif text-[36px] sm:text-[44px] text-[#1C1917] font-normal">
          Ihr Warenkorb ist derzeit leer
        </h1>
        <p className="text-[15px] text-[#6B635A] max-w-md mx-auto leading-relaxed">
          Lassen Sie sich von unseren Kollektionen inspirieren oder kreieren Sie ein individuelles
          Unikat in unserem Ring-Konfigurator.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-[#1F2A24] text-[#FBF8F3] hover:bg-[#B08D57] text-[12px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
          >
            Kollektionen ansehen
          </button>
          <button
            onClick={() => navigateTo('configurator')}
            className="px-8 py-3.5 border border-[#E3DAC9] text-[#1C1917] hover:border-[#B08D57] text-[12px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer bg-white"
          >
            Konfigurator öffnen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-10 pb-4 border-b border-[#E3DAC9] flex items-baseline justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
            Bestellübersicht
          </span>
          <h1 className="font-serif text-[36px] sm:text-[42px] text-[#1C1917] font-normal">
            Ihr Warenkorb ({cartTotals.itemsCount})
          </h1>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="hidden sm:inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-[#6B635A] hover:text-[#1C1917]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Weiter einkaufen</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items Table (8 Cols) */}
        <div className="lg:col-span-8 bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-6">
          <div className="divide-y divide-[#E3DAC9]/60">
            {cart.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex gap-6">
                <img
                  src={item.image}
                  alt={item.productName}
                  referrerPolicy="no-referrer"
                  className="w-24 sm:w-28 aspect-4/5 object-cover border border-[#E3DAC9] bg-[#F5F0E8] shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-[22px] text-[#1C1917] leading-tight">
                          {item.productName}
                        </h3>
                        <p className="text-[13px] text-[#6B635A] mt-1">{item.metal}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#6B635A] hover:text-[#8E3B2F] transition-colors p-1"
                        title="Position entfernen"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.25]" />
                      </button>
                    </div>

                    <div className="text-[12px] text-[#6B635A] space-y-1 mt-2">
                      <p>Ringgröße: {item.size} mm Umfang</p>
                      {item.stoneType !== 'Ohne Stein' && <p>Besatz: {item.stoneType}</p>}
                      {item.engraving && (
                        <p className="italic text-[#B08D57]">Gravur: „{item.engraving}“</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#E3DAC9]/40">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E3DAC9] bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-sm text-[#6B635A] hover:text-[#1C1917]"
                      >
                        -
                      </button>
                      <span className="px-3 text-[13px] font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-sm text-[#6B635A] hover:text-[#1C1917]"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-[20px] text-[#1C1917] tabular-nums font-normal">
                        {formatEuro(item.unitPrice * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-[#8C877D] block">
                          {formatEuro(item.unitPrice)} je Stück
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Checkout (4 Cols) */}
        <div className="lg:col-span-4 bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-[22px] text-[#1C1917] pb-3 border-b border-[#E3DAC9]">
            Zusammenfassung
          </h2>

          {/* Discount Form */}
          {appliedDiscount ? (
            <div className="flex items-center justify-between p-3 bg-[#F5F0E8] border border-[#B08D57]/50 text-[12px]">
              <div className="flex items-center gap-2 text-[#3F5B46]">
                <Tag className="w-4 h-4" />
                <span>Code {appliedDiscount.code} aktiv</span>
              </div>
              <button
                onClick={removeDiscountCode}
                className="text-[#8E3B2F] underline text-[11px] hover:text-[#1C1917]"
              >
                Entfernen
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block">
                Gutscheincode
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Gutscheincode eingeben"
                  className="flex-1 bg-white border border-[#E3DAC9] px-3 py-2 text-[12px] uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1F2A24] text-[#FBF8F3] text-[11px] uppercase tracking-wider font-medium hover:bg-[#B08D57] transition-colors"
                >
                  Einlösen
                </button>
              </div>
              {couponError && <p className="text-[11px] text-[#8E3B2F]">{couponError}</p>}
            </form>
          )}

          {/* Totals Breakdown */}
          <div className="space-y-2 text-[13px] text-[#6B635A]">
            <div className="flex justify-between">
              <span>Zwischensumme</span>
              <span className="tabular-nums text-[#1C1917] font-medium">
                {formatEuro(cartTotals.subtotal)}
              </span>
            </div>

            {cartTotals.discount > 0 && (
              <div className="flex justify-between text-[#3F5B46]">
                <span>Gutscheinrabatt</span>
                <span className="tabular-nums font-medium">-{formatEuro(cartTotals.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Versicherter Wertversand (DHL Express)</span>
              <span className="tabular-nums text-[#3F5B46] font-medium">
                {cartTotals.shipping === 0 ? 'Kostenlos' : formatEuro(cartTotals.shipping)}
              </span>
            </div>

            <div className="flex justify-between pt-3 border-t border-[#E3DAC9] text-[18px] font-medium text-[#1C1917]">
              <span>Gesamtbetrag</span>
              <span className="font-serif text-[24px] tabular-nums font-normal">
                {formatEuro(cartTotals.total)}
              </span>
            </div>
            <p className="text-[11px] text-[#8C877D] text-right">
              inkl. 19 % MwSt. ({formatEuro(cartTotals.tax)})
            </p>
          </div>

          <button
            onClick={() => navigateTo('checkout')}
            className="w-full py-4 bg-[#1F2A24] hover:bg-[#B08D57] text-[#FBF8F3] text-[13px] font-medium tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Weiter zur Kasse</span>
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Direct Telegram Order Option */}
          <div className="p-4 bg-[#F5F0E8] border border-[#B08D57]/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57] flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Persönlich beim Meister bestellen
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#3F5B46] font-medium bg-[#3F5B46]/10 px-2 py-0.5">
                Telegram @dexco36
              </span>
            </div>
            <p className="text-[12px] text-[#6B635A] leading-relaxed">
              Möchten Sie Sondermaße, individuelle Gravuren oder die Bestellung direkt mit dem
              Goldschmiedemeister abstimmen?
            </p>
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
              className="w-full py-3 px-3 bg-[#B08D57] hover:bg-[#977644] text-[#1F2A24] hover:text-white text-[12px] font-medium tracking-[0.12em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer text-center shadow-xs"
            >
              <Send className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Meister kontaktieren & bestellen (t.me/dexco36)</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
            </a>
          </div>

          <div className="pt-2 border-t border-[#E3DAC9] space-y-2 text-[11px] text-[#6B635A]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
              <span>30 Tage Rückgaberecht & kostenlose Anpassung</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#B08D57]" />
              <span>Voller Versicherungsschutz bis zur Übergabe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
