import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ILinkProps {
  description: string;
  isDarkTheme: boolean;
  spcontext:WebPartContext;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
