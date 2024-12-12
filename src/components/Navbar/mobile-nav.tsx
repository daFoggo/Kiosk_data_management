import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../Logo";
import { NavigationMenu } from "../ui/navigation-menu";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";

const MobileNav = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex flex-col p-0"
      >
        <SheetTitle className="p-4">
          <Logo />
        </SheetTitle>
        <Link to={routes.identifyData}>
          <Button variant="ghost">Dashboard</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
