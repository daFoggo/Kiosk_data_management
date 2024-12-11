import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 p-6 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
