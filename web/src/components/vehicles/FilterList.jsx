
import { useEffect, useState } from "react";
import VehicleCards from "./VehicleCards";
import axiosClient from '../../axios-client';
import Pagination from './Pagination';


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
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTrims, setSelectedTrims] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [variants, setVariants] = useState([]);
  const [urlSlug, setUrlSlug] = useState("");
  const queryParameters = new URLSearchParams(window.location.search);

  const [loading, setLoading] = useState(false);
  const { vehicleModels } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);


  /* Get list of all vehicle variants available */
  const getVehicleVariants = (url) => {
    url = url || "/variants";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setVariants(data.data);
        setFilteredVariants(
          data.data.slice(indexOfFirstRecord, indexOfLastRecord)
        );
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

  /* Add user selected items from selectedModels,selectedColors,setSelectedTrims */
  const addFilterItem = (item, category) => {
    if (category === 1) {
      if (!selectedModels.includes(item)) {
        setSelectedModels((prev) => [...prev, parseInt(item)]);
      }
    } else if (category === 2) {
      if (!selectedColors.includes(item)) {
        setSelectedColors((prev) => [...prev, parseInt(item)]);
      }
    } else if (category === 3) {
      if (!selectedTrims.includes(item)) {
        setSelectedTrims((prev) => [...prev, parseInt(item)]);
      }
    }
  };

  /* Remove user selected items from selectedModels,selectedColors,setSelectedTrims */
  const removeFilterItem = (item, category) => {

    if (category === 1) {
      if (selectedModels.includes(item)) {
        const removedList = selectedModels.filter((itm) => itm !== item);
        setSelectedModels(removedList);
      }
    } else if (category === 2) {
      if (selectedColors.includes(item)) {
        const removedList = selectedColors.filter((itm) => itm !== item);
        setSelectedColors(removedList);
      }
    } else if (category === 3) {
      if (selectedTrims.includes(item)) {
        const removedList = selectedTrims.filter((itm) => itm !== item);
        setSelectedTrims(removedList);
      }
    }
    
  };

  useEffect(() => {
    console.log(selectedModels, selectedColors);
    if (
      selectedModels.length === 0 &&
      selectedColors.length === 0 &&
      selectedTrims.length === 0
    ) {
      setFilteredVariants(variants);
    } else {
      setFilteredVariants(
        variants.filter(
          (item) =>
            selectedModels.includes(item.attributes.vehicle_id) ||
            selectedColors.includes(item.attributes.color_id) ||
            selectedTrims.includes(item.attributes.trim_id)
        )
      );
    }
  }, [selectedModels, selectedColors, selectedTrims, variants]);

  useEffect(() => {
    getVehicleVariants();
    getColors();
    getTrims();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(filteredVariants.length / recordsPerPage);

  const slug = queryParameters.get("slug") ? queryParameters.get("slug") : "";

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Models</h3>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
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
                            <div className="space-y-6">
                              {vehicleModels.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-models-${optionIdx}`}
                                    name={`models[]`}
                                    defaultValue={option.id}
                                    type="checkbox"
                                    defaultChecked={
                                      option.attributes.slug === slug && true
                                    }
                                    onClick={() => {
                                      if (selectedModels.includes(option.id)) {
                                        removeFilterItem(option.id, 1);
                                      } else {
                                        addFilterItem(option.id, 1);
                                      }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-models-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
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
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
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
                            <div className="space-y-6">
                              {colors.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-colors-${optionIdx}`}
                                    name={`colors[]`}
                                    defaultValue={option.id}
                                    type="checkbox"
                                    defaultChecked={false}
                                    onClick={() => {
                                      if (selectedColors.includes(option.id)) {
                                        removeFilterItem(option.id, 2);
                                      } else {
                                        addFilterItem(option.id, 2);
                                      }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-colors-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
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
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
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
                            <div className="space-y-6">
                              {trims.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-trims-${optionIdx}`}
                                    name={`trims[]`}
                                    defaultValue={option.id}
                                    type="checkbox"
                                    defaultChecked={false}
                                    onClick={() => {
                                      if (selectedTrims.includes(option.id)) {
                                        removeFilterItem(option.id, 3);
                                      } else {
                                        addFilterItem(option.id, 3);
                                      }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-trims-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

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
                                    removeFilterItem(option.id, 1);
                                  } else {
                                    addFilterItem(option.id, 1);
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
                                onClick={() => {
                                  if (selectedColors.includes(option.id)) {
                                    removeFilterItem(option.id, 2);
                                  } else {
                                    addFilterItem(option.id, 2);
                                  }
                                }}
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
                                onClick={() => {
                                  if (selectedTrims.includes(option.id)) {
                                    removeFilterItem(option.id, 3);
                                  } else {
                                    addFilterItem(option.id, 3);
                                  }
                                }}
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
                        {filteredVariants.slice(
                          indexOfFirstRecord,
                          indexOfLastRecord
                        ).length === 0 && (
                          <div className="py-8 text-center text-lg">
                            No vehicles available to list.
                          </div>
                        )}
                        {filteredVariants.slice(
                          indexOfFirstRecord,
                          indexOfLastRecord
                        ).length > 0 && (
                          <VehicleCards
                            variants={filteredVariants.slice(
                              indexOfFirstRecord,
                              indexOfLastRecord
                            )}
                          />
                        )}
                      </div>
                    </div>
                    {filteredVariants.slice(
                      indexOfFirstRecord,
                      indexOfLastRecord
                    ).length > 0 && (
                      <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
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
