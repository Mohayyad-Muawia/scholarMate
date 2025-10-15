import Nav from "../components/landing page/Nav";
import "../styles/LandingPage.css";
import Hero from "../components/landing page/Hero";
import Features from "../components/landing page/Features";
import TheStart from "../components/landing page/TheStart";
import HowItWorks from "../components/landing page/HowItWorks";
import Faq from "../components/landing page/Faq";
import CallToAction from "../components/landing page/CallToAction";
import Footer from "../components/landing page/Footer";
import BackToTopButton from "../components/landing page/BackToTop";
import { useEffect } from "react";
import useThemeStore from "../store/themeStore";

export default function LandingPage() {
  const { theme, toggleTheme } = useThemeStore();
  useEffect(() => {
    if (theme === "dark") {
      toggleTheme();
    }
  });

  return (
    <div className="landing-page">
      <Nav />
      <Hero />
      <TheStart />
      <Features />
      <HowItWorks />
      <Faq />
      <CallToAction />
      <Footer />
      <BackToTopButton />
    </div>
  );
}
