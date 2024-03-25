import { footerLogo } from "../assets/images";
import {
  facebook,
  instagram,
  twitter,
} from "../assets/icons";
import { useStateContext } from "../contexts/ContextProvider";

const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];

const footerLinks = [
  
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "customer@tesla.com", link: "mailto:customer@tesla.com" },
      { name: "+91 9001 001 001", link: "tel:+919001001001" },
    ],
  },
];

const Footer = () => {

const {vehicleModels} = useStateContext();
  return (
    <footer className="max-container">
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        <div className="flex flex-col items-start">
          <a href="/">
            <img src={footerLogo} alt="Tesla logo" width={120} height={40} />
          </a>
          <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            Experience Europe's best-selling car of 2023.{" "}
            <a className="hover:text-white underline decoration-white cursor-pointer">
              Schedule a Test Drive Now
            </a>
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon, index) => (
              <div
                className="flex justify-center items-center w-12 h-12 bg-white rounded-full hover:bg-coral-red"
                key={index}
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-between flex-wrap gap-20 lg:gap-10">
          {vehicleModels && (
            <div className="text-white font-montserrat">
              <h4 className="mb-6 text-2xl font-medium leading-normal">
                Vehicles
              </h4>
              <ul className="text-white-400">
                {vehicleModels.map((models) => (
                  <li className="mt-3 text-base leading-normal" key={models.id}>
                    <a
                      className="hover:text-tesla-red"
                      href={`/vehicles?slug=${models.attributes.slug}`}
                    >
                      {models.attributes.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {footerLinks.map((section) => (
            <div className="text-white font-montserrat" key={section.title}>
              <h4 className="mb-6 text-2xl font-medium leading-normal">
                {section.title}
              </h4>
              <ul className="text-white-400">
                {section.links.map((link) => (
                  <li className="mt-3 text-base leading-normal" key={link.name}>
                    <a className="hover:text-tesla-red" href={link.link}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 flex justify-between text-white-400 font-montserrat max-sm:flex-col max-sm:items-center">
        <div className="flex flex-1 justify-start items-center gap-2 font-montserrat">
          <p>Tesla © 2024</p>
        </div>
        <a className="hover:text-slate-gray" href="#!">
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
}

export default Footer
