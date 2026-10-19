import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  Check,
  Truck,
  AlertCircle,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useShop, TELEGRAM_ORDER_URL } from '../context/ShopContext';
import { PaymentMethod, CustomerAddress } from '../types';
import { formatEuro } from '../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotals, createOrder, navigateTo, showToast } = useShop();

  // Step 1: Address & Contact
  const [salutation, setSalutation] = useState<'Frau' | 'Herr' | 'Divers'>('Frau');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState<'Deutschland' | 'Österreich' | 'Schweiz'>('Deutschland');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2: Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'valoren' | 'express'>('valoren');

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Kreditkarte');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [sepaIban, setSepaIban] = useState('');

  // Legal consent checkbox
  const [agbAccepted, setAgbAccepted] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-[32px] text-[#1C1917]">Keine Artikel im Warenkorb</h1>
        <p className="text-[14px] text-[#6B635A]">
          Bitte wählen Sie zuerst einen Ring aus, bevor Sie die Kasse aufrufen.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#1F2A24] text-[#FBF8F3] text-[12px] uppercase tracking-wider hover:bg-[#B08D57]"
        >
          Zum Shop
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);

    // Validation
    if (!firstName.trim() || !lastName.trim() || !street.trim() || !streetNumber.trim() || !zip.trim() || !city.trim() || !email.trim()) {
      setErrorNotice('Bitte füllen Sie alle erforderlichen Adressfelder aus.');
      return;
    }

    if (!agbAccepted) {
      setErrorNotice('Bitte bestätigen Sie die Allgemeinen Geschäftsbedingungen und die Widerrufsbelehrung.');
      return;
    }

    const customer: CustomerAddress = {
      salutation,
      firstName,
      lastName,
      company: company || undefined,
      street,
      streetNumber,
      zip,
      city,
      country,
      email,
      phone,
    };

    const newOrder = createOrder({
      customer,
      items: cart,
      subtotal: cartTotals.subtotal,
      shippingCost: cartTotals.shipping,
      discount: cartTotals.discount,
      taxAmount: cartTotals.tax,
      total: cartTotals.total,
      paymentMethod,
      paymentStatus: 'Bezahlt',
      status: 'Offen',
      trackingNumber: `VAL-DE-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: 'DHL Express Valoren',
      internalNotes: 'Online-Bestellung eingegangen.',
    });

    navigateTo('order-confirmation');
  };

  const handleTelegramCheckout = () => {
    const customerInfo = [
      firstName || lastName ? `Kunde: ${salutation} ${firstName} ${lastName}`.trim() : '',
      street ? `Adresse: ${street} ${streetNumber}, ${zip} ${city}, ${country}` : '',
      email ? `E-Mail: ${email}` : '',
      phone ? `Telefon: ${phone}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const summary = `AURELIA Kassen-Bestellung via Telegram:
${customerInfo ? `${customerInfo}\n` : ''}
Bestellte Ringe:
${cart
  .map(
    (i) =>
      `- ${i.productName} | ${i.metal} | Größe ${i.size} mm | ${formatEuro(
        i.unitPrice
      )} x ${i.quantity}${i.engraving ? ` | Gravur: ${i.engraving}` : ''}`
  )
  .join('\n')}

Gesamtsumme: ${formatEuro(cartTotals.total)}
Gewünschte Zahlart: ${paymentMethod}
Status: Bitte erfassen Sie meine Bestellung und Kontaktdaten.`;

    try {
      if (navigator.clipboard) navigator.clipboard.writeText(summary);
    } catch {}

    showToast(
      'Bestell- & Adressdaten für Meister @dexco36 kopiert! Telegram (t.me/dexco36) wird geöffnet...',
      'info'
    );
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-10 pb-4 border-b border-[#E3DAC9]">
        <div className="flex items-center gap-2 text-[#3F5B46] text-[12px] font-medium uppercase tracking-[0.14em] mb-1">
          <Lock className="w-3.5 h-3.5" />
          <span>SSL 256-Bit Verschlüsselte Manufaktur-Kasse</span>
        </div>
        <h1 className="font-serif text-[34px] sm:text-[42px] text-[#1C1917] font-normal leading-tight">
          Sicher bestellen
        </h1>
        <p className="text-[13px] text-[#6B635A]">
          Schritt 1: Lieferadresse · Schritt 2: Wertversand · Schritt 3: Zahlung
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Fields (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {errorNotice && (
            <div className="p-4 bg-[#8E3B2F]/10 border border-[#8E3B2F]/40 text-[#8E3B2F] text-[13px] flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* SECTION 1: LIEFERADRESSE */}
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3DAC9]">
              <h2 className="font-serif text-[22px] text-[#1C1917]">
                1. Kontaktdaten & Lieferadresse
              </h2>
              <span className="text-[11px] text-[#8C877D]">* Pflichtfelder</span>
            </div>

            {/* Salutation */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1.5">
                Anrede
              </label>
              <div className="flex gap-4">
                {(['Frau', 'Herr', 'Divers'] as const).map((sal) => (
                  <label key={sal} className="inline-flex items-center gap-2 text-[13px] text-[#1C1917] cursor-pointer">
                    <input
                      type="radio"
                      name="salutation"
                      checked={salutation === sal}
                      onChange={() => setSalutation(sal)}
                      className="accent-[#B08D57]"
                    />
                    <span>{sal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Vorname *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Maximilian"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Nachname *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Mustermann"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                Firma (Optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Straße *
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Königsallee"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Hausnr. *
                </label>
                <input
                  type="text"
                  required
                  value={streetNumber}
                  onChange={(e) => setStreetNumber(e.target.value)}
                  placeholder="12a"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Postleitzahl *
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="80331"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Ort / Stadt *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="München"
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Land *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as any)}
                  className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none cursor-pointer"
                >
                  <option value="Deutschland">Deutschland</option>
                  <option value="Österreich">Österreich</option>
                  <option value="Schweiz">Schweiz</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                  Telefonnummer (für Valorenkurier-Avis) *
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
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B635A] block mb-1">
                E-Mail-Adresse (für Bestellbestätigung & Sendungsverfolgung) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre.adresse@beispiel.de"
                className="w-full bg-white border border-[#E3DAC9] px-3.5 py-2 text-[13px] text-[#1C1917] focus:outline-none"
              />
            </div>
          </div>

          {/* SECTION 2: VERSANDART */}
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-[22px] text-[#1C1917] pb-3 border-b border-[#E3DAC9]">
              2. Versand & Übergabe
            </h2>

            <div className="p-4 bg-white border border-[#B08D57] flex items-start gap-4">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === 'valoren'}
                onChange={() => setShippingMethod('valoren')}
                className="accent-[#B08D57] mt-1"
              />
              <div className="flex-1 text-[13px]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-[#1C1917]">
                    DHL Express Valorenversand (Voll versichert)
                  </span>
                  <span className="text-[#3F5B46] font-semibold">
                    {cartTotals.shipping === 0 ? 'Kostenlos' : formatEuro(cartTotals.shipping)}
                  </span>
                </div>
                <p className="text-[#6B635A] leading-relaxed">
                  Persönliche Übergabe nur an den bevollmächtigten Empfänger mit amtlicher
                  Legitimationsprüfung. Diskrete neutrale Umverpackung ohne Außenlogo.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: ZAHLUNG */}
          <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-[22px] text-[#1C1917] pb-3 border-b border-[#E3DAC9]">
              3. Zahlungsart wählen
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 'Kreditkarte',
                  label: 'Kreditkarte (Visa, Mastercard, American Express)',
                  desc: 'Sichere 3D-Secure Authentifizierung',
                },
                {
                  id: 'PayPal',
                  label: 'PayPal',
                  desc: 'Schnell und geschützt mit PayPal Käuferschutz',
                },
                {
                  id: 'Klarna',
                  label: 'Klarna Rechnung / Sofortüberweisung',
                  desc: 'Bequem nach Erhalt oder per Direktbanking',
                },
                {
                  id: 'SEPA-Lastschrift',
                  label: 'SEPA-Lastschrift',
                  desc: 'Direkte Abbuchung von Ihrem Bankkonto',
                },
                {
                  id: 'Apple Pay',
                  label: 'Apple Pay',
                  desc: 'Schnelle Freigabe per Touch ID oder Face ID',
                },
                {
                  id: 'Vorkasse / Rechnung',
                  label: 'Vorkasse / Manufaktur-Banküberweisung',
                  desc: 'Überweisung vor Anfertigungsbeginn mit 2 % Skonto',
                },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`p-4 border transition-all cursor-pointer ${
                    paymentMethod === method.id
                      ? 'border-[#B08D57] bg-[#F5F0E8] ring-1 ring-[#B08D57]'
                      : 'border-[#E3DAC9] bg-white hover:border-[#B08D57]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                      className="accent-[#B08D57]"
                    />
                    <div>
                      <span className="font-medium text-[#1C1917] text-[13px]">
                        {method.label}
                      </span>
                      <p className="text-[12px] text-[#6B635A]">{method.desc}</p>
                    </div>
                  </div>

                  {/* Inline CC fields if CreditCard selected */}
                  {paymentMethod === 'Kreditkarte' && method.id === 'Kreditkarte' && (
                    <div className="mt-4 pt-3 border-t border-[#E3DAC9]/60 grid grid-cols-3 gap-3 animate-fadeIn">
                      <div className="col-span-3">
                        <label className="text-[10px] uppercase tracking-wider text-[#6B635A] block mb-1">
                          Kartennummer
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="•••• •••• •••• ••••"
                          className="w-full bg-white border border-[#E3DAC9] px-3 py-1.5 text-[12px] focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] uppercase tracking-wider text-[#6B635A] block mb-1">
                          Gültig bis (MM/JJ)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-white border border-[#E3DAC9] px-3 py-1.5 text-[12px] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#6B635A] block mb-1">
                          Prüfziffer (CVC)
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          className="w-full bg-white border border-[#E3DAC9] px-3 py-1.5 text-[12px] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Inline SEPA fields if SEPA selected */}
                  {paymentMethod === 'SEPA-Lastschrift' && method.id === 'SEPA-Lastschrift' && (
                    <div className="mt-4 pt-3 border-t border-[#E3DAC9]/60 animate-fadeIn">
                      <label className="text-[10px] uppercase tracking-wider text-[#6B635A] block mb-1">
                        IBAN
                      </label>
                      <input
                        type="text"
                        value={sepaIban}
                        onChange={(e) => setSepaIban(e.target.value)}
                        placeholder="DE00 0000 0000 0000 0000 00"
                        className="w-full bg-white border border-[#E3DAC9] px-3 py-1.5 text-[12px] focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Strict Button (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-[22px] text-[#1C1917] pb-3 border-b border-[#E3DAC9]">
            Ihre Bestellung ({cartTotals.itemsCount} Ringe)
          </h2>

          {/* Itemized Mini List */}
          <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 text-[13px] border-b border-[#E3DAC9]/60 pb-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-16 object-cover border border-[#E3DAC9] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-[16px] text-[#1C1917] truncate">
                    {item.productName}
                  </h4>
                  <p className="text-[11px] text-[#6B635A]">
                    {item.metal} · Gr. {item.size} mm
                  </p>
                  {item.engraving && (
                    <p className="text-[11px] text-[#B08D57] italic truncate">
                      Gravur: {item.engraving}
                    </p>
                  )}
                  <p className="text-[12px] font-medium text-[#1C1917] tabular-nums mt-1">
                    {item.quantity} × {formatEuro(item.unitPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Math */}
          <div className="space-y-2 text-[13px] text-[#6B635A] pt-2 border-t border-[#E3DAC9]">
            <div className="flex justify-between">
              <span>Zwischensumme</span>
              <span className="tabular-nums text-[#1C1917]">{formatEuro(cartTotals.subtotal)}</span>
            </div>

            {cartTotals.discount > 0 && (
              <div className="flex justify-between text-[#3F5B46]">
                <span>Rabatt</span>
                <span className="tabular-nums">-{formatEuro(cartTotals.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Versicherter Wertversand</span>
              <span className="tabular-nums text-[#3F5B46]">
                {cartTotals.shipping === 0 ? 'Kostenlos' : formatEuro(cartTotals.shipping)}
              </span>
            </div>

            <div className="flex justify-between pt-3 border-t border-[#E3DAC9] text-[18px] font-medium text-[#1C1917]">
              <span>Gesamtsumme</span>
              <span className="font-serif text-[24px] tabular-nums font-normal">
                {formatEuro(cartTotals.total)}
              </span>
            </div>
            <p className="text-[11px] text-[#8C877D] text-right">
              inkl. 19 % MwSt. ({formatEuro(cartTotals.tax)})
            </p>
          </div>

          {/* German Legal AGB & Widerruf Checkbox */}
          <div className="pt-2 border-t border-[#E3DAC9] space-y-3">
            <label className="flex items-start gap-2.5 text-[12px] text-[#6B635A] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agbAccepted}
                onChange={(e) => setAgbAccepted(e.target.checked)}
                className="mt-0.5 accent-[#B08D57]"
              />
              <span className="leading-relaxed">
                Ich habe die{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('legal-agb')}
                  className="underline hover:text-[#1C1917]"
                >
                  Allgemeinen Geschäftsbedingungen (AGB)
                </button>{' '}
                sowie die{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('legal-widerruf')}
                  className="underline hover:text-[#1C1917]"
                >
                  Widerrufsbelehrung
                </button>{' '}
                zur Kenntnis genommen und erkläre mich mit deren Geltung einverstanden.
              </span>
            </label>
          </div>

          {/* Legal Checkout Button Label STRICT */}
          <button
            type="submit"
            className="w-full py-4 bg-[#1F2A24] hover:bg-[#B08D57] text-[#FBF8F3] text-[13px] font-medium tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
            <span>Zahlungspflichtig bestellen</span>
          </button>

          <p className="text-[11px] text-[#8C877D] text-center">
            Mit Klick auf diesen Button schließen Sie einen verbindlichen Kaufvertrag ab.
          </p>

          {/* Direct Telegram Order alternative */}
          <div className="p-4 bg-[#F5F0E8] border border-[#B08D57]/60 space-y-2.5 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57] flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Lieber persönlich via Telegram bestellen?
              </span>
              <span className="text-[10px] text-[#3F5B46] font-medium bg-[#3F5B46]/10 px-2 py-0.5">
                Meister @dexco36
              </span>
            </div>
            <p className="text-[11px] text-[#6B635A] leading-relaxed">
              Möchten Sie Ihre Adress- und Ringangaben direkt unserem Werkstattleiter übermitteln?
              Wir erfassen alle Details persönlich und bestätigen die Fertigung im Chat.
            </p>
            <a
              href={TELEGRAM_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleTelegramCheckout}
              className="w-full py-3 px-3 bg-[#B08D57] hover:bg-[#977644] text-[#1F2A24] hover:text-white text-[12px] font-medium tracking-[0.12em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer text-center shadow-xs"
            >
              <Send className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Bestellung an Meister senden (t.me/dexco36)</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
