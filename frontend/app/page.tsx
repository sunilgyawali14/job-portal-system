import { Navbar } from "@/components/ui/Navbar";
import { CallToAction } from "@/components/ui/CallToAction";
import { FeatureJobs } from "@/components/ui/FeatureJobs";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/ui/Hero";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { PlatformStats } from "@/components/ui/PlatformStats";
import { Testimonials } from "@/components/ui/Testimonials";
import { TrustedCompanies } from "@/components/ui/TrustedCompanies";
import { WhyChooseUs } from "@/components/ui/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedCompanies />
        <PlatformStats />
        <FeatureJobs />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
