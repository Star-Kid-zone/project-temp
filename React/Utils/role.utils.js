import { getLocalItem } from "../Helpers/Localstorage.helper";

export const hasRole = (requiredRoles) => {
  let baserole = getLocalItem("role") || "user";
  return requiredRoles.some((rol) => rol.includes(baserole));
};
