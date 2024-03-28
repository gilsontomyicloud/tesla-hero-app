import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Details from "../components/vehicle-details/Details";
import DetailsGallery from "../components/vehicle-details/DetailsGallery";
import { useParams } from "react-router-dom";

const slides = [
  "../../public/1.jpg",
  "../../public/2.jpg",
  "../../public/2.jpg",
];
const VehiclesDetails = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { urlSlug } = useParams();

  useEffect(() => {
    axiosClient
      .get(`/variants/get-by-slug/${urlSlug}`)
      .then((res) => {
        setVehicleData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching club:", error);
      });
  }, [urlSlug]);
  return (
    <>
      {loading && (
        <section className="wide:padding-r">
          <div className="py-8 text-center text-lg">Loading...</div>
        </section>
      )}
      {!loading && (
        <div>
          <section className="xl:padding-l wide:padding-r  border-b-2 border-b-slate-100/80">
            <DetailsGallery vehicleData={vehicleData} />
          </section>
          <section className="wide:padding-r">
            <Details vehicleData={vehicleData} />
          </section>
        </div>
      )}
    </>
  );
}
export default VehiclesDetails
