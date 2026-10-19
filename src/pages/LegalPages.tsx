import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface LegalPageProps {
  type: 'impressum' | 'datenschutz' | 'agb' | 'widerruf' | 'versand';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { navigateTo } = useShop();

  const titles = {
    impressum: 'Impressum',
    datenschutz: 'Datenschutzerklärung',
    agb: 'Allgemeine Geschäftsbedingungen (AGB)',
    widerruf: 'Widerrufsbelehrung & Widerrufsformular',
    versand: 'Versand & Zahlungsinformationen',
  };

  return (
    <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.14em] text-[#6B635A] hover:text-[#1C1917]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Zurück zur Startseite</span>
      </button>

      <div className="border-b border-[#E3DAC9] pb-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-1">
          Rechtliche Grundlagen
        </span>
        <h1 className="font-serif text-[34px] sm:text-[44px] text-[#1C1917] font-normal">
          {titles[type]}
        </h1>
        <p className="text-[12px] text-[#8C877D] mt-1">Stand: Oktober 2026</p>
      </div>

      <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-8 sm:p-10 space-y-6 text-[14px] text-[#1C1917] leading-relaxed font-light">
        {type === 'impressum' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Angaben gemäß § 5 TMG</h3>
              <p>
                AURELIA Ringmanufaktur GmbH<br />
                Goldschmiedegasse 12<br />
                75172 Pforzheim<br />
                Deutschland
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Vertreten durch</h3>
              <p>
                Geschäftsführer: Friedrich Weber (Goldschmiedemeister), Helena Lindau
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Registereintrag</h3>
              <p>
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Mannheim<br />
                Registernummer: HRB 729140
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Umsatzsteuer-ID</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE 815 940 321
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Kontakt</h3>
              <p>
                Telefon: +49 (0) 7231 892010<br />
                E-Mail: impressum@aurelia-ringe.de
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Verbraucherstreitbeilegung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit: https://ec.europa.eu/consumers/odr.<br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        )}

        {type === 'datenschutz' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                1. Datenschutz auf einen Blick
              </h3>
              <p>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften (DSGVO, BDSG, TTDSG) sowie dieser Datenschutzerklärung.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                2. Verantwortliche Stelle
              </h3>
              <p>
                AURELIA Ringmanufaktur GmbH<br />
                Goldschmiedegasse 12, 75172 Pforzheim<br />
                E-Mail: datenschutz@aurelia-ringe.de
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                3. Datenerfassung bei der Bestellung
              </h3>
              <p>
                Zur Abwicklung Ihrer Ringbestellung und zur Auslieferung durch den autorisierten
                Valorenkurier erheben wir Name, Anschrift, E-Mail-Adresse und Telefonnummer. Diese
                Daten werden ausschließlich zur Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO
                verarbeitet.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                4. Ihre Rechte als betroffene Person
              </h3>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
                personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
                Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
            </div>
          </div>
        )}

        {type === 'agb' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">§ 1 Geltungsbereich</h3>
              <p>
                Für alle Bestellungen über unseren Online-Shop durch Verbraucher und Unternehmer
                gelten die nachfolgenden AGB der AURELIA Ringmanufaktur GmbH.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">§ 2 Vertragsschluss</h3>
              <p>
                Mit Einstellung der Produkte in den Online-Shop geben wir ein verbindliches Angebot
                zum Vertragsschluss über diese Artikel ab. Der Vertrag kommt zustande, indem Sie
                durch Anklicken des Bestellbuttons „Zahlungspflichtig bestellen“ das Angebot über die
                im Warenkorb enthaltenen Waren annehmen.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                § 3 Preise und Versandkosten
              </h3>
              <p>
                Die angegebenen Preise enthalten die gesetzliche deutsche Mehrwertsteuer (19 %).
                Ab einem Bestellwert von 150,00 € liefern wir versandkostenfrei mit speziellem
                Valoren-Wertkurier.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">§ 4 Eigentumsvorbehalt</h3>
              <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
            </div>
          </div>
        )}

        {type === 'widerruf' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Widerrufsbelehrung</h3>
              <p>
                Sie haben das Recht, binnen dreißig Tagen ohne Angabe von Gründen diesen Vertrag zu
                widerrufen. Die Widerrufsfrist beträgt dreißig Tage ab dem Tag, an dem Sie oder ein
                von Ihnen benannter Dritter die Waren in Besitz genommen haben.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Ausübung des Widerrufs</h3>
              <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (AURELIA Ringmanufaktur GmbH,
                Goldschmiedegasse 12, 75172 Pforzheim, E-Mail: widerruf@aurelia-ringe.de) mittels einer
                eindeutigen Erklärung informieren.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                Ausschluss bzw. vorzeitiges Erlöschen des Widerrufsrechts
              </h3>
              <p>
                Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht
                vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder
                Bestimmung durch den Verbraucher maßgeblich ist. Bei AURELIA bieten wir Ihnen jedoch
                selbst bei gravierten Ringen eine einmalige kostenfreie Ringgrößen-Anpassung
                innerhalb von 30 Tagen an.
              </p>
            </div>
          </div>
        )}

        {type === 'versand' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                Versandkosten & Lieferzeiten
              </h3>
              <p>
                Deutschland: Kostenloser versicherter Valorenversand ab 150,00 € Bestellwert
                (darunter 6,90 €). Lieferzeit: ca. 3–5 Werktage nach Fertigstellung.<br />
                Österreich & Schweiz: Kostenlos ab 150,00 € Bestellwert (darunter 14,90 €).
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">
                Sicherheits-Valorenkurier
              </h3>
              <p>
                Jede Schmucksendung wird in einer diskreten, unbeschrifteten Sicherheitsverpackung
                befördert. Die Übergabe erfolgt nur an den bevollmächtigten Empfänger gegen
                Unterschrift und Ausweisprüfung.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[20px] font-medium mb-1">Zahlungsmöglichkeiten</h3>
              <p>
                Wir akzeptieren Kreditkarten (Visa, Mastercard, Amex), PayPal, Klarna
                Rechnung/Sofort, SEPA-Lastschrift, Apple Pay sowie Vorkasse mit 2 % Skonto.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
