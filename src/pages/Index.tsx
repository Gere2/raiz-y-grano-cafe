
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedMenu from "@/components/FeaturedMenu";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Raíz y Grano - Café de Especialidad";
  }, []);

  return (
    <Layout>
      <Hero />
      <AboutSection />
      <FeaturedMenu />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
