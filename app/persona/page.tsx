import PersonaCards from "@/component/cardPersona";
import Footer from '@/component/footer';


export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <PersonaCards />
      <br />
      <br />
      <Footer />
    </div>
  );
}