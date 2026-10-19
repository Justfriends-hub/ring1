import React from 'react';
import {
  Award,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ATELIER_IMAGE, HERO_IMAGE } from '../data/mockData';

export const ManufakturPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="relative w-full py-24 sm:py-32 bg-[#FBF8F3] border-b border-[#E3DAC9]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
            Pforzheimer Goldschmiedetradition
          </span>
          <h1 className="font-serif text-[42px] sm:text-[60px] text-[#1C1917] font-normal leading-[1.1] max-w-3xl mx-auto">
            Hingabe an das Unvergängliche
          </h1>
          <p className="text-[16px] text-[#6B635A] max-w-2xl mx-auto font-light leading-relaxed">
            In einer Zeit schneller Konsumgüter setzen wir auf die Ruhe des klassischen
            Handwerks. Jeder AURELIA Ring wird in unserer Pforzheimer Werkstatt von Hand geformt,
            präzise gefasst und mit feinsten Polituren vollendet.
          </p>
        </div>
      </section>

      {/* Philosophy & Atelier Workshop */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#B08D57] font-medium block">
              Die Werkstatt
            </span>
            <h2 className="font-serif text-[34px] sm:text-[44px] text-[#1C1917] leading-tight">
              Meisterhandwerk statt Fließband
            </h2>
            <div className="space-y-4 text-[15px] text-[#6B635A] font-light leading-relaxed">
              <p>
                Seit Generationen gilt die Stadt Pforzheim im Nordschwarzwald als das weltberühmte
                Zentrum deutscher Schmuck- und Uhrmacherkunst. Hier bündelt AURELIA das Wissen
                erfahrener Goldschmiedemeister, Fasser und Polisseusen.
              </p>
              <p>
                Wir gießen unsere Ringe nahtlos ohne Lötstellen, um maximale Dichte und Stabilität
                zu garantieren. Nach dem Schmieden folgt das Einpassen der Edelsteine unter dem
                Mikroskop – mit Toleranzen im hundertstel Millimeterbereich.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('contact')}
                className="px-6 py-3.5 bg-[#1F2A24] text-[#FBF8F3] hover:bg-[#B08D57] text-[12px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
              >
                Persönlichen Beratungstermin buchen
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-[#E3DAC9] p-3 bg-white">
              <img
                src={ATELIER_IMAGE}
                alt="Werkbank Meistergoldschmied Pforzheim"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & Certified Materials */}
      <section className="bg-[#1F2A24] text-[#FBF8F3] py-20 border-y border-[#2D3C34]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-2">
              Verantwortung & Ethik
            </span>
            <h2 className="font-serif text-[34px] sm:text-[44px] text-[#FBF8F3] leading-tight">
              Reine Werte für die Ewigkeit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[14px] text-[#D8D2C6]">
            <div className="p-6 bg-[#26352D] border border-[#35483D] space-y-3">
              <Award className="w-6 h-6 text-[#B08D57]" />
              <h3 className="font-serif text-[22px] text-[#FBF8F3]">100 % Recyceltes Gold</h3>
              <p className="leading-relaxed font-light">
                Wir beziehen unser Feingold ausschließlich aus zertifizierten deutschen
                Scheideanstalten, die Altgold umweltschonend nach RJC-Standard wiederaufbereiten.
              </p>
            </div>

            <div className="p-6 bg-[#26352D] border border-[#35483D] space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#B08D57]" />
              <h3 className="font-serif text-[22px] text-[#FBF8F3]">Konfliktfreie Diamanten</h3>
              <p className="leading-relaxed font-light">
                Jeder Brillant stammt aus völkerrechtlich überwachten Quellen gemäß dem
                Kimberley-Abkommen. Ab 0,30 Karat erhalten Sie ein Zertifikat von GIA oder IGI.
              </p>
            </div>

            <div className="p-6 bg-[#26352D] border border-[#35483D] space-y-3">
              <Clock className="w-6 h-6 text-[#B08D57]" />
              <h3 className="font-serif text-[22px] text-[#FBF8F3]">Lebenslange Garantie</h3>
              <p className="leading-relaxed font-light">
                Auf Material und meisterhafte Fassung gewähren wir eine lebenslange Garantie.
                Jährliche Inspektionen und Reinigungen in unserem Atelier sind kostenfrei.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showrooms: München & Hamburg */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block mb-2">
            Vor Ort erleben
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] text-[#1C1917]">
            Unsere Showrooms
          </h2>
          <p className="text-[14px] text-[#6B635A] mt-2">
            Probieren Sie unsere Ringe in privater Atmosphäre an oder lassen Sie sich virtuell beraten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* München */}
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-8 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#B08D57] font-semibold">
              Showroom München
            </span>
            <h3 className="font-serif text-[26px] text-[#1C1917]">Maximilianstraße 28</h3>
            <p className="text-[13px] text-[#6B635A] leading-relaxed">
              In ruhigem Hofgarten-Ambiente präsentieren wir Ihnen unsere gesamte Kollektion sowie
              individuelle Rohsteine zur Auswahl.
            </p>
            <div className="text-[12px] text-[#1C1917] space-y-1 pt-2 border-t border-[#E3DAC9]">
              <p>Dienstag bis Samstag: 10:00 – 19:00 Uhr</p>
              <p>Terminvereinbarung empfohlen</p>
            </div>
            <button
              onClick={() => navigateTo('contact')}
              className="mt-2 text-[12px] uppercase tracking-wider font-medium text-[#B08D57] hover:underline"
            >
              Termin in München anfragen →
            </button>
          </div>

          {/* Hamburg */}
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-8 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#B08D57] font-semibold">
              Showroom Hamburg
            </span>
            <h3 className="font-serif text-[26px] text-[#1C1917]">Neuer Wall 41</h3>
            <p className="text-[13px] text-[#6B635A] leading-relaxed">
              Direkt am Alsterfleet empfangen wir Sie zu einer diskreten Beratung rund um
              Verlobungsringe, Trauringpaare und persönliche Gravuren.
            </p>
            <div className="text-[12px] text-[#1C1917] space-y-1 pt-2 border-t border-[#E3DAC9]">
              <p>Montag bis Freitag: 10:00 – 18:30 Uhr</p>
              <p>Samstag: nach Vereinbarung</p>
            </div>
            <button
              onClick={() => navigateTo('contact')}
              className="mt-2 text-[12px] uppercase tracking-wider font-medium text-[#B08D57] hover:underline"
            >
              Termin in Hamburg anfragen →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
