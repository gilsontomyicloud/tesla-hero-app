import {
  CameraIcon,
  BellAlertIcon,
  KeyIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { featureImg } from "../../assets/images";

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Cabin Camera",
    description:
      "The cabin camera is located above the rear-view mirror in Model S (produced in 2021 or later), Model 3, Model X (produced in 2021 or later), Model Y, Cybertruck",
    icon: CameraIcon,
  },
  {
    name: "Sentry Mode",
    description:
      "Sentry Mode is a feature that allows you to monitor suspicious activities around your Tesla vehicle when it's parked and locked in specified locations. When suspicious motion is detected, your vehicle will react depending on the severity of the threat.",
    icon: InformationCircleIcon,
  },
  {
    name: "Security Alarm",
    description:
      "Your alarm will sound and external lights will flash if a locked trunk or door is opened without a valid entry key.",
    icon: BellAlertIcon,
  },
  {
    name: "PIN to Drive",
    description:
      "PIN to Drive allows you to set a secure four-digit verification that must be entered before your vehicle is driven.",
    icon: KeyIcon,
  },
];

const Features = () => {
  

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-tesla-red">
                Our Unique Features
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Vehicle Safety and Security Features
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                From their design and physical structure to their strong
                security, Tesla vehicles are developed with the highest
                standards of safety in every respect. Your Tesla vehicle has
                several enhanced security features that you can activate. To
                enable any of these features, go to
                <b>Controls &gt; Safety & Security</b> on your vehicle's
                touchscreen. Safety and security feature availability differs
                based on model, trim and model year.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src={featureImg}
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                {features.map((feature) => (
                  <li key={feature.name} className="flex gap-x-3">
                    <feature.icon
                      className="mt-1 h-5 w-5 flex-none text-tesla-red"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        {feature.name}
                      </strong>{" "}
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
