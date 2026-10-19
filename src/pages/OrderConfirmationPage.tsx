import React from 'react';
import {
  CheckCircle2,
  PackageCheck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatEuro, formatGermanDate } from '../utils/formatters';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, orders, navigateTo } = useShop();

  const order = lastOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-[700px] mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-[32px] text-[#1C1917]">Keine Bestellung gefunden</h1>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-6 py-2.5 bg-[#1F2A24] text-[#FBF8F3] text-xs uppercase tracking-wider"
        >
          Zur Startseite
        </button>
      </div>
    );
  }

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Success Banner */}
      <div className="text-center space-y-4">
        <div className="w-14 h-14 bg-[#3F5B46]/10 text-[#3F5B46] border border-[#3F5B46]/30 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B08D57] font-medium block">
          Bestellung erfolgreich abgeschlossen
        </span>
        <h1 className="font-serif text-[36px] sm:text-[46px] text-[#1C1917] font-normal leading-tight">
          Vielen Dank für Ihr Vertrauen
        </h1>
        <p className="text-[15px] text-[#6B635A] max-w-lg mx-auto font-light leading-relaxed">
          Ihre Bestellung wurde in unserem Meisteratelier registriert. Wir beginnen in Kürze mit der
          handwerklichen Vorbereitung Ihres Unikats.
        </p>
      </div>

      {/* Order Identity Card */}
      <div className="bg-[#FBF8F3] border border-[#E3DAC9] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E3DAC9] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#6B635A]">
              Bestellnummer
            </span>
            <h3 className="font-serif text-[24px] text-[#1C1917]">{order.orderNumber}</h3>
          </div>
          <div className="flex items-center gap-4 text-[13px]">
            <span className="text-[#6B635A]">
              Datum: {formatGermanDate(order.date)}
            </span>
            <button
              onClick={handlePrintInvoice}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E3DAC9] hover:border-[#B08D57] text-[#1C1917] text-[12px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Rechnung drucken</span>
            </button>
          </div>
        </div>

        {/* Timeline Status */}
        <div className="py-4 border-b border-[#E3DAC9]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B08D57] block mb-4">
            Fertigungs- & Lieferstatus
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
            <div className="p-3 bg-[#F5F0E8] border-l-2 border-[#3F5B46]">
              <span className="font-medium text-[#1C1917] block">1. Auftrag bestätigt</span>
              <span className="text-[11px] text-[#6B635A]">Zahlung autorisiert ({order.paymentMethod})</span>
            </div>
            <div className="p-3 bg-[#F5F0E8] border-l-2 border-[#B08D57]">
              <span className="font-medium text-[#1C1917] block">2. In Meisterfertigung</span>
              <span className="text-[11px] text-[#6B635A]">Schmieden, Fassen & Gravur</span>
            </div>
            <div className="p-3 bg-[#F5F0E8] border-l-2 border-[#E3DAC9]">
              <span className="font-medium text-[#6B635A] block">3. Valorenversand</span>
              <span className="text-[11px] text-[#8C877D]">{order.trackingNumber || 'DHL Express'}</span>
            </div>
          </div>
        </div>

        {/* Address and Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Customer Address */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57] mb-2">
              Lieferadresse
            </h4>
            <div className="text-[13px] text-[#1C1917] leading-relaxed">
              <p className="font-medium">
                {order.customer.salutation} {order.customer.firstName} {order.customer.lastName}
              </p>
              {order.customer.company && <p>{order.customer.company}</p>}
              <p>
                {order.customer.street} {order.customer.streetNumber}
              </p>
              <p>
                {order.customer.zip} {order.customer.city}
              </p>
              <p>{order.customer.country}</p>
              <p className="pt-2 text-[12px] text-[#6B635A]">
                E-Mail: {order.customer.email}<br />
                Telefon: {order.customer.phone}
              </p>
            </div>
          </div>

          {/* Items List */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08D57] mb-2">
              Bestellte Ringe
            </h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[13px] border-b border-[#E3DAC9]/60 pb-2">
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover border border-[#E3DAC9] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[#1C1917] block truncate">
                      {item.productName}
                    </span>
                    <span className="text-[11px] text-[#6B635A] block">
                      {item.metal} · Gr. {item.size} mm
                    </span>
                    {item.engraving && (
                      <span className="text-[11px] text-[#B08D57] italic block truncate">
                        {item.engraving}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-[#1C1917] tabular-nums">
                    {formatEuro(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-4 space-y-1 text-[13px] text-[#6B635A]">
              <div className="flex justify-between">
                <span>Versicherter Wertversand:</span>
                <span className="text-[#3F5B46]">Kostenlos</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E3DAC9] font-medium text-[#1C1917] text-[16px]">
                <span>Gesamtbetrag bezahlt:</span>
                <span className="font-serif text-[20px] tabular-nums font-normal">
                  {formatEuro(order.total)}
                </span>
              </div>
              <p className="text-[10px] text-[#8C877D] text-right">
                inkl. 19 % MwSt. ({formatEuro(order.taxAmount)})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Next steps CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => navigateTo('home')}
          className="px-8 py-3.5 bg-[#1F2A24] hover:bg-[#B08D57] text-[#FBF8F3] text-[12px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
        >
          Zur Startseite zurückkehren
        </button>
        <button
          onClick={() => navigateTo('account')}
          className="px-8 py-3.5 border border-[#E3DAC9] bg-white text-[#1C1917] hover:border-[#B08D57] text-[12px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
        >
          Im Kundenkonto ansehen
        </button>
      </div>
    </div>
  );
};
