import { IconMenu2 } from "@tabler/icons-react";
import React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

interface Props {
  children?: React.ReactNode;
}

const MobileNavMenu = (props: Props) => {
  return (
    <Drawer>
      <DrawerTrigger aria-label="Open Navigation Menu" title="Open menu">
        <IconMenu2 />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>Obi Fortune</DrawerTitle>
          <DrawerDescription className="sr-only">Menu</DrawerDescription>
        </DrawerHeader>

        {props.children}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavMenu;
