import { Battery100Icon, ClockIcon, ShieldExclamationIcon, TruckIcon, AdjustmentsHorizontalIcon,  } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";



const Details = ({vehicleData}) => {

  const [trims, setTrims] = useState([]);
  /* Get all trims from DB to list in filters */
  const getTrims = async () => {

    await axiosClient
      .get("/get-trims")
      .then(({ data }) => {
        setTrims(data.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getTrims();
  }, []);
  return (
    <div className="bg-white py-1 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-6 sm:p-8 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Warranty Details
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {vehicleData.description}
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                Performance
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-3 sm:gap-6"
            >
              <li className="flex gap-x-3">
                <Battery100Icon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {vehicleData.range}mi [Range (est.)]
              </li>
              <li className="flex gap-x-3">
                <ClockIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {vehicleData.top_speed}mph [Top Speed]
              </li>
              <li className="flex gap-x-3">
                <ShieldExclamationIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                [0-60 mph] in {vehicleData.acceleration}sec
              </li>
            </ul>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                Tyre and Auto-Pilot
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-3 sm:gap-6"
            >
              <li className="flex gap-x-3">
                <TruckIcon
                  className="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {vehicleData.wheel_size}"{" "}
                {vehicleData.wheel_type === 1 && `Gemini`}
                {vehicleData.wheel_type === 2 && `Induction`} Wheel
              </li>
              {vehicleData.autopilot_available === 1 && (
                <li className="flex gap-x-3">
                  <AdjustmentsHorizontalIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  Auto-Pilot Available
                </li>
              )}
            </ul>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                Trim
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-3 sm:gap-6"
            >
              {trims
                .filter((itm) => itm.id == vehicleData.trim_id)
                .map((option, optionIdx) => `${option.attributes.name}`)}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Vehicle Price
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {`$ ${vehicleData.price}`}
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>

                <p className="mt-6 text-xs leading-5 text-gray-600 pb-8">
                  Includes all price adjustment. Excludes taxes and fees
                </p>
                <div className="relative inline-flex group">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>
                  <a
                    href=""
                    target="_blank"
                    title=""
                    role="button"
                    className="relative inline-flex items-center justify-center px-5 py-2 text-base font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-600 rounded"
                  >
                    Build and Price
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
