import BannerHero from "../components/home/BannerHero";
import Features from "../components/home/Features";
import VehicleDesciption from "../components/home/VehicleDescription";

const Home = () => {
  return (
    <>
      <section className="xl:padding-l wide:padding-r padding-b border-b-2 border-b-slate-100/80">
        <BannerHero />
      </section>
      <section className="wide:padding-r">
        <Features />
      </section>

      <section className="wide:padding-r">
        <VehicleDesciption />
      </section>
    </>
  );
}

export default Home;
