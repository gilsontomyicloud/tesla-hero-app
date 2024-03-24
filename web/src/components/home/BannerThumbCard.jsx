const BannerThumbCard = ({ imgURL, changeImageHero, defaultImage }) => {
  const handleClick = () => {
    if (defaultImage !== imgURL.largeImage){
        changeImageHero(imgURL.largeImage);
    } 
  };
  return (
    <div
      className={`border-2 rounded-xl
      ${
        defaultImage !== imgURL.largeImage
          ? "border-transparent"
          : "border-tesla-red"
      }
       cursor-pointer max-sm:flex-1
    `}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover rounded-xl sm:w-40 sm:h-40 max-sm:p-4">
        <img
          src={imgURL.thumbnail}
          alt="tesla collection"
          width={127}
          height={103}
          className="object-contain"
        />
      </div>
    </div>
  );
};
export default BannerThumbCard
