import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL } from '../context/ShopContext';
import { formatEuro } from '../utils/formatters';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartTotals,
    setIsCartOpen,
    wishlist,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Scroll detection for sticky header compression
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products for search overlay
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.availableMetals.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
            p.stoneType.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  return (
    <header className="relative z-40 w-full">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#1F2A24] text-[#FBF8F3] text-[11px] sm:text-[12px] tracking-[0.14em] uppercase py-2 px-4 transition-all duration-300">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-block text-[#B08D57] font-medium">
            Deutsche Meisterwerkstatt · Pforzheim
          </span>
          <div className="w-full sm:w-auto text-center font-normal">
            <span>Kostenloser Versand ab 150,00 €</span>
            <span className="mx-2 text-[#B08D57]">·</span>
            <span>30 Tage Rückgabe</span>
            <span className="mx-2 text-[#B08D57]">·</span>
            <span>Persönliche Beratung</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href={TELEGRAM_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#B08D57] hover:text-[#FBF8F3] transition-colors cursor-pointer"
            >
              <Send className="w-3 h-3 text-[#B08D57]" />
              <span>Meister-Chat: @dexco36</span>
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-1.5 text-[#FBF8F3] hover:text-[#B08D57] transition-colors cursor-pointer"
            >
              <Compass className="w-3 h-3 text-[#B08D57]" />
              <span>Showroom Termin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Sticky with dynamic height & backdrop blur) */}
      <div
        className={`sticky top-0 w-full bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#E3DAC9] transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-xs' : 'py-5'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-[#1C1917] hover:text-[#B08D57] transition-colors focus:outline-none"
                aria-label="Menü öffnen"
              >
                <Menu className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            {/* Left Nav Zone (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.12em] uppercase font-medium">
              {/* Kollektionen with Mega Menu trigger */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('kollektionen')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  type="button"
                  onClick={() => navigateTo('shop')}
                  className={`inline-flex items-center gap-1.5 py-2 transition-colors cursor-pointer border-b ${
                    currentPage === 'shop'
                      ? 'border-[#B08D57] text-[#1C1917]'
                      : 'border-transparent text-[#6B635A] hover:text-[#1C1917]'
                  }`}
                >
                  <span>Kollektionen</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[1.25] ${
                      activeMegaMenu === 'kollektionen' ? 'rotate-180 text-[#B08D57]' : ''
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                {activeMegaMenu === 'kollektionen' && (
                  <div
                    className="absolute top-full left-0 w-[680px] bg-[#FBF8F3] border border-[#E3DAC9] shadow-lg p-6 pt-5 grid grid-cols-3 gap-6 animate-fadeIn"
                    onMouseEnter={() => setActiveMegaMenu('kollektionen')}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <div>
                      <p className="text-[11px] font-semibold text-[#B08D57] tracking-[0.16em] uppercase mb-3">
                        Nach Stil
                      </p>
                      <ul className="space-y-2 text-[13px] normal-case tracking-normal text-[#1C1917]">
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('shop');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#B08D57] transition-colors block text-left"
                          >
                            Alle Ringe ansehen
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('verlobungsringe');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#B08D57] transition-colors block text-left"
                          >
                            Solitäre & Verlobung
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('eheringe');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#B08D57] transition-colors block text-left"
                          >
                            Trauringe & Eheringe
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('shop');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#B08D57] transition-colors block text-left"
                          >
                            Allianz- & Memoire-Ringe
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-[#B08D57] tracking-[0.16em] uppercase mb-3">
                        Edelmetalle
                      </p>
                      <ul className="space-y-2 text-[13px] normal-case tracking-normal text-[#6B635A]">
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('shop');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#1C1917] transition-colors"
                          >
                            750 / 585 Gelbgold
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('shop');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#1C1917] transition-colors"
                          >
                            750 / 585 Weißgold
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('shop');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#1C1917] transition-colors"
                          >
                            585 Roségold
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigateTo('shop');
                              setActiveMegaMenu(null);
                            }}
                            className="hover:text-[#1C1917] transition-colors"
                          >
                            950 Platin (Hypoallergen)
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#F5F0E8] p-4 flex flex-col justify-between border border-[#E3DAC9]/60">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#B08D57] uppercase tracking-[0.14em] font-medium mb-1.5">
                          <Sparkles className="w-3 h-3" />
                          <span>Handwerkskunst</span>
                        </div>
                        <h4 className="font-serif text-[18px] text-[#1C1917] leading-snug mb-2">
                          Ring-Konfigurator
                        </h4>
                        <p className="text-[12px] text-[#6B635A] leading-relaxed mb-3">
                          Gestalten Sie Fassung, Edelmetall, Stein und Gravur nach Ihrem Wunschmaß.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigateTo('configurator');
                          setActiveMegaMenu(null);
                        }}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1F2A24] hover:text-[#B08D57] transition-colors group"
                      >
                        <span>Jetzt konfigurieren</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <button
                type="button"
                onClick={() => navigateTo('verlobungsringe')}
                className={`py-2 transition-colors cursor-pointer border-b ${
                  currentPage === 'verlobungsringe'
                    ? 'border-[#B08D57] text-[#1C1917]'
                    : 'border-transparent text-[#6B635A] hover:text-[#1C1917]'
                }`}
              >
                Verlobungsringe
              </button>

              <button
                type="button"
                onClick={() => navigateTo('eheringe')}
                className={`py-2 transition-colors cursor-pointer border-b ${
                  currentPage === 'eheringe'
                    ? 'border-[#B08D57] text-[#1C1917]'
                    : 'border-transparent text-[#6B635A] hover:text-[#1C1917]'
                }`}
              >
                Eheringe
              </button>

              <button
                type="button"
                onClick={() => navigateTo('configurator')}
                className={`py-2 transition-colors cursor-pointer border-b ${
                  currentPage === 'configurator'
                    ? 'border-[#B08D57] text-[#1C1917]'
                    : 'border-transparent text-[#6B635A] hover:text-[#1C1917]'
                }`}
              >
                Individuell
              </button>

              <button
                type="button"
                onClick={() => navigateTo('manufaktur')}
                className={`py-2 transition-colors cursor-pointer border-b ${
                  currentPage === 'manufaktur'
                    ? 'border-[#B08D57] text-[#1C1917]'
                    : 'border-transparent text-[#6B635A] hover:text-[#1C1917]'
                }`}
              >
                Manufaktur
              </button>
            </nav>

            {/* Brand Logo Wordmark (Center) */}
            <div className="text-center select-none">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="group flex flex-col items-center cursor-pointer focus:outline-none"
              >
                <span className="font-serif text-[28px] sm:text-[34px] tracking-[0.24em] font-normal uppercase text-[#1C1917] group-hover:text-[#B08D57] transition-colors">
                  AURELIA
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-[#6B635A] -mt-1 font-light">
                  Ringmanufaktur
                </span>
              </button>
            </div>

            {/* Right Zone: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-4 sm:gap-6 text-[#1C1917]">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-1 hover:text-[#B08D57] transition-colors focus:outline-none cursor-pointer"
                aria-label="Suche öffnen"
                title="Suche"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.25]" />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => navigateTo('account')}
                className="relative p-1 hover:text-[#B08D57] transition-colors focus:outline-none cursor-pointer"
                aria-label="Wunschliste ansehen"
                title="Wunschliste"
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.25]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#B08D57] text-[#FBF8F3] text-[9px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account / Admin quick access */}
              <button
                type="button"
                onClick={() => navigateTo('account')}
                className="p-1 hover:text-[#B08D57] transition-colors focus:outline-none cursor-pointer hidden sm:block"
                aria-label="Kundenkonto"
                title="Mein Konto"
              >
                <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.25]" />
              </button>

              {/* Cart Drawer Toggle */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 p-1 text-[#1C1917] hover:text-[#B08D57] transition-colors focus:outline-none cursor-pointer"
                aria-label="Warenkorb öffnen"
                title="Warenkorb"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.25]" />
                {cartTotals.itemsCount > 0 && (
                  <span className="w-4 h-4 bg-[#1F2A24] text-[#FBF8F3] text-[10px] font-medium flex items-center justify-center rounded-full tabular-nums">
                    {cartTotals.itemsCount}
                  </span>
                )}
                {cartTotals.itemsCount > 0 && (
                  <span className="hidden md:inline-block text-[12px] font-medium text-[#6B635A] tabular-nums">
                    {formatEuro(cartTotals.total)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F2A24]/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-[#FBF8F3] w-full max-w-[640px] border border-[#E3DAC9] p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DAC9]">
              <div className="flex items-center gap-3 w-full">
                <Search className="w-5 h-5 text-[#B08D57] stroke-[1.25]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ringname, Edelmetall (z. B. Platin, Gelbgold), Stein..."
                  className="w-full bg-transparent text-[#1C1917] placeholder-[#6B635A] text-[15px] focus:outline-none font-sans"
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 text-[#6B635A] hover:text-[#1C1917] transition-colors"
                aria-label="Schließen"
              >
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
            </div>

            {/* Quick Suggestions or Results */}
            <div className="mt-4">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-[11px] font-semibold text-[#B08D57] uppercase tracking-[0.14em] mb-2.5">
                    Häufig gesucht
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Solitär', 'Eheringe Platin', '750 Gelbgold', 'Brillant 0,5 ct', 'Allianzring'].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => setSearchQuery(item)}
                          className="text-[12px] text-[#6B635A] hover:text-[#1C1917] py-1 px-2.5 border border-[#E3DAC9] hover:border-[#B08D57] transition-colors"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A]">
                    {searchResults.length} {searchResults.length === 1 ? 'Ergebnis' : 'Ergebnisse'}
                  </p>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigateTo('product', product.id);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-4 p-2 hover:bg-[#F5F0E8] transition-colors cursor-pointer border-b border-[#E3DAC9]/40 last:border-0"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover border border-[#E3DAC9]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-[16px] text-[#1C1917] truncate">
                          {product.name}
                        </h4>
                        <p className="text-[12px] text-[#6B635A] truncate">{product.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[13px] font-medium text-[#1C1917] tabular-nums">
                          {formatEuro(product.basePrice)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      navigateTo('shop');
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-center py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B08D57] hover:underline"
                  >
                    Alle Suchtreffer im Shop ansehen
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center text-[#6B635A] text-[14px]">
                  Keine Ringe zu „{searchQuery}“ gefunden. Prüfen Sie bitte die Schreibweise oder kontaktieren Sie unsere Manufaktur.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FBF8F3] flex flex-col justify-between overflow-y-auto animate-fadeIn lg:hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6 border-b border-[#E3DAC9]">
            <div className="text-left">
              <span className="font-serif text-[24px] tracking-[0.2em] font-normal uppercase text-[#1C1917]">
                AURELIA
              </span>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6B635A]">Ringmanufaktur</p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#1C1917] hover:text-[#B08D57] transition-colors focus:outline-none"
              aria-label="Menü schließen"
            >
              <X className="w-6 h-6 stroke-[1.25]" />
            </button>
          </div>

          {/* Links */}
          <div className="p-6 space-y-6">
            <nav className="flex flex-col space-y-4 font-serif text-[26px] text-[#1C1917]">
              <button
                onClick={() => {
                  navigateTo('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#B08D57] transition-colors flex items-center justify-between"
              >
                <span>Kollektionen</span>
                <span className="text-sm font-sans text-[#6B635A]">Entdecken</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('verlobungsringe');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#B08D57] transition-colors flex items-center justify-between"
              >
                <span>Verlobungsringe</span>
                <span className="text-sm font-sans text-[#6B635A]">Solitär & Halo</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('eheringe');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#B08D57] transition-colors flex items-center justify-between"
              >
                <span>Eheringe</span>
                <span className="text-sm font-sans text-[#6B635A]">Trauringpaare</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('configurator');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#B08D57] transition-colors flex items-center justify-between text-[#B08D57]"
              >
                <span>Ring-Konfigurator</span>
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  navigateTo('size-guide');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#B08D57] transition-colors flex items-center justify-between text-[22px]"
              >
                <span>Ringgrößen-Guide</span>
                <span className="text-xs font-sans text-[#6B635A]">Messanleitung</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('manufaktur');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#B08D57] transition-colors flex items-center justify-between text-[22px]"
              >
                <span>Manufaktur & Atelier</span>
                <span className="text-xs font-sans text-[#6B635A]">Pforzheim</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('journal');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-[#B08D57] transition-colors flex items-center justify-between text-[22px]"
              >
                <span>Journal</span>
                <span className="text-xs font-sans text-[#6B635A]">Geschichten</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-[#E3DAC9] space-y-3 font-sans text-sm text-[#6B635A]">
              <button
                onClick={() => {
                  navigateTo('account');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left hover:text-[#1C1917]"
              >
                <User className="w-4 h-4 stroke-[1.25]" />
                <span>Kundenkonto & Bestellungen</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('contact');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left hover:text-[#1C1917]"
              >
                <Compass className="w-4 h-4 stroke-[1.25]" />
                <span>Persönliche Beratung vereinbaren</span>
              </button>
              <a
                href={TELEGRAM_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-left text-[#B08D57] font-medium pt-1"
              >
                <Send className="w-4 h-4" />
                <span>Meister kontaktieren & bestellen (t.me/dexco36)</span>
              </a>
              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left text-[#6B635A] hover:underline pt-2 text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Manufaktur Admin-Portal</span>
              </button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="p-6 bg-[#F5F0E8] border-t border-[#E3DAC9] text-xs text-[#6B635A]">
            <p className="font-medium text-[#1C1917] mb-1">Telefonische Meisterberatung</p>
            <p>Mo–Fr: 10:00 – 18:00 Uhr · +49 (0) 7231 892010</p>
            <p className="mt-2 text-[11px]">Versandkostenfrei ab 150,00 € mit Wertkurier</p>
          </div>
        </div>
      )}
    </header>
  );
};
