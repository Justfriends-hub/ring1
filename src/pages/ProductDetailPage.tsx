import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  RotateCcw,
  PackageCheck,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  Sparkles,
  Award,
  ArrowRight,
  Check,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL, buildTelegramOrderUrl } from '../context/ShopContext';
import { PreciousMetal, StoneType, Review } from '../types';
import { formatEuro, getDiameterFromCircumference } from '../utils/formatters';
import { RingPerspectiveViewer } from '../components/RingPerspectiveViewer';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    reviews,
    addReview,
    showToast,
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  // 5 Perspectives / sides state
  const [activeSideIndex, setActiveSideIndex] = useState(0);
  const [isPerspectiveModalOpen, setIsPerspectiveModalOpen] = useState(false);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Variant selections
  const [selectedMetal, setSelectedMetal] = useState<PreciousMetal>(
    product.availableMetals[0] || '585 Weißgold'
  );
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 54);
  const [selectedStone, setSelectedStone] = useState<StoneType>(product.stoneType);
  const [engravingText, setEngravingText] = useState('');
  const [engravingFont, setEngravingFont] = useState<'Klassisch' | 'Kursiv'>('Klassisch');

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string>('details');

  // Review submission form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Product reviews
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products (same category or featured, excluding current)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  // Metal price modifier
  const getMetalDelta = (metal: PreciousMetal) => {
    if (metal.includes('750')) return 350;
    if (metal.includes('Platin')) return 650;
    return 0;
  };

  const currentPrice = product.basePrice + getMetalDelta(selectedMetal);
  const inWishlist = isInWishlist(product.id);

  const currentPerspective =
    product.perspectives?.[activeSideIndex] || {
      id: 'frontal',
      label: '1. Frontalansicht',
      detailTitle: `${product.name} · Frontalansicht`,
      shortDesc: 'Vorderansicht mit harmonischem Schienenverlauf.',
      image: product.images[0],
    };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: `${product.name} (${currentPerspective.label})`,
      image: currentPerspective.image || product.images[selectedImageIndex] || product.images[0],
      metal: selectedMetal,
      size: selectedSize,
      stoneType: selectedStone,
      engraving: engravingText.trim() ? `${engravingText.trim()} (${engravingFont})` : undefined,
      unitPrice: currentPrice,
      quantity: 1,
    });
  };

  const handleTelegramOrder = () => {
    const orderDetails = `AURELIA Ringbestellung:\nModell: ${product.name}\nGewählte Perspektive: ${currentPerspective.label} (${currentPerspective.detailTitle})\nEdelmetall: ${selectedMetal}\nRinggröße: ${selectedSize} mm (Ø ${getDiameterFromCircumference(selectedSize)} mm)\nBesatz: ${product.stoneType}${product.carat ? ` (${product.carat} ct)` : ''}\n${engravingText.trim() ? `Lasergravur: „${engravingText.trim()}“ (${engravingFont})\n` : ''}Preis: ${formatEuro(currentPrice)}\nLink: https://aurelia-manufaktur.de/ring/${product.slug}\n\nBitte erfassen Sie meine Bestellung und Kontaktdaten.`;

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(orderDetails);
      }
    } catch {
      // fallback
    }

    const telegramUrl = buildTelegramOrderUrl(orderDetails);
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    showToast('Telegram geöffnet – Ringname und Preis wurden automatisch mitgegeben.', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment || !reviewTitle) {
      showToast('Bitte füllen Sie alle Pflichtfelder der Bewertung aus.', 'error');
      return;
    }
    addReview({
      productId: product.id,
      productName: product.name,
      author: reviewAuthor,
      location: reviewLocation || 'Deutschland',
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verifiedPurchase: true,
    });
    setReviewAuthor('');
    setReviewLocation('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb Navigation */}
      <nav className="text-[12px] text-[#6B635A] mb-8 flex items-center gap-2">
        <button onClick={() => navigateTo('home')} className="hover:text-[#1C1917]">
          Startseite
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-[#1C1917]">
          Kollektionen
        </button>
        <span>/</span>
        <span className="text-[#1C1917] font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Left: Image Gallery, Right: Purchase Module) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Gallery & 5 Ring Perspectives */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display (Tap to inspect 5 sides in detail) */}
          <div
            onClick={() => setIsPerspectiveModalOpen(true)}
            className="relative aspect-4/5 bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden group cursor-pointer shadow-xs"
          >
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 text-[11px] uppercase tracking-[0.16em] font-medium px-3 py-1 bg-[#F5F0E8] border border-[#E3DAC9] text-[#1C1917]">
                {product.badge}
              </span>
            )}

            <img
              src={currentPerspective.image || product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.name} - ${currentPerspective.label}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Overlay Indicator for 5 perspectives */}
            <div className="absolute bottom-3 inset-x-3 p-3 bg-[#1F2A24]/90 text-[#FBF8F3] backdrop-blur-xs flex items-center justify-between border border-[#B08D57]/30 transition-opacity">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#B08D57] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Perspektive {activeSideIndex + 1} von 5: {currentPerspective.label}
                </span>
                <span className="font-serif text-[15px] text-[#FBF8F3] block leading-tight">
                  {currentPerspective.detailTitle}
                </span>
              </div>
              <span className="text-[11px] text-[#B08D57] bg-white/10 px-2.5 py-1 uppercase tracking-wider font-medium shrink-0 ml-2">
                Tippen zum Öffnen
              </span>
            </div>
          </div>

          {/* 5 Ring Designs (Different sides of the same ring) */}
          <div className="p-4 bg-[#FBF8F3] border border-[#E3DAC9] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#B08D57]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                  5 Ansichten desselben Rings
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPerspectiveModalOpen(true)}
                className="text-[11px] text-[#B08D57] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Alle 5 Seiten im Großformat</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <p className="text-[12px] text-[#6B635A] leading-relaxed">
              Tippen Sie auf eine der 5 Perspektiven, um Krone, Seitenprofil, Schlifffacetten, Handansicht und Punzierung zu wechseln:
            </p>

            {/* 5 Perspective Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {product.perspectives?.map((persp, idx) => (
                <button
                  key={persp.id}
                  type="button"
                  onClick={() => setActiveSideIndex(idx)}
                  className={`p-1.5 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeSideIndex === idx
                      ? 'border-[#B08D57] bg-white ring-1 ring-[#B08D57] shadow-xs'
                      : 'border-[#E3DAC9] bg-[#F5F0E8] hover:border-[#B08D57]'
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
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#1C1917] truncate block text-center">
                    {persp.label.split('. ')[1] || persp.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Part Craftsmanship Description */}
            <div className="pt-2 border-t border-[#E3DAC9]/60 flex items-center justify-between text-[11px] text-[#6B635A]">
              <span>
                <strong className="text-[#1C1917] font-medium">{currentPerspective.detailTitle}:</strong>{' '}
                {currentPerspective.shortDesc}
              </span>
            </div>
          </div>

          {/* Hallmark Trust Callout */}
          <div className="p-4 bg-[#FBF8F3] border border-[#E3DAC9] flex items-center justify-between text-[12px] text-[#6B635A]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B08D57]" />
              <span>Gepunzt mit Feingehalt & Manufaktursiegel</span>
            </div>
            <span className="text-[#1C1917] font-medium">{product.hallmark}</span>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#B08D57] font-medium">
                {product.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-[#B08D57] text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-[#1C1917] font-medium">4.9</span>
                <span className="text-[#6B635A]">({productReviews.length} Bewertungen)</span>
              </div>
            </div>

            <h1 className="font-serif text-[32px] sm:text-[40px] text-[#1C1917] font-normal leading-tight mt-1">
              {product.name}
            </h1>
            <p className="text-[14px] text-[#6B635A] mt-1 font-light">{product.subtitle}</p>
          </div>

          {/* Pricing Box */}
          <div className="py-4 border-y border-[#E3DAC9]">
            <div className="flex items-baseline gap-3">
              <span className="text-[26px] sm:text-[28px] font-normal text-[#1C1917] tabular-nums font-serif">
                {formatEuro(currentPrice)}
              </span>
              <span className="text-[12px] text-[#3F5B46] font-medium">
                Kostenloser versicherter Wertversand
              </span>
            </div>
            <p className="text-[11px] text-[#8C877D] mt-0.5">
              inkl. 19 % MwSt. · Lieferzeit ca. 3–5 Werktage per Valorenkurier
            </p>
          </div>

          {/* 1. Edelmetall Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1C1917]">
                Edelmetall: <span className="font-normal text-[#6B635A]">{selectedMetal}</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {product.availableMetals.map((metal) => {
                const delta = getMetalDelta(metal);
                return (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`py-2.5 px-3 border text-left text-[12px] transition-all cursor-pointer ${
                      selectedMetal === metal
                        ? 'border-[#B08D57] bg-[#FBF8F3] text-[#1C1917] ring-1 ring-[#B08D57]'
                        : 'border-[#E3DAC9] bg-white text-[#6B635A] hover:border-[#B08D57]'
                    }`}
                  >
                    <span className="block font-medium">{metal}</span>
                    <span className="text-[10px] text-[#8C877D]">
                      {delta > 0 ? `+${formatEuro(delta)}` : 'Basis'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Ringgröße Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1C1917]">
                Ringgröße: <span className="font-normal text-[#6B635A]">{selectedSize} mm Umfang (Ø {getDiameterFromCircumference(selectedSize)} mm)</span>
              </label>
              <button
                type="button"
                onClick={() => navigateTo('size-guide')}
                className="text-[11px] text-[#B08D57] hover:underline cursor-pointer"
              >
                Größen-Berater
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-10 border text-[12px] font-medium transition-all tabular-nums cursor-pointer ${
                    selectedSize === size
                      ? 'border-[#1F2A24] bg-[#1F2A24] text-[#FBF8F3]'
                      : 'border-[#E3DAC9] bg-white text-[#1C1917] hover:border-[#B08D57]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#6B635A] mt-2">
              Kostenlose Ringgrößen-Anpassung innerhalb von 30 Tagen nach Erhalt garantiert.
            </p>
          </div>

          {/* 3. Engraving option */}
          {product.engravingAvailable && (
            <div className="p-4 bg-[#FBF8F3] border border-[#E3DAC9] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1C1917]">
                  Persönliche Lasergravur (Kostenlos)
                </span>
                <span className="text-[11px] text-[#B08D57]">Max. 25 Zeichen</span>
              </div>
              <input
                type="text"
                maxLength={25}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="z. B. In Liebe · 24.12.2026"
                className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] text-[#1C1917] placeholder-[#8C877D] focus:outline-none"
              />
              <div className="flex items-center gap-4 text-[12px] text-[#6B635A]">
                <span>Schriftstil:</span>
                <button
                  type="button"
                  onClick={() => setEngravingFont('Klassisch')}
                  className={`cursor-pointer ${
                    engravingFont === 'Klassisch'
                      ? 'font-medium text-[#1C1917] underline'
                      : 'text-[#6B635A]'
                  }`}
                >
                  Klassisch Druckschrift
                </button>
                <button
                  type="button"
                  onClick={() => setEngravingFont('Kursiv')}
                  className={`italic cursor-pointer ${
                    engravingFont === 'Kursiv'
                      ? 'font-medium text-[#1C1917] underline'
                      : 'text-[#6B635A]'
                  }`}
                >
                  Elegante Schreibschrift
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="p-4 bg-[#F5F0E8] border border-[#B08D57]/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57] flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  Direktbestellung & Meisterberatung
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
                href={buildTelegramOrderUrl(`AURELIA Ringbestellung:\nModell: ${product.name}\nPreis: ${formatEuro(currentPrice)}\nMetall: ${selectedMetal}\nGröße: ${selectedSize} mm`) }
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramOrder}
                className="w-full py-3 px-3 bg-[#B08D57] hover:bg-[#977644] text-[#1F2A24] hover:text-white text-[12px] font-medium tracking-[0.12em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer text-center shadow-xs"
              >
                <Send className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Bestellen über Telegram · {formatEuro(currentPrice)}</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`py-3 px-4 border text-[12px] font-medium uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  inWishlist
                    ? 'border-[#8E3B2F] text-[#8E3B2F] bg-white'
                    : 'border-[#E3DAC9] text-[#6B635A] hover:text-[#1C1917] bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                <span>{inWishlist ? 'Gemerkt' : 'Wunschliste'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="py-3 px-4 border border-[#E3DAC9] bg-white text-[#6B635A] hover:text-[#1C1917] text-[12px] font-medium uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Beratung anfragen</span>
              </button>
            </div>
          </div>

          {/* Trust points */}
          <div className="pt-4 border-t border-[#E3DAC9] grid grid-cols-3 gap-2 text-center text-[11px] text-[#6B635A]">
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#B08D57] mx-auto" />
              <span>GIA zertifiziert</span>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-4 h-4 text-[#B08D57] mx-auto" />
              <span>30 Tage Bedenkzeit</span>
            </div>
            <div className="space-y-1">
              <PackageCheck className="w-4 h-4 text-[#B08D57] mx-auto" />
              <span>Diskreter Wertversand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordions: Beschreibung, Details & Maße, Pflege, Versand */}
      <div className="mt-20 max-w-4xl mx-auto border-t border-[#E3DAC9] divide-y divide-[#E3DAC9]">
        {/* Accordion 1: Beschreibung */}
        <div className="py-6">
          <button
            onClick={() => setOpenAccordion(openAccordion === 'desc' ? '' : 'desc')}
            className="w-full flex items-center justify-between text-left font-serif text-[22px] text-[#1C1917] cursor-pointer"
          >
            <span>Beschreibung & Handwerksphilosophie</span>
            {openAccordion === 'desc' ? (
              <ChevronUp className="w-5 h-5 text-[#B08D57]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B635A]" />
            )}
          </button>
          {openAccordion === 'desc' && (
            <div className="pt-4 text-[14px] text-[#6B635A] leading-relaxed space-y-3 animate-fadeIn">
              <p>{product.description}</p>
              <p>
                Jeder Ring wird in unserem Pforzheimer Atelier von Meisterhand geschmiedet, gefasst
                und finissiert. Wir verwenden ausschließlich 100 % recyceltes Gold aus
                zertifizierten deutschen Scheideanstalten.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 2: Details & Maße */}
        <div className="py-6">
          <button
            onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
            className="w-full flex items-center justify-between text-left font-serif text-[22px] text-[#1C1917] cursor-pointer"
          >
            <span>Details, Maße & Edelsteine</span>
            {openAccordion === 'details' ? (
              <ChevronUp className="w-5 h-5 text-[#B08D57]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B635A]" />
            )}
          </button>
          {openAccordion === 'details' && (
            <div className="pt-4 space-y-3 text-[13px] text-[#1C1917] animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]/60">
                  <span className="text-[#6B635A]">Ringschienen-Breite:</span>
                  <span className="font-medium">{product.details.ringWidthMm} mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]/60">
                  <span className="text-[#6B635A]">Profil / Form:</span>
                  <span className="font-medium">{product.details.profile}</span>
                </div>
                {product.carat && (
                  <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]/60">
                    <span className="text-[#6B635A]">Diamantgewicht:</span>
                    <span className="font-medium">{product.carat} ct</span>
                  </div>
                )}
                {product.details.diamondColor && (
                  <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]/60">
                    <span className="text-[#6B635A]">Diamantfarbe:</span>
                    <span className="font-medium">{product.details.diamondColor}</span>
                  </div>
                )}
                {product.details.diamondClarity && (
                  <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]/60">
                    <span className="text-[#6B635A]">Reinheit:</span>
                    <span className="font-medium">{product.details.diamondClarity}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-[#E3DAC9]/60">
                  <span className="text-[#6B635A]">Herkunft & Fertigung:</span>
                  <span className="font-medium">{product.details.origin}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Pflege */}
        <div className="py-6">
          <button
            onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
            className="w-full flex items-center justify-between text-left font-serif text-[22px] text-[#1C1917] cursor-pointer"
          >
            <span>Pflege & Lebenslanger Service</span>
            {openAccordion === 'care' ? (
              <ChevronUp className="w-5 h-5 text-[#B08D57]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B635A]" />
            )}
          </button>
          {openAccordion === 'care' && (
            <div className="pt-4 text-[14px] text-[#6B635A] leading-relaxed space-y-3 animate-fadeIn">
              <p>{product.careInstructions}</p>
              <p>
                Inklusive: Jährliche kostenfreie Ultraschall-Reinigung und Krappenprüfung in unserem
                Atelier in Pforzheim oder unseren Partner-Showrooms in Hamburg und München.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 4: Versand */}
        <div className="py-6">
          <button
            onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
            className="w-full flex items-center justify-between text-left font-serif text-[22px] text-[#1C1917] cursor-pointer"
          >
            <span>Versand, diskrete Verpackung & Rückgabe</span>
            {openAccordion === 'shipping' ? (
              <ChevronUp className="w-5 h-5 text-[#B08D57]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#6B635A]" />
            )}
          </button>
          {openAccordion === 'shipping' && (
            <div className="pt-4 text-[14px] text-[#6B635A] leading-relaxed space-y-3 animate-fadeIn">
              <p>
                Jede Lieferung erfolgt diskret in einer neutralen Umverpackung ohne Hinweis auf
                Schmuck oder Edelmetalle. Innen erwartet Sie eine handgefertigte Ringschatulle aus
                massivem Nussbaumholz.
              </p>
              <p>
                Der Versand ist ab 150,00 € Bestellwert vollständig versichert und kostenfrei per
                DHL Express Valorenkurier mit persönlicher Übergabe gegen Unterschrift.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 max-w-4xl mx-auto border-t border-[#E3DAC9] pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-[28px] text-[#1C1917]">Kundenbewertungen</h3>
            <p className="text-[13px] text-[#6B635A]">
              Echte Erfahrungen zu {product.name}
            </p>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-[0.14em] font-medium hover:bg-[#B08D57] transition-colors"
          >
            {showReviewForm ? 'Formular schließen' : 'Bewertung verfassen'}
          </button>
        </div>

        {/* New Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 mb-8 space-y-4 animate-fadeIn"
          >
            <h4 className="font-serif text-[18px] text-[#1C1917]">Ihre Erfahrung teilen</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                  Ihr Name *
                </label>
                <input
                  type="text"
                  required
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="z. B. Johanna M."
                  className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                  Ort / Stadt
                </label>
                <input
                  type="text"
                  value={reviewLocation}
                  onChange={(e) => setReviewLocation(e.target.value)}
                  placeholder="z. B. Berlin"
                  className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                Sternebewertung *
              </label>
              <div className="flex gap-2 text-[#B08D57]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        reviewRating >= star ? 'fill-current' : 'stroke-current fill-none'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                Titel der Bewertung *
              </label>
              <input
                type="text"
                required
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Kurze Zusammenfassung"
                className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                Ihre Bewertung *
              </label>
              <textarea
                required
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Wie beurteilen Sie Tragekomfort, Verarbeitung und Glanz?"
                className="w-full bg-white border border-[#E3DAC9] px-3 py-2 text-[13px] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#B08D57] text-[#1F2A24] text-[12px] uppercase tracking-[0.14em] font-medium hover:bg-[#C29E65] transition-colors cursor-pointer"
            >
              Bewertung absenden
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {productReviews.length === 0 ? (
            <p className="text-[14px] text-[#6B635A] py-6 text-center">
              Noch keine Bewertungen für dieses Modell. Seien Sie die erste Person, die ihre Erfahrung teilt.
            </p>
          ) : (
            productReviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#FBF8F3] border border-[#E3DAC9]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-[#B08D57]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C877D]">{rev.date}</span>
                </div>
                <h5 className="font-serif text-[17px] text-[#1C1917] mb-1">„{rev.title}“</h5>
                <p className="text-[13px] text-[#6B635A] leading-relaxed mb-3">{rev.comment}</p>
                <div className="flex items-center justify-between text-[11px] text-[#8C877D]">
                  <span>
                    {rev.author} · {rev.location}
                  </span>
                  {rev.verifiedPurchase && (
                    <span className="text-[#3F5B46] font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verifizierter Käufer
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* "Passend dazu" matching recommendations */}
      <div className="mt-24 border-t border-[#E3DAC9] pt-14">
        <div className="text-center max-w-md mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-1">
            Harmonische Ergänzungen
          </span>
          <h3 className="font-serif text-[30px] text-[#1C1917]">Passend zu diesem Ring</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => navigateTo('product', rel.id)}
              className="group bg-[#FBF8F3] border border-[#E3DAC9] cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="aspect-4/5 overflow-hidden bg-[#F5F0E8]">
                <img
                  src={rel.images[0]}
                  alt={rel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-[18px] text-[#1C1917] group-hover:text-[#B08D57] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-[12px] text-[#6B635A]">{rel.availableMetals[0]}</p>
                </div>
                <span className="text-[13px] font-medium text-[#1C1917] tabular-nums">
                  {formatEuro(rel.basePrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Mobile Buy Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-3 bg-[#FBF8F3] border-t border-[#E3DAC9] flex items-center justify-between gap-2 lg:hidden shadow-lg">
        <div className="min-w-0">
          <span className="font-serif text-[17px] text-[#1C1917] block leading-tight truncate">
            {formatEuro(currentPrice)}
          </span>
          <span className="text-[10px] text-[#6B635A] truncate block">{selectedMetal} · Gr. {selectedSize}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={TELEGRAM_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTelegramOrder}
            className="p-2.5 bg-[#B08D57] text-[#1F2A24] text-[11px] font-medium tracking-wider uppercase hover:bg-[#977644] hover:text-white transition-colors flex items-center justify-center"
            title="Meister via Telegram kontaktieren"
          >
            <Send className="w-4 h-4" />
          </a>
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-4 bg-[#1F2A24] text-[#FBF8F3] text-[11px] font-medium tracking-[0.12em] uppercase hover:bg-[#B08D57] transition-colors"
          >
            In den Warenkorb
          </button>
        </div>
      </div>

      {/* 5-Perspective Fullscreen Inspection Modal */}
      {isPerspectiveModalOpen && (
        <RingPerspectiveViewer
          product={product}
          onClose={() => setIsPerspectiveModalOpen(false)}
          isModal={true}
        />
      )}
    </div>
  );
};
