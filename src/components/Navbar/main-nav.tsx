import { NavigationMenu } from "@/components/ui/navigation-menu";
import Logo from "@/components/Logo";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { routes } from "@/router/routes";

const MainNav = () => {
  return (
    <div className="mr-4 hidden md:flex items-center">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Logo />
      </Link>
      <NavigationMenu>
        <Link to={routes.identifyData}>
          <Button variant="ghost">Dashboard</Button>
        </Link>
      </NavigationMenu>
    </div>
  );
};

export default MainNav;
