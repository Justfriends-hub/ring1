import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { cookieSettings, saveCookieSettings, navigateTo } = useShop();
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // If already consented, don't show
  if (cookieSettings !== null) {
    return null;
  }

  const handleAcceptAll = () => {
    saveCookieSettings({
      accepted: true,
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleAcceptEssential = () => {
    saveCookieSettings({
      accepted: true,
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveCustom = () => {
    saveCookieSettings({
      accepted: true,
      essential: true,
      analytics,
      marketing,
    });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#1F2A24]/95 text-[#FBF8F3] border-t border-[#B08D57]/40 shadow-2xl backdrop-blur-md animate-fadeIn">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2 text-[#B08D57]">
              <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase">
                Privatsphäre & Transparenz
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#D8D2C6]">
              Wir nutzen Cookies und ähnliche Technologien, um die einwandfreie Funktion unseres
              Onlineshops zu gewährleisten sowie optional anonymisierte Nutzungsanalysen zur
              Verbesserung unseres Ateliers durchzuführen. Sie können Ihre Einwilligung jederzeit mit
              Wirkung für die Zukunft in den Einstellungen anpassen. Weitere Details finden Sie in
              unserer{' '}
              <button
                onClick={() => navigateTo('legal-datenschutz')}
                className="underline hover:text-[#B08D57] transition-colors"
              >
                Datenschutzerklärung
              </button>
              .
            </p>

            {/* Granular expandable settings */}
            {showDetails && (
              <div className="mt-4 pt-4 border-t border-[#35483D] space-y-3 text-[12px]">
                <div className="flex items-center justify-between p-2.5 bg-[#26352D] border border-[#35483D]">
                  <div>
                    <span className="font-medium text-[#FBF8F3]">
                      Technisch notwendige Cookies
                    </span>
                    <p className="text-[11px] text-[#A39E93]">
                      Erforderlich für Warenkorb, Sitzungsspeicherung und sichere Kasse.
                    </p>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-[#B08D57] font-medium">
                    Immer aktiv
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#26352D] border border-[#35483D]">
                  <div>
                    <span className="font-medium text-[#FBF8F3]">Statistik & Analyse</span>
                    <p className="text-[11px] text-[#A39E93]">
                      Hilft uns zu verstehen, welche Ringkollektionen am meisten geschätzt werden.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#3F5B46]/40 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-[#FBF8F3] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#FBF8F3] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B08D57]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#26352D] border border-[#35483D]">
                  <div>
                    <span className="font-medium text-[#FBF8F3]">Personalisierung</span>
                    <p className="text-[11px] text-[#A39E93]">
                      Ermöglicht persönliche Ringempfehlungen und bevorzugte Edelmetalle.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#3F5B46]/40 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-[#FBF8F3] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#FBF8F3] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B08D57]"></div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 min-w-[240px]">
            <button
              onClick={handleAcceptAll}
              className="py-2.5 px-5 bg-[#B08D57] hover:bg-[#C29E65] text-[#1F2A24] font-medium text-[12px] tracking-[0.14em] uppercase transition-colors cursor-pointer text-center"
            >
              Alle akzeptieren
            </button>
            <button
              onClick={handleAcceptEssential}
              className="py-2.5 px-5 bg-transparent border border-[#E3DAC9]/60 hover:border-[#FBF8F3] text-[#FBF8F3] font-normal text-[12px] tracking-[0.14em] uppercase transition-colors cursor-pointer text-center"
            >
              Nur notwendige
            </button>
            {showDetails ? (
              <button
                onClick={handleSaveCustom}
                className="py-2 text-[11px] text-[#B08D57] hover:underline transition-colors text-center cursor-pointer"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="inline-flex items-center justify-center gap-1 py-1.5 text-[11px] text-[#A39E93] hover:text-[#FBF8F3] transition-colors cursor-pointer"
              >
                <span>Einstellungen anpassen</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
