import React, { useState } from 'react';
import {
  ShieldCheck,
  RotateCcw,
  PackageCheck,
  Award,
  ArrowRight,
  Instagram,
  CheckCircle2,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast(
      'Vielen Dank. Wir haben Ihnen eine Bestätigungs-E-Mail (Double-Opt-In) gesendet.',
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#1F2A24] text-[#FBF8F3] border-t border-[#2D3C34] pt-16 pb-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Newsletter Row */}
        <div className="border-b border-[#2D3C34] pb-12 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-2">
                Atelier-Einblicke & Neuheiten
              </span>
              <h3 className="font-serif text-[28px] sm:text-[34px] font-normal leading-tight text-[#FBF8F3]">
                Neuigkeiten aus der Manufaktur
              </h3>
              <p className="text-[14px] text-[#A39E93] mt-2 font-normal max-w-lg leading-relaxed">
                Erhalten Sie exklusive Einladungen zu neuen Kollektionen, Fachbeiträge zur
                Diamantenkunde und Termine unserer Schmuckschauen.
              </p>
            </div>

            <div className="lg:col-span-6">
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2.5 p-4 bg-[#26352D] border border-[#B08D57]/40 text-[#FBF8F3] text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#B08D57]" />
                  <span>
                    Vielen Dank für Ihre Anmeldung. Bitte prüfen Sie Ihr Postfach zur Bestätigung.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex items-center border-b border-[#B08D57] pb-1">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Ihre E-Mail-Adresse eingeben"
                      className="w-full bg-transparent text-[#FBF8F3] placeholder-[#A39E93] text-[14px] focus:outline-none py-2"
                      required
                    />
                    <button
                      type="submit"
                      className="ml-3 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.14em] uppercase text-[#B08D57] hover:text-[#D1AF78] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>Abonnieren</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[#A39E93] leading-relaxed">
                    Mit Ihrer Anmeldung willigen Sie in den Erhalt unserer Manufakturpost ein. Sie
                    können sich jederzeit mit einem Klick abmelden. Mehr in unserer{' '}
                    <button
                      type="button"
                      onClick={() => navigateTo('legal-datenschutz')}
                      className="underline hover:text-[#FBF8F3]"
                    >
                      Datenschutzerklärung
                    </button>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 2. Trust Indicators Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-[#2D3C34] mb-12">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5 stroke-[1.25]" />
            <div>
              <h4 className="text-[13px] font-medium text-[#FBF8F3] tracking-wide">
                Zertifizierte Diamanten
              </h4>
              <p className="text-[12px] text-[#A39E93] mt-0.5 leading-snug">
                GIA & IGI Expertise, konfliktfrei
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5 stroke-[1.25]" />
            <div>
              <h4 className="text-[13px] font-medium text-[#FBF8F3] tracking-wide">
                30 Tage Rückgaberecht
              </h4>
              <p className="text-[12px] text-[#A39E93] mt-0.5 leading-snug">
                Kostenlose Ringgrößen-Anpassung
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <PackageCheck className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5 stroke-[1.25]" />
            <div>
              <h4 className="text-[13px] font-medium text-[#FBF8F3] tracking-wide">
                Versicherter Versand
              </h4>
              <p className="text-[12px] text-[#A39E93] mt-0.5 leading-snug">
                Kostenfrei ab 150,00 € mit Valoren-Kurier
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5 stroke-[1.25]" />
            <div>
              <h4 className="text-[13px] font-medium text-[#FBF8F3] tracking-wide">
                Made in Germany
              </h4>
              <p className="text-[12px] text-[#A39E93] mt-0.5 leading-snug">
                Echtes Goldschmiede-Handwerk
              </p>
            </div>
          </div>
        </div>

        {/* 3. 4-Column Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-[#2D3C34]">
          {/* Col 1: Kollektionen */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B08D57] mb-4">
              Kollektionen
            </h5>
            <ul className="space-y-2.5 text-[13px] text-[#A39E93]">
              <li>
                <button
                  onClick={() => navigateTo('verlobungsringe')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Verlobungsringe & Solitäre
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('eheringe')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Trauringe & Eheringe
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Allianz- & Memoire-Ringe
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Siegelringe in 750 Gold
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('configurator')}
                  className="hover:text-[#FBF8F3] transition-colors text-[#B08D57]"
                >
                  Ring-Konfigurator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Kundenservice */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B08D57] mb-4">
              Service & Beratung
            </h5>
            <ul className="space-y-2.5 text-[13px] text-[#A39E93]">
              <li>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Ringgrößen-Guide & Schablone
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Beratungstermin vereinbaren
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('legal-versand')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Versand, Wertkurier & Zahlung
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('legal-widerruf')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Rückgabe & Widerrufsbelehrung
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Häufig gestellte Fragen (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Unternehmen */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B08D57] mb-4">
              AURELIA Manufaktur
            </h5>
            <ul className="space-y-2.5 text-[13px] text-[#A39E93]">
              <li>
                <button
                  onClick={() => navigateTo('manufaktur')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Über unsere Meisterwerkstatt
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('journal')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  AURELIA Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('manufaktur')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Nachhaltigkeit & Recyceltes Gold
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Showroom München & Hamburg
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-[#FBF8F3] transition-colors"
                >
                  Mein Kundenkonto
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontakt & Atelier */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B08D57] mb-4">
              Atelier Pforzheim
            </h5>
            <div className="space-y-3 text-[13px] text-[#A39E93]">
              <p className="text-[#FBF8F3]">
                AURELIA Ringmanufaktur GmbH<br />
                Goldschmiedegasse 12<br />
                75172 Pforzheim · Deutschland
              </p>
              <p>
                Telefon:{' '}
                <a href="tel:+497231892010" className="text-[#FBF8F3] hover:text-[#B08D57]">
                  +49 (0) 7231 892010
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a
                  href="mailto:atelier@aurelia-ringe.de"
                  className="text-[#FBF8F3] hover:text-[#B08D57]"
                >
                  atelier@aurelia-ringe.de
                </a>
              </p>
              <p>
                Telegram Meister-Chat:{' '}
                <a
                  href={TELEGRAM_ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B08D57] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>t.me/dexco36</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p className="text-[12px] pt-1 border-t border-[#2D3C34]">
                Öffnungszeiten Atelier & Telefon:<br />
                Montag bis Freitag: 10:00 – 18:00 Uhr
              </p>
            </div>
          </div>
        </div>

        {/* 4. Payment Methods & Security */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#2D3C34] text-[12px] text-[#A39E93]">
          <span className="font-medium text-[#FBF8F3]">Sichere Zahlungsmethoden:</span>
          <div className="flex flex-wrap items-center gap-3 text-[11px] tracking-wider uppercase font-medium">
            <span className="px-2.5 py-1 bg-[#28362E] border border-[#35483D] text-[#FBF8F3]">
              Kreditkarte
            </span>
            <span className="px-2.5 py-1 bg-[#28362E] border border-[#35483D] text-[#FBF8F3]">
              PayPal
            </span>
            <span className="px-2.5 py-1 bg-[#28362E] border border-[#35483D] text-[#FBF8F3]">
              Klarna
            </span>
            <span className="px-2.5 py-1 bg-[#28362E] border border-[#35483D] text-[#FBF8F3]">
              SEPA-Lastschrift
            </span>
            <span className="px-2.5 py-1 bg-[#28362E] border border-[#35483D] text-[#FBF8F3]">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 bg-[#28362E] border border-[#35483D] text-[#FBF8F3]">
              Rechnung / Vorkasse
            </span>
          </div>
        </div>

        {/* 5. Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#8C877D]">
          <div className="text-center md:text-left">
            <p>© 2026 AURELIA Ringmanufaktur GmbH. Alle Rechte vorbehalten.</p>
            <p className="text-[11px] text-[#6E6A62] mt-0.5">
              Preise inkl. 19 % MwSt., zzgl. Versandkosten.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              onClick={() => navigateTo('legal-impressum')}
              className="hover:text-[#FBF8F3] transition-colors"
            >
              Impressum
            </button>
            <span>·</span>
            <button
              onClick={() => navigateTo('legal-datenschutz')}
              className="hover:text-[#FBF8F3] transition-colors"
            >
              Datenschutzerklärung
            </button>
            <span>·</span>
            <button
              onClick={() => navigateTo('legal-agb')}
              className="hover:text-[#FBF8F3] transition-colors"
            >
              AGB
            </button>
            <span>·</span>
            <button
              onClick={() => navigateTo('legal-widerruf')}
              className="hover:text-[#FBF8F3] transition-colors"
            >
              Widerruf
            </button>
            <span>·</span>
            <button
              onClick={() => navigateTo('legal-versand')}
              className="hover:text-[#FBF8F3] transition-colors"
            >
              Versand & Zahlung
            </button>
            <span>·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="text-[#B08D57] hover:underline"
            >
              Admin-Bereich
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
