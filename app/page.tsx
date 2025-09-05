import HeroSection from '@/component/hero';
import Navbar from '@/component/navbar';
import HowItWorksSection from '@/component/how-it-work';
import Footer from '@/component/footer';
import PersonaCards from '@/component/cardPersona';
import SupportMyWorkSection from '@/component/supportMyWork';
import OurProductsSection from '@/component/otherProduct';


export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />
      <div className="pt-20"> {/* Add padding to offset fixed navbar */}
        <HeroSection />
        {/* Features Section */}
        <div id="HowItWorksSection">
          <HowItWorksSection />
        </div>
        {/* Personas Section */}
        <div id="personas">
          <PersonaCards />
        </div>
        <div id="support">
          <SupportMyWorkSection />
        </div>
        <OurProductsSection />
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
}
