import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ArticlesSection } from './components/ArticlesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { FaqSection } from './components/FaqSection';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ArticleModal } from './components/ArticleModal';
import { ApiDocsModal } from './components/ApiDocsModal';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { ProcedureArticle } from './types';

const MainApp: React.FC = () => {
  const {
    doctorProfile,
    services,
    articles,
    isDocsOpen,
    setIsDocsOpen,
    updateDoctorPhoto
  } = useSiteData();

  const [selectedArticle, setSelectedArticle] = useState<ProcedureArticle | null>(null);
  const [targetBookingService, setTargetBookingService] = useState<string>('ایمپلنت دیجیتال');

  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookService = (serviceTitle: string) => {
    setTargetBookingService(serviceTitle);
    scrollToAppointment();
  };

  const handleSelectServiceSlug = (slug: string) => {
    const matched = articles.find((art) => art.slug === slug);
    if (matched) {
      setSelectedArticle(matched);
    } else {
      scrollToAppointment();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden w-full max-w-[100vw]">
      {/* Navigation Bar */}
      <Header onOpenAppointment={scrollToAppointment} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenAppointment={scrollToAppointment}
          doctorPhoto={doctorProfile.doctorPhotoUrl}
          onUpdateDoctorPhoto={updateDoctorPhoto}
        />

        {/* Doctor Biography & Credentials */}
        <AboutDoctor
          onOpenAppointment={scrollToAppointment}
          doctorPhoto={doctorProfile.doctorPhotoUrl}
          onUpdateDoctorPhoto={updateDoctorPhoto}
        />

        {/* Specialized Procedures & Services */}
        <ServicesSection
          services={services}
          onSelectArticle={(article) => setSelectedArticle(article)}
          onBookService={handleBookService}
        />

        {/* Clinical Results & Interactive Comparison Gallery */}
        <BeforeAfterGallery />

        {/* Core Values / Why Choose Dr. Shahidi */}
        <WhyChooseUs onOpenAppointment={scrollToAppointment} />

        {/* Scientific Articles & Guides */}
        <ArticlesSection
          articles={articles}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Patient Satisfaction & Reviews */}
        <ReviewsSection />

        {/* Online Appointment Booking & Working Hours */}
        <AppointmentSection initialService={targetBookingService} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Map, Directions & Contact Information */}
        <LocationAndContact />
      </main>

      {/* Footer with API link */}
      <Footer
        onSelectServiceSlug={handleSelectServiceSlug}
        onOpenApiDocs={() => setIsDocsOpen(true)}
      />

      {/* Floating Speed Actions (WhatsApp, Instagram, Scroll-Top) */}
      <FloatingActions />

      {/* Medical Reading & Procedure Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onBookAppointment={() => {
          setSelectedArticle(null);
          scrollToAppointment();
        }}
      />

      {/* Interactive API Docs & Connection Guide Modal */}
      <ApiDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SiteDataProvider>
      <MainApp />
    </SiteDataProvider>
  );
};

export default App;
