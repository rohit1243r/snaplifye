import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import BackgroundEffects from "./BackgroundEffects";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <BackgroundEffects />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <HeroContent />
          <HeroImage />
        </div>

        <HeroStats />
      </div>
    </section>
  );
}

export default Hero;