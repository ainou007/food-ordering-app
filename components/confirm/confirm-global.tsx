"use client";
import { ComponentProps, useRef, useState } from "react";
import ConfirmDialog from "./confirm-dialog";

type Params = Partial<Omit<ComponentProps<typeof ConfirmDialog>, "open" | "onConfirm" | "onCancel">>;
const confirmAction = {
  current: (P: Params) => Promise.resolve(true),
};

export const confirm = (props: Params) => {
  return confirmAction.current(props);
};

const ConfirmGlobal = () => {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState({});

  const resolvRef = useRef((v: boolean) => {});

  confirmAction.current = (props) =>
    new Promise((resolve) => {
      setProps(props);
      setOpen(true);
      resolvRef.current = resolve;
    });

  return (
    <ConfirmDialog
      onConfirm={() => {
        resolvRef.current(true);
        setOpen(false);
      }}
      onCancel={() => {
        resolvRef.current(false);
        setOpen(false);
      }}
      open={open}
      {...props}
    />
  );
};

export default ConfirmGlobal;
