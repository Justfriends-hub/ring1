import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Star,
  Check,
  ChevronRight,
  Eye,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL } from '../context/ShopContext';
import { Product } from '../types';
import { RingPerspectiveViewer } from '../components/RingPerspectiveViewer';
import {
  HERO_IMAGE,
  ATELIER_IMAGE,
  AURORA_IMAGE,
  ETERNA_IMAGE,
  CELESTE_IMAGE,
} from '../data/mockData';
import { formatEuro } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const { navigateTo, products, reviews, articles, toggleWishlist, isInWishlist } = useShop();
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Section (Cinematic luxury hero with editorial calm) */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with gentle luxury contrast scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Handgefertigter Solitärring auf Travertin"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/80 via-[#1F2A24]/30 to-[#1F2A24]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 text-center text-[#FBF8F3] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F2A24]/60 border border-[#B08D57]/50 text-[#B08D57] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.2em] backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deutsche Goldschmiedekunst seit 1928</span>
          </div>

          <h1 className="font-serif text-[44px] sm:text-[68px] lg:text-[76px] font-normal leading-[1.08] tracking-tight text-[#FBF8F3] text-balance">
            Ringe, die Geschichten tragen
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[#E3DAC9] max-w-2xl mx-auto font-light leading-relaxed">
            In unserer Pforzheimer Manufaktur verbinden wir traditionelles Handwerk mit
            nachhaltigem Feingold und handverlesenen Diamanten zu zeitlosen Unikaten.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-8 py-4 bg-[#B08D57] hover:bg-[#C29E65] text-[#1F2A24] text-[13px] font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Kollektionen entdecken</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#FBF8F3]/60 hover:border-[#FBF8F3] text-[#FBF8F3] hover:bg-[#FBF8F3]/10 text-[13px] font-medium tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer"
            >
              Beratung buchen
            </button>
          </div>
        </div>

        {/* Bottom subtle trust indicator */}
        <div className="absolute bottom-6 inset-x-0 hidden md:flex justify-center text-[11px] tracking-[0.16em] uppercase text-[#E3DAC9]/80 gap-8">
          <span>100 % Recyceltes Gold</span>
          <span>·</span>
          <span>GIA-Zertifizierte Diamanten</span>
          <span>·</span>
          <span>Kostenlose Gravur & Ringgrößen-Service</span>
        </div>
      </section>

      {/* 2. Curated Categories (3 Large Editorial Tiles) */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-2">
            Meisterstücke für das Leben
          </span>
          <h2 className="font-serif text-[34px] sm:text-[44px] text-[#1C1917] font-normal leading-tight">
            Kuratierte Kollektionen
          </h2>
          <p className="text-[15px] text-[#6B635A] mt-2 font-normal">
            Jede Kollektion verkörpert ein Versprechen an Formvollendung und lebenslange Haltbarkeit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Tile 1: Verlobungsringe */}
          <div
            onClick={() => navigateTo('verlobungsringe')}
            className="group relative h-[480px] bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-shadow hover:shadow-lg"
          >
            <img
              src={AURORA_IMAGE}
              alt="Verlobungsringe Solitär"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/85 via-[#1F2A24]/30 to-transparent" />
            <div className="relative z-10 text-[#FBF8F3]">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#B08D57] font-medium block mb-1">
                Der magische Moment
              </span>
              <h3 className="font-serif text-[28px] font-normal leading-tight mb-2">
                Verlobungsringe
              </h3>
              <p className="text-[13px] text-[#E3DAC9] line-clamp-2 mb-4 font-light">
                Brillanten in zeitlosen Vier- und Sechskrappenfassungen, gefasst in Platin und Gold.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B08D57] group-hover:text-[#FBF8F3] transition-colors">
                <span>Modelle ansehen</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Tile 2: Eheringe */}
          <div
            onClick={() => navigateTo('eheringe')}
            className="group relative h-[480px] bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-shadow hover:shadow-lg"
          >
            <img
              src={ETERNA_IMAGE}
              alt="Eheringe Trauringe Gold"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/85 via-[#1F2A24]/30 to-transparent" />
            <div className="relative z-10 text-[#FBF8F3]">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#B08D57] font-medium block mb-1">
                Ein ewiges Band
              </span>
              <h3 className="font-serif text-[28px] font-normal leading-tight mb-2">
                Eheringe & Trauringe
              </h3>
              <p className="text-[13px] text-[#E3DAC9] line-clamp-2 mb-4 font-light">
                Ergonomisch innenbombiert für reinsten Tragekomfort in Gelbgold, Weißgold und Platin.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B08D57] group-hover:text-[#FBF8F3] transition-colors">
                <span>Trauringe entdecken</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Tile 3: Ring-Konfigurator */}
          <div
            onClick={() => navigateTo('configurator')}
            className="group relative h-[480px] bg-[#FBF8F3] border border-[#E3DAC9] overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-shadow hover:shadow-lg"
          >
            <img
              src={CELESTE_IMAGE}
              alt="Ring-Konfigurator Atelier"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/85 via-[#1F2A24]/30 to-transparent" />
            <div className="relative z-10 text-[#FBF8F3]">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#B08D57] font-medium block mb-1">
                Eigene Vorstellungen
              </span>
              <h3 className="font-serif text-[28px] font-normal leading-tight mb-2">
                Ring-Konfigurator
              </h3>
              <p className="text-[13px] text-[#E3DAC9] line-clamp-2 mb-4 font-light">
                Wählen Sie Edelmetall, Steinschliff und persönliche Gravur in 5 einfachen Schritten.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B08D57] group-hover:text-[#FBF8F3] transition-colors">
                <span>Konfiguration starten</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products / Bestseller Grid */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E3DAC9]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-1.5">
              Meistgewählte Entwürfe
            </span>
            <h2 className="font-serif text-[34px] sm:text-[40px] text-[#1C1917] font-normal">
              Ikonen unserer Manufaktur
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.14em] uppercase text-[#1C1917] hover:text-[#B08D57] transition-colors group"
          >
            <span>Alle 12 Ringe im Shop ansehen</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-[#FBF8F3] border border-[#E3DAC9] flex flex-col justify-between transition-all duration-300 hover:shadow-md relative"
              >
                {/* Badge if present */}
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.14em] font-medium px-2 py-0.5 bg-[#F5F0E8] border border-[#E3DAC9] text-[#1C1917]">
                    {product.badge}
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-colors ${
                    inWishlist
                      ? 'text-[#8E3B2F] bg-white shadow-xs'
                      : 'text-[#6B635A] hover:text-[#1C1917] bg-white/70'
                  }`}
                  aria-label="Auf die Wunschliste"
                >
                  <Star className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>

                {/* Image Slot - Tap to inspect 5 sides */}
                <div
                  onClick={() => setInspectingProduct(product)}
                  className="relative aspect-4/5 overflow-hidden bg-[#F5F0E8] cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={`${product.name} Detail`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                    />
                  )}

                  {/* 5-sides indicator pill on hover */}
                  <div className="absolute bottom-2 inset-x-2 bg-[#1F2A24]/85 text-[#FBF8F3] py-1 px-2 text-[10px] tracking-wider uppercase flex items-center justify-between backdrop-blur-xs opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 text-[#B08D57]">
                      <Sparkles className="w-3 h-3" />
                      <span>5 Ansichten / Seiten</span>
                    </span>
                    <span className="text-white/80">Tippen zum Ansehen</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                      {product.availableMetals[0]}
                    </span>
                    <h3
                      onClick={() => setInspectingProduct(product)}
                      className="font-serif text-[20px] text-[#1C1917] hover:text-[#B08D57] transition-colors cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[12px] text-[#6B635A] mt-1 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#E3DAC9]/60 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-medium text-[#1C1917] tabular-nums">
                        {formatEuro(product.basePrice)}
                      </span>
                      <p className="text-[10px] text-[#8C877D]">inkl. 19 % MwSt.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setInspectingProduct(product)}
                        className="w-full py-2 bg-[#1F2A24] hover:bg-[#B08D57] text-[#FBF8F3] text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer text-center"
                      >
                        5 Seiten & Korb
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateTo('product', product.id)}
                        className="w-full py-2 bg-white border border-[#E3DAC9] hover:border-[#B08D57] text-[#1C1917] text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer text-center"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Telegram Direct Order Banner */}
        <div className="mt-12 p-6 bg-[#FBF8F3] border border-[#B08D57]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
              Persönliche Betreuung
            </span>
            <h3 className="font-serif text-[22px] text-[#1C1917]">
              Möchten Sie direkt über den Meisterkontakt aufgeben?
            </h3>
            <p className="text-[13px] text-[#6B635A] max-w-xl">
              Senden Sie uns Ihre Ringwünsche, Sondergrößen und Wunschgravuren direkt via Telegram
              an <span className="font-medium text-[#1C1917]">@dexco36</span>. Unser Meisteratelier nimmt
              Ihre Details persönlich auf.
            </p>
          </div>
          <a
            href={TELEGRAM_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#B08D57] hover:bg-[#977644] text-[#1F2A24] hover:text-white text-[12px] uppercase tracking-[0.14em] font-medium transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 stroke-[1.5]" />
            <span>Via Telegram bestellen (t.me/dexco36)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 4. "Unsere Manufaktur" Storytelling Section */}
      <section className="bg-[#FBF8F3] border-y border-[#E3DAC9] py-20 lg:py-28">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
                Tradition seit Generationen
              </span>
              <h2 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-[1.15]">
                Wo Zeit und Präzision eins werden
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] text-[#6B635A] font-light leading-relaxed">
                <p>
                  In der traditionsreichen Goldstadt Pforzheim fertigen unsere
                  Goldschmiedemeister jeden Ring mit ruhiger Hand. Fernab industrieller
                  Massenproduktion entsteht bei uns jedes Schmuckstück als Einzelanfertigung –
                  angepasst auf Ihren Finger und Ihre persönliche Geschichte.
                </p>
                <p>
                  Wir arbeiten ausschließlich mit zertifiziertem Recycling-Gold und Diamanten mit
                  garantiert konfliktfreier Herkunft (Kimberley-Prozess). So bewahrt Ihr Ring nicht
                  nur Schönheit, sondern auch reine Werte.
                </p>
              </div>

              {/* Craftsmanship attributes */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E3DAC9]">
                <div>
                  <span className="font-serif text-[28px] text-[#1C1917] block font-light">
                    100 %
                  </span>
                  <span className="text-[12px] text-[#6B635A]">
                    Recyceltes Feingold aus deutschen Scheideanstalten
                  </span>
                </div>
                <div>
                  <span className="font-serif text-[28px] text-[#1C1917] block font-light">
                    GIA / IGI
                  </span>
                  <span className="text-[12px] text-[#6B635A]">
                    Unabhängige Zertifikate für alle Diamanten ab 0,30 ct
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('manufaktur')}
                  className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase text-[#1C1917] hover:text-[#B08D57] transition-colors group cursor-pointer"
                >
                  <span>Mehr über unser Atelier erfahren</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Atelier Image */}
            <div className="lg:col-span-6">
              <div className="relative border border-[#E3DAC9] p-3 bg-white shadow-sm">
                <img
                  src={ATELIER_IMAGE}
                  alt="Goldschmiedemeister in der Manufaktur Pforzheim"
                  referrerPolicy="no-referrer"
                  className="w-full h-[460px] object-cover"
                />
                <div className="p-4 bg-[#F5F0E8] border-t border-[#E3DAC9] flex items-center justify-between text-xs text-[#6B635A]">
                  <span>Atelier Friedrich Weber, Pforzheim</span>
                  <span className="text-[#B08D57] font-medium">Meisterbrief Handwerkskammer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ring-Konfigurator Teaser */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F2A24] text-[#FBF8F3] p-8 sm:p-14 lg:p-16 border border-[#2D3C34] relative overflow-hidden">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
              Individuelle Anfertigung
            </span>
            <h2 className="font-serif text-[36px] sm:text-[48px] text-[#FBF8F3] font-normal leading-tight">
              Gestalten Sie Ihr Unikat im interaktiven Konfigurator
            </h2>
            <p className="text-[15px] text-[#E3DAC9] font-light leading-relaxed">
              Wählen Sie Fassung, Edelmetall (585/750 Gelbgold, Weißgold, Roségold oder Platin),
              den gewünschten Edelstein sowie Ihre persönliche Wunschgravur mit sofortiger
              Echtzeit-Preisanzeige.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('configurator')}
                className="px-8 py-4 bg-[#B08D57] hover:bg-[#C29E65] text-[#1F2A24] text-[13px] font-medium tracking-[0.16em] uppercase transition-colors cursor-pointer"
              >
                Konfigurator starten
              </button>
              <button
                onClick={() => navigateTo('size-guide')}
                className="px-8 py-4 bg-transparent border border-[#E3DAC9]/40 hover:border-[#FBF8F3] text-[#FBF8F3] text-[13px] font-medium tracking-[0.16em] uppercase transition-colors cursor-pointer"
              >
                Ringgrößen-Guide
              </button>
            </div>
          </div>

          {/* Decorative Ring outline */}
          <div className="absolute right-[-40px] bottom-[-40px] w-96 h-96 rounded-full border border-[#B08D57]/20 pointer-events-none hidden lg:block" />
          <div className="absolute right-[20px] bottom-[20px] w-64 h-64 rounded-full border border-[#B08D57]/10 pointer-events-none hidden lg:block" />
        </div>
      </section>

      {/* 6. Kundenstimmen / Reviews */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-2">
            Erfahrungen unserer Kunden
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] text-[#1C1917] font-normal">
            Stimmen aus Meisterhand
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-[#FBF8F3] border border-[#E3DAC9] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#B08D57] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                  ))}
                </div>
                <h4 className="font-serif text-[20px] text-[#1C1917] leading-snug mb-3">
                  „{review.title}“
                </h4>
                <p className="text-[14px] text-[#6B635A] leading-relaxed font-light">
                  {review.comment}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E3DAC9]/60 flex items-center justify-between text-[12px] text-[#6B635A]">
                <div>
                  <span className="font-medium text-[#1C1917] block">{review.author}</span>
                  <span>{review.location}</span>
                </div>
                <span className="text-[11px] text-[#3F5B46] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verifizierter Kauf</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Journal Teaser */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E3DAC9]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-1">
              Wissen & Inspiration
            </span>
            <h2 className="font-serif text-[34px] sm:text-[40px] text-[#1C1917] font-normal">
              Aus unserem Journal
            </h2>
          </div>
          <button
            onClick={() => navigateTo('journal')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.14em] uppercase text-[#1C1917] hover:text-[#B08D57] transition-colors"
          >
            <span>Alle Artikel lesen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => navigateTo('journal-article', art.id)}
              className="group cursor-pointer flex flex-col justify-between bg-[#FBF8F3] border border-[#E3DAC9]"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#F5F0E8]">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#B08D57] uppercase tracking-[0.14em] font-medium mb-2">
                    <span>{art.category}</span>
                    <span>·</span>
                    <span className="text-[#6B635A]">{art.readTime}</span>
                  </div>
                  <h3 className="font-serif text-[20px] text-[#1C1917] group-hover:text-[#B08D57] transition-colors leading-snug mb-2">
                    {art.title}
                  </h3>
                  <p className="text-[13px] text-[#6B635A] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1C1917] group-hover:text-[#B08D57] transition-colors pt-4 mt-4 border-t border-[#E3DAC9]/60">
                  <span>Weiterlesen</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5-Perspectives Modal */}
      {inspectingProduct && (
        <RingPerspectiveViewer
          product={inspectingProduct}
          onClose={() => setInspectingProduct(null)}
          isModal={true}
        />
      )}
    </div>
  );
};
