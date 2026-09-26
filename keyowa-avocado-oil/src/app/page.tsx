import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductCatalog from "@/components/ProductCatalog";
import ChefCollectionSection from "@/components/ChefCollectionSection";
import ProcessSection from "@/components/ProcessSection";
import SmokePointSection from "@/components/SmokePointSection";
import RecipeSection from "@/components/RecipeSection";
import CalloutBanner from "@/components/CalloutBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import B2BBanner from "@/components/B2BBanner";
import Newsletter from "@/components/Newsletter";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductQuickView from "@/components/ProductQuickView";
import Toast from "@/components/Toast";
import WelcomeVoucherModal from "@/components/WelcomeVoucherModal";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Navigation */}
      <Header />

      {/* 1. Hero / About Section */}
      <Hero />

      {/* Endless Marquee Ticker */}
      <Marquee />

      {/* 2. Product Catalog */}
      <ProductCatalog />

      {/* 3. 5-Star Chef Gourmet Oil Showcase */}
      <ChefCollectionSection />

      {/* 4. 3-Stage Cold Press Process ("Nghệ Thuật Nấu Nướng") */}
      <ProcessSection />

      {/* 5. Smoke Point 270°C Comparison & Doctor Endorsement */}
      <SmokePointSection />

      {/* 6. Michelin Chef Recipe Showcase */}
      <RecipeSection />

      {/* 270°C Callout Banner */}
      <CalloutBanner />

      {/* Social Proof & Testimonials */}
      <TestimonialsSection />

      {/* B2B / Restaurant Wholesale Banner */}
      <B2BBanner />

      {/* Newsletter 15% Voucher */}
      <Newsletter />

      {/* 4 Trust Badges */}
      <TrustBadges />

      {/* Brand Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ProductQuickView />
      <Toast />
      <WelcomeVoucherModal />
    </main>
  );
}
