import React from "react";
import { SessionStorageHelper } from "../helpers/SessionStorageHelper";

export const memberAuthenticated: boolean =
  SessionStorageHelper.GetJwt() !== undefined;
export const memberAuthenticatedName = "";

export const AuthContext = React.createContext({
  memberAuthenticated,
  memberAuthenticatedName,
  toggleAuthentication: () => {}
});
