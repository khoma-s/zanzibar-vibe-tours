import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { ToursListPage, TourDetailPage } from './pages/ToursPage';
import HotelsPage from './pages/HotelsPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/it/" replace />} />

          {/* Italian routes */}
          <Route path="/it/" element={<Layout><HomePage /></Layout>} />
          <Route path="/it/tour" element={<Layout><ToursListPage /></Layout>} />
          <Route path="/it/tour/:tour_id" element={<Layout><TourDetailPage /></Layout>} />
          <Route path="/it/hotel" element={<Layout><HotelsPage /></Layout>} />
          <Route path="/it/galleria" element={<Layout><GalleryPage /></Layout>} />
          <Route path="/it/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/it/chi-siamo" element={<Layout><AboutPage /></Layout>} />
          <Route path="/it/404" element={<Layout><NotFoundPage /></Layout>} />

          {/* Polish routes */}
          <Route path="/pl/" element={<Layout><HomePage /></Layout>} />
          <Route path="/pl/wycieczka" element={<Layout><ToursListPage /></Layout>} />
          <Route path="/pl/wycieczka/:tour_id" element={<Layout><TourDetailPage /></Layout>} />
          <Route path="/pl/hotel" element={<Layout><HotelsPage /></Layout>} />
          <Route path="/pl/galeria" element={<Layout><GalleryPage /></Layout>} />
          <Route path="/pl/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/pl/o-nas" element={<Layout><AboutPage /></Layout>} />
          <Route path="/pl/404" element={<Layout><NotFoundPage /></Layout>} />

          {/* Catch all */}
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
