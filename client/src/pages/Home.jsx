import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import Process from "../components/home/Process";
import Pricing from "../components/home/Pricing";
import HomeFAQ from "../components/home/HomeFAQ";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Pricing />
      <HomeFAQ />
    </>
  );
}

export default Home;