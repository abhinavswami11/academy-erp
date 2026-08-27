import { navigationItems } from "../constants/navigation";

export function getPageTitle(pathname: string): string {
  const item = navigationItems.find((nav) =>
    nav.path === "/" ? pathname === "/" : pathname.startsWith(nav.path),
  );
  return item?.label ?? "Academy ERP";
}
