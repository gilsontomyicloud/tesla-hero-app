import GallerySlider from "./GallerySlider";
const defaultImage = "../../../public/2.jpg";
const DetailsGallery = ({ vehicleData }) => {
  const vehicleColor = vehicleData.color_code;
  return (
    <div
      id="home"
      className="w-full flex flex-col justify-center gap-32 max-container xl:flex-row"
    >
      <div className="relative flex flex-col justify-center items-start pt-18 w-full max-xl:padding-x xl:w-4/5">
        <p className="text-xl font-montserrat text-white rounded-sm border-2 p-2 bg-tesla-red">
          {vehicleData.vehicle_name}
        </p>
        <h1 className="mt-1 font-palanquin text-5xl max-sm:text-[60px] max-sm:leading-[60px] font-bold max-2xl:text-[30px]">
          <span className="pr-5 text-black xl:whitespace-nowrap">
            {vehicleData.name}
          </span>
        </h1>
        <p className="font-montserrat text-slate-gray text-lg mt-6 mb-5">
          {vehicleData.description}
        </p>

        <span className="font-medium font-montserrat text-slate-gray text-lg mt-6 mb-2">
          Color:
        </span>
        <span
          style={{
            background: `${vehicleColor}`,
            "border-radius": "50%",
            width: "60px",
            height: "60px",
          }}
        ></span>
      </div>
      {/* Image slider */}
      <GallerySlider autoSlide={false}>
        {vehicleData.images && [
          ...vehicleData.images.map((s, index) => (
            <img
              src={import.meta.env.VITE_API_MODEL_IMAGE_GALLERY_PATH + s}
              key={index}
            />
          )),
        ]}
        {!vehicleData.images && <img src={defaultImage} key={0} />}
      </GallerySlider>
    </div>
  );
};
export default DetailsGallery
