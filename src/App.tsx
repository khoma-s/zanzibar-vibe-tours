import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import SEO from './components/SEO';
import TestMode from './components/TestMode';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { ToursListPage, TourDetailPage } from './pages/ToursPage';
import HotelsPage from './pages/HotelsPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';

function Layout({ children, seoTitle, seoDesc }: { children: React.ReactNode; seoTitle?: string; seoDesc?: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <SEO title={seoTitle} description={seoDesc} />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
      <TestMode />
    </div>
  );
}

function AppContent() {
  // Remove initial loader
  useEffect(() => {
    const loader = document.getElementById('initialLoader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 300);
    }
  }, []);

  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/it/" replace />} />

      {/* Italian routes */}
      <Route path="/it/" element={<Layout><HomePage /></Layout>} />
      <Route path="/it/tour" element={<Layout seoTitle="Tour"><ToursListPage /></Layout>} />
      <Route path="/it/tour/:tour_id" element={<Layout seoTitle="Dettaglio Tour"><TourDetailPage /></Layout>} />
      <Route path="/it/hotel" element={<Layout seoTitle="Hotel"><HotelsPage /></Layout>} />
      <Route path="/it/galleria" element={<Layout seoTitle="Galleria"><GalleryPage /></Layout>} />
      <Route path="/it/blog" element={<Layout seoTitle="Blog"><BlogPage /></Layout>} />
      <Route path="/it/chi-siamo" element={<Layout seoTitle="Chi siamo"><AboutPage /></Layout>} />
      <Route path="/it/404" element={<Layout><NotFoundPage /></Layout>} />

      {/* Polish routes */}
      <Route path="/pl/" element={<Layout><HomePage /></Layout>} />
      <Route path="/pl/wycieczka" element={<Layout seoTitle="Wycieczka"><ToursListPage /></Layout>} />
      <Route path="/pl/wycieczka/:tour_id" element={<Layout seoTitle="Szczegóły wycieczki"><TourDetailPage /></Layout>} />
      <Route path="/pl/hotel" element={<Layout seoTitle="Hotel"><HotelsPage /></Layout>} />
      <Route path="/pl/galeria" element={<Layout seoTitle="Galeria"><GalleryPage /></Layout>} />
      <Route path="/pl/blog" element={<Layout seoTitle="Blog"><BlogPage /></Layout>} />
      <Route path="/pl/o-nas" element={<Layout seoTitle="O nas"><AboutPage /></Layout>} />
      <Route path="/pl/404" element={<Layout><NotFoundPage /></Layout>} />

      {/* Catch all */}
      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LangProvider>
  );
}
