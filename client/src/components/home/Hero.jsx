import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import BackgroundEffects from "./BackgroundEffects";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundEffects />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <HeroContent />
          <HeroImage />
        </div>

        <HeroStats />
      </div>
    </section>
  );
}

export default Hero;
