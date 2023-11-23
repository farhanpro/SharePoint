import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISliderProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spcontext : WebPartContext
}
