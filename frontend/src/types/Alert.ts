export interface AlertComp {
  isShow: boolean;
  message: string;
  type: BootstrapScheme;
}

export type BootstrapScheme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
