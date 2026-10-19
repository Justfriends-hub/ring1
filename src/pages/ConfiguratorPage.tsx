import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  PackageCheck,
  Info,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PreciousMetal, StoneType } from '../types';
import { formatEuro, getDiameterFromCircumference, RING_SIZES } from '../utils/formatters';
import { AURORA_IMAGE, HERO_IMAGE, CELESTE_IMAGE, ETERNA_IMAGE } from '../data/mockData';

interface RingSetting {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
}

const SETTINGS: RingSetting[] = [
  {
    id: 'sol-4',
    name: 'Solitär Vier-Krappen',
    description: 'Klassische, luftige Fassung mit maximalem Lichteinfall für brillante Lichtreflexe.',
    basePrice: 1490,
    image: AURORA_IMAGE,
  },
  {
    id: 'sol-6',
    name: 'Solitär Sechs-Krappen',
    description: 'Symmetrische Königskrone für höchste Steinsicherheit und zeitlose Eleganz.',
    basePrice: 1620,
    image: HERO_IMAGE,
  },
  {
    id: 'zarge',
    name: 'Zargenfassung (Bezel)',
    description: 'Vollständig eingefasste Rundiste, absolut glatt am Finger, modern und alltagstauglich.',
    basePrice: 1550,
    image: CELESTE_IMAGE,
  },
  {
    id: 'band',
    name: 'Klassisches Bandprofil (Ehering)',
    description: 'Ergonomisch innenbombiertes Band mit samtiger seidenmatter oder hochglänzender Politur.',
    basePrice: 890,
    image: ETERNA_IMAGE,
  },
];

const METALS: { metal: PreciousMetal; delta: number; colorHex: string; desc: string }[] = [
  { metal: '585 Gelbgold', delta: 0, colorHex: '#E5C158', desc: 'Warmer, klassischer Goldton mit hoher Härte' },
  { metal: '750 Gelbgold', delta: 380, colorHex: '#F3CF60', desc: '18 Karat Feingehalt mit intensiver Farbtiefe' },
  { metal: '585 Weißgold', delta: 120, colorHex: '#E2DFDA', desc: 'Rhodinierter, kühler Edelmetallglanz' },
  { metal: '750 Weißgold', delta: 480, colorHex: '#E8E6E1', desc: 'Massives 18k Weißgold, besonders edel' },
  { metal: '585 Roségold', delta: 150, colorHex: '#E6A588', desc: 'Zarter Kupferanteil für warme, romantische Nuancen' },
  { metal: '950 Platin', delta: 790, colorHex: '#DADCE0', desc: 'Reinstes Edelmetall, hypoallergen und ewig beständig' },
];

const STONES: { type: StoneType; carat?: number; delta: number; desc: string }[] = [
  { type: 'Brillant (G/VS)', carat: 0.25, delta: 450, desc: '0,25 ct Feines Weiß, sehr kleine Einschlüsse' },
  { type: 'Brillant (G/VS)', carat: 0.40, delta: 980, desc: '0,40 ct Solitär mit exzellentem Feuer' },
  { type: 'Brillant (F/VVS)', carat: 0.50, delta: 1850, desc: '0,50 ct Halbkaräter mit GIA-Expertise' },
  { type: 'Ceylon-Saphir', carat: 0.75, delta: 920, desc: 'Königsblauer Natursaphir im Facettenschliff' },
  { type: 'Ohne Stein', delta: 0, desc: 'Pures Edelmetall ohne Steinbesatz' },
];

export const ConfiguratorPage: React.FC = () => {
  const { addToCart, navigateTo } = useShop();

  // Current Step: 1 to 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Configuration selections
  const [selectedSetting, setSelectedSetting] = useState<RingSetting>(SETTINGS[0]);
  const [selectedMetal, setSelectedMetal] = useState(METALS[0]);
  const [selectedStone, setSelectedStone] = useState(STONES[0]);
  const [selectedSize, setSelectedSize] = useState<number>(54);
  const [engravingText, setEngravingText] = useState<string>('');
  const [engravingFont, setEngravingFont] = useState<'Klassisch' | 'Kursiv'>('Klassisch');

  // Total price calculation
  const calculatedPrice =
    selectedSetting.basePrice + selectedMetal.delta + selectedStone.delta;

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinishAndAddToCart = () => {
    addToCart({
      productId: `custom-${selectedSetting.id}`,
      productName: `Manufaktur-Unikat: ${selectedSetting.name}`,
      image: selectedSetting.image,
      metal: selectedMetal.metal,
      size: selectedSize,
      stoneType: selectedStone.type,
      engraving: engravingText.trim()
        ? `${engravingText.trim()} (${engravingFont})`
        : undefined,
      unitPrice: calculatedPrice,
      quantity: 1,
    });
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-2">
          Handgefertigtes Einzelstück
        </span>
        <h1 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-tight">
          AURELIA Ring-Konfigurator
        </h1>
        <p className="text-[14px] text-[#6B635A] mt-2 font-light">
          Gestalten Sie Schritt für Schritt Ihren Traumring. Unser Meisteratelier fertigt jedes
          Detail präzise nach Ihren Angaben.
        </p>
      </div>

      {/* Progress Step Bar */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-5 gap-2 sm:gap-4 border-b border-[#E3DAC9] pb-4 text-center">
          {[
            { step: 1, label: '1. Fassung' },
            { step: 2, label: '2. Edelmetall' },
            { step: 3, label: '3. Edelstein' },
            { step: 4, label: '4. Ringgröße' },
            { step: 5, label: '5. Gravur & Finale' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className={`text-left sm:text-center transition-colors cursor-pointer pb-2 ${
                currentStep === item.step
                  ? 'border-b-2 border-[#B08D57] text-[#1C1917] font-medium'
                  : currentStep > item.step
                  ? 'text-[#3F5B46] font-medium'
                  : 'text-[#8C877D]'
              }`}
            >
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] block">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid: Left interactive step options, Right live preview card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Step Configuration Panel (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-6">
          {/* STEP 1: FASSUNG */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-serif text-[24px] text-[#1C1917]">Schritt 1: Fassung wählen</h3>
                <p className="text-[13px] text-[#6B635A]">
                  Die Fassung bestimmt den Grundcharakter und die Proportion Ihres Rings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {SETTINGS.map((setting) => (
                  <div
                    key={setting.id}
                    onClick={() => setSelectedSetting(setting)}
                    className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedSetting.id === setting.id
                        ? 'border-[#B08D57] bg-[#F5F0E8] ring-1 ring-[#B08D57]'
                        : 'border-[#E3DAC9] bg-white hover:border-[#B08D57]'
                    }`}
                  >
                    <div>
                      <div className="aspect-4/3 bg-[#FBF8F3] overflow-hidden mb-3 border border-[#E3DAC9]/60">
                        <img
                          src={setting.image}
                          alt={setting.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-serif text-[18px] text-[#1C1917]">{setting.name}</h4>
                      <p className="text-[12px] text-[#6B635A] mt-1 line-clamp-2 leading-relaxed">
                        {setting.description}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[#E3DAC9]/60 flex items-center justify-between text-[13px]">
                      <span className="font-medium text-[#1C1917]">
                        ab {formatEuro(setting.basePrice)}
                      </span>
                      {selectedSetting.id === setting.id && (
                        <span className="text-[#3F5B46] font-medium text-[11px] uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Ausgewählt
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: EDELMETALL */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-serif text-[24px] text-[#1C1917]">
                  Schritt 2: Edelmetall wählen
                </h3>
                <p className="text-[13px] text-[#6B635A]">
                  100 % recyceltes Feingold oder schweres 950er Platin aus deutscher Scheideanstalt.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {METALS.map((metalItem) => (
                  <div
                    key={metalItem.metal}
                    onClick={() => setSelectedMetal(metalItem)}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                      selectedMetal.metal === metalItem.metal
                        ? 'border-[#B08D57] bg-[#F5F0E8] ring-1 ring-[#B08D57]'
                        : 'border-[#E3DAC9] bg-white hover:border-[#B08D57]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-8 h-8 rounded-full border border-[#1C1917]/20 shrink-0 shadow-xs"
                        style={{ backgroundColor: metalItem.colorHex }}
                      />
                      <div>
                        <h4 className="font-serif text-[18px] text-[#1C1917]">
                          {metalItem.metal}
                        </h4>
                        <p className="text-[12px] text-[#6B635A]">{metalItem.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-medium text-[#1C1917] tabular-nums block">
                        {metalItem.delta === 0 ? 'Im Grundpreis' : `+${formatEuro(metalItem.delta)}`}
                      </span>
                      {selectedMetal.metal === metalItem.metal && (
                        <span className="text-[#3F5B46] text-[11px] font-medium flex items-center gap-1 justify-end">
                          <Check className="w-3 h-3" /> Gewählt
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: EDELSTEIN */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-serif text-[24px] text-[#1C1917]">
                  Schritt 3: Steinbesatz & Karat
                </h3>
                <p className="text-[13px] text-[#6B635A]">
                  Konfliktfreie Brillanten im Brillantschliff oder tiefblauer Ceylon-Saphir.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {STONES.map((stoneItem, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedStone(stoneItem)}
                    className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                      selectedStone === stoneItem
                        ? 'border-[#B08D57] bg-[#F5F0E8] ring-1 ring-[#B08D57]'
                        : 'border-[#E3DAC9] bg-white hover:border-[#B08D57]'
                    }`}
                  >
                    <div>
                      <h4 className="font-serif text-[18px] text-[#1C1917]">
                        {stoneItem.type}{' '}
                        {stoneItem.carat ? `· ${stoneItem.carat.toFixed(2)} ct` : ''}
                      </h4>
                      <p className="text-[12px] text-[#6B635A]">{stoneItem.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-medium text-[#1C1917] tabular-nums block">
                        {stoneItem.delta === 0 ? 'Inklusive' : `+${formatEuro(stoneItem.delta)}`}
                      </span>
                      {selectedStone === stoneItem && (
                        <span className="text-[#3F5B46] text-[11px] font-medium flex items-center gap-1 justify-end">
                          <Check className="w-3 h-3" /> Gewählt
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RINGGRÖSSE */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-[24px] text-[#1C1917]">
                    Schritt 4: Ringgröße wählen
                  </h3>
                  <p className="text-[13px] text-[#6B635A]">
                    Angabe im Innenumfang (mm). Eine spätere Korrektur ist innerhalb von 30 Tagen
                    kostenfrei.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="text-[12px] text-[#B08D57] underline hover:text-[#1C1917]"
                >
                  Größen-Tabelle
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
                {RING_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-2 border text-center transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#1F2A24] bg-[#1F2A24] text-[#FBF8F3]'
                        : 'border-[#E3DAC9] bg-white text-[#1C1917] hover:border-[#B08D57]'
                    }`}
                  >
                    <span className="block font-medium text-[14px] tabular-nums">{size}</span>
                    <span className="text-[10px] text-[#8C877D] block">
                      Ø {getDiameterFromCircumference(size)} mm
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-[#F5F0E8] border border-[#E3DAC9] text-[12px] text-[#6B635A] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                <span>
                  Sie sind sich unsicher? Wählen Sie eine Schätzgröße (z. B. 54 mm). Wir senden
                  Ihnen auf Wunsch vor der finalen Anfertigung ein kostenloses Ringmaßband per Post.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: GRAVUR & FINALE */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-serif text-[24px] text-[#1C1917]">
                  Schritt 5: Gravur & Zusammenfassung
                </h3>
                <p className="text-[13px] text-[#6B635A]">
                  Verleihen Sie Ihrem Ring mit einer kostenlosen Innengravur eine persönliche Seele.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1C1917] block">
                  Wunschgravur (Kostenlos · max. 25 Zeichen)
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="z. B. Für immer · 18.10.2026"
                  className="w-full bg-white border border-[#E3DAC9] px-4 py-2.5 text-[14px] text-[#1C1917] focus:outline-none"
                />

                <div className="flex gap-4 text-[13px]">
                  <button
                    type="button"
                    onClick={() => setEngravingFont('Klassisch')}
                    className={`py-1.5 px-3 border transition-colors cursor-pointer ${
                      engravingFont === 'Klassisch'
                        ? 'border-[#B08D57] bg-[#F5F0E8] text-[#1C1917] font-medium'
                        : 'border-[#E3DAC9] bg-white text-[#6B635A]'
                    }`}
                  >
                    Klassische Druckschrift
                  </button>

                  <button
                    type="button"
                    onClick={() => setEngravingFont('Kursiv')}
                    className={`py-1.5 px-3 border italic transition-colors cursor-pointer ${
                      engravingFont === 'Kursiv'
                        ? 'border-[#B08D57] bg-[#F5F0E8] text-[#1C1917] font-medium'
                        : 'border-[#E3DAC9] bg-white text-[#6B635A]'
                    }`}
                  >
                    Elegante Schreibschrift
                  </button>
                </div>
              </div>

              {/* Final Summary Card */}
              <div className="p-4 bg-[#F5F0E8] border border-[#E3DAC9] space-y-2 text-[13px]">
                <h5 className="font-medium text-[#1C1917] uppercase tracking-wider text-[11px] text-[#B08D57]">
                  Ihre Konfiguration
                </h5>
                <div className="flex justify-between py-1 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">Modell:</span>
                  <span className="font-medium">{selectedSetting.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">Edelmetall:</span>
                  <span className="font-medium">{selectedMetal.metal}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">Edelstein:</span>
                  <span className="font-medium">{selectedStone.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3DAC9]">
                  <span className="text-[#6B635A]">Ringgröße:</span>
                  <span className="font-medium">{selectedSize} mm Umfang</span>
                </div>
                {engravingText && (
                  <div className="flex justify-between py-1 border-b border-[#E3DAC9]">
                    <span className="text-[#6B635A]">Gravur:</span>
                    <span className="font-medium italic">„{engravingText}“ ({engravingFont})</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step Navigation Buttons */}
          <div className="pt-6 border-t border-[#E3DAC9] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#6B635A] hover:text-[#1C1917] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-[#1F2A24] text-[#FBF8F3] hover:bg-[#B08D57] text-[12px] font-medium uppercase tracking-[0.16em] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Nächster Schritt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishAndAddToCart}
                className="px-8 py-3.5 bg-[#B08D57] hover:bg-[#C29E65] text-[#1F2A24] text-[13px] font-medium uppercase tracking-[0.16em] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>In den Warenkorb · {formatEuro(calculatedPrice)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Visual Preview & Summary Box (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-[#FBF8F3] border border-[#E3DAC9] p-6 lg:sticky lg:top-24 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#B08D57] font-medium block">
              Echtzeit-Vorschau
            </span>
            <h3 className="font-serif text-[28px] text-[#1C1917] mt-1 leading-tight">
              {selectedSetting.name}
            </h3>
            <p className="text-[13px] text-[#6B635A] mt-0.5">
              {selectedMetal.metal} · {selectedStone.type}
            </p>
          </div>

          {/* Visual Canvas Representation */}
          <div className="relative aspect-square bg-[#F5F0E8] border border-[#E3DAC9] overflow-hidden flex items-center justify-center p-6">
            <img
              src={selectedSetting.image}
              alt="Konfigurierter Ring"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Visual halo/tint indication */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color"
              style={{ backgroundColor: selectedMetal.colorHex }}
            />

            {/* Live Engraving Overlay */}
            {engravingText && (
              <div className="absolute bottom-4 inset-x-4 bg-[#1F2A24]/75 text-[#FBF8F3] text-center py-1.5 px-3 backdrop-blur-xs border border-[#B08D57]/40 text-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#B08D57] block">
                  Innengravur
                </span>
                <span
                  className={`text-[13px] ${
                    engravingFont === 'Kursiv' ? 'font-serif italic' : 'font-sans'
                  }`}
                >
                  „{engravingText}“
                </span>
              </div>
            )}
          </div>

          {/* Pricing & Guarantee */}
          <div className="space-y-2 pt-2 border-t border-[#E3DAC9]">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-[#6B635A]">Konfigurierter Gesamtpreis:</span>
              <span className="font-serif text-[26px] font-normal text-[#1C1917] tabular-nums">
                {formatEuro(calculatedPrice)}
              </span>
            </div>
            <p className="text-[11px] text-[#8C877D] text-right">
              inkl. 19 % MwSt., kostenloser Valoren-Versand
            </p>
          </div>

          <div className="space-y-2 text-[12px] text-[#6B635A] pt-2 border-t border-[#E3DAC9]/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
              <span>GIA/IGI Zertifikat bei Brillanten ab 0,30 ct</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#B08D57]" />
              <span>Kostenlose Ringgrößen-Anpassung innerhalb von 30 Tagen</span>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-[#B08D57]" />
              <span>Diskrete Schmuckschatulle aus massivem Nussbaumholz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
