import { Fragment } from 'react';
import { NavLink } from "react-router-dom";
import { headerLogo } from "../assets/images";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  modelYThumb,
  modelXThumb,
  modelSThumb,
  cyberTruckThumb,
} from "../assets/images/models";


const navigation = [
  { name: "Home", to: "/", current: true },
  // { name: "Vehicles", to: "/vehicles"},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const vehicles = [
  {
    id: "1",
    name: "Model X",
    description:
      "Model S Plaid has the quickest acceleration of any vehicle in production. Updated battery architecture for all Model S trims enables back-to-back track runs without performance degradation.",
    href: "/vehicles/1",
    image: modelXThumb,
  },
  {
    id: "2",
    name: "Model Y",
    description:
      "Plenty of range for every kind of drive. From daily driving to family road trips, charging Model Y is fast, convenient and accessible anywhere there’s electricity.",
    href: "/vehicles/2",
    image: modelYThumb,
  },
  {
    id: "3",
    name: "Model S",
    description:
      "Model S Plaid has the quickest acceleration of any vehicle in production. Updated battery architecture for all Model S trims enables back-to-back track runs without performance degradation.",
    href: "/vehicles/3",
    image: modelSThumb,
  },

  {
    id: "4",
    name: "Cybertruck",
    description:
      "Durable and rugged enough to go anywhere. tackle anything with electronically adaptive air suspension that offers 305 mm of travel and 406 mm of clearance.",
    href: "/vehicles/4",
    image: cyberTruckThumb,
  },
  
];

const Nav = () => {
  return (
    <Disclosure as="nav" className="bg-transparent">
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
                  <img
                    className="h-5 w-auto"
                    src={headerLogo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-20 sm:block">
                  <div className="flex space-x-6">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? " text-gray-950 decoration-black"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-5 py-2 text-sm font-medium text-gray-950"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <Popover className="hidden sm:ml-5 sm:mt-1 sm:block relative">
                  <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
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
                          {vehicles.map((item) => (
                            <div
                              key={item.id}
                              className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                            >
                              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <img
                                  src={item.image}
                                  className="h-8 w-8"
                                  alt={item.name}
                                />
                              </div>
                              <div>
                                <a
                                  href={item.href}
                                  className="font-semibold text-gray-300"
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-300">
                                  {item.description}
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
              <div className="hidden md:block max-w-md mx-auto md">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </div>

                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search vehicles.."
                  />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.to}
                  className={classNames(
                    item.current
                      ? " text-gray-950 decoration-black"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 text-base font-medium text-gray-950"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Nav;
