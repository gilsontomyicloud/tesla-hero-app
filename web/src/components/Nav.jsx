import { Fragment, useEffect } from 'react';
import { NavLink} from "react-router-dom";
import { headerLogo } from "../assets/images";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { facebook, instagram, twitter } from "../assets/icons";
const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];


const navigation = [
  { name: "Home", to: "/", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Nav = () => {
  
  const { vehicleModels, setVehicleModels } = useStateContext();
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosClient.get("vehicles");
        setVehicleModels(response.data.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.message);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchVehicles();
  }, []);
  return (
    <Disclosure as="nav" className="bg-transparent py-5">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <img
                      className="h-5 w-auto"
                      src={headerLogo}
                      alt="Your Company"
                    />
                  </a>
                </div>
                <div className="hidden sm:ml-20 sm:block">
                  <div className="flex space-x-6">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={() =>
                          classNames(
                            "hover:bg-gray-700 hover:text-white px-4 py-2.5 text-sm font-medium leading-6 text-gray-950"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <Popover className="hidden sm:ml-5 sm:mt-1 sm:block relative">
                  <Popover.Button className="inline-flex hover:bg-gray-700 hover:text-white px-4 py-1 items-center gap-x-1 text-sm font-semibold leading-7 text-gray-900">
                    <span>Vehicles</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto h-96 overflow-y-auto rounded-3xl bg-black text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 ">
                        <div className="p-4">
                          {vehicleModels.map((item) => (
                            <div
                              key={item.id}
                              className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                            >
                              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <img
                                  src={
                                    import.meta.env.VITE_API_MODEL_IMAGE_PATH +
                                    item.attributes.thumbImage
                                  }
                                  className="h-8 w-8"
                                  alt={item.attributes.name}
                                />
                              </div>
                              <div>
                                <a
                                  href={`/vehicles`}
                                  className="font-semibold text-gray-300"
                                >
                                  {item.attributes.name}
                                  <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-300">
                                  {item.attributes.shortDescription}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1  bg-black">
                          <a
                            href="/vehicles"
                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-300 hover:bg-gray-100"
                          >
                            View All Models
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
              {socialMedia.map((icon, index) => (
                <div
                  className="flex justify-center items-center w-12 h-12 bg-white rounded-full hover:bg-tesla-blue"
                  key={index}
                >
                  <img src={icon.src} alt={icon.alt} width={20} height={20} />
                </div>
              ))}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-gray-950">
            <div className="space-y-1 px-2 pb-2 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.to}
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <Popover className="sm:hidden space-y-1 px-5 pb-5 pt-2 relative ">
              <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:bg-gray-700 hover:text-white ">
                <span>Vehicles</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                  <div className="w-screen max-w-md flex-auto h-96 overflow-y-auto rounded-3xl bg-black text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 ">
                    <div className="p-4">
                      {vehicleModels.map((item) => (
                        <div
                          key={item.id}
                          className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <img
                              src={
                                import.meta.env.VITE_API_MODEL_IMAGE_PATH +
                                item.attributes.thumbImage
                              }
                              className="h-8 w-8"
                              alt={item.attributes.name}
                            />
                          </div>
                          <div>
                            <a
                              href={`/vehicles?slug=${item.attributes.slug}`}
                              className="font-semibold text-gray-300"
                            >
                              {item.attributes.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-300">
                              {item.attributes.shortDescription}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1  bg-black">
                      <a
                        href="/vehicles"
                        className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-300 hover:bg-gray-100"
                      >
                        View All Models
                      </a>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Nav;
