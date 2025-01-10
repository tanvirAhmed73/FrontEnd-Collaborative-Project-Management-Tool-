import Footer from "../../Footer/Footer";
import CtaSection from "../CtaSection/CtaSection";
import FeactureSection from "../FeactureSection/FeactureSection";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";

const IntroPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar/>
      {/* Hero Section */}
            <HeroSection/>
      {/* Features Section */}
            <FeactureSection/>
      {/* CTA Section */}
            <CtaSection/>
      {/* Footer */}
            <Footer/>
        </div>
    );
};

export default IntroPage;