import { useState } from "react";
import {
  modelYLarge1,
  modelYLarge2,
  modelYLarge3,
} from "../../assets/images/models";
import BannerThumbCard from "./BannerThumbCard";
import Button from "../core/Button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const statistics = [
  { value: "1k+", label: "Sold" },
  { value: "500+", label: "Charging Station" },
  { value: "250k+", label: "Happy Customers" },
];

const modelYImages = [
  {
    thumbnail: modelYLarge1,
    largeImage: modelYLarge1,
  },
  {
    thumbnail: modelYLarge2,
    largeImage: modelYLarge2,
  },
  {
    thumbnail: modelYLarge3,
    largeImage: modelYLarge3,
  },
];

const BannerHero = () => {
    const [heroImage, setHeroImage] = useState(modelYLarge1);
    return (
      <div
        id="home"
        className="w-full flex flex-col justify-center gap-10 min-h-screen max-container xl:flex-row"
      >
        <div className="relative flex flex-col justify-center items-start pt-18 w-full max-xl:padding-x xl:w-2/5">
          <p className="text-xl font-montserrat text-tesla-red">
            Find the Tesla for You
          </p>
          <h1 className="mt-10 font-palanquin text-5xl max-sm:text-[60px] max-sm:leading-[60px] font-bold max-2xl:text-[40px]">
            <span className="pr-10 xl:bg-white xl:whitespace-nowrap">
              Model Y Starting at $36,490
            </span>
            <br />
            <span className="text-tesla-red inline-block mt-3">2023</span>{" "}
            Edition
          </h1>
          <p className="font-montserrat text-slate-gray text-lg mt-6 mb-14">
            After Federal Tax Credit Discover which model is best for you based
            on your budget, driving habits and lifestyle.
          </p>
          <Button label="View" icon={<ArrowRightCircleIcon />} />

          <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
            {/* Statistics block */}
            {statistics.map((item) => (
              <div key={item.label}>
                <p className="text-4xl font-palanquin font-bold">
                  {item.value}
                </p>
                <p className="font-montserrat leading-7 text-slate-gray">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Image slider */}
        <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
          <img
            className="object-contain relative z-10"
            src={heroImage}
            alt="Tesla Y Model"
          />

          <div className="absolute -bottom-[5%] flex gap-4 sm:gap-6 sm:left-[10%] max-sm:px-6">
            {modelYImages.map((item, index) => (
              <div key={index}>
                <BannerThumbCard
                  imgURL={item}
                  changeImageHero={(model) => setHeroImage(model)}
                  defaultImage={heroImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
export default BannerHero
