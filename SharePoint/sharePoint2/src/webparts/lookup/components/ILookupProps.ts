import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ILookupProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spcontext: WebPartContext;
}
