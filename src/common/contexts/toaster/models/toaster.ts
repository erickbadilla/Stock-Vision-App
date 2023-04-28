interface IToasterMessage {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  durationMs?: number;
}

interface IInternalToasterMessage extends IToasterMessage {
  id: string;
}
