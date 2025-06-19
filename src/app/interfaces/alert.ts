export interface AlertData {
  type: "ERROR" | "SUCCCESS" | "WARN";
  message: string;
  description?: string;
}
