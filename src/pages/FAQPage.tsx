import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const FAQS: FAQSection[] = [
  {
    title: 'Ringgrößen & Passform',
    items: [
      {
        q: 'Was geschieht, wenn der Ring nach dem Antrag nicht exakt passt?',
        a: 'Wir garantieren Ihnen eine vollkommen kostenlose Ringgrößen-Anpassung innerhalb von 30 Tagen nach Erhalt. Senden Sie den Ring einfach mit unserem vorfrankierten Wertversandetikett an unser Atelier zurück – unsere Goldschmiede passen die Ringschiene innerhalb von 3 bis 5 Werktagen an.',
      },
      {
        q: 'Wie kann ich die Ringgröße meiner Partnerin heimlich ermitteln?',
        a: 'Die verlässlichste Methode ist das Messen des Innendurchmessers eines Rings, den sie regelmäßig am Ringfinger trägt. Nutzen Sie hierfür unseren Ringgrößen-Guide oder fordern Sie unser kostenloses Ringmaßband per Post an.',
      },
      {
        q: 'Was bedeutet die sogenannte „Innenbombierung“?',
        a: 'Eine bombierte Ringschiene ist auf der Innenseite sanft abgerundet. Dadurch liegt der Ring nicht flach auf der Haut auf, sondern gleitet geschmeidig über die Fingerknöchel und bietet unvergleichlichen Tragekomfort im Alltag.',
      },
    ],
  },
  {
    title: 'Materialien & Diamantzertifikate',
    items: [
      {
        q: 'Woher stammt das Feingold für die Ringe?',
        a: 'AURELIA verwendet zu 100 % recyceltes Feingold aus zertifizierten deutschen Scheideanstalten. Damit schonen wir natürliche Ressourcen und garantieren die Einhaltung strenger RJC-Standards (Responsible Jewellery Council).',
      },
      {
        q: 'Erhalte ich für meinen Diamanten ein offizielles Zertifikat?',
        a: 'Ja. Alle Brillanten ab 0,30 Karat werden von den weltweit renommiertesten gemmologischen Instituten (GIA oder IGI) zertifiziert. Die individuelle Zertifikatsnummer wird mikroskopisch klein per Laser auf die Rundiste des Diamanten graviert.',
      },
      {
        q: 'Welche Vorteile bietet 950 Platin gegenüber Weißgold?',
        a: '950er Platin ist ein reines, naturweißes Edelmetall, das niemals vergilbt und keine Rhodinierung benötigt. Es ist vollkommen hypoallergen und verliert über Jahrzehnte kein Material, da Kratzer das Metall lediglich verdrängen, statt es abzutragen.',
      },
    ],
  },
  {
    title: 'Versand & Diskrete Übergabe',
    items: [
      {
        q: 'Ist auf dem Paket ersichtlich, dass sich wertvoller Schmuck darin befindet?',
        a: 'Nein, keineswegs. Jede Sendung wird in einer absolut neutralen, unbeschrifteten Sicherheits-Umverpackung versandt. Der Absender lautet diskret „A. R. Manufaktur Logistik“ ohne Schmuck- oder Edelmetallhinweis, damit Überraschungen gewahrt bleiben.',
      },
      {
        q: 'Wie ist der Versand versichert?',
        a: 'Jede Bestellung wird über den speziellen DHL Express Valoren-Sicherheitsdienst befördert und ist zu 100 % gegen Verlust oder Beschädigung versichert. Die Übergabe erfolgt ausschließlich persönlich gegen Unterschrift und Vorlage eines Ausweises.',
      },
      {
        q: 'Wie hoch sind die Versandkosten?',
        a: 'Ab einem Bestellwert von 150,00 € ist der versicherte Valorenversand innerhalb Deutschlands, Österreichs und der Schweiz für Sie vollkommen kostenfrei.',
      },
    ],
  },
  {
    title: 'Pflege & Garantie',
    items: [
      {
        q: 'Welche Garantie gewährt AURELIA?',
        a: 'Wir gewähren eine lebenslange Garantie auf die handwerkliche Verarbeitung, die Metalllegierung und den sicheren Halt der handgefassten Edelsteine.',
      },
      {
        q: 'Kann ich meinen Ring zur Reinigung einsenden?',
        a: 'Ja, als AURELIA Kunde steht Ihnen eine jährliche kostenfreie Ultraschall-Reinigung und Steinfassungs-Inspektion in unserem Atelier zur Verfügung.',
      },
    ],
  },
];

export const FAQPage: React.FC = () => {
  const { navigateTo } = useShop();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'Ringgrößen & Passform-0': true,
    'Materialien & Diamantzertifikate-0': true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
          Antworten aus dem Atelier
        </span>
        <h1 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-tight">
          Häufig gestellte Fragen (FAQ)
        </h1>
        <p className="text-[15px] text-[#6B635A] font-light">
          Wissenswertes zu Handwerk, Ringgrößen, Diamanten und versichertem Valorenversand.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {FAQS.map((section, sIdx) => (
          <div key={sIdx} className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-[24px] text-[#1C1917] pb-3 border-b border-[#E3DAC9]">
              {section.title}
            </h3>

            <div className="divide-y divide-[#E3DAC9]/60">
              {section.items.map((item, iIdx) => {
                const key = `${section.title}-${iIdx}`;
                const isOpen = !!openItems[key];
                return (
                  <div key={iIdx} className="py-4 first:pt-2 last:pb-0">
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                    >
                      <span className="font-medium text-[15px] text-[#1C1917]">{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#B08D57] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#6B635A] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <p className="text-[13px] text-[#6B635A] mt-2.5 leading-relaxed font-light animate-fadeIn">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still questions? */}
      <div className="p-8 bg-[#F5F0E8] border border-[#E3DAC9] text-center space-y-3">
        <h4 className="font-serif text-[22px] text-[#1C1917]">
          Haben Sie eine persönliche Frage zu Ihrem Entwurf?
        </h4>
        <p className="text-[13px] text-[#6B635A] max-w-md mx-auto">
          Unsere Goldschmiedemeister beraten Sie gerne unverbindlich telefonisch oder per E-Mail.
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="mt-2 px-6 py-2.5 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-wider hover:bg-[#B08D57] transition-colors cursor-pointer"
        >
          Kontakt aufnehmen
        </button>
      </div>
    </div>
  );
};
