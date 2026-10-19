import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShoppingBag,
  Send,
  ShieldCheck,
  Check,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Product, PreciousMetal } from '../types';
import { useShop, TELEGRAM_ORDER_URL } from '../context/ShopContext';
import { formatEuro, getDiameterFromCircumference } from '../utils/formatters';

interface RingPerspectiveViewerProps {
  product: Product;
  onClose?: () => void;
  isModal?: boolean;
}

export const RingPerspectiveViewer: React.FC<RingPerspectiveViewerProps> = ({
  product,
  onClose,
  isModal = true,
}) => {
  const { addToCart, showToast } = useShop();

  // Active perspective: 0 to 4 (5 designs / different sides of the same ring)
  const [activeSideIndex, setActiveSideIndex] = useState(0);

  // Metal & size options
  const [selectedMetal, setSelectedMetal] = useState<PreciousMetal>(
    product.availableMetals[0] || '585 Gelbgold'
  );
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 54);
  const [engraving, setEngraving] = useState('');

  const currentPerspective =
    product.perspectives?.[activeSideIndex] || {
      id: 'frontal',
      label: '1. Frontalansicht',
      detailTitle: `${product.name} · Frontalansicht`,
      shortDesc: 'Vorderansicht mit harmonischem Schienenverlauf.',
      image: product.images[0],
    };

  const getMetalDelta = (metal: PreciousMetal) => {
    if (metal.includes('750')) return 350;
    if (metal.includes('Platin')) return 650;
    return 0;
  };

  const finalPrice = product.basePrice + getMetalDelta(selectedMetal);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: `${product.name} (Ansicht: ${currentPerspective.label})`,
      image: currentPerspective.image,
      metal: selectedMetal,
      size: selectedSize,
      stoneType: product.stoneType,
      engraving: engraving.trim() || undefined,
      unitPrice: finalPrice,
      quantity: 1,
    });
    if (onClose) onClose();
  };

  const handleTelegramOrder = () => {
    const details = `AURELIA Manufaktur - Direkte Ringbestellung:
Modell: ${product.name}
Gewählte Ansicht/Fassung: ${currentPerspective.label} (${currentPerspective.detailTitle})
Edelmetall: ${selectedMetal}
Ringgröße: ${selectedSize} mm (Ø ${getDiameterFromCircumference(selectedSize)} mm)
${engraving.trim() ? `Wunschgravur: „${engraving.trim()}“\n` : ''}Preis: ${formatEuro(finalPrice)}
Status: Bitte erfassen Sie meine Bestellung und Kontaktdaten.`;

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(details);
      }
    } catch {
      // clipboard fallback
    }

    showToast(
      'Bestelldetails für Meister @dexco36 kopiert! Telegram (t.me/dexco36) wird geöffnet...',
      'info'
    );
  };

  const content = (
    <div className="bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">
      {/* Close button if modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#6B635A] hover:text-[#1C1917] bg-[#FBF8F3]/80 backdrop-blur-xs rounded-full border border-[#E3DAC9] transition-colors"
          aria-label="Schließen"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>
      )}

      {/* Left Column: Visual Perspective Showcase (5 Sides) */}
      <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E3DAC9] bg-[#F5F0E8]">
        <div>
          {/* Header of the inspection */}
          <div className="flex items-center gap-2 mb-2 text-[#B08D57]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              5 Manufaktur-Perspektiven & Facetten
            </span>
          </div>

          <h3 className="font-serif text-[26px] sm:text-[32px] text-[#1C1917] font-normal leading-tight">
            {product.name}
          </h3>
          <p className="text-[13px] text-[#6B635A] mt-0.5">
            Tippen Sie auf eine der 5 Perspektiven, um Details, Fassung und Punzen zu inspizieren.
          </p>
        </div>

        {/* Big Active Image Display */}
        <div className="my-6 relative aspect-4/3 sm:aspect-16/10 bg-white border border-[#E3DAC9] overflow-hidden group">
          <img
            src={currentPerspective.image}
            alt={currentPerspective.detailTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500 ease-out"
          />

          {/* Perspective Description Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#1F2A24]/90 via-[#1F2A24]/60 to-transparent text-[#FBF8F3]">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#B08D57] font-medium block">
              Perspektive {activeSideIndex + 1} von 5: {currentPerspective.label}
            </span>
            <h4 className="font-serif text-[18px] text-[#FBF8F3]">
              {currentPerspective.detailTitle}
            </h4>
            <p className="text-[12px] text-[#E3DAC9] line-clamp-2 mt-0.5 font-light">
              {currentPerspective.shortDesc}
            </p>
          </div>
        </div>

        {/* 5 Perspective Selector Buttons (Tappable sides) */}
        <div>
          <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#6B635A] block mb-2.5">
            Wählen Sie die Ring-Perspektive:
          </span>
          <div className="grid grid-cols-5 gap-2">
            {product.perspectives?.map((persp, idx) => (
              <button
                key={persp.id}
                type="button"
                onClick={() => setActiveSideIndex(idx)}
                className={`p-1.5 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  activeSideIndex === idx
                    ? 'border-[#B08D57] bg-white ring-1 ring-[#B08D57] shadow-xs'
                    : 'border-[#E3DAC9] bg-[#FBF8F3] hover:border-[#B08D57]'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden mb-1 bg-white">
                  <img
                    src={persp.image}
                    alt={persp.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#1C1917] truncate block">
                  {persp.label.split('. ')[1] || persp.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Configuration & Put in Cart / Order via Telegram */}
      <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FBF8F3]">
        <div className="space-y-5">
          {/* Price header */}
          <div className="pb-4 border-b border-[#E3DAC9]">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#B08D57] font-semibold block">
              Handgefertigte Konfiguration
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-serif text-[28px] sm:text-[32px] text-[#1C1917] tabular-nums font-normal">
                {formatEuro(finalPrice)}
              </span>
              <span className="text-[11px] text-[#3F5B46] font-medium">
                Inkl. 19 % MwSt., Valorenversand frei
              </span>
            </div>
            <p className="text-[11px] text-[#6B635A]">
              Lieferzeit: 3–5 Werktage · 30 Tage kostenlose Größenanpassung
            </p>
          </div>

          {/* Metal Selector */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1917] block mb-1.5">
              Edelmetall wählen: <span className="font-normal text-[#6B635A]">{selectedMetal}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {product.availableMetals.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMetal(m)}
                  className={`py-2 px-2.5 border text-left text-[12px] transition-all cursor-pointer ${
                    selectedMetal === m
                      ? 'border-[#B08D57] bg-white ring-1 ring-[#B08D57] text-[#1C1917] font-medium'
                      : 'border-[#E3DAC9] bg-[#F5F0E8] text-[#6B635A] hover:border-[#B08D57]'
                  }`}
                >
                  <span className="block truncate">{m}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1917]">
                Ringgröße (EU): <span className="font-normal text-[#6B635A]">{selectedSize} mm (Ø {getDiameterFromCircumference(selectedSize)} mm)</span>
              </label>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`w-9 h-8 border text-[12px] font-medium tabular-nums transition-colors cursor-pointer ${
                    selectedSize === s
                      ? 'bg-[#1F2A24] text-[#FBF8F3] border-[#1F2A24]'
                      : 'bg-white text-[#1C1917] border-[#E3DAC9] hover:border-[#B08D57]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Engraving */}
          {product.engravingAvailable && (
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1917] block mb-1">
                Kostenlose Innengravur (Optional)
              </label>
              <input
                type="text"
                maxLength={25}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="z. B. In ewiger Liebe"
                className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[12px] focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Action Buttons: Put in cart & Message admin via Telegram */}
        <div className="space-y-3 pt-4 border-t border-[#E3DAC9]">
          {/* 1. Put in Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3.5 bg-[#1F2A24] hover:bg-[#B08D57] text-[#FBF8F3] text-[12px] font-medium tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span>In den Warenkorb legen · {formatEuro(finalPrice)}</span>
          </button>

          {/* 2. Message Admin to place order button (t.me/dexco36) */}
          <div className="p-3 bg-[#F5F0E8] border border-[#B08D57]/40 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B08D57]">
              <Send className="w-3.5 h-3.5" />
              <span>Persönliche Meisterberatung & Direktbestellung</span>
            </div>
            <p className="text-[11px] text-[#6B635A] leading-relaxed">
              Möchten Sie Sondermaße, individuelle Gravuren oder die Bestellung direkt mit dem
              Goldschmiedemeister abstimmen?
            </p>
            <a
              href={TELEGRAM_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTelegramOrder}
              className="w-full py-2.5 px-3 bg-[#B08D57] hover:bg-[#977644] text-[#1F2A24] hover:text-white text-[12px] font-medium tracking-[0.12em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Meister kontaktieren & bestellen (t.me/dexco36)</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1F2A24]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
        <div className="max-w-5xl w-full my-auto">{content}</div>
      </div>
    );
  }

  return content;
};
