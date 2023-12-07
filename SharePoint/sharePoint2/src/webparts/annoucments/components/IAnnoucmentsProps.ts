import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAnnoucmentsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spcontext:WebPartContext
}
