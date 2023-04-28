import { useContext } from "react";
import { ToasterContext } from "../context/toaster.context";

export const useToaster = () => {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error("Hook must be used withing Toaster Context Provider.");
  }

  return context;
};
