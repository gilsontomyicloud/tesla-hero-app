
import { useEffect, useState } from "react";
import VehicleCards from "./VehicleCards";
import axiosClient from '../../axios-client';
import Pagination from './Pagination';
import MobileFilters from "./MobileFilters";


import { Fragment  } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useStateContext } from "../../contexts/ContextProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FilterList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [colors, setColors] = useState([]);
  const [trims, setTrims] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [fileredVariants, setFilteredVariants] = useState([]);
  const [variants, setVariants] = useState([]);
  const [meta, setMeta] = useState({});
  const [urlSlug, setUrlSlug] = useState('');
  const queryParameters = new URLSearchParams(window.location.search);
  

  const [loading, setLoading] = useState(false);
  const { vehicleModels } = useStateContext();

  /* Get list of all vehicle variants available */
  const getVehicleVariants = (url) => {
    url = url || "/variants";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setVariants(data.data);
        setFilteredVariants(data.data);
        setMeta(data.meta);
        setLoading(false);
        setUrlSlug(queryParameters.get("slug"));
        // debugger;
      })
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false);
      });
  };

  /* Get all colors from DB to list in filters */
  const getColors = async () => {
    setLoading(true);

    await axiosClient
      .get("/get-colors")
      .then(({ data }) => {
        setColors(data.data);
      })
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false);
      });
  };

  /* Get all trims from DB to list in filters */
  const getTrims = async () => {
    setLoading(true);

    await axiosClient
      .get("/get-trims")
      .then(({ data }) => {
        setTrims(data.data);
      })
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false);
      });
  };

  /* Add user selected models to selectedModels */
  const addModel = (model) => {
    if (!selectedModels.includes(model)) {
      setSelectedModels((prev) => [...prev, parseInt(model)]);
    }
  };

  /* Remove user selected models to selectedModels */
  const removeModel = (model) => {
    if (selectedModels.includes(model)) {
      const removedList = selectedModels.filter((item) => item !== model);
      setSelectedModels(removedList);
    }
  };

  useEffect(() => {
    
    if (selectedModels.length === 0) {
      setFilteredVariants(variants);
    } else {
      
      setFilteredVariants(
        variants.filter((item) =>
          selectedModels.includes(item.attributes.vehicle_id)
        )
      );
    }
    
  }, [selectedModels, variants]);

  useEffect(() => {
    getVehicleVariants();
    getColors();
    getTrims();
  }, []);

  const onPageClick = (link) => {
    getVehicleVariants(link.url);
  };
const slug = queryParameters.get("slug") ? queryParameters.get("slug") : "";
  
  return (
    <div className="bg-white">
      <div>
        <MobileFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          colors={colors}
          trims={trims}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Inventory
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Vehicles
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Models
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {vehicleModels.map((option, optionIdx) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                id={`filter-models-${optionIdx}`}
                                name={`models[]`}
                                defaultValue={option.id}
                                type="checkbox"
                                defaultChecked={
                                  option.attributes.slug === slug && true
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onClick={() => {
                                  if (selectedModels.includes(option.id)) {
                                    removeModel(option.id);
                                  } else {
                                    addModel(option.id);
                                  }
                                }}
                              />
                              <label
                                htmlFor={`filter-models-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.attributes.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Colors
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {colors.map((option, optionIdx) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                id={`filter-colors-${optionIdx}`}
                                name={`colors[]`}
                                defaultValue={option.id}
                                type="checkbox"
                                defaultChecked={false}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-colors-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.attributes.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Trims
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {trims.map((option, optionIdx) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                id={`filter-trims-${optionIdx}`}
                                name={`trims[]`}
                                defaultValue={option.id}
                                type="checkbox"
                                defaultChecked={false}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-trims-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.attributes.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>

              {/* Vehicles grid */}
              <div className="lg:col-span-3">
                {loading && (
                  <div className="py-8 text-center text-lg">Loading...</div>
                )}
                {!loading && (
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
                        {fileredVariants.length === 0 && (
                          <div className="py-8 text-center text-lg">
                            No vehicles available to list.
                          </div>
                        )}
                        {fileredVariants.length > 0 && (
                          <VehicleCards variants={fileredVariants} />
                        )}
                      </div>
                    </div>
                    {fileredVariants.length > 0 && (
                      <Pagination meta={meta} onPageClick={onPageClick} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FilterList;
