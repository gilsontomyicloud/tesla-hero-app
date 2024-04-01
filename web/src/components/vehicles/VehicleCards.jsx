const VehicleCards = ({ variants }) => {
  return (
    <>
      {variants.length === 0 && (
        <div className="py-8 text-center text-lg">
          No vehicles available to list.
        </div>
      )}
      {variants.length > 0 &&
        variants.map((variant) => (
          <a
            key={variant.id}
            href={`/vehicles/${variant.attributes.slug}`}
            className="group shadow-lg p-5"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={
                  import.meta.env.VITE_API_VARIANT_IMAGE_PATH +
                  variant.attributes.image
                }
                alt={variant.attributes.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              {variant.attributes.name}
            </h3>
            <span
              style={{
                background: `${variant.attributes.color_code}`,
                "border-radius": "50%",
                width: "20px",
                height: "20px",
                display: "inline-block",
                marginRight: "8px",
                float: "right",
              }}
            ></span>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {`$ ${variant.attributes.price}`}
            </p>
            <p className="text-[12px] inline-block font-montserrat text-white mt-1 rounded-sm border-0 p-1 bg-tesla-red">
              {variant.relationships.vehicle.name}
            </p>
          </a>
        ))}
    </>
  );
};
export default VehicleCards;
