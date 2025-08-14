import HeroSection from '@/component/hero';
import HowItWorksSection from '@/component/how-it-work';
import Footer from '@/component/footer';
import PersonaCards from '@/component/cardPersona';
import SupportMyWorkSection from '@/component/supportMyWork';


export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
      <br />
      <br />
      <Footer />
    </div>
  );
}
