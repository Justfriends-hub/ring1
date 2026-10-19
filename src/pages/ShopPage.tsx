import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  Star,
  Eye,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL, buildTelegramOrderUrl } from '../context/ShopContext';
import { Product, PreciousMetal, ProductCategory } from '../types';
import { formatEuro } from '../utils/formatters';
import { RingPerspectiveViewer } from '../components/RingPerspectiveViewer';

interface ShopPageProps {
  initialCategory?: ProductCategory | 'all';
  categoryTitle?: string;
  categorySubtitle?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  categoryTitle = 'Kollektionen unserer Manufaktur',
  categorySubtitle = 'Handgefertigte Ringe aus 750/585 Gold und 950 Platin mit zertifizierten Diamanten.',
}) => {
  const { products, navigateTo, addToCart, toggleWishlist, isInWishlist } = useShop();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [selectedStone, setSelectedStone] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<number | 'all'>('all');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  // 5-Perspective Inspector Modal
  const [perspectiveProduct, setPerspectiveProduct] = useState<Product | null>(null);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedMetal !== 'all' && !p.availableMetals.some((m) => m.includes(selectedMetal)))
          return false;
        if (selectedStone !== 'all') {
          if (selectedStone === 'Brillant' && !p.stoneType.includes('Brillant')) return false;
          if (selectedStone === 'Saphir' && !p.stoneType.includes('Saphir')) return false;
          if (selectedStone === 'Ohne Stein' && p.stoneType !== 'Ohne Stein') return false;
        }
        if (selectedSize !== 'all' && !p.sizes.includes(selectedSize as number)) return false;
        if (p.basePrice > priceMax) return false;
        if (inStockOnly && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    selectedMetal,
    selectedStone,
    selectedSize,
    priceMax,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedMetal('all');
    setSelectedStone('all');
    setSelectedSize('all');
    setPriceMax(5000);
    setInStockOnly(false);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header / Intro */}
      <div className="max-w-2xl mb-12">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-2">
          Online-Katalog & Atelierauswahl
        </span>
        <h1 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-tight">
          {categoryTitle}
        </h1>
        <p className="text-[15px] text-[#6B635A] mt-2 font-light leading-relaxed">
          {categorySubtitle}
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4 px-5 bg-[#FBF8F3] border border-[#E3DAC9] mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-medium text-[#1C1917] py-1 px-3 border border-[#E3DAC9]"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[1.25]" />
            <span>Filter</span>
          </button>

          <span className="text-[13px] text-[#6B635A]">
            <span className="font-medium text-[#1C1917] tabular-nums">
              {filteredProducts.length}
            </span>{' '}
            {filteredProducts.length === 1 ? 'Ring' : 'Ringe'} verfügbar
          </span>

          {(selectedCategory !== 'all' ||
            selectedMetal !== 'all' ||
            selectedStone !== 'all' ||
            selectedSize !== 'all' ||
            priceMax < 5000 ||
            inStockOnly) && (
            <button
              onClick={resetFilters}
              className="text-[11px] uppercase tracking-[0.12em] text-[#8E3B2F] hover:underline ml-2"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-[12px] uppercase tracking-[0.12em] text-[#6B635A]">
            Sortierung:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-[#E3DAC9] px-3 py-1.5 text-[13px] text-[#1C1917] focus:outline-none cursor-pointer"
          >
            <option value="featured">Empfehlung der Manufaktur</option>
            <option value="price-asc">Preis aufsteigend</option>
            <option value="price-desc">Preis absteigend</option>
            <option value="name">Alphabetisch (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Desktop Filters layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <div
          className={`lg:col-span-3 space-y-6 ${
            showFiltersMobile ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 space-y-6">
            {/* Category Filter */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B08D57] mb-3">
                Kategorie
              </h4>
              <div className="space-y-1.5 text-[13px]">
                {[
                  { id: 'all', label: 'Alle Ringe' },
                  { id: 'verlobungsringe', label: 'Verlobungsringe' },
                  { id: 'eheringe', label: 'Trauringe & Eheringe' },
                  { id: 'allianzringe', label: 'Allianz- & Memoireringe' },
                  { id: 'siegelringe', label: 'Siegelringe' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedCategory === cat.id
                        ? 'text-[#1C1917] font-medium'
                        : 'text-[#6B635A] hover:text-[#1C1917]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Edelmetall Filter */}
            <div className="pt-4 border-t border-[#E3DAC9]/60">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B08D57] mb-3">
                Edelmetall
              </h4>
              <div className="space-y-1.5 text-[13px]">
                {[
                  { id: 'all', label: 'Alle Metalle' },
                  { id: 'Gelbgold', label: 'Gelbgold (585 / 750)' },
                  { id: 'Weißgold', label: 'Weißgold (585 / 750)' },
                  { id: 'Roségold', label: 'Roségold (585 / 750)' },
                  { id: 'Platin', label: '950 Platin' },
                  { id: 'Silber', label: '925 Silber' },
                ].map((metal) => (
                  <button
                    key={metal.id}
                    onClick={() => setSelectedMetal(metal.id)}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedMetal === metal.id
                        ? 'text-[#1C1917] font-medium'
                        : 'text-[#6B635A] hover:text-[#1C1917]'
                    }`}
                  >
                    {metal.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Edelstein Filter */}
            <div className="pt-4 border-t border-[#E3DAC9]/60">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B08D57] mb-3">
                Edelstein
              </h4>
              <div className="space-y-1.5 text-[13px]">
                {[
                  { id: 'all', label: 'Alle Steinarten' },
                  { id: 'Brillant', label: 'Brillanten / Naturdiamant' },
                  { id: 'Saphir', label: 'Ceylon-Saphir' },
                  { id: 'Ohne Stein', label: 'Pur ohne Stein' },
                ].map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => setSelectedStone(stone.id)}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedStone === stone.id
                        ? 'text-[#1C1917] font-medium'
                        : 'text-[#6B635A] hover:text-[#1C1917]'
                    }`}
                  >
                    {stone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ringgröße Filter */}
            <div className="pt-4 border-t border-[#E3DAC9]/60">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B08D57]">
                  Ringgröße (mm)
                </h4>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="text-[11px] text-[#6B635A] underline hover:text-[#1C1917]"
                >
                  Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-2.5 py-1 text-[11px] border transition-colors ${
                    selectedSize === 'all'
                      ? 'bg-[#1F2A24] text-[#FBF8F3] border-[#1F2A24]'
                      : 'bg-white text-[#6B635A] border-[#E3DAC9]'
                  }`}
                >
                  Alle
                </button>
                {[48, 50, 52, 54, 56, 58, 60, 62, 64].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2.5 py-1 text-[11px] border transition-colors tabular-nums ${
                      selectedSize === size
                        ? 'bg-[#1F2A24] text-[#FBF8F3] border-[#1F2A24]'
                        : 'bg-white text-[#6B635A] border-[#E3DAC9] hover:border-[#B08D57]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div className="pt-4 border-t border-[#E3DAC9]/60">
              <div className="flex items-center justify-between mb-2 text-[12px]">
                <span className="font-semibold uppercase tracking-[0.14em] text-[#B08D57]">
                  Maximalpreis
                </span>
                <span className="font-medium text-[#1C1917] tabular-nums">
                  {formatEuro(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#B08D57] cursor-pointer"
              />
            </div>

            {/* In stock only toggle */}
            <div className="pt-4 border-t border-[#E3DAC9]/60 flex items-center justify-between">
              <span className="text-[12px] text-[#1C1917]">Nur sofort verfügbare</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#B08D57] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-12 text-center space-y-4">
              <p className="font-serif text-[24px] text-[#1C1917]">
                Keine Ringe mit dieser Filterauswahl gefunden
              </p>
              <p className="text-[14px] text-[#6B635A] max-w-md mx-auto">
                Passen Sie die Filter an oder konfigurieren Sie ein individuelles Unikat nach Maß.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-[0.14em] font-medium hover:bg-[#B08D57] transition-colors"
              >
                Alle Filter zurücksetzen
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const inWishlist = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-[#FBF8F3] border border-[#E3DAC9] flex flex-col justify-between transition-all duration-300 hover:shadow-md relative"
                    >
                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.14em] font-medium px-2 py-0.5 bg-[#F5F0E8] border border-[#E3DAC9] text-[#1C1917]">
                          {product.badge}
                        </span>
                      )}

                      {/* Top action buttons */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPerspectiveProduct(product)}
                          className="p-1.5 rounded-full bg-white/80 hover:bg-white text-[#6B635A] hover:text-[#1C1917] transition-colors shadow-xs"
                          title="5 Perspektiven ansehen"
                        >
                          <Eye className="w-4 h-4 stroke-[1.25]" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors shadow-xs ${
                            inWishlist ? 'text-[#8E3B2F]' : 'text-[#6B635A] hover:text-[#1C1917]'
                          }`}
                          title="Wunschliste"
                        >
                          <Star className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Image with 5-sides tap affordance */}
                      <div
                        onClick={() => setPerspectiveProduct(product)}
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
                            alt={`${product.name} Ansicht`}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                          />
                        )}

                        {/* 5-sides indicator pill on hover */}
                        <div className="absolute bottom-2 inset-x-2 bg-[#1F2A24]/85 text-[#FBF8F3] py-1 px-2 text-[10px] tracking-wider uppercase flex items-center justify-between backdrop-blur-xs opacity-90 group-hover:opacity-100 transition-opacity">
                          <span className="flex items-center gap-1 text-[#B08D57]">
                            <Sparkles className="w-3 h-3" />
                            <span>5 Seiten ansehen</span>
                          </span>
                          <span className="text-white/80">Tippen</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                            {product.availableMetals[0]}
                          </span>
                          <h3
                            onClick={() => setPerspectiveProduct(product)}
                            className="font-serif text-[20px] text-[#1C1917] group-hover:text-[#B08D57] transition-colors leading-snug cursor-pointer"
                          >
                            {product.name}
                          </h3>
                          <p className="text-[12px] text-[#6B635A] mt-1 line-clamp-1 font-light">
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

                          <div className="grid grid-cols-1 gap-1.5 pt-1">
                            <a
                              href={buildTelegramOrderUrl(`AURELIA Ringbestellung:\nModell: ${product.name}\nPreis: ${formatEuro(product.basePrice)}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 bg-[#B08D57] hover:bg-[#977644] text-[#1F2A24] hover:text-white text-[11px] uppercase tracking-wider font-medium transition-colors cursor-pointer text-center block"
                            >
                              Bestellung über Telegram
                            </a>
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

              {/* Direct Telegram Order Banner in Shop */}
              <div className="p-6 bg-[#FBF8F3] border border-[#B08D57]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
                    Persönliche Meisterberatung & Direktbestellung
                  </span>
                  <h3 className="font-serif text-[22px] text-[#1C1917]">
                    Sonderanfertigung oder direkte Bestellung via Telegram
                  </h3>
                  <p className="text-[13px] text-[#6B635A] max-w-xl">
                    Sie möchten Ihre Maße oder einen Ring direkt persönlich aufgeben? Schreiben Sie
                    unserem Werkstattleiter auf Telegram unter{' '}
                    <span className="font-medium text-[#1C1917]">@dexco36</span>.
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
            </div>
          )}
        </div>
      </div>

      {/* 5-Perspective Inspector Modal */}
      {perspectiveProduct && (
        <RingPerspectiveViewer
          product={perspectiveProduct}
          onClose={() => setPerspectiveProduct(null)}
          isModal={true}
        />
      )}
    </div>
  );
};
