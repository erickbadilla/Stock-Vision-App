import { FunctionComponent, useEffect, useState } from "react";
import { ToasterContext } from "../context/toaster.context";

interface IToasterProvider {
  children: React.ReactNode;
}

export const ToasterProvider: FunctionComponent<IToasterProvider> = ({
  children,
}) => {
  const [messages, setMessages] = useState<IInternalToasterMessage[]>([]);
  const [messagesTimeouts] = useState<Set<NodeJS.Timeout>>(new Set());

  const addMessage = (newMessage: IToasterMessage) => {
    const messageToAdd: IInternalToasterMessage = {
      ...newMessage,
      id: crypto.randomUUID(),
    };

    setMessages((prevMessages) => [...prevMessages, messageToAdd]);

    const timeoutId = setTimeout(() => {
      setMessages((previousMessages) =>
        previousMessages.filter((message) => message.id !== messageToAdd.id)
      );

      messagesTimeouts.delete(timeoutId);
    }, newMessage.durationMs ?? 2500);

    messagesTimeouts.add(timeoutId);
  };

  useEffect(() => {
    return () => {
      messagesTimeouts.forEach(clearTimeout);
    };
  }, [messagesTimeouts]);

  const toasterValue = {
    messages,
    addMessage,
  };

  return (
    <ToasterContext.Provider value={toasterValue}>
      {children}
    </ToasterContext.Provider>
  );
};
