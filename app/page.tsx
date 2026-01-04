import HeroSection from "@/component/hero";
import Navbar from "@/component/navbar";
import HowItWorksSection from "@/component/how-it-work";
import Footer from "@/component/footer";
import PersonaCards from "@/component/cardPersona";
import SupportMyWorkSection from "@/component/supportMyWork";
import OurProductsSection from "@/component/otherProduct";
import FeaturedPersonas from "@/component/FeaturedPersonas";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <Navbar />
      <div className="pt-20">
        {" "}
        {/* Add padding to offset fixed navbar */}
        <HeroSection />
        {/* Features Section */}
        <div id="HowItWorksSection">
          <HowItWorksSection />
        </div>
        {/* Personas Section */}
        <div id="personas">
         <FeaturedPersonas />
        </div>
        <div id="support">
          <SupportMyWorkSection />
        </div>
        {/* <OurProductsSection /> */}
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
}
