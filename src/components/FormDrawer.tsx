"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

type Props<T> = {
  form: React.ComponentType<{
    item?: T | null;
    onClose: (refresh?: boolean) => void;
  }>;
  item?: T | null;
  isOpen: boolean;
  onChange: (state: boolean) => void;
  onClose?: () => void;
};

export const FormDrawer = <T extends object>(props: Props<T>) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  //const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const close = (refresh?: boolean) => {
    props.onChange(false);
    //setRefresh(!refresh);
    //if (refresh) setRefresh();
  };

  return (
    <Drawer open={props.isOpen} onOpenChange={props.onChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New </DrawerTitle>
        </DrawerHeader>
        <div className={` m-3`}>
          <props.form item={props.item} onClose={close} />{" "}
        </div>

        <DrawerFooter>
          <DrawerClose onClick={() => props.onChange(false)}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
