import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./views/Home";
import Vehicles from "./views/Vehicles";
import VehiclesDetails from "./views/VehiclesDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/vehicles",
        exact: true,
        element: <Vehicles />,
      },
      {
        path: "/vehicles/:urlSlug",
        element: <VehiclesDetails />,
      },
    ],
  },
]);

export default router;
