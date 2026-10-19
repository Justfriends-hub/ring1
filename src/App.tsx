/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CookieBanner } from './components/CookieBanner';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ConfiguratorPage } from './pages/ConfiguratorPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { ManufakturPage } from './pages/ManufakturPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPages';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  const isAdminView = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#1C1917] font-sans selection:bg-[#B08D57]/20 selection:text-[#1C1917]">
      {/* Customer Header - only shown on storefront views */}
      {!isAdminView && <Header />}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'verlobungsringe' && (
          <ShopPage
            initialCategory="verlobungsringe"
            categoryTitle="Verlobungsringe & Solitäre"
            categorySubtitle="Brillanten in zeitlosen Vier- und Sechskrappenfassungen, gefasst in 950 Platin und feinstem Gold."
          />
        )}
        {currentPage === 'eheringe' && (
          <ShopPage
            initialCategory="eheringe"
            categoryTitle="Trauringe & Eheringe"
            categorySubtitle="Ergonomisch innenbombiert für reinsten täglichen Tragekomfort in 750 Gelbgold, Weißgold und 950 Platin."
          />
        )}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'configurator' && <ConfiguratorPage />}
        {currentPage === 'size-guide' && <SizeGuidePage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'order-confirmation' && <OrderConfirmationPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'manufaktur' && <ManufakturPage />}
        {currentPage === 'journal' && <JournalPage />}
        {currentPage === 'journal-article' && <JournalPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'legal-impressum' && <LegalPage type="impressum" />}
        {currentPage === 'legal-datenschutz' && <LegalPage type="datenschutz" />}
        {currentPage === 'legal-agb' && <LegalPage type="agb" />}
        {currentPage === 'legal-widerruf' && <LegalPage type="widerruf" />}
        {currentPage === 'legal-versand' && <LegalPage type="versand" />}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      {/* Customer Footer - only shown on storefront views */}
      {!isAdminView && <Footer />}

      {/* Overlays */}
      <CartDrawer />
      <CookieBanner />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
