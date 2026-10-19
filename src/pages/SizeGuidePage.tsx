import React, { useState } from 'react';
import {
  Printer,
  Compass,
  Check,
  Send,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { RING_SIZES, getDiameterFromCircumference } from '../utils/formatters';

export const SizeGuidePage: React.FC = () => {
  const { showToast } = useShop();

  // Interactive Converter state
  const [inputCircumference, setInputCircumference] = useState<number>(54);
  const [multisizerName, setMultisizerName] = useState('');
  const [multisizerAddress, setMultisizerAddress] = useState('');
  const [multisizerSubmitted, setMultisizerSubmitted] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleMultisizerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!multisizerName || !multisizerAddress) {
      showToast('Bitte geben Sie Ihren Namen und Anschrift ein.', 'error');
      return;
    }
    setMultisizerSubmitted(true);
    showToast(
      'Ihr kostenloses Ringmaßband wurde in Auftrag gegeben und wird in 1–2 Tagen per Briefpost zugestellt.',
      'success'
    );
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
          Präzision bis auf den Zehntelmillimeter
        </span>
        <h1 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-tight">
          Der AURELIA Ringgrößen-Guide
        </h1>
        <p className="text-[15px] text-[#6B635A] font-light leading-relaxed">
          Ein perfekt sitzender Ring gleitet mit leichtem Widerstand über den Fingerknöchel und sitzt
          anschließend angenehm sicher am Fingeransatz.
        </p>
      </div>

      {/* Interactive Size Converter Tool */}
      <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-8 sm:p-10 shadow-sm">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#B08D57]">
            <Compass className="w-3.5 h-3.5" />
            <span>Interaktiver Schnell-Umrechner</span>
          </div>

          <h2 className="font-serif text-[28px] text-[#1C1917]">
            Wählen Sie Ihren gemessenen Fingerumfang
          </h2>

          <div className="flex justify-center items-center gap-4">
            <input
              type="range"
              min="48"
              max="66"
              step="2"
              value={inputCircumference}
              onChange={(e) => setInputCircumference(Number(e.target.value))}
              className="w-full max-w-xs accent-[#B08D57] cursor-pointer"
            />
            <span className="font-serif text-[24px] text-[#1C1917] tabular-nums min-w-[70px]">
              {inputCircumference} mm
            </span>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E3DAC9] text-center">
            <div className="p-3 bg-[#F5F0E8] border border-[#E3DAC9]">
              <span className="text-[11px] text-[#6B635A] uppercase tracking-wider block">
                EU / DE Größe
              </span>
              <span className="font-serif text-[22px] text-[#1C1917] font-medium tabular-nums">
                {inputCircumference}
              </span>
            </div>

            <div className="p-3 bg-[#F5F0E8] border border-[#E3DAC9]">
              <span className="text-[11px] text-[#6B635A] uppercase tracking-wider block">
                Innendurchmesser
              </span>
              <span className="font-serif text-[22px] text-[#1C1917] font-medium tabular-nums">
                Ø {getDiameterFromCircumference(inputCircumference)} mm
              </span>
            </div>

            <div className="p-3 bg-[#F5F0E8] border border-[#E3DAC9]">
              <span className="text-[11px] text-[#6B635A] uppercase tracking-wider block">
                US Äquivalent
              </span>
              <span className="font-serif text-[22px] text-[#1C1917] font-medium tabular-nums">
                {((inputCircumference - 40) / 2.5 + 3.25).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Measurement Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Method 1: Existing ring */}
        <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-8 space-y-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B08D57]">
            Methode 1 · Heimlich messen
          </span>
          <h3 className="font-serif text-[24px] text-[#1C1917]">
            Anhand eines vorhandenen Rings
          </h3>
          <p className="text-[13px] text-[#6B635A] leading-relaxed">
            Nehmen Sie einen passenden Ring der beschenkten Person zur Hand. Messen Sie mit einem
            präzisen Lineal oder Messschieber den inneren Durchmesser an der breitesten Stelle in
            Millimetern.
          </p>
          <div className="p-4 bg-[#F5F0E8] border border-[#E3DAC9] text-[12px] text-[#1C1917] space-y-1">
            <p className="font-medium">Beispiel:</p>
            <p>17,2 mm Innendurchmesser × 3,1415 = 54 mm Innenumfang (EU-Größe 54).</p>
          </div>
        </div>

        {/* Method 2: Paper strip / string */}
        <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-8 space-y-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B08D57]">
            Methode 2 · Direkte Messung
          </span>
          <h3 className="font-serif text-[24px] text-[#1C1917]">Mit Papierstreifen am Finger</h3>
          <p className="text-[13px] text-[#6B635A] leading-relaxed">
            Schneiden Sie einen ca. 1 cm breiten Papierstreifen ab. Wickeln Sie ihn eng, aber nicht
            einschnürend um die stärkste Stelle des Fingers (meist das mittlere Fingergelenk) und
            markieren Sie den Schnittpunkt mit einem feinen Stift.
          </p>
          <div className="p-4 bg-[#F5F0E8] border border-[#E3DAC9] text-[12px] text-[#1C1917] space-y-1">
            <p className="font-medium">Hinweis:</p>
            <p>Messen Sie am besten abends, da Finger im Laufe des Tages leicht an Umfang gewinnen.</p>
          </div>
        </div>
      </div>

      {/* Complete Conversion Table */}
      <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E3DAC9] gap-4">
          <div>
            <h3 className="font-serif text-[26px] text-[#1C1917]">
              Offizielle AURELIA Ringgrößen-Tabelle
            </h3>
            <p className="text-[13px] text-[#6B635A]">
              Standardgrößen unserer deutschen Manufaktur
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E3DAC9] text-[12px] font-medium uppercase tracking-[0.12em] text-[#1C1917] hover:border-[#B08D57] transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#B08D57]" />
            <span>Tabelle drucken</span>
          </button>
        </div>

        <div className="overflow-x-auto pt-6">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#E3DAC9] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57]">
                <th className="py-2.5 px-3">EU-Ringgröße (Umfang)</th>
                <th className="py-2.5 px-3">Innendurchmesser (mm)</th>
                <th className="py-2.5 px-3">Passform-Empfehlung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DAC9]/60 text-[#1C1917]">
              {RING_SIZES.map((size) => (
                <tr key={size} className="hover:bg-[#F5F0E8] transition-colors">
                  <td className="py-3 px-3 font-medium tabular-nums">{size} mm</td>
                  <td className="py-3 px-3 tabular-nums font-mono text-[#6B635A]">
                    Ø {getDiameterFromCircumference(size)} mm
                  </td>
                  <td className="py-3 px-3 text-[12px] text-[#6B635A]">
                    {size <= 52
                      ? 'Zierliche Damenhand (Ringfinger)'
                      : size <= 56
                      ? 'Klassische Damengröße'
                      : size <= 60
                      ? 'Kräftigere Hand / Herren Ringfinger'
                      : 'Klassische Herrengröße'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Free Multisizer Request Form */}
      <div className="bg-[#1F2A24] text-[#FBF8F3] p-8 sm:p-12 border border-[#2D3C34]">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B08D57] block mb-2">
            Unser Service für 100 % Sicherheit
          </span>
          <h3 className="font-serif text-[30px] sm:text-[36px] text-[#FBF8F3] font-normal leading-tight mb-3">
            Kostenloses Ringmaßband per Post anfordern
          </h3>
          <p className="text-[14px] text-[#E3DAC9] font-light leading-relaxed mb-6">
            Wir senden Ihnen unser geeichtes Manufaktur-Ringmaßband völlig kostenfrei und unverbindlich
            nach Hause.
          </p>

          {multisizerSubmitted ? (
            <div className="p-4 bg-[#26352D] border border-[#B08D57]/60 text-[13px] text-[#FBF8F3] flex items-center gap-3">
              <Check className="w-5 h-5 text-[#B08D57]" />
              <span>
                Vielen Dank. Das Ringmaßband ist auf dem Postweg zu Ihnen nach Hause.
              </span>
            </div>
          ) : (
            <form onSubmit={handleMultisizerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Ihr vollständiger Name"
                  value={multisizerName}
                  onChange={(e) => setMultisizerName(e.target.value)}
                  className="bg-[#26352D] border border-[#35483D] px-4 py-2.5 text-[13px] text-[#FBF8F3] placeholder-[#A39E93] focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Straße, Hausnr., PLZ, Ort"
                  value={multisizerAddress}
                  onChange={(e) => setMultisizerAddress(e.target.value)}
                  className="bg-[#26352D] border border-[#35483D] px-4 py-2.5 text-[13px] text-[#FBF8F3] placeholder-[#A39E93] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#B08D57] hover:bg-[#C29E65] text-[#1F2A24] text-[12px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Kostenloses Maßband anfordern</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
