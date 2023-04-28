import { useToaster } from "@/common/contexts/toaster/hook/use-toaster.hook";
import { Snackbar, Alert, SxProps } from "@mui/material";
import { FunctionComponent } from "react";

interface IToaster {}

const ALERT_SX: SxProps = {
  width: "100%",
  padding: "24px",
  fontSize: "1.2rem",
};

export const Toaster: FunctionComponent<IToaster> = () => {
  const { messages } = useToaster();

  return (
    <Snackbar open={true}>
      <div>
        {messages.map(({ id, severity, message }) => (
          <Alert key={id} severity={severity} sx={ALERT_SX}>
            {message}
          </Alert>
        ))}
      </div>
    </Snackbar>
  );
};
