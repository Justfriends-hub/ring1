import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { bookAppointment, showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<'Showroom München' | 'Showroom Hamburg' | 'Virtuelle Videoberatung'>('Showroom München');
  const [date, setDate] = useState('2026-10-24');
  const [time, setTime] = useState('14:00');
  const [topic, setTopic] = useState<'Verlobungsringe' | 'Eheringe' | 'Individuelle Anfertigung' | 'Ringgrößen-Bestimmung'>('Verlobungsringe');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
      return;
    }

    bookAppointment({
      name,
      email,
      phone,
      location,
      date,
      time,
      topic,
      notes: notes || undefined,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
          Persönliche Betreuung
        </span>
        <h1 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-tight">
          Beratungstermin vereinbaren
        </h1>
        <p className="text-[15px] text-[#6B635A] font-light leading-relaxed">
          Nehmen Sie sich Zeit für Ihre Ringauswahl. Wir empfangen Sie in diskretem Rahmen in
          unseren Showrooms oder beraten Sie per hochauflösender Videoübertragung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Booking Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-10">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <div className="w-12 h-12 bg-[#3F5B46]/10 text-[#3F5B46] border border-[#3F5B46]/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="font-serif text-[28px] text-[#1C1917]">
                Terminanfrage bestätigt
              </h3>
              <p className="text-[14px] text-[#6B635A] max-w-md mx-auto leading-relaxed">
                Vielen Dank, {name}. Wir haben Ihren Termin für den {date} um {time} Uhr für das Thema „{topic}“ in {location} vorgemerkt. Sie erhalten umgehend eine Bestätigung an {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 border border-[#E3DAC9] text-[12px] uppercase tracking-wider text-[#1C1917] hover:border-[#B08D57]"
              >
                Weiteren Termin anfragen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-serif text-[22px] text-[#1C1917] mb-1">
                  1. Ort & Beratungsthema
                </h3>
                <p className="text-[12px] text-[#6B635A]">
                  Wählen Sie die gewünschte Beratungsform
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Showroom München',
                  'Showroom Hamburg',
                  'Virtuelle Videoberatung',
                ].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocation(loc as any)}
                    className={`p-3 text-left border text-[12px] transition-all cursor-pointer ${
                      location === loc
                        ? 'border-[#B08D57] bg-[#F5F0E8] text-[#1C1917] font-medium ring-1 ring-[#B08D57]'
                        : 'border-[#E3DAC9] bg-white text-[#6B635A] hover:border-[#B08D57]'
                    }`}
                  >
                    <span>{loc}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                  Thema des Termins
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as any)}
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2.5 text-[13px] text-[#1C1917] focus:outline-none cursor-pointer"
                >
                  <option value="Verlobungsringe">Verlobungsringe & Solitäre</option>
                  <option value="Eheringe">Trauringe als Paar (Eheringe)</option>
                  <option value="Individuelle Anfertigung">Individuelle Sonderanfertigung</option>
                  <option value="Ringgrößen-Bestimmung">Ringgrößen-Bestimmung vor Ort</option>
                </select>
              </div>

              <div className="pt-2 border-t border-[#E3DAC9]">
                <h3 className="font-serif text-[22px] text-[#1C1917] mb-1">
                  2. Datum & Uhrzeit
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                    Wunschdatum *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min="2026-10-19"
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                    Uhrzeit *
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none cursor-pointer"
                  >
                    <option value="10:30">10:30 Uhr</option>
                    <option value="11:45">11:45 Uhr</option>
                    <option value="14:00">14:00 Uhr</option>
                    <option value="15:30">15:30 Uhr</option>
                    <option value="17:00">17:00 Uhr</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E3DAC9]">
                <h3 className="font-serif text-[22px] text-[#1C1917] mb-1">
                  3. Ihre Kontaktdaten
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                    Ihr vollständiger Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vor- und Nachname"
                    className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 171 0000000"
                    className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@beispiel.de"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B635A] block mb-1">
                  Besondere Wünsche oder Vorkenntnisse (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="z. B. Budgetvorstellungen, Wunsch-Edelmetall oder Erbstücke, die eingearbeitet werden sollen"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1F2A24] hover:bg-[#B08D57] text-[#FBF8F3] text-[13px] font-medium tracking-[0.16em] uppercase transition-colors cursor-pointer"
              >
                Verbindliche Terminanfrage absenden
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#B08D57] font-semibold">
              Direkter Draht zum Meister
            </span>
            <h3 className="font-serif text-[26px] text-[#1C1917] mt-1">
              Atelier Pforzheim
            </h3>
            <p className="text-[13px] text-[#6B635A] mt-1 leading-relaxed">
              Für telefonische Fachauskünfte steht Ihnen unser Goldschmiedeteam persönlich zur
              Verfügung.
            </p>
          </div>

          <div className="space-y-4 text-[13px] text-[#1C1917] border-t border-[#E3DAC9] pt-4">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium block">Telefonischer Kundenservice:</span>
                <a href="tel:+497231892010" className="text-[#6B635A] hover:text-[#B08D57]">
                  +49 (0) 7231 892010
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium block">E-Mail für Anfragen:</span>
                <a
                  href="mailto:beratung@aurelia-ringe.de"
                  className="text-[#6B635A] hover:text-[#B08D57]"
                >
                  beratung@aurelia-ringe.de
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium block">Erreichbarkeit:</span>
                <p className="text-[#6B635A]">
                  Montag bis Freitag: 10:00 – 18:00 Uhr<br />
                  Samstag: 10:00 – 14:00 Uhr (nach Voranmeldung)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium block">Post- & Manufakturanschrift:</span>
                <p className="text-[#6B635A]">
                  AURELIA Ringmanufaktur GmbH<br />
                  Goldschmiedegasse 12<br />
                  75172 Pforzheim · Deutschland
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F5F0E8] border border-[#E3DAC9] text-[12px] text-[#6B635A] space-y-1">
            <p className="font-medium text-[#1C1917]">Diskrete Betreuung garantiert</p>
            <p>
              Sollte es sich um eine geheime Überraschung für einen Heiratsantrag handeln,
              kontaktieren wir Sie ausschließlich über Ihren bevorzugten Kommunikationsweg.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
