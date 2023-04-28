import { createContext } from "react";

interface IToasterContext {
  messages: IInternalToasterMessage[];
  addMessage: (newMessage: IToasterMessage) => void;
}

export const ToasterContext = createContext<IToasterContext | null>(null);
