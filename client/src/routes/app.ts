import { Home, NotFound, Profile } from "../pages";

export interface AppRouteType {
  to: string;
  element: React.ComponentType;
}

export const appRoutes: AppRouteType[] = [
  {
    to: "/",
    element: Home,
  },
  {
    to: "/profile",
    element: Profile,
  },
  {
    to: "*",
    element: NotFound,
  },
];
