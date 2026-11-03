import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ProjectsSection from '../components/home/ProjectsSection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';

export const metadata = {
  title: 'Iconic Design — Luxury Interior Design Studio, Gurgaon',
  description:
    "India's premier luxury interior design studio. 25+ years crafting iconic spaces across Delhi NCR. Call +91 98116 85628.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Full-viewport image carousel hero */}
        <HeroSection />

        {/* About founder + company — bento grid layout */}
        <AboutSection />

        {/* Featured projects grid with filters + before/after sliders */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Services offered */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* Our process — video showreel section */}
        <ProcessSection />

        {/* Client testimonials — hero quote + grid */}
        <TestimonialsSection />

        {/* CTA + contact modal — split layout */}
        <section id="contact">
          <CtaSection />
        </section>
      </main>

      <Footer />
    </>
  );
}
