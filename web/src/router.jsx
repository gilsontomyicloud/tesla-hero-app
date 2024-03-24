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
        element: <Vehicles />,
      },
      {
        path: "/vehicles/:id",
        element: <VehiclesDetails />,
      },
    ],
  },
]);

export default router;
