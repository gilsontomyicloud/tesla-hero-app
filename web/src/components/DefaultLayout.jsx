import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
const DefaultLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <section className="bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </>
  );
}
export default DefaultLayout;
